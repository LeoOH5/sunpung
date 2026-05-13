export const dynamic = "force-dynamic";
import { Star } from "lucide-react";
import { db } from "@/db";
import { postpartumCenters } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

const SEOUL_DISTRICTS = [
  "전체", "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
  "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
  "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구",
];

type SearchParams = Promise<{ district?: string; sort?: string; budget?: string }>;

export default async function PostpartumPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const district = params.district || "전체";
  const sort = params.sort || "rating";
  const budget = params.budget || "all";

  const conditions = [eq(postpartumCenters.businessStatus, "영업")];
  if (district !== "전체") conditions.push(eq(postpartumCenters.district, district));
  if (budget === "low") conditions.push(sql`${postpartumCenters.priceMin} < 4000000`);
  if (budget === "mid") conditions.push(sql`${postpartumCenters.priceMin} BETWEEN 4000000 AND 6000000`);
  if (budget === "high") conditions.push(sql`${postpartumCenters.priceMin} >= 6000000`);

  const orderBy = sort === "rating" ? sql`${postpartumCenters.rating} DESC NULLS LAST`
    : sort === "price" ? sql`${postpartumCenters.priceMin} ASC`
    : sql`${postpartumCenters.reviewCount} DESC`;

  const centers = await db.select().from(postpartumCenters)
    .where(and(...conditions))
    .orderBy(orderBy);

  return (
    <div className="min-h-screen">
      <header className="px-5 pt-6 pb-5 bg-gradient-to-br from-pink-50 to-rose-50">
        <h1 className="text-xl font-bold mb-1">산후조리원</h1>
        <p className="text-xs text-gray-500">서울 {centers.length}개 · 구별·예산·평점순 검색</p>
      </header>

      <section className="px-5 pt-4 space-y-3">
        <div>
          <p className="text-xs text-gray-500 mb-2">자치구</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {SEOUL_DISTRICTS.map((d) => (
              <a key={d} href={`/postpartum?district=${d}&sort=${sort}&budget=${budget}`}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium ${district === d ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-700"}`}>
                {d}
              </a>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-2">예산</p>
            <div className="flex gap-1">
              {[
                { v: "all", l: "전체" },
                { v: "low", l: "~400만" },
                { v: "mid", l: "400~600만" },
                { v: "high", l: "600만+" },
              ].map((b) => (
                <a key={b.v} href={`/postpartum?district=${district}&sort=${sort}&budget=${b.v}`}
                  className={`px-2 py-1 rounded text-xs ${budget === b.v ? "bg-pink-100 text-pink-700 font-semibold" : "bg-gray-50 text-gray-600"}`}>
                  {b.l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">정렬</p>
            <div className="flex gap-1">
              {[
                { v: "rating", l: "평점" },
                { v: "price", l: "가격" },
                { v: "reviews", l: "후기" },
              ].map((s) => (
                <a key={s.v} href={`/postpartum?district=${district}&sort=${s.v}&budget=${budget}`}
                  className={`px-2 py-1 rounded text-xs ${sort === s.v ? "bg-pink-100 text-pink-700 font-semibold" : "bg-gray-50 text-gray-600"}`}>
                  {s.l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pt-4 pb-4 space-y-3">
        <p className="text-sm text-gray-700 font-semibold">{centers.length}개 결과</p>
        {centers.map((c) => {
          const amenities = c.amenities ? JSON.parse(c.amenities) as string[] : [];
          return (
            <div key={c.id} className="card">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bold">{c.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{c.district} · {c.roadAddress}</p>
                </div>
                {c.rating && (
                  <div className="text-right">
                    <p className="text-sm font-bold flex items-center gap-1"><Star size={13} fill="#FBBF24" color="#FBBF24" /> {c.rating.toFixed(1)}</p>
                    <p className="text-xs text-gray-500">후기 {c.reviewCount}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {amenities.slice(0, 4).map((a) => (
                  <span key={a} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded">{a}</span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">2주 기준</p>
                  <p className="font-bold text-pink-600">
                    {(c.priceMin! / 10000).toLocaleString()}만 ~ {(c.priceMax! / 10000).toLocaleString()}만원
                  </p>
                </div>
                <a
                  href={c.mapUrl ?? `tel:${c.phone}`}
                  target={c.mapUrl ? "_blank" : undefined}
                  rel={c.mapUrl ? "noopener noreferrer" : undefined}
                  className="btn-primary text-sm py-2 px-4"
                >
                  자세히 보기
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
