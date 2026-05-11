import OpenAI from "openai";

let _openai: OpenAI | null = null;
function client(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "no-key" });
  }
  return _openai;
}

/**
 * 음성 → 한국어 텍스트 (Whisper)
 */
export async function transcribeAudio(audio: File | Blob): Promise<string> {
  const file = audio instanceof File ? audio : new File([audio], "voice.webm");
  const result = await client().audio.transcriptions.create({
    file,
    model: "whisper-1",
    language: "ko",
  });
  return result.text;
}

/**
 * 텍스트 임베딩 (RAG용)
 */
export async function embed(text: string): Promise<number[]> {
  const result = await client().embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return result.data[0].embedding;
}

/**
 * 코사인 유사도
 */
export function cosineSim(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

/**
 * GPT-4o로 PHQ-9 산후우울증 스코어링
 * 텍스트(음성 transcript) → 9개 항목 점수 (0-3) + 위험 키워드 추출
 */
export async function scorePHQ9(transcript: string): Promise<{
  scores: number[]; // 9개 항목, 각 0-3
  total: number;
  riskLevel: "정상" | "경증" | "중등도" | "중증";
  emotion: string;
  triggers: string[]; // 가정폭력 등 위험 키워드
}> {
  const prompt = `너는 산후우울증 평가 보조 AI다. 산모의 일기 텍스트를 PHQ-9 9개 항목 기준으로 평가하라.

[PHQ-9 9개 항목 — 지난 2주간 얼마나 자주 시달렸는가]
1. 일에 흥미·즐거움이 없어진다
2. 우울하거나 절망적이다
3. 잠들기 어렵거나 너무 많이 잔다
4. 피곤하고 기력이 없다
5. 식욕이 없거나 과식한다
6. 자존감이 떨어진다 / 자책한다
7. 집중이 어렵다
8. 행동이 느려지거나 안절부절못한다
9. 차라리 죽거나 다치는 게 낫다는 생각

각 항목 0~3 점수: 0=전혀, 1=며칠, 2=절반 이상, 3=거의 매일

[위험 키워드] 가정폭력·성폭력·자해·자살을 직접 언급하는 키워드 추출

[출력] JSON만:
{
  "scores": [0,0,0,0,0,0,0,0,0],
  "emotion": "joy|sadness|anger|fear|neutral",
  "triggers": []
}

[일기 텍스트]
${transcript}`;

  const result = await client().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.2,
  });

  const parsed = JSON.parse(result.choices[0].message.content || "{}");
  const scores: number[] = parsed.scores ?? Array(9).fill(0);
  const total = scores.reduce((a, b) => a + b, 0);

  let riskLevel: "정상" | "경증" | "중등도" | "중증";
  if (total < 5) riskLevel = "정상";
  else if (total < 10) riskLevel = "경증";
  else if (total < 20) riskLevel = "중등도";
  else riskLevel = "중증";

  // PHQ-9의 9번 항목(자해 사고)이 1점 이상이면 즉시 중증 처리
  if ((scores[8] ?? 0) >= 1 && riskLevel !== "중증") {
    riskLevel = "중등도";
  }

  return {
    scores,
    total,
    riskLevel,
    emotion: parsed.emotion ?? "neutral",
    triggers: parsed.triggers ?? [],
  };
}
