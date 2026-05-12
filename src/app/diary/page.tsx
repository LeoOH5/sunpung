"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Journal = {
  id: number;
  title: string;
  content: string;
  date: string;
  imageData: string | null;
  riskLevel: string;
  alertType: string | null;
  triggers: string;
  createdAt: string;
};

type RiskInfo = {
  riskLevel: string;
  alertType: string | null;
  triggers: string[];
};

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 800;
        const ratio = Math.min(MAX / img.width, MAX / img.height, 1);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.onerror = reject;
      img.src = e.target!.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function JournalPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [newRisk, setNewRisk] = useState<RiskInfo | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [imageData, setImageData] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/journal?page=${p}`);
      const data = await res.json();
      setJournals(data.journals ?? []);
      setTotalPages(data.totalPages ?? 1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(page); }, [page, load]);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setImageData(compressed);
    setImagePreview(compressed);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    setNewRisk(null);
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, date, imageData }),
      });
      const data = await res.json();
      if (data.ok) {
        setNewRisk(data.risk);
        await load(1);
        setPage(1);
        if (!data.risk?.alertType) resetForm();
      }
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setTitle("");
    setContent("");
    setDate(new Date().toISOString().slice(0, 10));
    setImageData(null);
    setImagePreview(null);
    setNewRisk(null);
    setShowForm(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("이 기록을 삭제할까요?")) return;
    await fetch(`/api/journal?id=${id}`, { method: "DELETE" });
    setSelectedJournal(null);
    await load(page);
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("ko-KR", {
      year: "numeric", month: "long", day: "numeric", weekday: "short",
    });
  }

  return (
    <div className="min-h-screen pb-28 bg-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-amber-50 border-b border-amber-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📒</span>
          <h1 className="text-lg font-bold text-amber-900">아기수첩</h1>
        </div>
        <button
          onClick={() => { setShowForm(true); setNewRisk(null); }}
          className="flex items-center gap-1 bg-amber-500 text-white text-sm font-semibold px-3 py-2 rounded-full shadow active:scale-95 transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          새 기록
        </button>
      </header>

      {/* List */}
      <div className="px-4 pt-4">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : journals.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📖</div>
            <p className="text-amber-700 font-medium">아직 기록이 없어요</p>
            <p className="text-sm text-amber-500 mt-1">소중한 순간을 기록해보세요</p>
          </div>
        ) : (
          <div className="space-y-3">
            {journals.map((j) => (
              <button
                key={j.id}
                onClick={() => setSelectedJournal(j)}
                className="w-full text-left bg-white rounded-2xl shadow-sm overflow-hidden active:scale-[0.99] transition-all border border-amber-100"
              >
                {j.imageData && (
                  <img src={j.imageData} alt="" className="w-full h-44 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 text-base leading-snug flex-1">{j.title}</h3>
                    {j.alertType && (
                      <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${
                        j.alertType === "112" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                      }`}>
                        {j.alertType === "112" ? "⚠️ 학대의심" : "💛 우울의심"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-500 mb-2">{formatDate(j.date)}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{j.content}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm disabled:opacity-30 text-amber-700 text-lg"
            >‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold ${
                  p === page ? "bg-amber-500 text-white shadow" : "bg-white text-amber-700 shadow-sm"
                }`}
              >{p}</button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm disabled:opacity-30 text-amber-700 text-lg"
            >›</button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedJournal && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10">
            <button onClick={() => setSelectedJournal(null)} className="p-1 text-gray-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h2 className="font-bold text-gray-800 text-base max-w-[220px] truncate">{selectedJournal.title}</h2>
            <button onClick={() => handleDelete(selectedJournal.id)} className="p-1 text-red-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          {selectedJournal.imageData && (
            <img src={selectedJournal.imageData} alt="" className="w-full max-h-72 object-cover" />
          )}
          <div className="px-5 py-4 flex-1">
            <p className="text-sm text-amber-500 mb-3">{formatDate(selectedJournal.date)}</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">{selectedJournal.content}</p>
          </div>
          {selectedJournal.alertType && (
            <div className={`mx-4 mb-6 rounded-2xl p-4 ${
              selectedJournal.alertType === "112" ? "bg-red-50 border border-red-200" : "bg-orange-50 border border-orange-200"
            }`}>
              <p className={`text-sm font-bold mb-3 ${selectedJournal.alertType === "112" ? "text-red-700" : "text-orange-700"}`}>
                {selectedJournal.alertType === "112" ? "⚠️ 아동학대가 의심되는 내용이 감지되었습니다" : "💛 우울증 증세가 의심되는 내용이 감지되었습니다"}
              </p>
              <AlertButtons alertType={selectedJournal.alertType} />
            </div>
          )}
        </div>
      )}

      {/* New Entry Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 z-10">
            <button onClick={resetForm} className="p-1 text-gray-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="font-bold text-gray-800 text-base flex-1">새 기록</h2>
            <button
              form="journal-form"
              type="submit"
              disabled={saving || !title.trim() || !content.trim()}
              className="bg-amber-500 disabled:opacity-40 text-white text-sm font-bold px-4 py-2 rounded-full"
            >
              {saving ? "저장 중…" : "저장"}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pb-10">
            {newRisk?.alertType && (
              <div className={`mx-4 mt-4 rounded-2xl p-4 ${
                newRisk.alertType === "112" ? "bg-red-50 border border-red-200" : "bg-orange-50 border border-orange-200"
              }`}>
                <p className={`text-sm font-bold mb-3 ${newRisk.alertType === "112" ? "text-red-700" : "text-orange-700"}`}>
                  {newRisk.alertType === "112" ? "⚠️ 아동학대가 의심되는 내용이 감지되었습니다" : "💛 우울증 증세가 의심되는 내용이 감지되었습니다"}
                </p>
                <AlertButtons alertType={newRisk.alertType} />
                <button onClick={resetForm} className="mt-3 w-full text-center text-sm text-gray-400 underline">닫기</button>
              </div>
            )}

            <form id="journal-form" onSubmit={handleSubmit} className="px-4 pt-4 space-y-4">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full h-44 rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50 flex flex-col items-center justify-center gap-2 overflow-hidden active:opacity-80"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-4xl">📷</span>
                    <span className="text-sm text-amber-500 font-medium">사진 추가 (선택)</span>
                  </>
                )}
              </button>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageChange} />

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">날짜</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">제목</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="오늘의 기록 제목"
                  maxLength={50}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">내용</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="오늘 있었던 일, 아기의 성장, 느낀 감정을 자유롭게 적어주세요"
                  rows={9}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AlertButtons({ alertType }: { alertType: string }) {
  return (
    <div className="flex flex-col gap-2">
      {alertType === "112" ? (
        <>
          <a href="tel:112" className="flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-3.5 rounded-xl text-sm active:scale-95 transition-all">
            🚨 112 긴급신고
          </a>
          <a href="tel:1366" className="flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 font-semibold py-3.5 rounded-xl text-sm active:scale-95 transition-all">
            📞 1366 여성긴급전화
          </a>
        </>
      ) : (
        <>
          <a href="tel:1336" className="flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3.5 rounded-xl text-sm active:scale-95 transition-all">
            📞 1336 정신건강위기상담
          </a>
          <a href="tel:1393" className="flex items-center justify-center gap-2 bg-white border border-orange-200 text-orange-600 font-semibold py-3.5 rounded-xl text-sm active:scale-95 transition-all">
            💛 1393 자살예방상담전화
          </a>
        </>
      )}
    </div>
  );
}
