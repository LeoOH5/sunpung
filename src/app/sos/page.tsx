export const dynamic = "force-dynamic";
import { db } from "@/db";
import { counselingCenters, womenEmergencyStats } from "@/db/schema";
import { sql, desc } from "drizzle-orm";

const DEMO_USER = { district: "마포구", lat: 37.5563, lng: 126.9234 };

function distance(la1: number, lo1: number, la2: number, lo2: number) {
  const R = 6371;
  const dLat = (la2 - la1) * Math.PI / 180;
  const dLon = (lo2 - lo1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(la1 * Math.PI / 180) * Math.cos(la2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default async function SOSPage() {
  const allCenters = await db.select().from(counselingCenters);
  const sorted = allCenters
    .map((c) => ({
      ...c,
      distanceKm: c.lat && c.lng ? distance(DEMO_USER.lat, DEMO_USER.lng, c.lat, c.lng) : 999,
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  const stats = await db.select({
    type: womenEmergencyStats.consultType,
    total: sql<number>`sum(${womenEmergencyStats.count})`,
  }).from(womenEmergencyStats)
    .groupBy(womenEmergencyStats.consultType)
    .orderBy(desc(sql`sum(${womenEmergencyStats.count})`));

  return (
    <div className="min-h-screen">
      <header className="px-5 pt-6 pb-5 bg-gradient-to-br from-red-50 to-rose-50">
        <h1 className="text-xl font-bold mb-1 text-red-700">긴급 SOS</h1>
        <p className="text-xs text-gray-600">서울시 1366 운영실적 + 성·가정폭력 상담소 데이터 기반</p>
      </header>

      <section className="px-5 pt-5">
        <div className="card bg-red-600 text-white">
          <p className="text-xs opacity-80 mb-1">24시간 365일 즉시 상담</p>
          <h2 className="text-3xl font-extrabold">1366</h2>
          <p className="text-sm opacity-90 mt-1">여성긴급전화 서울센터</p>
          <a href="tel:1366" className="block mt-4 bg-white text-red-600 text-center font-bold py-3 rounded-lg">
            📞 1366 지금 전화
          </a>
        </div>
      </section>

      <section className="px-5 pt-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          📍 가까운 상담소 (현재 {DEMO_USER.district} 기준)
        </h3>
        <div className="space-y-3">
          {sorted.slice(0, 5).map((c) => (
            <div key={c.id} className="card">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold">{c.name}</h4>
                    {c.is24h && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold">24시간</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{c.address}</p>
                  <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                    {c.type}
                  </span>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>{c.distanceKm.toFixed(1)}km</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <a href={`tel:${c.phone}`} className="flex-1 bg-red-50 text-red-700 text-center text-sm py-2 rounded font-semibold">
                  📞 {c.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pt-5 pb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          🔍 서울시 1366 상담 유형 (최근 12개월)
        </h3>
        <div className="card">
          {stats.map((s) => {
            const max = stats[0].total;
            const pct = (Number(s.total) / Number(max)) * 100;
            return (
              <div key={s.type} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{s.type}</span>
                  <span className="text-gray-500">{Number(s.total).toLocaleString()}건</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-red-400 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
          <p className="text-xs text-gray-500 mt-3">※ 서울시 여성긴급전화 1366 운영실적 (dataList/65)</p>
        </div>
      </section>

      <section className="px-5 pb-4">
        <p className="text-xs text-gray-500 text-center">
          긴급 상황 시 112 (경찰) 또는 119 (응급)로도 즉시 신고하세요
        </p>
      </section>
    </div>
  );
}
