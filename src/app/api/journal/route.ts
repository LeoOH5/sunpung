import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { babyJournals } from "@/db/schema";
import { analyzeJournalRisk } from "@/lib/openai";
import { desc, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = 6;
  const offset = (page - 1) * limit;

  const [journals, [{ total }]] = await Promise.all([
    db.select().from(babyJournals)
      .orderBy(desc(babyJournals.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ total: sql<number>`count(*)::int` }).from(babyJournals),
  ]);

  return NextResponse.json({
    journals,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, date, imageData } = body as {
      title: string;
      content: string;
      date: string;
      imageData?: string;
    };

    if (!title || !content || !date) {
      return NextResponse.json({ error: "제목, 내용, 날짜는 필수입니다" }, { status: 400 });
    }

    const risk = await analyzeJournalRisk(content);

    const [inserted] = await db.insert(babyJournals).values({
      userId: 1,
      title,
      content,
      date,
      imageData: imageData ?? null,
      riskLevel: risk.riskLevel,
      alertType: risk.alertType,
      triggers: JSON.stringify(risk.triggers),
    }).returning();

    return NextResponse.json({ ok: true, journal: inserted, risk });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") ?? "0");
  if (!id) return NextResponse.json({ error: "id 필요" }, { status: 400 });
  await db.delete(babyJournals).where(sql`id = ${id}`);
  return NextResponse.json({ ok: true });
}
