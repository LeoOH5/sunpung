const CAREGIVERS = [
  { id: 1, name: "김미경", years: 12, rating: 4.9, reviewCount: 187, district: "강남구", priceHour: 28000,
    specialty: ["신생아 케어", "모유수유 코칭", "산모 영양식"], certifications: ["산후관리사 자격증", "유아간호 1급"] },
  { id: 2, name: "박순자", years: 18, rating: 4.95, reviewCount: 312, district: "서초구", priceHour: 32000,
    specialty: ["다태아 경험 多", "수유 트러블 해결"], certifications: ["산후관리사 자격증", "조리사 자격증"] },
  { id: 3, name: "이영희", years: 8, rating: 4.7, reviewCount: 92, district: "마포구", priceHour: 25000,
    specialty: ["초산모 친화", "야간 케어 가능"], certifications: ["산후관리사 자격증"] },
  { id: 4, name: "최금자", years: 15, rating: 4.85, reviewCount: 245, district: "송파구", priceHour: 30000,
    specialty: ["황달·트림 전문", "산후 다이어트 식단"], certifications: ["산후관리사 자격증", "영양사"] },
  { id: 5, name: "윤정숙", years: 10, rating: 4.6, reviewCount: 78, district: "용산구", priceHour: 26000,
    specialty: ["일본식 산후관리", "좌욕·찜질"], certifications: ["산후관리사 자격증"] },
  { id: 6, name: "장미숙", years: 20, rating: 4.95, reviewCount: 401, district: "영등포구", priceHour: 33000,
    specialty: ["조산아 케어", "신생아 의학 지식"], certifications: ["간호조무사", "산후관리사 자격증"] },
];

const DEMO = { district: "마포구", postpartum: false };

export default function CaregiverPage() {
  // 가까운 자치구 우선 정렬 (간단한 데모)
  const sorted = [...CAREGIVERS].sort((a, b) => {
    if (a.district === DEMO.district && b.district !== DEMO.district) return -1;
    if (b.district === DEMO.district && a.district !== DEMO.district) return 1;
    return b.rating - a.rating;
  });

  return (
    <div className="min-h-screen">
      <header className="px-5 pt-6 pb-4 bg-gradient-to-br from-blue-50 to-cyan-50">
        <h1 className="text-xl font-bold mb-1">산후관리사 매칭</h1>
        <p className="text-xs text-gray-600">평균 80시간 출근 · 보건복지부 산모·신생아 건강관리 서비스 연계</p>
      </header>

      <section className="px-5 pt-5">
        <div className="card bg-blue-50">
          <p className="text-xs text-blue-700 font-bold mb-2">💡 정부 지원 가능</p>
          <p className="text-sm text-blue-900">
            기준중위소득 150% 이하면 <b>산모·신생아 건강관리 서비스 바우처</b>로 80~90% 지원받을 수 있어요.
          </p>
          <a href="/support" className="inline-block mt-2 text-xs text-blue-700 underline">지원금 매칭 확인 →</a>
        </div>
      </section>

      <section className="px-5 pt-5 pb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">{sorted.length}명의 검증된 관리사</h3>
        <div className="space-y-3">
          {sorted.map((c) => (
            <div key={c.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                    👩‍⚕️
                  </div>
                  <div>
                    <h4 className="font-bold">{c.name} 관리사</h4>
                    <p className="text-xs text-gray-500">{c.district} · {c.years}년 경력</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">⭐ {c.rating}</p>
                  <p className="text-xs text-gray-500">{c.reviewCount}건</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {c.specialty.map((s) => (
                  <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{s}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {c.certifications.map((cert) => (
                  <span key={cert} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded">✓ {cert}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">시간당</p>
                  <p className="font-bold">{c.priceHour.toLocaleString()}원</p>
                </div>
                <button className="btn-primary text-sm py-2 px-4">매칭 신청</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
