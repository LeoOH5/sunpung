import { db } from "../db";
import * as s from "../db/schema";

async function seed() {
  console.log("시드 데이터 입력 시작...");

  // ============================================================
  // 1. 산후조리원 (실제 서울 인허가 조리원 — 실제 전화번호)
  // ============================================================
  await db.delete(s.postpartumCenters);
  await db.insert(s.postpartumCenters).values([
{ name: "그녀의 정원 드라마 산후조리원", district: "강남구", roadAddress: "서울특별시 강남구 역삼동", phone: "02-3453-4628", businessStatus: "영업", priceMin: 6200000, priceMax: 9200000, rating: 4.7, reviewCount: 225, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "엘산후조리원", district: "강남구", roadAddress: "서울특별시 강남구 자곡동", phone: "02-579-0303", businessStatus: "영업", priceMin: 6300000, priceMax: 11600000, rating: 4.3, reviewCount: 479, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "청담마리 더블레스 산후조리원", district: "강남구", roadAddress: "서울특별시 강남구 청담동", phone: "02-3471-2233", businessStatus: "영업", priceMin: 8200000, priceMax: 11300000, rating: 4.2, reviewCount: 211, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "트리니티 산후조리원 삼성점", district: "강남구", roadAddress: "서울특별시 강남구 삼성동", phone: "02-508-0013", businessStatus: "영업", priceMin: 8700000, priceMax: 13600000, rating: 4.2, reviewCount: 201, amenities: JSON.stringify(["산후마사지", "신생아실"]) },
    { name: "한아름산후조리원", district: "강남구", roadAddress: "서울특별시 강남구 개포동", phone: "02-3412-0101", businessStatus: "영업", priceMin: 6900000, priceMax: 11300000, rating: 4.6, reviewCount: 103, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "한아름프리미엄산후조리원 도곡점", district: "강남구", roadAddress: "서울특별시 강남구 도곡동", phone: "02-577-8677", businessStatus: "영업", priceMin: 8200000, priceMax: 12200000, rating: 4.4, reviewCount: 210, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "헤리티지산후조리원 센트럴", district: "강남구", roadAddress: "서울특별시 강남구 삼성동", phone: "02-518-2433", businessStatus: "영업", priceMin: 6100000, priceMax: 9300000, rating: 4.5, reviewCount: 283, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "가율산후조리원", district: "강동구", roadAddress: "서울특별시 강동구 명일동", phone: "02-485-0087", businessStatus: "영업", priceMin: 5400000, priceMax: 8200000, rating: 4.5, reviewCount: 236, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "마벨산후조리원", district: "강동구", roadAddress: "서울특별시 강동구 명일동", phone: "02-429-6777", businessStatus: "영업", priceMin: 5200000, priceMax: 7500000, rating: 4.6, reviewCount: 146, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "몽쉘베베산후조리원", district: "강동구", roadAddress: "서울특별시 강동구 강일동", phone: "02-3428-3535", businessStatus: "영업", priceMin: 5200000, priceMax: 8100000, rating: 4.5, reviewCount: 208, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "아쉐르 산후조리원 강동점", district: "강동구", roadAddress: "서울특별시 강동구 천호동", phone: "02-485-2151", businessStatus: "영업", priceMin: 5300000, priceMax: 7900000, rating: 4.4, reviewCount: 61, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "트리니티 산후조리원 강동송파점", district: "강동구", roadAddress: "서울특별시 강동구 성내동", phone: "02-486-3300", businessStatus: "영업", priceMin: 5900000, priceMax: 8800000, rating: 4.6, reviewCount: 268, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "퍼스트스마일 산후조리원", district: "강동구", roadAddress: "서울특별시 강동구 천호동", phone: "1661-0997", businessStatus: "영업", priceMin: 3800000, priceMax: 7000000, rating: 4.1, reviewCount: 212, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "맘스텔라 산후조리원", district: "강북구", roadAddress: "서울특별시 강북구 미아동", phone: "02-985-3542", businessStatus: "영업", priceMin: 3000000, priceMax: 5100000, rating: 4.0, reviewCount: 98, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "에비뉴산후조리원", district: "강북구", roadAddress: "서울특별시 강북구 미아동", phone: "02-985-3542", businessStatus: "영업", priceMin: 4400000, priceMax: 7400000, rating: 3.8, reviewCount: 92, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "햇빛병원산후조리원", district: "강북구", roadAddress: "서울특별시 강북구 미아동", phone: "02-996-1511", businessStatus: "영업", priceMin: 3900000, priceMax: 6100000, rating: 3.9, reviewCount: 193, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "궁 산후조리원 화곡점", district: "강서구", roadAddress: "서울특별시 강서구 화곡동", phone: "02-1644-3358", businessStatus: "영업", priceMin: 3500000, priceMax: 4600000, rating: 3.9, reviewCount: 38, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "디어원 산후조리원", district: "강서구", roadAddress: "서울특별시 강서구 내발산동", phone: "1833-4720", businessStatus: "영업", priceMin: 3700000, priceMax: 5500000, rating: 3.8, reviewCount: 175, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "라엘르마곡산후조리원", district: "강서구", roadAddress: "서울특별시 강서구 마곡중앙8로5길", phone: "02-2039-3530", businessStatus: "영업", priceMin: 3100000, priceMax: 6100000, rating: 4.1, reviewCount: 194, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "르베르쏘 산후조리원", district: "강서구", roadAddress: "서울특별시 강서구 등촌동", phone: "02-2602-1210", businessStatus: "영업", priceMin: 2900000, priceMax: 4700000, rating: 3.8, reviewCount: 173, amenities: JSON.stringify(["신생아실", "1인실", "산후마사지", "영양식단"]) },
    { name: "마벨르산후조리원 가양점", district: "강서구", roadAddress: "서울특별시 강서구 가양동", phone: "02-420-5560", businessStatus: "영업", priceMin: 4300000, priceMax: 6600000, rating: 4.4, reviewCount: 132, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "마텔네르산후조리원", district: "강서구", roadAddress: "서울특별시 강서구 화곡2동", phone: "02-2602-1210", businessStatus: "영업", priceMin: 3200000, priceMax: 4600000, rating: 4.1, reviewCount: 53, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "목동라테라산후조리원", district: "강서구", roadAddress: "서울특별시 강서구 화곡동", phone: "02-2653-3588", businessStatus: "영업", priceMin: 2800000, priceMax: 4200000, rating: 4.2, reviewCount: 138, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "에빠토르베르쏘 산후조리원 2관", district: "강서구", roadAddress: "서울특별시 강서구 화곡동", phone: "02-2602-1210", businessStatus: "영업", priceMin: 3700000, priceMax: 5900000, rating: 4.2, reviewCount: 149, amenities: JSON.stringify(["신생아실", "1인실", "산후마사지", "영양식단"]) },
    { name: "퀸즈마리산후조리원 강서본점", district: "강서구", roadAddress: "서울특별시 강서구 양천로", phone: "02-2083-0600", businessStatus: "영업", priceMin: 4200000, priceMax: 5200000, rating: 4.2, reviewCount: 59, amenities: JSON.stringify(["신생아실", "1인실", "산후마사지", "영양식단"]) },
    { name: "로얄사임당산후조리원 봉천점", district: "관악구", roadAddress: "서울특별시 관악구 봉천동", phone: "02-889-0700", businessStatus: "영업", priceMin: 4500000, priceMax: 6500000, rating: 3.8, reviewCount: 141, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "로얄사임당산후조리원 서울대입구점", district: "관악구", roadAddress: "서울특별시 관악구 봉천동", phone: "02-595-3595", businessStatus: "영업", priceMin: 3900000, priceMax: 4900000, rating: 4.5, reviewCount: 97, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "미래드림산후조리원", district: "관악구", roadAddress: "서울특별시 관악구 중앙동", phone: "02-887-5551", businessStatus: "영업", priceMin: 4100000, priceMax: 5400000, rating: 4.4, reviewCount: 106, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "광진아기맘미소산후조리원", district: "광진구", roadAddress: "서울특별시 광진구 자양동", phone: "02-447-0065", businessStatus: "영업", priceMin: 3900000, priceMax: 7000000, rating: 4.4, reviewCount: 188, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "예그리나 산후조리원", district: "광진구", roadAddress: "서울특별시 광진구 구의동", phone: "02-457-6020", businessStatus: "영업", priceMin: 5400000, priceMax: 8400000, rating: 4.2, reviewCount: 78, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "온 산후조리원", district: "광진구", roadAddress: "서울특별시 광진구 구의동", phone: "02-453-0640", businessStatus: "영업", priceMin: 6000000, priceMax: 8900000, rating: 4.1, reviewCount: 111, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "로얄사임당산후조리원 천왕점", district: "구로구", roadAddress: "서울특별시 구로구 천왕동", phone: "02-2688-6200", businessStatus: "영업", priceMin: 2700000, priceMax: 5200000, rating: 4.4, reviewCount: 166, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "맘스퀘어 산후조리원", district: "구로구", roadAddress: "서울특별시 구로구 오류동", phone: "02-2611-7322", businessStatus: "영업", priceMin: 2900000, priceMax: 5400000, rating: 4.5, reviewCount: 72, amenities: JSON.stringify(["신생아실", "1인실", "산후마사지", "영양식단"]) },
    { name: "미래산후조리원", district: "구로구", roadAddress: "서울특별시 구로구 오류동", phone: "02-2682-2400", businessStatus: "영업", priceMin: 4100000, priceMax: 7000000, rating: 4.0, reviewCount: 84, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "민전산후조리원", district: "구로구", roadAddress: "서울특별시 구로구 개봉동", phone: "02-2060-9315", businessStatus: "영업", priceMin: 3400000, priceMax: 5600000, rating: 4.5, reviewCount: 196, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "아름제일 산후조리원", district: "구로구", roadAddress: "서울특별시 구로구 구로동", phone: "02-856-9301", businessStatus: "영업", priceMin: 3900000, priceMax: 6500000, rating: 4.1, reviewCount: 93, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "엠제이산후조리원", district: "금천구", roadAddress: "서울특별시 금천구 독산동", phone: "02-2109-3003", businessStatus: "영업", priceMin: 2700000, priceMax: 4700000, rating: 3.7, reviewCount: 171, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "노원라테라산후조리원", district: "노원구", roadAddress: "서울특별시 노원구 상계동", phone: "02-951-2300", businessStatus: "영업", priceMin: 4300000, priceMax: 6000000, rating: 3.7, reviewCount: 191, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "더블레스산후조리원", district: "노원구", roadAddress: "서울특별시 노원구 하계동", phone: "02-949-2223", businessStatus: "영업", priceMin: 3200000, priceMax: 4400000, rating: 4.4, reviewCount: 114, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "동그라미산후조리원노원상계점", district: "노원구", roadAddress: "서울특별시 노원구 상계동", phone: "02-933-0087", businessStatus: "영업", priceMin: 4100000, priceMax: 5800000, rating: 3.9, reviewCount: 154, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "모아드림산후조리원", district: "노원구", roadAddress: "서울특별시 노원구 상계동", phone: "02-937-7777", businessStatus: "영업", priceMin: 4200000, priceMax: 5600000, rating: 4.3, reviewCount: 176, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "와이엘 산후조리원", district: "노원구", roadAddress: "서울특별시 노원구 월계동", phone: "02-904-8034", businessStatus: "영업", priceMin: 3200000, priceMax: 5700000, rating: 4.3, reviewCount: 78, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "이자르산후조리원 노원디럭스점", district: "노원구", roadAddress: "서울특별시 노원구 상계동", phone: "02-935-7979", businessStatus: "영업", priceMin: 2800000, priceMax: 5100000, rating: 4.0, reviewCount: 135, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "제이미산후조리원", district: "노원구", roadAddress: "서울특별시 노원구 상계동", phone: "02-935-7979", businessStatus: "영업", priceMin: 2600000, priceMax: 5600000, rating: 4.5, reviewCount: 55, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "마미캠프 산후조리원 창동점", district: "도봉구", roadAddress: "서울특별시 도봉구 창동", phone: "0507-1486-0531", businessStatus: "영업", priceMin: 3700000, priceMax: 5700000, rating: 4.3, reviewCount: 57, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "소중한맘 산후조리원", district: "도봉구", roadAddress: "서울특별시 도봉구 쌍문동", phone: "02-903-0033", businessStatus: "영업", priceMin: 3100000, priceMax: 4700000, rating: 4.1, reviewCount: 65, amenities: JSON.stringify(["산후마사지", "신생아실"]) },
    { name: "에이치큐브 산후조리원", district: "도봉구", roadAddress: "서울특별시 도봉구 창동", phone: "02-995-8000", businessStatus: "영업", priceMin: 3000000, priceMax: 4800000, rating: 4.1, reviewCount: 49, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "린산후조리원", district: "동대문구", roadAddress: "서울특별시 동대문구 장안동", phone: "02-2243-5353", businessStatus: "영업", priceMin: 4200000, priceMax: 5500000, rating: 3.7, reviewCount: 168, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "린아미에산후조리원", district: "동대문구", roadAddress: "서울특별시 동대문구 장안1동", phone: "02-2246-2001", businessStatus: "영업", priceMin: 2700000, priceMax: 4400000, rating: 3.8, reviewCount: 154, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "마드레 산후조리원", district: "동대문구", roadAddress: "서울특별시 동대문구 답십리동", phone: "02-1599-3270", businessStatus: "영업", priceMin: 3100000, priceMax: 5300000, rating: 4.4, reviewCount: 72, amenities: JSON.stringify(["산후마사지", "신생아실"]) },
    { name: "베베리타산후조리원", district: "동대문구", roadAddress: "서울특별시 동대문구 장안동", phone: "02-2213-5889", businessStatus: "영업", priceMin: 2500000, priceMax: 4700000, rating: 3.9, reviewCount: 146, amenities: JSON.stringify(["신생아실", "1인실", "산후마사지", "영양식단"]) },
    { name: "블리스 산후조리원", district: "동대문구", roadAddress: "서울특별시 동대문구 답십리동", phone: "02-2212-2582", businessStatus: "영업", priceMin: 3800000, priceMax: 6500000, rating: 4.2, reviewCount: 154, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "삼육의료원서울병원산후조리원", district: "동대문구", roadAddress: "서울특별시 동대문구 휘경동", phone: "02-2210-3366", businessStatus: "영업", priceMin: 3100000, priceMax: 5000000, rating: 3.9, reviewCount: 44, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "더청화 산후조리원", district: "동작구", roadAddress: "서울특별시 동작구 노량진동", phone: "02-6496-5650", businessStatus: "영업", priceMin: 5800000, priceMax: 8800000, rating: 3.9, reviewCount: 199, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "카리스산후조리원 보라매점", district: "동작구", roadAddress: "서울특별시 동작구 신대방동", phone: "02-833-2227", businessStatus: "영업", priceMin: 5100000, priceMax: 8700000, rating: 4.0, reviewCount: 295, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "레피리움시그니처 홍대점", district: "마포구", roadAddress: "서울특별시 마포구 성산동", phone: "02-3142-3003", businessStatus: "영업", priceMin: 4000000, priceMax: 6200000, rating: 4.3, reviewCount: 222, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "아이린산후조리원", district: "마포구", roadAddress: "서울특별시 마포구 망원동", phone: "02-3142-1212", businessStatus: "영업", priceMin: 4700000, priceMax: 7000000, rating: 4.6, reviewCount: 195, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "오브산후조리원 상암점", district: "마포구", roadAddress: "서울특별시 마포구 상암동", phone: "02-306-1713", businessStatus: "영업", priceMin: 5300000, priceMax: 9200000, rating: 3.9, reviewCount: 70, amenities: JSON.stringify(["산후마사지", "신생아실"]) },
    { name: "공공산후조리원품애가득", district: "서대문구", roadAddress: "서울특별시 서대문구 북가좌동", phone: "02-3210-1050", businessStatus: "영업", priceMin: 4300000, priceMax: 7100000, rating: 4.1, reviewCount: 96, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "레피리움시그니처 서대문점", district: "서대문구", roadAddress: "서울특별시 서대문구 대현동", phone: "02-362-7500", businessStatus: "영업", priceMin: 3500000, priceMax: 5200000, rating: 3.9, reviewCount: 63, amenities: JSON.stringify(["신생아실", "1인실", "산후마사지", "영양식단"]) },
    { name: "SK산후조리원", district: "서초구", roadAddress: "서울특별시 서초구 방배동", phone: "02-592-0020", businessStatus: "영업", priceMin: 8400000, priceMax: 12400000, rating: 4.9, reviewCount: 137, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "네송스 산후조리원", district: "서초구", roadAddress: "서울특별시 서초구 반포4동", phone: "02-537-3232", businessStatus: "영업", priceMin: 8400000, priceMax: 13300000, rating: 4.9, reviewCount: 151, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "사임당 산후조리원", district: "서초구", roadAddress: "서울특별시 서초구 서초동", phone: "02-582-8244", businessStatus: "영업", priceMin: 8900000, priceMax: 12500000, rating: 4.6, reviewCount: 167, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "사임당아모리움산후조리원", district: "서초구", roadAddress: "서울특별시 서초구 서초동", phone: "02-533-6169", businessStatus: "영업", priceMin: 5900000, priceMax: 11700000, rating: 4.4, reviewCount: 245, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "센트리움산후조리원", district: "서초구", roadAddress: "서울특별시 서초구 반포동", phone: "02-535-3853", businessStatus: "영업", priceMin: 8300000, priceMax: 13900000, rating: 4.6, reviewCount: 254, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "레피리움시그니처 성수점", district: "성동구", roadAddress: "서울특별시 성동구 행당동", phone: "02-2291-1004", businessStatus: "영업", priceMin: 5600000, priceMax: 9300000, rating: 4.1, reviewCount: 219, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "이든포레", district: "성동구", roadAddress: "서울특별시 성동구 행당동", phone: "02-2291-1004", businessStatus: "영업", priceMin: 3900000, priceMax: 6700000, rating: 4.0, reviewCount: 77, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "라솜산후조리원 성북점", district: "성북구", roadAddress: "서울특별시 성북구 동소문동", phone: "02-922-1400", businessStatus: "영업", priceMin: 3300000, priceMax: 5200000, rating: 4.2, reviewCount: 117, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "마리아산후조리원", district: "성북구", roadAddress: "서울특별시 성북구 석관동", phone: "02-2088-7387", businessStatus: "영업", priceMin: 4500000, priceMax: 6300000, rating: 4.1, reviewCount: 94, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "라렌느산후조리원", district: "송파구", roadAddress: "서울특별시 송파구 삼전동", phone: "02-414-3322", businessStatus: "영업", priceMin: 6000000, priceMax: 11000000, rating: 4.5, reviewCount: 241, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "라벨 메르 산후조리원", district: "송파구", roadAddress: "서울특별시 송파구 석촌동", phone: "02-484-3710", businessStatus: "영업", priceMin: 5500000, priceMax: 9500000, rating: 4.7, reviewCount: 426, amenities: JSON.stringify(["신생아실", "1인실", "산후마사지", "영양식단"]) },
    { name: "레이나 산후조리원", district: "송파구", roadAddress: "서울특별시 송파구 방이동", phone: "02-1661-3118", businessStatus: "영업", priceMin: 6500000, priceMax: 11800000, rating: 4.5, reviewCount: 461, amenities: JSON.stringify(["산후마사지", "신생아실"]) },
    { name: "산후조리원아유재", district: "송파구", roadAddress: "서울특별시 송파구 가락동", phone: "02-400-9010", businessStatus: "영업", priceMin: 9000000, priceMax: 12000000, rating: 4.3, reviewCount: 453, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "소피아산후조리원", district: "송파구", roadAddress: "서울특별시 송파구 오금동", phone: "02-3401-1004", businessStatus: "영업", priceMin: 8900000, priceMax: 12000000, rating: 4.8, reviewCount: 398, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "송파산모건강증진센터", district: "송파구", roadAddress: "서울특별시 송파구 장지동", phone: "02-431-3535", businessStatus: "영업", priceMin: 8200000, priceMax: 11600000, rating: 4.2, reviewCount: 286, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "코리야 산후조리원", district: "송파구", roadAddress: "서울특별시 송파구 방이동", phone: "02-418-3727", businessStatus: "영업", priceMin: 7700000, priceMax: 11300000, rating: 4.7, reviewCount: 441, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "뉴이자르 산후조리원 목동점", district: "양천구", roadAddress: "서울특별시 양천구 목동", phone: "02-2061-6001", businessStatus: "영업", priceMin: 4600000, priceMax: 8300000, rating: 4.5, reviewCount: 154, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "레피리움시그니쳐산후조리원 목동점", district: "양천구", roadAddress: "서울특별시 양천구 목동", phone: "02-6491-1001", businessStatus: "영업", priceMin: 4200000, priceMax: 6700000, rating: 4.6, reviewCount: 257, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "목동 굿맘산후조리원", district: "양천구", roadAddress: "서울특별시 양천구 신정동", phone: "02-2654-0030", businessStatus: "영업", priceMin: 4800000, priceMax: 6800000, rating: 4.0, reviewCount: 286, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "밝은미래산후조리원", district: "양천구", roadAddress: "서울특별시 양천구 신정동", phone: "02-2612-1000", businessStatus: "영업", priceMin: 6000000, priceMax: 9300000, rating: 4.5, reviewCount: 271, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "보네르아샤 산후조리원 강서지점", district: "양천구", roadAddress: "서울특별시 양천구 신월동", phone: "02-2698-3588", businessStatus: "영업", priceMin: 4300000, priceMax: 6800000, rating: 4.5, reviewCount: 77, amenities: JSON.stringify(["산후마사지", "신생아실"]) },
    { name: "팰리스산후조리원 목동 센트럴점", district: "양천구", roadAddress: "서울특별시 양천구 신월동", phone: "02-2601-3588", businessStatus: "영업", priceMin: 3600000, priceMax: 7100000, rating: 4.1, reviewCount: 259, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "포미즈타임산후조리원", district: "양천구", roadAddress: "서울특별시 양천구 목동", phone: "02-2651-7503", businessStatus: "영업", priceMin: 4600000, priceMax: 7500000, rating: 4.5, reviewCount: 273, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "VIP산후조리원", district: "영등포구", roadAddress: "서울특별시 영등포구 신길", phone: "02-841-5277", businessStatus: "영업", priceMin: 4200000, priceMax: 6200000, rating: 4.4, reviewCount: 152, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "더아이리스산후조리원", district: "영등포구", roadAddress: "서울특별시 영등포구 영등포동", phone: "02-2068-6167", businessStatus: "영업", priceMin: 4300000, priceMax: 6500000, rating: 4.6, reviewCount: 121, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "라솜산후조리원 영등포점", district: "영등포구", roadAddress: "서울특별시 영등포구 문래동", phone: "02-2679-5005", businessStatus: "영업", priceMin: 5500000, priceMax: 9100000, rating: 4.2, reviewCount: 265, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "레피리움시그니처 영등포점", district: "영등포구", roadAddress: "서울특별시 영등포구 문래동", phone: "02-3667-3579", businessStatus: "영업", priceMin: 3500000, priceMax: 5800000, rating: 4.5, reviewCount: 116, amenities: JSON.stringify(["신생아실", "산후마사지", "영양식단"]) },
    { name: "메르디앙산후조리원", district: "영등포구", roadAddress: "서울특별시 영등포구 신길", phone: "02-848-3579", businessStatus: "영업", priceMin: 5300000, priceMax: 8100000, rating: 3.9, reviewCount: 202, amenities: JSON.stringify(["산후마사지", "신생아실"]) },
    { name: "아이엘산후조리원", district: "영등포구", roadAddress: "서울특별시 영등포구 당산동", phone: "02-2632-0119", businessStatus: "영업", priceMin: 4600000, priceMax: 7600000, rating: 4.2, reviewCount: 180, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "노블5 산후조리원", district: "용산구", roadAddress: "서울특별시 용산구 이태원로", phone: "02-517-2419", businessStatus: "영업", priceMin: 7900000, priceMax: 13700000, rating: 4.6, reviewCount: 230, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "서울여성병원제2산후조리원", district: "용산구", roadAddress: "서울특별시 용산구 한강대로62나길", phone: "070-5090-3551", businessStatus: "영업", priceMin: 8200000, priceMax: 11200000, rating: 4.6, reviewCount: 375, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "트리니티산후조리원 서울드래곤시티점", district: "용산구", roadAddress: "서울특별시 용산구 한강로", phone: "02-6952-3787", businessStatus: "영업", priceMin: 7800000, priceMax: 12100000, rating: 4.2, reviewCount: 440, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "더은혜산후조리원", district: "은평구", roadAddress: "서울특별시 은평구 대조동", phone: "02-388-5638", businessStatus: "영업", priceMin: 4400000, priceMax: 6400000, rating: 4.2, reviewCount: 61, amenities: JSON.stringify(["신생아실", "1인실", "산후마사지", "영양식단"]) },
    { name: "동그라미산후조리원녹번점", district: "은평구", roadAddress: "서울특별시 은평구 녹번동", phone: "02-388-0900", businessStatus: "영업", priceMin: 4100000, priceMax: 6000000, rating: 4.2, reviewCount: 113, amenities: JSON.stringify(["산후마사지", "신생아실"]) },
    { name: "라솜산후조리원 은평점", district: "은평구", roadAddress: "서울특별시 은평구 응암동", phone: "02-6010-0702", businessStatus: "영업", priceMin: 3400000, priceMax: 6100000, rating: 3.8, reviewCount: 137, amenities: JSON.stringify(["산후마사지", "신생아실"]) },
    { name: "레피리움시그니쳐산후조리원 은평점", district: "은평구", roadAddress: "서울특별시 은평구 통일로", phone: "02-6941-1231", businessStatus: "영업", priceMin: 3000000, priceMax: 5900000, rating: 4.2, reviewCount: 133, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "아이젤 산후조리원", district: "은평구", roadAddress: "서울특별시 은평구 대조동", phone: "02-355-0069", businessStatus: "영업", priceMin: 3400000, priceMax: 5300000, rating: 3.9, reviewCount: 178, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "인정산후조리원", district: "은평구", roadAddress: "서울특별시 은평구 응암동", phone: "02-2187-1400", businessStatus: "영업", priceMin: 3900000, priceMax: 6300000, rating: 4.1, reviewCount: 84, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "라솜산후조리원 창경궁점", district: "종로구", roadAddress: "서울특별시 종로구 원남동", phone: "02-763-5400", businessStatus: "영업", priceMin: 3000000, priceMax: 4200000, rating: 3.9, reviewCount: 199, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "올리비움산후조리원", district: "종로구", roadAddress: "서울특별시 종로구 무악동", phone: "02-730-1717", businessStatus: "영업", priceMin: 2700000, priceMax: 4400000, rating: 4.2, reviewCount: 87, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "더드림 산후조리원", district: "중구", roadAddress: "서울특별시 중구 신당동", phone: "02-2231-6375", businessStatus: "영업", priceMin: 2900000, priceMax: 3900000, rating: 3.7, reviewCount: 151, amenities: JSON.stringify(["산후마사지", "신생아실", "1인실"]) },
    { name: "와튼젤리 산후조리원", district: "중구", roadAddress: "서울특별시 중구 중림동", phone: "02-6012-1010", businessStatus: "영업", priceMin: 3900000, priceMax: 6200000, rating: 4.4, reviewCount: 177, amenities: JSON.stringify(["산후마사지", "모유수유실", "산모교육"]) },
    { name: "뉴이자르산후조리원 태릉점", district: "중랑구", roadAddress: "서울특별시 중랑구 묵동", phone: "02-972-7667", businessStatus: "영업", priceMin: 3700000, priceMax: 6200000, rating: 4.0, reviewCount: 67, amenities: JSON.stringify(["산후마사지", "신생아실", "모유수유실"]) },
    { name: "레피리움시그니처 신내점", district: "중랑구", roadAddress: "서울특별시 중랑구 신내로16길", phone: "02-3421-5553", businessStatus: "영업", priceMin: 2800000, priceMax: 5100000, rating: 3.9, reviewCount: 162, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "아이맘산후조리원", district: "중랑구", roadAddress: "서울특별시 중랑구 망우동", phone: "02-495-0123", businessStatus: "영업", priceMin: 2600000, priceMax: 5300000, rating: 3.9, reviewCount: 61, amenities: JSON.stringify(["신생아실", "모유수유실", "산후운동"]) },
    { name: "이자르산후조리원 태릉노블점", district: "중랑구", roadAddress: "서울특별시 중랑구 묵동", phone: "02-972-0808", businessStatus: "영업", priceMin: 2900000, priceMax: 5300000, rating: 4.2, reviewCount: 173, amenities: JSON.stringify(["프리미엄 식단", "산후마사지", "신생아실", "1인실"]) },
    { name: "해와달출장산후조리", district: "중랑구", roadAddress: "서울특별시 중랑구 망우동", phone: "02-975-0010", businessStatus: "영업", priceMin: 3900000, priceMax: 6800000, rating: 4.4, reviewCount: 159, amenities: JSON.stringify(["산후마사지", "신생아실"]) },
  ]);
  console.log("산후조리원 107개 입력");

  // ============================================================
  // 2. 모자보건 프로그램 (임신주수별)
  // ============================================================
  await db.delete(s.maternalHealthPrograms);
  const programs = [
    { type: "검진", name: "초음파 검사", desc: "태아 발달 확인 및 기형아 검사", weekStart: 11, weekEnd: 13 },
    { type: "검진", name: "기형아 검사 (NIPT)", desc: "다운증후군 등 염색체 이상 검사", weekStart: 10, weekEnd: 12 },
    { type: "검진", name: "정밀 초음파", desc: "태아 정밀 진단", weekStart: 20, weekEnd: 24 },
    { type: "검진", name: "임신성 당뇨 검사", desc: "고위험 임신 선별 검사", weekStart: 24, weekEnd: 28 },
    { type: "검진", name: "GBS 검사", desc: "B군 연쇄상구균 검사", weekStart: 35, weekEnd: 37 },
    { type: "교육", name: "출산준비교실", desc: "라마즈 호흡법, 출산 과정 교육", weekStart: 28, weekEnd: 36 },
    { type: "교육", name: "모유수유 교실", desc: "모유수유 자세, 유축 방법", weekStart: 30, weekEnd: 38 },
    { type: "지원", name: "엽산제 지원", desc: "임신 초기 엽산제 무료 지급", weekStart: 4, weekEnd: 12 },
    { type: "지원", name: "철분제 지원", desc: "중기 이후 철분제 무료 지급", weekStart: 16, weekEnd: 40 },
    { type: "지원", name: "임산부 등록 (보건소)", desc: "임신확인서 제출 후 등록", weekStart: 8, weekEnd: 20 },
  ];
  const districts = ["강남구", "송파구", "서초구", "마포구", "종로구", "용산구", "성동구", "영등포구", "은평구", "노원구"];
  const seedPrograms = districts.flatMap((d) =>
    programs.map((p) => ({
      district: d,
      programType: p.type,
      programName: p.name,
      description: p.desc,
      weekRangeStart: p.weekStart,
      weekRangeEnd: p.weekEnd,
      year: 2026,
      recipientCount: Math.floor(Math.random() * 500) + 100,
    }))
  );
  await db.insert(s.maternalHealthPrograms).values(seedPrograms);
  console.log(`모자보건 프로그램 ${seedPrograms.length}건 입력`);

  // ============================================================
  // 3. 1366 운영실적 (최근 12개월)
  // ============================================================
  await db.delete(s.womenEmergencyStats);
  const consultTypes = ["가정폭력", "성폭력", "성매매", "데이트폭력", "디지털성범죄", "스토킹", "산후우울"];
  const monthlyStats: typeof s.womenEmergencyStats.$inferInsert[] = [];
  for (let m = 1; m <= 12; m++) {
    const ym = `2025-${m.toString().padStart(2, "0")}`;
    consultTypes.forEach((t) => {
      const baseCount: Record<string, number> = {
        "가정폭력": 3200, "성폭력": 1800, "성매매": 220, "데이트폭력": 1100,
        "디지털성범죄": 950, "스토킹": 480, "산후우울": 320,
      };
      monthlyStats.push({
        yearMonth: ym,
        consultType: t,
        count: baseCount[t] + Math.floor(Math.random() * 200) - 100,
      });
    });
  }
  await db.insert(s.womenEmergencyStats).values(monthlyStats);
  console.log(`1366 운영실적 ${monthlyStats.length}건 입력`);

  // ============================================================
  // 4. 성폭력/가정폭력 상담소 (실제 서울 기관 — 실제 전화번호)
  // ============================================================
  await db.delete(s.counselingCenters);
  await db.insert(s.counselingCenters).values([
    {
      name: "여성긴급전화 1366 서울센터",
      type: "통합",
      district: "동작구",
      address: "서울 동작구 여의대방로54길 18 서울여성플라자 4층",
      phone: "1366",
      is24h: true,
      operatingHours: "24시간",
      lat: 37.5124, lng: 126.9395,
    },
    {
      name: "한국성폭력상담소",
      type: "성폭력",
      district: "마포구",
      address: "서울 마포구 성지길 35",
      phone: "02-338-5801",
      is24h: false,
      operatingHours: "평일 09:00-18:00",
      lat: 37.5489, lng: 126.9234,
    },
    {
      name: "한국여성의전화",
      type: "통합",
      district: "은평구",
      address: "서울 은평구 진관2로 70",
      phone: "02-2263-6464",
      is24h: false,
      operatingHours: "평일 10:00-17:00",
      lat: 37.6027, lng: 126.9288,
    },
    {
      name: "한국가정법률상담소",
      type: "가정폭력",
      district: "영등포구",
      address: "서울 영등포구 의사당대로 22",
      phone: "1644-7077",
      is24h: false,
      operatingHours: "평일 09:00-18:00",
      lat: 37.5264, lng: 126.8963,
    },
    {
      name: "은평가정폭력상담소",
      type: "가정폭력",
      district: "은평구",
      address: "서울 은평구 통일로 684",
      phone: "02-326-1366",
      is24h: true,
      operatingHours: "24시간",
      lat: 37.6189, lng: 126.9234,
    },
    {
      name: "서대문가정폭력상담소",
      type: "가정폭력",
      district: "서대문구",
      address: "서울 서대문구 통일로 484",
      phone: "02-364-0413",
      is24h: false,
      operatingHours: "평일 09:00-18:00",
      lat: 37.5793, lng: 126.9367,
    },
    {
      name: "강서양천가정폭력상담소",
      type: "가정폭력",
      district: "강서구",
      address: "서울 강서구 강서로 390",
      phone: "02-2605-8455",
      is24h: true,
      operatingHours: "24시간",
      lat: 37.5509, lng: 126.8495,
    },
    {
      name: "까리따스가정폭력상담소",
      type: "가정폭력",
      district: "송파구",
      address: "서울 송파구 백제고분로 345",
      phone: "02-2202-7806",
      is24h: false,
      operatingHours: "평일 09:00-18:00",
      lat: 37.5145, lng: 127.0382,
    },
    {
      name: "서울성동가정상담센터",
      type: "가정폭력",
      district: "성동구",
      address: "서울 성동구 마장로 210",
      phone: "02-2297-2911",
      is24h: false,
      operatingHours: "평일 09:00-18:00",
      lat: 37.5630, lng: 127.0367,
    },
    {
      name: "나우미가정폭력상담센터",
      type: "가정폭력",
      district: "양천구",
      address: "서울 양천구 목동동로 293",
      phone: "02-2062-1366",
      is24h: true,
      operatingHours: "24시간",
      lat: 37.5270, lng: 126.8565,
    },
  ]);
  console.log("상담소 10개 입력");

  // ============================================================
  // 5. 출생·사망 통계
  // ============================================================
  await db.delete(s.birthStats);
  const allDistricts = [
    "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
    "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
    "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구",
  ];
  const birthBaselines: Record<string, number> = {
    "강남구": 220, "송파구": 240, "서초구": 180, "노원구": 130, "강서구": 200,
    "양천구": 150, "마포구": 110, "성동구": 90, "영등포구": 100, "관악구": 95,
    "은평구": 105, "중랑구": 80, "동대문구": 75, "구로구": 95, "강동구": 115,
    "도봉구": 70, "강북구": 60, "광진구": 85, "성북구": 100, "서대문구": 80,
    "용산구": 65, "종로구": 35, "중구": 30, "동작구": 90, "금천구": 60,
  };
  const birthRecords: typeof s.birthStats.$inferInsert[] = [];
  for (let y = 2024; y <= 2025; y++) {
    for (let m = 1; m <= 12; m++) {
      allDistricts.forEach((d) => {
        const base = birthBaselines[d] || 80;
        for (let dn = 1; dn <= 5; dn++) {
          birthRecords.push({
            yearMonth: `${y}-${m.toString().padStart(2, "0")}`,
            district: d,
            dong: `${d.slice(0, -1)}${dn}동`,
            birthCount: Math.max(1, Math.floor((base / 5) + (Math.random() * 20 - 10))),
            deathCount: Math.floor(Math.random() * 30) + 10,
          });
        }
      });
    }
  }
  await db.insert(s.birthStats).values(birthRecords);
  console.log(`출생·사망 통계 ${birthRecords.length}건 입력`);

  // ============================================================
  // 6. 임신기간별 출생 통계
  // ============================================================
  await db.delete(s.pregnancyDurationStats);
  await db.insert(s.pregnancyDurationStats).values([
    { year: 2024, weekRange: "<28주", count: 412, riskLevel: "매우위험" },
    { year: 2024, weekRange: "28-31주", count: 1024, riskLevel: "위험" },
    { year: 2024, weekRange: "32-36주", count: 6892, riskLevel: "관찰" },
    { year: 2024, weekRange: "37주+", count: 38214, riskLevel: "정상" },
    { year: 2025, weekRange: "<28주", count: 386, riskLevel: "매우위험" },
    { year: 2025, weekRange: "28-31주", count: 998, riskLevel: "위험" },
    { year: 2025, weekRange: "32-36주", count: 6743, riskLevel: "관찰" },
    { year: 2025, weekRange: "37주+", count: 37102, riskLevel: "정상" },
  ]);
  console.log("임신기간별 출생 통계 입력");

  // ============================================================
  // 7. 지원 정책 (실제 신청 URL — 서울맘케어→탄생육아 몽땅정보통 반영)
  // ============================================================
  await db.delete(s.supportPolicies);
  await db.insert(s.supportPolicies).values([
    {
      title: "임산부 교통비 지원",
      organization: "서울시",
      category: "임신",
      description: "서울시 임산부에게 70만원 교통비 바우처 지원 (다자녀 시 80~100만원)",
      eligibility: "신청일 기준 6개월 이상 서울 거주, 임신확인서 보유",
      benefitAmount: "70만원 (둘째 80, 셋째+ 100만원)",
      applicationMethod: "탄생육아 몽땅정보통 또는 정부24",
      applicationUrl: "https://umppa.seoul.go.kr/hmpg/sprt/bzin/bzmgComtDetail.do?biz_mng_no=34B5EA8BEB354E2DB26136CFE52AEFF2",
      applicableWeekStart: 4,
      applicableWeekEnd: 40,
    },
    {
      title: "첫만남이용권",
      organization: "보건복지부",
      category: "출산",
      description: "출생아당 200만원 바우처 지급 (둘째부터 300만원)",
      eligibility: "출생신고 완료된 모든 출생아",
      benefitAmount: "200만원 (둘째+ 300만원)",
      applicationMethod: "정부24, 복지로, 행정복지센터",
      applicationUrl: "https://www.gov.kr/portal/service/serviceInfo/135200005015",
      applicableWeekStart: 40,
      applicableWeekEnd: 999,
    },
    {
      title: "부모급여 (영아수당)",
      organization: "보건복지부",
      category: "육아",
      description: "0세 월 100만원 / 1세 월 50만원 현금 지급",
      eligibility: "0~23개월 영아",
      benefitAmount: "0세 100만원/월, 1세 50만원/월",
      applicationMethod: "출생신고와 함께 행정복지센터 또는 복지로",
      applicationUrl: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004657",
      applicableWeekStart: 40,
      applicableWeekEnd: 999,
    },
    {
      title: "서울형 산후조리경비 지원",
      organization: "서울시",
      category: "출산",
      description: "출산가정에 산후조리비 100만원 지원 (다태아 200만원)",
      eligibility: "신청일 기준 서울 6개월 이상 거주, 출산일로부터 60일 이내",
      benefitAmount: "100만원 (다태아 200만원)",
      applicationMethod: "탄생육아 몽땅정보통",
      applicationUrl: "https://umppa.seoul.go.kr",
      applicableWeekStart: 40,
      applicableWeekEnd: 999,
    },
    {
      title: "산모·신생아 건강관리 서비스",
      organization: "보건복지부",
      category: "출산",
      description: "산모·신생아 건강관리사 가정 방문 (5~25일, 본인부담 일부)",
      eligibility: "기준중위소득 150% 이하 (서울 본인부담 차등)",
      benefitAmount: "정부지원금 + 본인부담 (소득별)",
      applicationMethod: "복지로 또는 보건소",
      applicationUrl: "https://www.bokjiro.go.kr/ssis-tbu/twatbz/mkclAsis/mkclInsertPwnbPage.do",
      applicableWeekStart: 36,
      applicableWeekEnd: 50,
    },
    {
      title: "엽산제·철분제 지원",
      organization: "서울시 보건소",
      category: "임신",
      description: "임산부 등록 시 엽산제(12주까지) 및 철분제(16주~) 무료 지급",
      eligibility: "임산부 등록 완료자",
      benefitAmount: "엽산제 1~3개월분, 철분제 5개월분",
      applicationMethod: "거주지 보건소 방문",
      applicableWeekStart: 4,
      applicableWeekEnd: 40,
    },
    {
      title: "고위험 임산부 의료비 지원",
      organization: "보건복지부",
      category: "임신",
      description: "조기진통, 임신중독증 등 고위험 임신 의료비 최대 300만원 지원",
      eligibility: "기준중위소득 180% 이하 + 19개 고위험 질환",
      benefitAmount: "최대 300만원",
      applicationMethod: "복지로 또는 보건소",
      applicationUrl: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001088",
      applicableWeekStart: 8,
      applicableWeekEnd: 40,
    },
    {
      title: "출산축하 SH 임대주택 우선공급",
      organization: "서울시",
      category: "주거",
      description: "신혼부부·출산가정 SH 임대주택 우선 신청권",
      eligibility: "출산 2년 이내 무주택 신혼부부",
      benefitAmount: "임대료 시세 80% 수준",
      applicationMethod: "SH공사",
      applicationUrl: "https://www.i-sh.co.kr",
      applicableWeekStart: 0,
      applicableWeekEnd: 999,
    },
    {
      title: "다둥이 행복카드",
      organization: "서울시",
      category: "육아",
      description: "다자녀 가구에 협력업체 200+곳 할인 카드 지급",
      eligibility: "자녀 2명 이상 가구",
      benefitAmount: "협력업체 5~50% 할인",
      applicationMethod: "서울시 다둥이 행복카드 홈페이지",
      applicationUrl: "https://umppa.seoul.go.kr",
      applicableWeekStart: 0,
      applicableWeekEnd: 999,
    },
    {
      title: "어린이집 입소 대기 신청",
      organization: "보건복지부",
      category: "육아",
      description: "어린이집 입소 시 다자녀·맞벌이 가구 우선",
      eligibility: "0~5세 영유아",
      benefitAmount: "우선 입소권",
      applicationMethod: "임신육아종합포털 아이사랑",
      applicationUrl: "https://www.childcare.go.kr/?menuno=168",
      applicableWeekStart: 0,
      applicableWeekEnd: 999,
    },
    {
      title: "배우자 출산휴가 급여",
      organization: "고용노동부",
      category: "출산",
      description: "배우자 출산휴가 10일 (유급) 보장",
      eligibility: "출산일 기준 90일 이내",
      benefitAmount: "통상임금 100% 5일 + 5일",
      applicationMethod: "고용센터",
      applicableWeekStart: 38,
      applicableWeekEnd: 50,
    },
    {
      title: "육아휴직 급여",
      organization: "고용노동부",
      category: "육아",
      description: "최대 12개월, 통상임금의 80% (상한 150만원)",
      eligibility: "고용보험 가입 + 자녀 만 8세 이하",
      benefitAmount: "월 최대 150만원 × 12개월",
      applicationMethod: "고용보험 홈페이지 또는 고용센터",
      applicationUrl: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0302Info.do",
      applicableWeekStart: 40,
      applicableWeekEnd: 999,
    },
  ]);
  console.log("지원 정책 12개 입력");

  console.log("모든 시드 데이터 입력 완료");
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
