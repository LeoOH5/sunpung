/**
 * 서울 열린데이터광장 OpenAPI 래퍼
 * https://data.seoul.go.kr/dataList/OA-XXXXX/A/1/datasetView.do
 *
 * 호출 형식: http://openapi.seoul.go.kr:8088/{KEY}/{TYPE}/{SERVICE}/{START}/{END}
 *   KEY: 인증키
 *   TYPE: json | xml
 *   SERVICE: 서비스명 (예: LOCALDATA_103101 = 산후조리업)
 *   START~END: 페이징 (1~1000)
 */

const BASE = "http://openapi.seoul.go.kr:8088";
const KEY = process.env.SEOUL_OPENAPI_KEY || "sample"; // 'sample'은 5건만 반환

export type SeoulApiResponse<T> = {
  list_total_count?: number;
  RESULT?: { CODE: string; MESSAGE: string };
  row?: T[];
};

async function fetchPage<T = Record<string, unknown>>(
  service: string,
  start = 1,
  end = 1000
): Promise<SeoulApiResponse<T>> {
  const url = `${BASE}/${KEY}/json/${service}/${start}/${end}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Seoul API ${service} ${res.status}`);
  const data = await res.json();
  // 응답은 { [SERVICE]: { list_total_count, RESULT, row } } 형식
  const wrap = data[service] || data;
  return wrap as SeoulApiResponse<T>;
}

/**
 * 페이징 자동 처리하여 모든 row 가져오기
 */
export async function fetchAll<T = Record<string, unknown>>(
  service: string,
  pageSize = 1000
): Promise<T[]> {
  const first = await fetchPage<T>(service, 1, pageSize);
  const total = first.list_total_count ?? first.row?.length ?? 0;
  const rows: T[] = [...(first.row ?? [])];

  if (total <= pageSize) return rows;

  const pages = Math.ceil(total / pageSize);
  for (let p = 2; p <= pages; p++) {
    const start = (p - 1) * pageSize + 1;
    const end = p * pageSize;
    const next = await fetchPage<T>(service, start, end);
    rows.push(...(next.row ?? []));
  }
  return rows;
}

// ============================================================
// 서비스명 상수 (서울 열린데이터광장 OpenAPI)
// ============================================================
export const SeoulService = {
  // Dataset 1: 산후조리업 인허가 (LOCALDATA 시스템 코드 103101)
  POSTPARTUM_LICENSE: "LOCALDATA_103101",
  // Dataset 7: 몽땅정보 만능키 (OA-22188)
  MOMTANG_INFO: "tbBabyMallNew",
} as const;
