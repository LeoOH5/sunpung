import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ============================================================
// Dataset 1: 서울시 산후조리업 인허가정보 (OA-16482)
// ============================================================
export const postpartumCenters = sqliteTable("postpartum_centers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  externalId: text("external_id").unique(), // 인허가번호
  name: text("name").notNull(),
  district: text("district").notNull(), // 자치구
  roadAddress: text("road_address"),
  jibunAddress: text("jibun_address"),
  phone: text("phone"),
  capacityMother: integer("capacity_mother"), // 산모 정원
  capacityNewborn: integer("capacity_newborn"), // 신생아 정원
  businessStatus: text("business_status"), // 영업/폐업
  permitDate: text("permit_date"),
  closeDate: text("close_date"),
  lat: real("lat"),
  lng: real("lng"),
  // 자체 수집 데이터
  priceMin: integer("price_min"), // 최저가 (원)
  priceMax: integer("price_max"),
  amenities: text("amenities"), // JSON: 시설 정보
  rating: real("rating"),
  reviewCount: integer("review_count").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ============================================================
// Dataset 2: 서울시 모자보건사업 통계 (dataList/41)
// ============================================================
export const maternalHealthPrograms = sqliteTable("maternal_health_programs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  district: text("district").notNull(),
  programType: text("program_type").notNull(), // 검진/교육/지원
  programName: text("program_name").notNull(),
  description: text("description"),
  weekRangeStart: integer("week_range_start"), // 임신주수 시작
  weekRangeEnd: integer("week_range_end"),
  year: integer("year"),
  recipientCount: integer("recipient_count"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ============================================================
// Dataset 3: 서울시 여성긴급전화 1366 운영실적 (dataList/65)
// ============================================================
export const womenEmergencyStats = sqliteTable("women_emergency_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  yearMonth: text("year_month").notNull(), // YYYY-MM
  consultType: text("consult_type").notNull(), // 가정폭력/성폭력/스토킹/디지털성범죄/데이트폭력/성매매
  count: integer("count").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ============================================================
// Dataset 4: 서울시 성폭력/가정폭력 상담소 정보
// ============================================================
export const counselingCenters = sqliteTable("counseling_centers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  type: text("type").notNull(), // 성폭력/가정폭력/통합
  district: text("district"),
  address: text("address"),
  phone: text("phone").notNull(),
  is24h: integer("is_24h", { mode: "boolean" }).default(false),
  operatingHours: text("operating_hours"),
  lat: real("lat"),
  lng: real("lng"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ============================================================
// Dataset 5: 서울시 출생·사망(동별) 통계 (dataList/10593)
// ============================================================
export const birthStats = sqliteTable("birth_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  yearMonth: text("year_month").notNull(),
  district: text("district").notNull(),
  dong: text("dong").notNull(),
  birthCount: integer("birth_count").notNull(),
  deathCount: integer("death_count"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ============================================================
// Dataset 6: 임신기간별 출생 통계 (dataList/10872)
// ============================================================
export const pregnancyDurationStats = sqliteTable("pregnancy_duration_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  year: integer("year").notNull(),
  weekRange: text("week_range").notNull(), // <28주, 28-31주, 32-36주, 37주+
  count: integer("count").notNull(),
  riskLevel: text("risk_level"), // 매우위험/위험/관찰/정상
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ============================================================
// Dataset 7: 몽땅정보 만능키 정책 정보 (OA-22188)
// ============================================================
export const supportPolicies = sqliteTable("support_policies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  externalId: text("external_id").unique(),
  title: text("title").notNull(),
  organization: text("organization"), // 서울시 / 보건복지부 / 자치구
  category: text("category"), // 임신/출산/육아/주거/돌봄
  description: text("description"),
  eligibility: text("eligibility"), // 자격 요건 (raw text)
  benefitAmount: text("benefit_amount"), // 지원 금액 (raw text)
  applicationMethod: text("application_method"),
  applicationUrl: text("application_url"),
  district: text("district"), // 특정 자치구만 해당하는 경우
  applicableWeekStart: integer("applicable_week_start"), // 임신주수 자격
  applicableWeekEnd: integer("applicable_week_end"),
  embedding: text("embedding"), // JSON array (RAG용)
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ============================================================
// 사용자 (데모용 단순 모델)
// ============================================================
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique(),
  nickname: text("nickname"),
  district: text("district"), // 거주 자치구
  dueDate: text("due_date"), // 출산예정일
  isPostpartum: integer("is_postpartum", { mode: "boolean" }).default(false),
  birthDate: text("birth_date"), // 실제 출산일
  childCount: integer("child_count").default(0),
  income: integer("income"), // 가구 월소득 (정책 매칭용)
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ============================================================
// 음성 일기 + PHQ-9 스코어
// ============================================================
export const voiceDiaries = sqliteTable("voice_diaries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  recordedAt: text("recorded_at").default(sql`CURRENT_TIMESTAMP`),
  audioUrl: text("audio_url"),
  transcript: text("transcript"),
  // PHQ-9 9개 항목 점수 (0-3)
  phq1: integer("phq1"), // 흥미·즐거움 저하
  phq2: integer("phq2"), // 우울감
  phq3: integer("phq3"), // 수면 문제
  phq4: integer("phq4"), // 피로감
  phq5: integer("phq5"), // 식욕 변화
  phq6: integer("phq6"), // 자존감 저하
  phq7: integer("phq7"), // 집중력 저하
  phq8: integer("phq8"), // 행동 변화
  phq9: integer("phq9"), // 자해 사고 (위험!)
  totalScore: integer("total_score"),
  riskLevel: text("risk_level"), // 정상/경증/중등도/중증
  emotion: text("emotion"), // joy/sadness/anger/fear/neutral
  triggers: text("triggers"), // JSON: 키워드 배열 (가정폭력 등)
});
