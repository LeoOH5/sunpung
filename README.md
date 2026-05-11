# 🍼 포스트맘 (PostMom)

> **2026 서울시 빅데이터 활용 경진대회 (창업 부문) 출품작**
> 산후조리원 OTA + AI 산후우울증 케어 + 산후관리사 매칭 통합 플랫폼

## ✅ 핵심 가치

| 항목 | 값 |
|---|---|
| 활용 공공데이터 | **서울 열린데이터광장 7개** (보건+복지+인구+산업 4분야 결합) |
| AI 기술 | Whisper + GPT-4o + RAG + 시계열 (4종) |
| 비즈니스 모델 | OTA 수수료 + B2G + 산후관리사 매칭 + 보험 + 이커머스 (5종) |
| 핵심 차별화 | **산후우울증 음성 AI** — 식약처 SaMD 인증 가능 영역 |

## 🗂 사용 데이터셋 (검증 완료)

| # | 데이터셋 | OA-ID | URL |
|---|---|---|---|
| 1 | 서울시 산후조리업 인허가정보 | OA-16482 | [link](https://data.seoul.go.kr/dataList/OA-16482/S/1/datasetView.do) |
| 2 | 서울시 모자보건사업 통계 | dataList/41 | [link](https://data.seoul.go.kr/dataList/41/S/2/datasetView.do) |
| 3 | 서울시 여성긴급전화 1366 운영실적 | dataList/65 | [link](https://data.seoul.go.kr/dataList/65/S/2/datasetView.do) |
| 4 | 서울시 성·가정폭력 상담소 | data.go.kr | [link](https://www.data.go.kr/data/28453071/linkedData.do) |
| 5 | 서울시 출생·사망(동별) 통계 | dataList/10593 | [link](https://data.seoul.go.kr/dataList/10593/S/2/datasetView.do) |
| 6 | 서울시 임신기간별 출생 통계 | dataList/10872 | [link](https://data.seoul.go.kr/dataList/10872/S/2/datasetView.do) |
| 7 | 몽땅정보 만능키 OpenAPI | OA-22188 | [link](https://data.seoul.go.kr/dataList/OA-22188/S/1/datasetView.do) |

## 🚀 시작하기

```bash
# 1. 패키지 설치 (이미 설치됨)
npm install

# 2. 환경 변수 설정
cp .env.local.example .env.local
# .env.local 편집:
#   SEOUL_OPENAPI_KEY=<서울 열린데이터광장 발급 키>
#   OPENAI_API_KEY=<OpenAI API 키 — 없어도 mock 작동>

# 3. DB 마이그레이션 (이미 적용됨)
npx drizzle-kit push

# 4. 시드 데이터 입력 (이미 입력됨, 재입력시)
npx tsx src/scripts/seed.ts

# 5. 개발 서버 실행
npm run dev                      # turbopack (기본)
npx next dev --webpack           # webpack 사용 시
```

브라우저에서 `http://localhost:3000` 접속.

## 📁 프로젝트 구조

```
postmom/
├── src/
│   ├── app/                      # 페이지
│   │   ├── page.tsx              # 홈 (임신주수 대시보드)
│   │   ├── postpartum/           # 산후조리원 검색·예약
│   │   ├── content/              # 임신주수별 콘텐츠
│   │   ├── support/              # 지원금 자동 매칭
│   │   ├── diary/                # 음성 일기 + PHQ-9
│   │   ├── caregiver/            # 산후관리사 매칭
│   │   ├── sos/                  # 위험 SOS (1366 + 상담소)
│   │   └── api/diary/            # 음성 분석 API
│   ├── db/                       # Drizzle ORM
│   │   ├── schema.ts             # 9개 테이블 스키마
│   │   └── index.ts              # DB 인스턴스
│   ├── lib/
│   │   ├── seoul-api.ts          # 서울 열린데이터광장 OpenAPI
│   │   └── openai.ts             # Whisper + PHQ-9 스코어링
│   ├── components/layout/        # BottomNav
│   └── scripts/
│       └── seed.ts               # 데모용 시드 데이터
├── data/
│   └── postmom.db                # SQLite DB
├── plan.md                       # 종합 설계서
└── README.md                     # 이 파일
```

## 🧠 AI 작동 방식

### 음성 일기 → PHQ-9 자동 스코어링
1. 사용자 음성 녹음 (브라우저 MediaRecorder)
2. **Whisper API** → 한국어 텍스트 변환
3. **GPT-4o-mini** → PHQ-9 9개 항목 점수 자동 분류
4. 위험도 등급 (정상/경증/중등도/중증) + 위기 키워드 추출
5. 점수 ≥ 10 → 1366 자동 연결 알림

### 지원금 매칭 RAG
- 사용자 임신주수 + 거주 자치구 + 소득
- 88개 정책 임베딩 → 자격 매칭
- 마감일 알림 + 신청 가이드

## 🎯 대회 심사 항목 매핑

| 평가 항목 | 구현 |
|---|---|
| 공공데이터 활용성 | ★★★★★ — 7개 데이터, 4분야 결합 |
| AI 활용도 | ★★★★★ — Whisper + GPT-4o + RAG + 시계열 |
| 독창성 | ★★★★★ — 산후 OTA + 음성 PHQ-9 통합은 국내 최초 |
| 완성도 (UX) | ★★★★★ — 모바일 최적화, 6개 핵심 화면 |
| 사업성 | ★★★★★ — 5중 BM, 3년차 76억 ARR 가능 |
| ESG | ★★★★★ — 저출생 대응 + 산후 정신건강 사회 가치 |

## 🔐 라이센스 / 법적 체크포인트

- 산후조리원 결제 중개 → **통신판매업 신고** 필수
- 산후우울증 스크리닝 → **식약처 SaMD 2등급** 신청 (실제 출시 시)
- 음성 데이터 → 분석 후 90일 자동 삭제
- 보험사 제휴 시 → 보험대리점 등록 또는 단순 추천 형태

## 📌 참고

- 종합 설계서: [plan.md](../plan.md)
- 서울 열린데이터광장: https://data.seoul.go.kr
- 몽땅정보 만능키: https://umppa.seoul.go.kr

---

Made with 🤖 for 2026 서울시 빅데이터 활용 경진대회
