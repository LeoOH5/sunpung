import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { voiceDiaries } from "@/db/schema";
import { transcribeAudio, scorePHQ9 } from "@/lib/openai";
import { desc } from "drizzle-orm";

export async function GET() {
  const diaries = await db.select().from(voiceDiaries)
    .orderBy(desc(voiceDiaries.recordedAt))
    .limit(30);
  return NextResponse.json({ diaries });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as File | null;
    const textOverride = formData.get("text") as string | null;

    let transcript = "";
    if (textOverride) {
      transcript = textOverride;
    } else if (audio) {
      transcript = await transcribeAudio(audio);
    } else {
      return NextResponse.json({ error: "audio 또는 text 필요" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      const mockScores = transcript.includes("힘들") || transcript.includes("우울")
        ? [2, 2, 1, 2, 1, 2, 1, 1, 0]
        : transcript.includes("죽") || transcript.includes("자해")
        ? [3, 3, 2, 3, 2, 3, 2, 2, 2]
        : [1, 0, 1, 1, 0, 0, 1, 0, 0];
      const total = mockScores.reduce((a, b) => a + b, 0);
      const riskLevel = total < 5 ? "정상" : total < 10 ? "경증" : total < 20 ? "중등도" : "중증";

      const inserted = await db.insert(voiceDiaries).values({
        userId: 1,
        transcript,
        phq1: mockScores[0], phq2: mockScores[1], phq3: mockScores[2],
        phq4: mockScores[3], phq5: mockScores[4], phq6: mockScores[5],
        phq7: mockScores[6], phq8: mockScores[7], phq9: mockScores[8],
        totalScore: total,
        riskLevel,
        emotion: total < 5 ? "joy" : "sadness",
        triggers: JSON.stringify([]),
      }).returning();

      return NextResponse.json({ ok: true, diary: inserted[0], mock: true });
    }

    const score = await scorePHQ9(transcript);
    const inserted = await db.insert(voiceDiaries).values({
      userId: 1,
      transcript,
      phq1: score.scores[0], phq2: score.scores[1], phq3: score.scores[2],
      phq4: score.scores[3], phq5: score.scores[4], phq6: score.scores[5],
      phq7: score.scores[6], phq8: score.scores[7], phq9: score.scores[8],
      totalScore: score.total,
      riskLevel: score.riskLevel,
      emotion: score.emotion,
      triggers: JSON.stringify(score.triggers),
    }).returning();

    return NextResponse.json({ ok: true, diary: inserted[0] });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
