import { db } from "@/db";
import { supportPolicies } from "@/db/schema";
import { lte, gte, and } from "drizzle-orm";

const DEMO = { dueDate: "2026-08-15", district: "마포구", income: 4500000, childCount: 0 };

function getWeek(due: string) {
  const d = new Date(due);
  const days = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.floor((280 - days) / 7));
}

export default async function SupportPage() {
  const week = getWeek(DEMO.dueDate);

  const policies = await db.select().from(supportPolicies)
    .where(and(
      lte(supportPolicies.applicableWeekStart, week),
      gte(supportPolicies.applicableWeekEnd, week),
    ));

  const byCategory = policies.reduce((acc, p) => {
    const k = p.category || "기타";
    (acc[k] ??= []).push(p);
    return acc;
  }, {} as Record<string, typeof policies>);

  const totalEstimate = policies.reduce((sum, p) => {
    const m = p.benefitAmount?.match(/(\d{1,4}(,\d{3})*)\s*만\s*원|(\d{1,4})\s*만/);
    if (m) {
      const num = parseInt((m[1] || m[3] || "0").replace(/,/g, ""));
      return sum + num;
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen">
      <header className="px-5 pt-6 pb-5 bg-gradient-to-br from-emerald-50 to-teal-50">
        <h1 className="text-xl font-bold mb-1">받을 수 있는 지원금</h1>
        <p className="text-xs text-gray-600 mb-4">몽땅정보 만능키 (OA-22188) RAG 자동 매칭</p>

        <div className="card">
          <p className="text-xs text-gray-500">현재 임신 {week}주차 기준</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            약 {totalEstimate.toLocaleString()}만원
          </p>
          <p className="text-xs text-gray-600 mt-1">{policies.length}개 정책 자동 매칭</p>
        </div>
      </header>

      {Object.entries(byCategory).map(([cat, items]) => (
        <section key={cat} className="px-5 pt-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">📂 {cat} ({items.length})</h3>
          <div className="space-y-3">
            {items.map((p) => (
              <div key={p.id} className="card">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <span className="text-xs text-gray-500">{p.organization}</span>
                    <h4 className="font-bold">{p.title}</h4>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded shrink-0 ml-2">
                    {p.benefitAmount}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{p.description}</p>

                <div className="space-y-1 mb-3">
                  <div className="flex gap-2 text-xs">
                    <span className="text-gray-500 shrink-0">자격</span>
                    <span className="text-gray-700">{p.eligibility}</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-gray-500 shrink-0">신청</span>
                    <span className="text-gray-700">{p.applicationMethod}</span>
                  </div>
                </div>

                {p.applicationUrl && (
                  <a href={p.applicationUrl} target="_blank" rel="noopener"
                    className="block text-center bg-emerald-50 text-emerald-700 text-sm font-semibold py-2 rounded-lg">
                    바로 신청 →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="px-5 pt-5 pb-4">
        <p className="text-xs text-gray-500 text-center">
          ※ 실제 지급 여부는 거주 자치구·소득 기준에 따라 다를 수 있습니다
        </p>
      </section>
    </div>
  );
}
