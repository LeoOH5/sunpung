export const dynamic = "force-dynamic";
import Link from "next/link";
import { db } from "@/db";
import { postpartumCenters, supportPolicies, babyJournals } from "@/db/schema";
import { desc, sql } from "drizzle-orm";

const DEMO_USER = {
  nickname: "지영맘",
  district: "마포구",
  dueDate: "2026-08-15",
  isPostpartum: false,
};

function getPregnancyWeek(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  const totalGestation = 280;
  const remainingDays = Math.max(0, Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  return Math.max(1, Math.floor((totalGestation - remainingDays) / 7));
}

export default async function Home() {
  const week = getPregnancyWeek(DEMO_USER.dueDate);
  const [centerCount] = await db.select({ c: sql<number>`count(*)` }).from(postpartumCenters);
  const [policyCount] = await db.select({ c: sql<number>`count(*)` }).from(supportPolicies);
  const [recentJournal] = await db.select({ id: babyJournals.id, title: babyJournals.title }).from(babyJournals).orderBy(desc(babyJournals.createdAt)).limit(1);
  const [journalCount] = await db.select({ c: sql<number>`count(*)` }).from(babyJournals);

  const trimester = week <= 13 ? "초기" : week <= 27 ? "중기" : week <= 40 ? "후기" : "산후";
  const dDay = Math.max(0, Math.ceil((new Date(DEMO_USER.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="min-h-screen">
      <header className="px-5 pt-6 pb-4 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">안녕하세요</p>
            <h1 className="text-xl font-bold">{DEMO_USER.nickname}님 👋</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-lg">
            🤰
          </div>
        </div>

        <div className="card flex items-center justify-between">
          <div>
            <span className="chip mb-2">임신 {trimester}</span>
            <h2 className="text-2xl font-bold mt-1">{week}주차</h2>
            <p className="text-xs text-gray-500 mt-1">
              출산예정일 {DEMO_USER.dueDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">D-{dDay}</p>
            <div className="w-20 h-20 relative mt-1">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="32" stroke="#ffd6e7" strokeWidth="6" fill="none" />
                <circle cx="40" cy="40" r="32" stroke="#ff6b9d" strokeWidth="6" fill="none"
                  strokeDasharray={`${(week / 40) * 201} 201`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {Math.round((week / 40) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 pt-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">오늘 할 일</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/diary" className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="text-2xl">📒</div>
              {(journalCount.c as number) > 0 && (
                <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                  {journalCount.c}건
                </span>
              )}
            </div>
            <p className="font-semibold">아기수첩</p>
            <p className="text-xs text-gray-500 mt-1">
              {recentJournal ? recentJournal.title : "소중한 순간을 기록해요"}
            </p>
          </Link>

          <Link href="/postpartum" className="card hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🏠</div>
            <p className="font-semibold">산후조리원</p>
            <p className="text-xs text-gray-500 mt-1">
              서울 {centerCount.c}곳 비교·예약
            </p>
          </Link>

          <Link href="/support" className="card hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">💰</div>
            <p className="font-semibold">받을 수 있는 지원금</p>
            <p className="text-xs text-gray-500 mt-1">
              {policyCount.c}개 정책 자동 매칭
            </p>
          </Link>

          <Link href="/content" className="card hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📚</div>
            <p className="font-semibold">{week}주차 정보</p>
            <p className="text-xs text-gray-500 mt-1">맞춤 검진·교육 안내</p>
          </Link>
        </div>
      </section>

      <section className="px-5 pt-5">
        <Link href="/sos" className="card bg-red-50 border-2 border-red-100 flex items-center justify-between">
          <div>
            <p className="font-bold text-red-700">긴급 도움이 필요하신가요?</p>
            <p className="text-xs text-red-600 mt-1">1366 + 가까운 상담소 24/7</p>
          </div>
          <div className="text-3xl">🆘</div>
        </Link>
      </section>

      <section className="px-5 pt-5 pb-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">우리가 활용하는 공공데이터</h3>
        <div className="card">
          <div className="flex flex-wrap gap-2">
            {[
              "산후조리업 인허가 (OA-16482)",
              "모자보건사업 통계",
              "1366 운영실적",
              "성·가정폭력 상담소",
              "동별 출생 통계",
              "임신주수별 출생",
              "몽땅정보 (OA-22188)",
            ].map((d) => (
              <span key={d} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                {d}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            서울 열린데이터광장 7개 데이터셋 + AI(Whisper, GPT-4o, RAG)
          </p>
        </div>
      </section>
    </div>
  );
}
