"use client";

import { useState, useRef, useEffect } from "react";

type Diary = {
  id: number;
  recordedAt: string;
  transcript: string;
  totalScore: number;
  riskLevel: string;
  emotion: string;
  triggers: string;
  phq1: number; phq2: number; phq3: number;
  phq4: number; phq5: number; phq6: number;
  phq7: number; phq8: number; phq9: number;
};

const PHQ9_LABELS = [
  "흥미·즐거움 저하",
  "우울하거나 절망적",
  "수면 문제",
  "피로감·기력 저하",
  "식욕 변화",
  "자존감 저하·자책",
  "집중력 저하",
  "행동 느려짐·안절부절",
  "자해·죽음에 대한 생각",
];

const SCORE_LABELS = ["전혀", "며칠", "절반 이상", "거의 매일"];

const EMOTION_MAP: Record<string, string> = {
  joy: "😊 행복",
  sadness: "😢 슬픔",
  anger: "😠 분노",
  fear: "😨 불안",
  neutral: "😐 보통",
};

export default function DiaryPage() {
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [latestDiary, setLatestDiary] = useState<Diary | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => { loadDiaries(); }, []);

  async function loadDiaries() {
    const res = await fetch("/api/diary");
    const data = await res.json();
    setDiaries(data.diaries || []);
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const localChunks: Blob[] = [];
      mr.ondataavailable = (e) => localChunks.push(e.data);
      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        await analyze(new Blob(localChunks, { type: "audio/webm" }));
      };
      mr.start();
      recorderRef.current = mr;
      setRecording(true);
    } catch (err) {
      alert("마이크 접근이 필요합니다: " + (err as Error).message);
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  async function analyze(audio: Blob) {
    setAnalyzing(true);
    const fd = new FormData();
    fd.append("audio", audio, "voice.webm");
    const res = await fetch("/api/diary", { method: "POST", body: fd });
    const data = await res.json();
    setLatestDiary(data.diary);
    setShowDetail(true);
    setAnalyzing(false);
    loadDiaries();
  }

  async function analyzeText() {
    if (!textInput.trim()) return;
    setAnalyzing(true);
    const fd = new FormData();
    fd.append("text", textInput);
    const res = await fetch("/api/diary", { method: "POST", body: fd });
    const data = await res.json();
    setLatestDiary(data.diary);
    setShowDetail(true);
    setAnalyzing(false);
    setTextInput("");
    loadDiaries();
  }

  const riskColor: Record<string, string> = {
    "정상": "bg-green-100 text-green-700 border-green-200",
    "경증": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "중등도": "bg-orange-100 text-orange-700 border-orange-300",
    "중증": "bg-red-100 text-red-700 border-red-300",
  };

  const riskBg: Record<string, string> = {
    "정상": "bg-green-500",
    "경증": "bg-yellow-400",
    "중등도": "bg-orange-500",
    "중증": "bg-red-500",
  };

  function getPhqScores(d: Diary): number[] {
    return [d.phq1, d.phq2, d.phq3, d.phq4, d.phq5, d.phq6, d.phq7, d.phq8, d.phq9];
  }

  function parseTriggers(raw: string): string[] {
    try { return JSON.parse(raw) ?? []; } catch { return []; }
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="px-5 pt-6 pb-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <h1 className="text-xl font-bold mb-1">음성 일기</h1>
        <p className="text-xs text-gray-600">매일 1분 녹음 → AI가 PHQ-9 산후우울증 자동 측정</p>
      </header>

      {/* 녹음 버튼 */}
      <section className="px-5 pt-5">
        <div className="card text-center py-8">
          <button
            onClick={recording ? stopRecording : startRecording}
            disabled={analyzing}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all
              ${recording ? "bg-red-500 animate-pulse" : analyzing ? "bg-gray-300" : "bg-pink-500 hover:bg-pink-600"}`}
          >
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
              {recording
                ? <rect x="6" y="6" width="12" height="12" rx="2" />
                : <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z" />}
            </svg>
          </button>
          <p className="mt-4 font-semibold text-gray-700">
            {analyzing ? "AI가 분석 중..." : recording ? "녹음 중... (탭하여 종료)" : "탭하여 녹음 시작"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {recording ? "오늘 어떤 기분이었는지 자유롭게 말해주세요" : "오늘 하루 어땠나요?"}
          </p>
        </div>

        {/* 텍스트 입력 */}
        <div className="card mt-3">
          <p className="text-xs text-gray-500 mb-2">텍스트로 입력</p>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="요즘 잠도 안 오고 자꾸 우울한 기분이..."
            className="input w-full h-24 resize-none"
          />
          <button
            onClick={analyzeText}
            disabled={analyzing || !textInput.trim()}
            className="btn-primary w-full mt-2 text-sm"
          >
            분석하기
          </button>
        </div>
      </section>

      {/* 최신 결과 */}
      {latestDiary && (
        <section className="px-5 pt-5">
          <div className={`card border-2 ${riskColor[latestDiary.riskLevel] || "border-gray-200"}`}>
            {/* 점수 헤더 */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500">최신 PHQ-9 점수</p>
              <span className={`text-xs font-bold px-2 py-1 rounded ${riskColor[latestDiary.riskLevel] || ""}`}>
                {latestDiary.riskLevel}
              </span>
            </div>
            <div className="flex items-end gap-3 mb-2">
              <p className="text-4xl font-bold">{latestDiary.totalScore}</p>
              <p className="text-sm text-gray-500 mb-1">/ 27점</p>
              <p className="text-sm mb-1">{EMOTION_MAP[latestDiary.emotion] ?? latestDiary.emotion}</p>
            </div>

            {/* 점수 게이지 */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className={`h-2 rounded-full transition-all ${riskBg[latestDiary.riskLevel] || "bg-gray-400"}`}
                style={{ width: `${(latestDiary.totalScore / 27) * 100}%` }}
              />
            </div>

            {/* transcript */}
            {latestDiary.transcript && (
              <p className="text-xs text-gray-600 bg-gray-50 rounded p-2 mb-3 line-clamp-3">
                "{latestDiary.transcript}"
              </p>
            )}

            {/* PHQ-9 세부 항목 토글 */}
            <button
              onClick={() => setShowDetail(!showDetail)}
              className="text-xs text-pink-600 font-medium mb-2"
            >
              {showDetail ? "▲ 항목별 점수 접기" : "▼ 항목별 점수 보기"}
            </button>

            {showDetail && (
              <div className="space-y-2 mt-1">
                {PHQ9_LABELS.map((label, i) => {
                  const score = getPhqScores(latestDiary)[i] ?? 0;
                  const isWarning = i === 8 && score >= 1;
                  return (
                    <div key={i} className={`flex items-center gap-2 ${isWarning ? "p-1 bg-red-50 rounded" : ""}`}>
                      <span className="text-xs text-gray-500 w-4">{i + 1}.</span>
                      <span className={`text-xs flex-1 ${isWarning ? "text-red-700 font-semibold" : "text-gray-700"}`}>
                        {label}
                      </span>
                      <div className="flex gap-0.5">
                        {[0, 1, 2, 3].map((v) => (
                          <div
                            key={v}
                            className={`w-4 h-4 rounded-sm text-[9px] flex items-center justify-center font-bold
                              ${score === v
                                ? v === 0 ? "bg-green-200 text-green-700"
                                  : v === 1 ? "bg-yellow-200 text-yellow-700"
                                  : v === 2 ? "bg-orange-200 text-orange-700"
                                  : "bg-red-300 text-red-700"
                                : "bg-gray-100 text-gray-300"}`}
                          >
                            {v}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400 w-12 text-right">{SCORE_LABELS[score]}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 위험 키워드 */}
            {parseTriggers(latestDiary.triggers).length > 0 && (
              <div className="mt-3 p-2 bg-red-50 rounded-lg">
                <p className="text-xs font-bold text-red-700">⚠️ 감지된 위험 키워드</p>
                <p className="text-xs text-red-600 mt-0.5">{parseTriggers(latestDiary.triggers).join(", ")}</p>
              </div>
            )}

            {/* 중등도 이상 경고 */}
            {latestDiary.totalScore >= 10 && (
              <div className="mt-3 p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-bold text-red-700">전문 상담을 권합니다</p>
                <p className="text-xs text-red-600 mt-1">중등도 이상 우울 위험. 지금 1366으로 연결할까요?</p>
                <a href="tel:1366" className="block mt-2 bg-red-500 text-white text-center py-2 rounded font-bold text-sm">
                  📞 1366 즉시 연결
                </a>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-3">
              {new Date(latestDiary.recordedAt).toLocaleString("ko-KR")}
            </p>
          </div>
        </section>
      )}

      {/* 점수 추이 */}
      {diaries.length >= 2 && (
        <section className="px-5 pt-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">점수 추이 (최근 7일)</h3>
          <div className="card">
            <div className="flex items-end gap-1 h-16">
              {diaries.slice(0, 7).reverse().map((d) => {
                const pct = Math.max((d.totalScore / 27) * 100, 4);
                const color = d.riskLevel === "중증" ? "bg-red-400"
                  : d.riskLevel === "중등도" ? "bg-orange-400"
                  : d.riskLevel === "경증" ? "bg-yellow-400"
                  : "bg-green-400";
                return (
                  <div key={d.id} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-gray-500">{d.totalScore}</span>
                    <div
                      className={`w-full rounded-t ${color}`}
                      style={{ height: `${pct}%` }}
                      title={`${new Date(d.recordedAt).toLocaleDateString("ko-KR", { month: "short", day: "numeric" })} · ${d.totalScore}점`}
                    />
                    <span className="text-[8px] text-gray-400">
                      {new Date(d.recordedAt).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 과거 일기 목록 */}
      {diaries.length > 0 && (
        <section className="px-5 pt-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">최근 일기 ({diaries.length})</h3>
          <div className="space-y-2">
            {diaries.slice(0, 7).map((d) => (
              <div key={d.id} className="card">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">
                    {new Date(d.recordedAt).toLocaleDateString("ko-KR", { month: "long", day: "numeric" })}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${riskColor[d.riskLevel] || ""}`}>
                    {d.riskLevel} · {d.totalScore}점
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{d.transcript || "음성 녹음"}</p>
                {parseTriggers(d.triggers).length > 0 && (
                  <p className="text-xs text-red-500 mt-1">⚠️ {parseTriggers(d.triggers).join(", ")}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
