import { pgTable, text, integer, real, boolean, serial, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ============================================================
// Dataset 1: 서울시 산후조리업 인허가정보 (OA-16482)
// ============================================================
export const postpartumCenters = pgTable("postpartum_centers", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").unique(),
  name: text("name").notNull(),
  district: text("district").notNull(),
  roadAddress: text("road_address"),
  jibunAddress: text("jibun_address"),
  phone: text("phone"),
  capacityMother: integer("capacity_mother"),
  capacityNewborn: integer("capacity_newborn"),
  businessStatus: text("business_status"),
  permitDate: text("permit_date"),
  closeDate: text("close_date"),
  lat: doublePrecision("lat"),
  lng: doublePrecision("lng"),
  priceMin: integer("price_min"),
  priceMax: integer("price_max"),
  amenities: text("amenities"),
  rating: real("rating"),
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================
// Dataset 2: 서울시 모자보건사업 통계 (dataList/41)
// ============================================================
export const maternalHealthPrograms = pgTable("maternal_health_programs", {
  id: serial("id").primaryKey(),
  district: text("district").notNull(),
  programType: text("program_type").notNull(),
  programName: text("program_name").notNull(),
  description: text("description"),
  weekRangeStart: integer("week_range_start"),
  weekRangeEnd: integer("week_range_end"),
  year: integer("year"),
  recipientCount: integer("recipient_count"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// Dataset 3: 서울시 여성긴급전화 1366 운영실적 (dataList/65)
// ============================================================
export const womenEmergencyStats = pgTable("women_emergency_stats", {
  id: serial("id").primaryKey(),
  yearMonth: text("year_month").notNull(),
  consultType: text("consult_type").notNull(),
  count: integer("count").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// Dataset 4: 서울시 성폭력/가정폭력 상담소 정보
// ============================================================
export const counselingCenters = pgTable("counseling_centers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  district: text("district"),
  address: text("address"),
  phone: text("phone").notNull(),
  is24h: boolean("is_24h").default(false),
  operatingHours: text("operating_hours"),
  lat: doublePrecision("lat"),
  lng: doublePrecision("lng"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// Dataset 5: 서울시 출생·사망(동별) 통계 (dataList/10593)
// ============================================================
export const birthStats = pgTable("birth_stats", {
  id: serial("id").primaryKey(),
  yearMonth: text("year_month").notNull(),
  district: text("district").notNull(),
  dong: text("dong").notNull(),
  birthCount: integer("birth_count").notNull(),
  deathCount: integer("death_count"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// Dataset 6: 임신기간별 출생 통계 (dataList/10872)
// ============================================================
export const pregnancyDurationStats = pgTable("pregnancy_duration_stats", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  weekRange: text("week_range").notNull(),
  count: integer("count").notNull(),
  riskLevel: text("risk_level"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// Dataset 7: 몽땅정보 만능키 정책 정보 (OA-22188)
// ============================================================
export const supportPolicies = pgTable("support_policies", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").unique(),
  title: text("title").notNull(),
  organization: text("organization"),
  category: text("category"),
  description: text("description"),
  eligibility: text("eligibility"),
  benefitAmount: text("benefit_amount"),
  applicationMethod: text("application_method"),
  applicationUrl: text("application_url"),
  district: text("district"),
  applicableWeekStart: integer("applicable_week_start"),
  applicableWeekEnd: integer("applicable_week_end"),
  embedding: text("embedding"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================
// 사용자 (데모용 단순 모델)
// ============================================================
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  nickname: text("nickname"),
  district: text("district"),
  dueDate: text("due_date"),
  isPostpartum: boolean("is_postpartum").default(false),
  birthDate: text("birth_date"),
  childCount: integer("child_count").default(0),
  income: integer("income"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// 아기수첩 (기록식 육아일지)
// ============================================================
export const babyJournals = pgTable("baby_journals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  imageData: text("image_data"), // base64 compressed image
  riskLevel: text("risk_level").default("정상"), // 정상 | 우울의심 | 학대의심
  alertType: text("alert_type"), // "1336" | "112" | null
  triggers: text("triggers"), // JSON array of detected keywords
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// 음성 일기 + PHQ-9 스코어
// ============================================================
export const voiceDiaries = pgTable("voice_diaries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  recordedAt: timestamp("recorded_at").defaultNow(),
  audioUrl: text("audio_url"),
  transcript: text("transcript"),
  phq1: integer("phq1"),
  phq2: integer("phq2"),
  phq3: integer("phq3"),
  phq4: integer("phq4"),
  phq5: integer("phq5"),
  phq6: integer("phq6"),
  phq7: integer("phq7"),
  phq8: integer("phq8"),
  phq9: integer("phq9"),
  totalScore: integer("total_score"),
  riskLevel: text("risk_level"),
  emotion: text("emotion"),
  triggers: text("triggers"),
});
