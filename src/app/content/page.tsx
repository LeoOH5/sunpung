export const dynamic = "force-dynamic";
import { Pin, Check } from "lucide-react";
import { db } from "@/db";
import { maternalHealthPrograms, pregnancyDurationStats } from "@/db/schema";
import { and, eq, lte, gte, sql } from "drizzle-orm";

const DEMO = { dueDate: "2026-08-15", district: "마포구" };

function getWeek(due: string) {
  const d = new Date(due);
  const days = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.floor((280 - days) / 7));
}

const WEEKLY_TIPS: Record<number, { title: string; tips: string[] }> = {
  12: { title: "임신 1삼분기 마무리", tips: ["엽산제 12주까지 꾸준히", "기형아 검사 (NIPT) 검토", "유산 위험 줄어듦"] },
  16: { title: "안정기 진입", tips: ["철분제 시작", "산모교실 등록 추천", "본격 태교 시작"] },
  20: { title: "정밀 초음파 시기", tips: ["기형아 정밀 검사", "성별 확인 가능", "체중 1kg 이상 증가 정상"] },
  24: { title: "태아 생존 가능 시점", tips: ["임신성 당뇨 검사 준비", "산후조리원 예약 시작", "발바닥·다리 부종 관리"] },
  28: { title: "3삼분기 시작", tips: ["임신성 당뇨 검사", "조산 위험 주의", "출산준비교실 등록"] },
  32: { title: "분만 준비", tips: ["병원 분만 등록", "출산가방 준비", "라마즈 호흡법 연습"] },
  36: { title: "막달 진입", tips: ["GBS 검사", "분만 신호 알아두기", "회음부 마사지"] },
  40: { title: "출산 임박", tips: ["진통 간격 측정", "병원 입원 짐 점검", "보호자 연락망"] },
};

export default async function ContentPage() {
  const week = getWeek(DEMO.dueDate);

  const programs = await db.select().from(maternalHealthPrograms)
    .where(and(
      eq(maternalHealthPrograms.district, DEMO.district),
      lte(maternalHealthPrograms.weekRangeStart, week),
      gte(maternalHealthPrograms.weekRangeEnd, week),
    ));

  const risk = await db.select().from(pregnancyDurationStats)
    .where(eq(pregnancyDurationStats.year, 2025))
    .orderBy(sql`${pregnancyDurationStats.weekRange}`);

  const tipKey = Object.keys(WEEKLY_TIPS).map(Number).reduce((a, b) =>
    Math.abs(a - week) < Math.abs(b - week) ? a : b
  );
  const tip = WEEKLY_TIPS[tipKey];

  return (
    <div className="min-h-screen">
      <header className="px-5 pt-6 pb-4 bg-gradient-to-br from-pink-50 to-rose-50">
        <h1 className="text-xl font-bold mb-1">{week}주차 맞춤 정보</h1>
      </header>

      <section className="px-5 pt-4">
        <div className="card bg-gradient-to-br from-amber-50 to-pink-50">
          <p className="text-xs text-amber-600 font-bold mb-1 flex items-center gap-1"><Pin size={12} /> {tipKey}주차 가이드</p>
          <h2 className="text-lg font-bold mb-3">{tip.title}</h2>
          <ul className="space-y-2">
            {tip.tips.map((t) => (
              <li key={t} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-pink-500">•</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pt-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">임신주수별 출생 분포</h3>
        <div className="card">
          {risk.map((r) => {
            const total = risk.reduce((s, x) => s + x.count, 0);
            const pct = (r.count / total * 100).toFixed(1);
            const colorMap: Record<string, string> = {
              "매우위험": "bg-red-500", "위험": "bg-orange-400",
              "관찰": "bg-yellow-400", "정상": "bg-green-500",
            };
            return (
              <div key={r.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{r.weekRange} ({r.riskLevel})</span>
                  <span className="text-xs text-gray-500">{pct}% · {r.count.toLocaleString()}건</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${colorMap[r.riskLevel ?? "정상"]} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-5 pt-5 pb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          {DEMO.district} 보건소 프로그램 ({programs.length}개 가능)
        </h3>
        <div className="space-y-3">
          {programs.map((p) => {
            const typeColor: Record<string, string> = {
              "검진": "bg-blue-100 text-blue-700",
              "교육": "bg-purple-100 text-purple-700",
              "지원": "bg-green-100 text-green-700",
            };
            return (
              <div key={p.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded ${typeColor[p.programType]}`}>
                      {p.programType}
                    </span>
                    <h4 className="font-semibold mt-1">{p.programName}</h4>
                    <p className="text-xs text-gray-600 mt-1">{p.description}</p>
                    <p className="text-xs text-pink-600 mt-2 flex items-center gap-1">
                      <Check size={11} strokeWidth={2.5} /> {p.weekRangeStart}~{p.weekRangeEnd}주차 (현재 {week}주차)
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
