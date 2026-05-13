import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { db } from "../db";
import { babyJournals } from "../db/schema";

// 데모용 아기 사진 URL (picsum 고정 시드 — 개발 플레이스홀더)
const BABY_PHOTO_1 = "https://picsum.photos/seed/baby101/400/320";
const BABY_PHOTO_2 = "https://picsum.photos/seed/baby202/400/320";
const BABY_PHOTO_3 = "https://picsum.photos/seed/baby303/400/320";

async function seedJournals() {
  console.log("기존 아기수첩 데이터 삭제...");
  await db.delete(babyJournals);

  console.log("새 목데이터 15개 삽입...");

  const entries = [
    // ── 행복/일상 기록 10개 ──────────────────────────────────
    {
      userId: 1,
      title: "우리 아기 처음 웃었어요 🍼",
      content:
        "오늘 아침에 기저귀 갈아주다가 처음으로 방긋 웃었어요! 배꼽 위에 입김 불었더니 낄낄 웃는 것 같기도 하고... 눈물이 날 뻔했어요. 이 작은 손가락이 제 손을 꼭 쥐어주는데 세상 모든 걸 가진 것 같은 기분이에요.",
      date: "2026-05-10",
      imageData: BABY_PHOTO_1,
      riskLevel: "정상",
      alertType: null,
      triggers: JSON.stringify([]),
    },
    {
      userId: 1,
      title: "첫 배꼽 목욕 성공!",
      content:
        "목욕 전날부터 겁이 났는데 생각보다 아기가 물을 좋아하는 것 같아요. 신생아용 욕조에 미지근한 물 받아서 천천히 씻겼더니 싫어하지도 않고 그냥 멍하니 있더라고요. 엄마가 도와줘서 다행이었어요. 목욕 후 아기 로션 냄새가 너무 좋아요.",
      date: "2026-05-05",
      imageData: BABY_PHOTO_2,
      riskLevel: "정상",
      alertType: null,
      triggers: JSON.stringify([]),
    },
    {
      userId: 1,
      title: "오늘 BCG 예방접종 다녀왔어요",
      content:
        "드디어 첫 예방접종 날. 주사 맞을 때 잠깐 울다가 바로 잠들었어요. 원래 더 많이 울 줄 알았는데 의외로 금방 진정됐어요. 집에 와서도 별 이상 없이 잘 먹고 잘 자고 있네요. 건강하게 자라줘서 고마워 우리 아기.",
      date: "2026-04-28",
      imageData: null,
      riskLevel: "정상",
      alertType: null,
      triggers: JSON.stringify([]),
    },
    {
      userId: 1,
      title: "할머니 외할머니 첫 대면 ❤️",
      content:
        "오늘 외할머니가 올라오셨어요. 아기를 보자마자 눈물을 글썽이셨는데 저도 같이 울었어요. '엄마 닮았다'고 하시면서 하루 종일 안고 계셨어요. 아기도 낯가림 없이 잘 안겨있었고요. 멀리서 오신 것도 감사했지만 이 순간이 오래 기억에 남을 것 같아요.",
      date: "2026-04-22",
      imageData: BABY_PHOTO_3,
      riskLevel: "정상",
      alertType: null,
      triggers: JSON.stringify([]),
    },
    {
      userId: 1,
      title: "처음으로 뒤집기 성공!!",
      content:
        "배밀이 연습시키다가 갑자기 홀랑 뒤집어버렸어요!! 남편이랑 둘이서 같이 환호했네요 ㅋㅋ 아기 본인도 뒤집은 다음에 잠깐 멍하다가 울었는데 너무 귀여웠어요. 앞으로 눈 더 잘 봐야겠어요. 벌써 이렇게 크네요.",
      date: "2026-04-15",
      imageData: null,
      riskLevel: "정상",
      alertType: null,
      triggers: JSON.stringify([]),
    },
    {
      userId: 1,
      title: "이유식 첫날 - 쌀미음 도전",
      content:
        "드디어 이유식 시작! 쌀미음을 만들어서 처음 먹여봤어요. 혀로 밀어내는 반사가 아직 있어서 대부분 흘렸지만... 몇 번은 삼키는 것 같았어요. 소분 용기 사서 냉동해두고 매일 조금씩 늘려볼 예정이에요. 처음이라 긴장했는데 생각보다 재밌었어요.",
      date: "2026-04-08",
      imageData: null,
      riskLevel: "정상",
      alertType: null,
      triggers: JSON.stringify([]),
    },
    {
      userId: 1,
      title: "남산 공원 첫 외출 성공",
      content:
        "날씨가 너무 좋아서 아기띠 메고 남산 공원 가벼운 산책을 했어요. 바깥 공기 마시니까 기분이 확 좋아졌어요. 아기는 바깥 햇빛이 신기한지 계속 두리번거리다가 결국 잠들었어요. 저도 오랜만에 환기가 됐고, 남편이랑 손잡고 걷는 게 이렇게 좋을 줄은 몰랐어요.",
      date: "2026-04-01",
      imageData: null,
      riskLevel: "정상",
      alertType: null,
      triggers: JSON.stringify([]),
    },
    {
      userId: 1,
      title: "밤새 5시간 연속 수면!!! 🎉",
      content:
        "드디어 드디어!! 어젯밤에 5시간 연속으로 잤어요!! 중간에 깰까봐 숨죽이면서 잤는데 아침에 눈 뜨고 시계 보니까 5시간이 지나있더라고요. 아기도 잘 자고 저도 잘 자고. 이 느낌... 출산 전 수면이 그리웠는데 오늘은 좀 회복된 기분이에요.",
      date: "2026-03-25",
      imageData: null,
      riskLevel: "정상",
      alertType: null,
      triggers: JSON.stringify([]),
    },
    {
      userId: 1,
      title: "100일 기념 사진 촬영",
      content:
        "100일 맞이해서 스튜디오 가서 사진 찍었어요. 아기가 컨디션이 좋아서 그런지 내내 방긋방긋하면서 사진사 분이 '이렇게 잘 웃는 아기 처음 봤다'고 했어요. 한복도 입혀봤는데 진짜 너무 귀여워서 사진을 몇 백 장 찍은 것 같아요. 벌써 100일... 시간이 빠르다.",
      date: "2026-03-18",
      imageData: null,
      riskLevel: "정상",
      alertType: null,
      triggers: JSON.stringify([]),
    },
    {
      userId: 1,
      title: "모유수유 드디어 자리 잡혔어요",
      content:
        "처음 3주 동안 유두 상처에 젖물리기 힘들어서 몇 번이나 포기할까 생각했는데 오늘은 수월하게 물렸어요. 라텍션 선생님한테 배운 자세 연습이 드디어 효과가 나는 것 같아요. 아기도 이제 혼자 알아서 찾아서 먹고... 뿌듯하고 감사하고 눈물이 찔끔 났어요.",
      date: "2026-03-10",
      imageData: null,
      riskLevel: "정상",
      alertType: null,
      triggers: JSON.stringify([]),
    },

    // ── 우울 의심 기록 5개 (최근 날짜 → 1페이지 상단 노출) ──
    {
      userId: 1,
      title: "너무 지쳐요",
      content:
        "3일째 거의 못 자고 있어요. 아기는 2시간마다 깨고 저는 수유하고 재우고 나면 다시 2시간이 지나서 또 일어나야 해요. 오늘은 남편한테 화를 냈어요. 이유도 없이 그냥 짜증이 폭발했어요. 아무것도 하기 싫고 샤워도 귀찮고 밥도 잘 못 먹겠어요. 제가 좋은 엄마인지 모르겠어요.",
      date: "2026-05-13",
      imageData: null,
      riskLevel: "우울의심",
      alertType: "1336",
      triggers: JSON.stringify(["지쳐", "아무것도 하기 싫", "못 먹겠"]),
    },
    {
      userId: 1,
      title: "나만 이런 건 아니겠죠",
      content:
        "모유수유가 잘 안 돼서 분유를 조금 섞었는데 죄책감이 너무 커요. 좋은 엄마는 완모를 해야 한다는 압박이 계속 느껴지고... 인터넷 보면 다들 잘 하는 것 같은데 저만 이러는 것 같아서 눈물이 나요. 아기한테 미안하고 제 자신이 너무 한심하게 느껴져요. 이런 감정이 언제까지 계속될지 모르겠어요.",
      date: "2026-05-12",
      imageData: null,
      riskLevel: "우울의심",
      alertType: "1336",
      triggers: JSON.stringify(["죄책감", "눈물이 나요", "한심", "언제까지"]),
    },
    {
      userId: 1,
      title: "아무것도 하기 싫은 날",
      content:
        "아기가 낮잠 자는 동안 뭘 해야 할지 모르겠어요. 그냥 멍하니 앉아만 있었어요. 배고픈데 일어서기도 싫고, 씻어야 하는데 욕실 문 열기도 귀찮고. 이게 정상인 건지... 눈물이 이유도 없이 흘러요. 남편한테도 말하기 창피하고 엄마한테 말하면 걱정할 것 같아서 혼자 삭이고 있어요.",
      date: "2026-05-11",
      imageData: null,
      riskLevel: "우울의심",
      alertType: "1336",
      triggers: JSON.stringify(["아무것도 하기 싫", "눈물이", "혼자", "창피"]),
    },
    {
      userId: 1,
      title: "아기 울음 소리가 너무 무서워요",
      content:
        "아기가 울면 심장이 쿵 내려앉고 손이 떨려요. 내가 또 뭘 잘못한 건지, 배가 고픈 건지 배가 아픈 건지 아무것도 모르겠고. 울음을 그치게 못할 때마다 엄마 자격이 없는 것 같아서 저도 같이 울어요. 요즘엔 하루에도 몇 번씩 울어요. 이렇게 사는 게 맞는 건지 모르겠어요.",
      date: "2026-05-09",
      imageData: null,
      riskLevel: "우울의심",
      alertType: "1336",
      triggers: JSON.stringify(["무서워요", "자격이 없", "이렇게 사는 게 맞는 건지"]),
    },
    {
      userId: 1,
      title: "공허해요",
      content:
        "오늘 아기 재우고 나서 한참을 그냥 천장 보고 누워있었어요. 이상하게 아무 생각도 안 나고 공허한 느낌? 행복해야 하는데 행복한 건지 모르겠고, 예전의 나로 돌아갈 수 있을지도 모르겠어요. 친구들은 다들 일상 살고 있는데 나만 시간이 멈춘 것 같아요. 나 괜찮은 건지 모르겠어요.",
      date: "2026-05-07",
      imageData: null,
      riskLevel: "우울의심",
      alertType: "1336",
      triggers: JSON.stringify(["공허", "행복한 건지 모르겠", "괜찮은 건지 모르겠"]),
    },
  ];

  await db.insert(babyJournals).values(entries);
  console.log(`✓ ${entries.length}개 입력 완료 (정상 10개 / 우울의심 5개)`);
}

seedJournals()
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
