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
};

export default function DiaryPage() {
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [latestDiary, setLatestDiary] = useState<Diary | null>(null);
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
        setChunks(localChunks);
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

  return (
    <div className="min-h-screen">
      <header className="px-5 pt-6 pb-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <h1 className="text-xl font-bold mb-1">음성 일기</h1>
        <p className="text-xs text-gray-600">매일 1분 녹음 → AI가 PHQ-9 산후우울증 자동 측정</p>
      </header>

      {/* 녹음 영역 */}
      <section className="px-5 pt-5">
        <div className="card text-center py-8">
          <button onClick={recording ? stopRecording : startRecording}
            disabled={analyzing}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all
              ${recording ? "bg-red-500 animate-pulse" : analyzing ? "bg-gray-300" : "bg-pink-500 hover:bg-pink-600"}`}>
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

        {/* 텍스트 입력 (마이크 안 되는 환경 대비) */}
        <div className="card mt-3">
          <p className="text-xs text-gray-500 mb-2">텍스트로 입력</p>
          <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)}
            placeholder="요즘 잠도 안 오고 자꾸 우울한 기분이..."
            className="input w-full h-24 resize-none" />
          <button onClick={analyzeText} disabled={analyzing || !textInput.trim()}
            className="btn-primary w-full mt-2 text-sm">
            분석하기
          </button>
        </div>
      </section>

      {/* 분석 결과 */}
      {latestDiary && (
        <section className="px-5 pt-5">
          <div className={`card border-2 ${riskColor[latestDiary.riskLevel] || "border-gray-200"}`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500">최신 PHQ-9 점수</p>
              <span className={`text-xs font-bold px-2 py-1 rounded ${riskColor[latestDiary.riskLevel] || ""}`}>
                {latestDiary.riskLevel}
              </span>
            </div>
            <p className="text-3xl font-bold">{latestDiary.totalScore} <span className="text-sm font-normal text-gray-500">/ 27</span></p>

            {latestDiary.totalScore >= 10 && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-bold text-red-700">⚠️ 전문 상담을 권합니다</p>
                <p className="text-xs text-red-600 mt-1">중등도 이상 우울 위험. 지금 1366으로 연결할까요?</p>
                <a href="tel:1366" className="block mt-2 bg-red-500 text-white text-center py-2 rounded font-bold">
                  📞 1366 즉시 연결
                </a>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-4">
              감정: {latestDiary.emotion} · 작성: {new Date(latestDiary.recordedAt).toLocaleString("ko-KR")}
            </p>
          </div>
        </section>
      )}

      {/* 최근 7일 추이 */}
      {diaries.length > 0 && (
        <section className="px-5 pt-5 pb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">최근 일기 ({diaries.length})</h3>
          <div className="space-y-2">
            {diaries.slice(0, 7).map((d) => (
              <div key={d.id} className="card">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">
                    {new Date(d.recordedAt).toLocaleDateString("ko-KR", { month: "long", day: "numeric" })}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${riskColor[d.riskLevel] || ""}`}>
                    {d.riskLevel} · {d.totalScore}
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{d.transcript}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
