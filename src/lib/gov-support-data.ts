/**
 * 정부·서울시 임신·출산·육아 지원 정책 실제 신청 URL
 * 여성폭력·가정폭력 상담소 실제 전화번호
 *
 * 수집 기준: 2026년 5월
 */

// ============================================================
// 1. 정부·서울시 지원정책 신청 URL
// ============================================================

export type GovPolicy = {
  id: string;
  name: string;
  description: string;
  applyUrl: string;            // 실제 신청 URL
  infoUrl?: string;            // 상세 안내 URL (별도 존재 시)
  operator: string;            // 운영 포털
  note?: string;
};

export const GOV_POLICIES: GovPolicy[] = [
  {
    id: "pregnant_transport",
    name: "임산부 교통비 지원 (서울시)",
    description: "서울 거주 임산부 1인당 70만 원 교통비 바우처 지급",
    applyUrl: "https://umppa.seoul.go.kr/hmpg/sprt/bzin/bzmgComtDetail.do?biz_mng_no=34B5EA8BEB354E2DB26136CFE52AEFF2",
    infoUrl: "https://seoul-agi.seoul.go.kr/pregnant-transportation-support",
    operator: "탄생육아 몽땅정보통 (umppa.seoul.go.kr)",
    note: "2026년부터 서울맘케어 종료 → 몽땅정보통으로 통합. 임신 12주차 ~ 출산 후 6개월 이내 신청",
  },
  {
    id: "first_meeting_voucher",
    name: "첫만남이용권",
    description: "출생아 1인당 200만 원(첫째) / 300만 원(둘째 이상) 국민행복카드 바우처",
    applyUrl: "https://www.gov.kr/portal/service/serviceInfo/135200005015",
    infoUrl: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004656",
    operator: "정부24 (www.gov.kr) 또는 복지로 (www.bokjiro.go.kr)",
    note: "출생일로부터 2년 이내 신청 가능. 읍·면·동 행정복지센터 방문 신청도 가능",
  },
  {
    id: "parent_allowance",
    name: "부모급여",
    description: "만 0~23개월 아동 양육 가정에 현금 지급 (소득·재산 기준 없음)",
    applyUrl: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004657",
    infoUrl: "https://www.gov.kr/portal/service/serviceInfo/135200000143",
    operator: "복지로 (www.bokjiro.go.kr) 또는 정부24 (www.gov.kr)",
    note: "출생 후 60일 이내 신청 시 출생 월부터 소급 적용",
  },
  {
    id: "postpartum_care_expense",
    name: "서울형 산후조리경비 지원",
    description: "서울 거주 출산 가정에 산후조리 바우처 지원 (2026년 다자녀 최대 150만 원)",
    applyUrl: "https://umppa.seoul.go.kr/",
    infoUrl: "https://seoul-agi.seoul.go.kr/postpartum-care",
    operator: "탄생육아 몽땅정보통 (umppa.seoul.go.kr)",
    note: "2026년 1월부터 서울맘케어(seoulmomcare.com) 운영 종료 → 몽땅정보통으로 완전 이관",
  },
  {
    id: "postpartum_health_service",
    name: "산모·신생아 건강관리 서비스",
    description: "산모·신생아 건강관리사 가정 파견 서비스 바우처",
    applyUrl: "https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertPwnbPage.do",
    infoUrl: "https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13520000043",
    operator: "복지로 (www.bokjiro.go.kr) 또는 정부24 (www.gov.kr)",
    note: "출산예정일 40일 전 ~ 출산 후 60일 이내 신청. 주소지 관할 보건소 방문 신청도 가능",
  },
  {
    id: "high_risk_pregnancy",
    name: "고위험 임산부 의료비 지원",
    description: "조기진통·전치태반 등 19개 고위험 질환 임산부 입원 의료비 지원",
    applyUrl: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001088&wlfareInfoReldBztpCd=0",
    infoUrl: "https://www.gov.kr/portal/service/serviceInfo/135200000114",
    operator: "복지로 (www.bokjiro.go.kr) 또는 e보건소 공공보건포털 (www.e-health.go.kr)",
    note: "분만일로부터 6개월 이내 주소지 관할 보건소 방문 또는 e보건소 온라인 신청",
  },
  {
    id: "parental_leave_benefit",
    name: "육아휴직 급여",
    description: "육아휴직 중인 근로자에게 통상임금 일정 비율 지급 (고용보험)",
    applyUrl: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0302Info.do",
    infoUrl: "https://www.ei.go.kr/",
    operator: "고용보험 (www.ei.go.kr)",
    note: "육아휴직 시작일 1개월 후 ~ 종료 후 12개월 이내 신청. 피보험 단위기간 180일 이상 조건",
  },
  {
    id: "daycare_admission",
    name: "어린이집 입소 신청",
    description: "어린이집 입소 대기 온라인 신청 (만 0~5세)",
    applyUrl: "https://www.childcare.go.kr/?menuno=168",
    infoUrl: "https://www.childcare.go.kr/",
    operator: "임신육아종합포털 아이사랑 (www.childcare.go.kr)",
    note: "재원 중 최대 2곳, 미재원 시 최대 3곳까지 대기 신청 가능. 헬프데스크: 1566-3232",
  },
];

// ============================================================
// 2. 여성폭력·가정폭력 상담소 전화번호
// ============================================================

export type CrisisCenter = {
  id: string;
  name: string;
  phone: string;            // 주 상담 전화
  phone2?: string;          // 부가 전화
  address?: string;
  hours?: string;
  website?: string;
  note?: string;
};

/** 전국 / 광역 기관 */
export const CRISIS_CENTERS_NATIONAL: CrisisCenter[] = [
  {
    id: "women_1366_seoul",
    name: "여성긴급전화 1366 서울센터",
    phone: "1366",            // 국번 없이
    phone2: "02-851-4870",    // 행정 전화
    address: "서울 동작구 여의대방로54길 18 서울여성플라자 4층",
    hours: "상담 365일 24시간 운영 (행정 평일 09:00~18:00)",
    website: "https://seoul1366.or.kr",
    note: "가정폭력·성폭력·스토킹·교제폭력·성매매 피해자 긴급 상담 및 보호시설 연계",
  },
  {
    id: "ksvrc",
    name: "한국성폭력상담소",
    phone: "02-338-5801",      // 상담 전화
    phone2: "02-338-2890",    // 사무 전화
    address: "서울 마포구 성지1길 32-42 (합정동) 2층",
    hours: "평일 10:00~17:00 (점심 13:00~14:00)",
    website: "https://www.sisters.or.kr",
  },
  {
    id: "hotline",
    name: "한국여성의전화 (여성인권상담소)",
    phone: "02-2263-6464",     // 상담 전화
    phone2: "02-3156-5400",   // 대표 전화
    address: "서울 은평구 진흥로16길 8-4",
    hours: "평일 10:00~13:00, 14:00~17:00",
    website: "https://hotline.or.kr",
  },
  {
    id: "lawhome",
    name: "한국가정법률상담소",
    phone: "1644-7077",
    address: "서울 영등포구 국회대로76가길 14",
    website: "https://www.lawhome.or.kr",
    note: "가정법률 상담, 화상·사이버 상담 가능",
  },
];

/** 서울시 구별 가정폭력 상담소 (서울시 운영 위탁, 2026년 기준) */
export const CRISIS_CENTERS_SEOUL: CrisisCenter[] = [
  {
    id: "yangshil",
    name: "양실가정상담센터",
    phone: "02-2238-6551",
    address: "중구 청구로19길 9-15",
  },
  {
    id: "seongdong",
    name: "서울성동가정상담센터",
    phone: "02-2297-2911",
    address: "성동구 무학로2길 7, 3층",
  },
  {
    id: "wolgyewuri",
    name: "월계우리가족상담소",
    phone: "02-904-0179",
    address: "노원구 초안산로1길 15",
  },
  {
    id: "eunpyeong",
    name: "은평가정폭력상담소",
    phone: "02-326-1366",
    address: "은평구 은평터널로 48",
  },
  {
    id: "seodaemun",
    name: "서대문가정폭력상담소",
    phone: "02-364-0413",
    address: "서대문구 신촌로 215-2, 3층",
  },
  {
    id: "nowme",
    name: "나우미가정폭력상담센터",
    phone: "02-2062-1366",
    address: "양천구 목동서로 225",
  },
  {
    id: "gangseo_yangcheon",
    name: "강서양천가정폭력상담소 (서울강서양천여성의전화 부설)",
    phone: "02-2605-8455",
    address: "강서구 강서로 159",
  },
  {
    id: "dongsann",
    name: "동산가정폭력상담소",
    phone: "02-599-7646",
    address: "서초구 서초대로27길 10-10",
  },
  {
    id: "caritas",
    name: "까리따스가정폭력상담소",
    phone: "02-2202-7806",
    address: "송파구 석촌호수로 220",
  },
  {
    id: "man_hotline",
    name: "서울남성의전화 (가정폭력상담)",
    phone: "02-2653-1366",
    phone2: "02-2652-0456",   // 남성 전화상담
    address: "중랑구 면목로85길 12-24, 2층 (상봉동)",
    website: "https://www.manhotline.or.kr",
    note: "남성 피해자·가해자 상담 특화",
  },
  {
    id: "women_in권",
    name: "여성인권상담소 (한국여성의전화 부설)",
    phone: "02-2263-6464",
    address: "은평구 진흥로16길 8-4",
  },
];
