"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AnnualReport, Newsletter, Sermon } from "@/types/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  addAnnualReport,
  deleteAnnualReport,
  updateAnnualReport,
  addNewsletter,
  deleteNewsletter,
  updateNewsletter,
  addSermon,
  deleteSermon,
  updateSermon,
  toggleSermonCurrent,
  logoutAction,
  uploadImage,
} from "@/app/actions/admin";

interface AdminDashboardProps {
  initialUserEmail?: string;
}

export default function AdminDashboard({ initialUserEmail = '' }: AdminDashboardProps) {
  const [reports, setReports] = useState<AnnualReport[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [userEmail] = useState<string>(initialUserEmail);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Simple form states
  const [newReport, setNewReport] = useState({ year: "", file_url: "" });
  const [newNewsletter, setNewNewsletter] = useState({ title: "", content: "", date: "", image_url: "" });
  const [newSermon, setNewSermon] = useState({
    title: "",
    scripture: "",
    speaker: "",
    youtube_url: "",
    audio_url: "",
    cover_image_url: "",
    start_datetime: "",
    is_current: false,
  });

  // File states for photo uploads (instead of pasting links)
  const [newsletterImageFile, setNewsletterImageFile] = useState<File | null>(null);
  const [sermonCoverFile, setSermonCoverFile] = useState<File | null>(null);

  // Editing states
  const [editingReportId, setEditingReportId] = useState<string | null>(null);
  const [editingNewsletterId, setEditingNewsletterId] = useState<string | null>(null);
  const [editingSermonId, setEditingSermonId] = useState<string | null>(null);

  const supabase = createClient(); // used only for reads (public data)
  const router = useRouter();

  // Load data (reads are public - safe with anon key)
  const loadData = async () => {
    const [r, n, s] = await Promise.all([
      supabase.from("annual_reports").select("*").order("year", { ascending: false }),
      supabase.from("newsletters").select("*").order("date", { ascending: false }),
      supabase.from("sermons").select("*").order("created_at", { ascending: false }),
    ]);

    if (r.data) setReports(r.data as AnnualReport[]);
    if (n.data) setNewsletters(n.data as Newsletter[]);
    if (s.data) setSermons(s.data as Sermon[]);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // ========== Edit helpers ==========
  const startEditReport = (report: AnnualReport) => {
    setNewReport({ year: report.year, file_url: report.file_url });
    setEditingReportId(report.id);
  };

  const startEditNewsletter = (item: Newsletter) => {
    setNewNewsletter({
      title: item.title,
      content: item.content,
      date: item.date,
      image_url: item.image_url || '',
    });
    setNewsletterImageFile(null);
    setEditingNewsletterId(item.id);
  };

  const startEditSermon = (item: Sermon) => {
    setNewSermon({
      title: item.title,
      scripture: item.scripture || '',
      speaker: item.speaker || '',
      youtube_url: item.youtube_url || '',
      audio_url: item.audio_url || '',
      cover_image_url: item.cover_image_url || '',
      start_datetime: item.start_datetime ? item.start_datetime.slice(0, 16) : '',
      is_current: item.is_current,
    });
    setSermonCoverFile(null);
    setEditingSermonId(item.id);
  };

  const cancelEdit = () => {
    setEditingReportId(null);
    setEditingNewsletterId(null);
    setEditingSermonId(null);
    setNewReport({ year: '', file_url: '' });
    setNewNewsletter({ title: '', content: '', date: '', image_url: '' });
    setNewSermon({
      title: '', scripture: '', speaker: '', youtube_url: '', audio_url: '', cover_image_url: '', start_datetime: '', is_current: false,
    });
    setNewsletterImageFile(null);
    setSermonCoverFile(null);
  };

  // ========== ADD / UPDATE FUNCTIONS (using Server Actions + service role) ==========

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.year || !newReport.file_url) return;

    setSubmitting(true);
    try {
      if (editingReportId) {
        await updateAnnualReport(editingReportId, newReport.year, newReport.file_url);
        showMessage("success", "年報已更新");
      } else {
        await addAnnualReport(newReport.year, newReport.file_url);
        showMessage("success", "年報已新增");
      }
      setNewReport({ year: "", file_url: "" });
      cancelEdit();
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "操作失敗";
      showMessage("error", msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsletter.title || !newNewsletter.content || !newNewsletter.date) return;

    setSubmitting(true);
    try {
      let imageUrl: string | null = newNewsletter.image_url || null;

      // If user selected a new file, upload it (replaces the existing photo)
      if (newsletterImageFile) {
        imageUrl = await uploadImage(newsletterImageFile);
      }

      if (editingNewsletterId) {
        await updateNewsletter(editingNewsletterId, newNewsletter.title, newNewsletter.content, newNewsletter.date, imageUrl);
        showMessage("success", "電子週刊已更新");
      } else {
        await addNewsletter(newNewsletter.title, newNewsletter.content, newNewsletter.date, imageUrl);
        showMessage("success", "電子週刊已新增");
      }
      setNewNewsletter({ title: "", content: "", date: "", image_url: "" });
      setNewsletterImageFile(null);
      cancelEdit();
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "操作失敗";
      showMessage("error", msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitSermon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSermon.title) return;

    setSubmitting(true);
    try {
      let coverUrl: string | null = newSermon.cover_image_url || null;

      // If user selected a new cover photo, upload it
      if (sermonCoverFile) {
        coverUrl = await uploadImage(sermonCoverFile);
      }

      if (editingSermonId) {
        await updateSermon(editingSermonId, {
          title: newSermon.title,
          scripture: newSermon.scripture,
          speaker: newSermon.speaker,
          youtube_url: newSermon.youtube_url,
          audio_url: newSermon.audio_url,
          cover_image_url: coverUrl,
          start_datetime: newSermon.start_datetime ? new Date(newSermon.start_datetime).toISOString() : null,
          is_current: newSermon.is_current,
        });
        showMessage("success", "講道已更新");
      } else {
        await addSermon({
          title: newSermon.title,
          scripture: newSermon.scripture,
          speaker: newSermon.speaker,
          youtube_url: newSermon.youtube_url,
          audio_url: newSermon.audio_url,
          cover_image_url: coverUrl,
          start_datetime: newSermon.start_datetime ? new Date(newSermon.start_datetime).toISOString() : null,
          is_current: newSermon.is_current,
        });
        showMessage("success", "講道已新增");
      }
      setNewSermon({
        title: "", scripture: "", speaker: "", youtube_url: "", audio_url: "", cover_image_url: "", start_datetime: "", is_current: false,
      });
      setSermonCoverFile(null);
      cancelEdit();
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "操作失敗";
      showMessage("error", msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ========== DELETE + TOGGLE (using Server Actions) ==========

  const handleDeleteReport = async (id: string) => {
    if (!confirm("確定要刪除此年報嗎？")) return;
    try {
      await deleteAnnualReport(id);
      showMessage("success", "已刪除");
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "刪除失敗";
      showMessage("error", msg);
    }
  };

  const handleDeleteNewsletter = async (id: string) => {
    if (!confirm("確定要刪除此電子週刊嗎？")) return;
    try {
      await deleteNewsletter(id);
      showMessage("success", "已刪除");
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "刪除失敗";
      showMessage("error", msg);
    }
  };

  const handleDeleteSermon = async (id: string) => {
    if (!confirm("確定要刪除此講道嗎？")) return;
    try {
      await deleteSermon(id);
      showMessage("success", "已刪除");
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "刪除失敗";
      showMessage("error", msg);
    }
  };

  const handleToggleCurrent = async (sermon: Sermon) => {
    try {
      await toggleSermonCurrent(sermon.id, !sermon.is_current);
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "操作失敗";
      showMessage("error", msg);
    }
  };

  const handleLogout = async () => {
    await logoutAction();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#fdfaf0]">
      {/* Simple Top Bar */}
      <div className="bg-white border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="font-serif text-2xl font-bold text-gray-900">雅博堂管理後台</span>
            <span className="ml-3 text-sm text-amber-600">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {userEmail && <span className="text-gray-600 hidden sm:block">{userEmail}</span>}
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              登出
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
  
        {message && (
          <div className={`mb-6 p-3 rounded-lg text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
            {message.text}
          </div>
        )}

        {/* ========== 年報 ========== */}
        <section className="mb-10">
          <h2 className="text-xl font-serif font-semibold mb-4 text-gray-800">
            年報管理 {editingReportId && <span className="text-sm text-amber-600">(編輯中)</span>}
          </h2>

          <form onSubmit={handleSubmitReport} className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="年份 (如 2025)"
              value={newReport.year}
              onChange={(e) => setNewReport({ ...newReport, year: e.target.value })}
              className="flex-1 border rounded-xl px-4 py-2 text-sm"
              required
            />
            <input
              type="url"
              placeholder="PDF 連結"
              value={newReport.file_url}
              onChange={(e) => setNewReport({ ...newReport, file_url: e.target.value })}
              className="flex-[2] border rounded-xl px-4 py-2 text-sm"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-amber-600 text-white px-6 py-2 rounded-xl text-sm font-medium disabled:opacity-60"
            >
              {editingReportId ? '更新' : '新增'}
            </button>
            {editingReportId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-300"
              >
                取消
              </button>
            )}
          </form>

          <div className="bg-white rounded-xl border border-amber-100 overflow-hidden text-sm">
            {reports.length === 0 ? (
              <div className="p-6 text-gray-500">暫無年報</div>
            ) : (
              reports.map((r) => (
                <div key={r.id} className="flex items-center justify-between px-4 py-3 border-b last:border-b-0">
                  <div>
                    <span className="font-medium">{r.year}</span>
                    <a href={r.file_url} target="_blank" className="ml-3 text-amber-600 hover:underline break-all text-xs">{r.file_url}</a>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <button onClick={() => startEditReport(r)} className="text-amber-600 hover:text-amber-700">編輯</button>
                    <button onClick={() => handleDeleteReport(r.id)} className="text-red-600 hover:text-red-700">刪除</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-semibold mb-4 text-gray-800">
            電子週刊管理 {editingNewsletterId && <span className="text-sm text-amber-600">(編輯中)</span>}
          </h2>

          <form onSubmit={handleSubmitNewsletter} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <input
              type="text"
              placeholder="標題"
              value={newNewsletter.title}
              onChange={(e) => setNewNewsletter({ ...newNewsletter, title: e.target.value })}
              className="border rounded-xl px-4 py-2 text-sm"
              required
            />
            <input
              type="date"
              value={newNewsletter.date}
              onChange={(e) => setNewNewsletter({ ...newNewsletter, date: e.target.value })}
              className="border rounded-xl px-4 py-2 text-sm"
              required
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-600">照片上傳 (Photo)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewsletterImageFile(e.target.files?.[0] || null)}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
              />
              {newsletterImageFile && (
                <div className="mt-1 text-xs text-emerald-600">已選擇：{newsletterImageFile.name}</div>
              )}
              {!newsletterImageFile && editingNewsletterId && newNewsletter.image_url && (
                <div className="mt-1 text-xs text-gray-500">
                  目前照片: <a href={newNewsletter.image_url} target="_blank" className="text-amber-600 underline">查看</a>
                </div>
              )}
              <div className="text-[10px] text-gray-400 mt-0.5">直接上傳圖片</div>
            </div>
            <textarea
              placeholder="請輸入內容。"
              value={newNewsletter.content}
              onChange={(e) => setNewNewsletter({ ...newNewsletter, content: e.target.value })}
              className="border rounded-xl px-4 py-2 text-sm md:col-span-2 h-24"
              required
            />
            <div className="md:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-amber-600 text-white px-6 py-2 rounded-xl text-sm font-medium disabled:opacity-60"
              >
                {editingNewsletterId ? '更新' : '新增電子週刊'}
              </button>
              {editingNewsletterId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-300"
                >
                  取消
                </button>
              )}
            </div>
          </form>

          <div className="space-y-4">
            {newsletters.length === 0 && <div className="text-gray-500 text-sm">暫無電子週刊</div>}
            {newsletters.map((n) => (
              <div key={n.id} className="bg-white rounded-xl border border-amber-100 p-4 text-sm">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{n.title}</div>
                    <div className="text-gray-500 text-xs">{n.date}</div>
                  </div>
                  <div className="flex gap-3 text-xs self-start">
                    <button onClick={() => startEditNewsletter(n)} className="text-amber-600 hover:text-amber-700">編輯</button>
                    <button onClick={() => handleDeleteNewsletter(n.id)} className="text-red-600">刪除</button>
                  </div>
                </div>
                {n.image_url && (
                  <div className="mt-2 relative h-40">
                    <Image
                      src={n.image_url}
                      alt=""
                      fill
                      className="rounded object-cover"
                      sizes="160px"
                    />
                  </div>
                )}
                <div className="mt-2 text-gray-700 whitespace-pre-line text-sm">{n.content}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== 講道 / Live ========== */}
        <section>
          <h2 className="text-xl font-serif font-semibold mb-4 text-gray-800">
            講道 / 本週講道 管理 {editingSermonId && <span className="text-sm text-amber-600">(編輯中)</span>}
          </h2>
          <p className="text-xs text-gray-500 mb-3">設定「本週」後，此講道會出現在「本週講道」頁面。</p>

          <form onSubmit={handleSubmitSermon} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <input
              type="text"
              placeholder="講道標題 *"
              value={newSermon.title}
              onChange={(e) => setNewSermon({ ...newSermon, title: e.target.value })}
              className="border rounded-xl px-4 py-2 text-sm md:col-span-2"
              required
            />
            <textarea 
              placeholder="經文（可直接輸入或換行）" 
              rows={2}
              value={newSermon.scripture} 
              onChange={(e) => setNewSermon({ ...newSermon, scripture: e.target.value })} 
              className="border rounded-xl px-4 py-2 text-sm resize-y" 
            />
            <input type="text" placeholder="講員" value={newSermon.speaker} onChange={(e) => setNewSermon({ ...newSermon, speaker: e.target.value })} className="border rounded-xl px-4 py-2 text-sm" />
            <input type="url" placeholder="YouTube 連結" value={newSermon.youtube_url} onChange={(e) => setNewSermon({ ...newSermon, youtube_url: e.target.value })} className="border rounded-xl px-4 py-2 text-sm" />
            <input type="url" placeholder="音頻連結 (選填)" value={newSermon.audio_url} onChange={(e) => setNewSermon({ ...newSermon, audio_url: e.target.value })} className="border rounded-xl px-4 py-2 text-sm" />
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">封面照片上傳 (Cover Photo)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSermonCoverFile(e.target.files?.[0] || null)}
                className="block w-full text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
              />
              {sermonCoverFile && (
                <div className="mt-1 text-xs text-emerald-600">已選擇：{sermonCoverFile.name}</div>
              )}
              {!sermonCoverFile && editingSermonId && newSermon.cover_image_url && (
                <div className="mt-1 text-xs text-gray-500">
                  目前封面: <a href={newSermon.cover_image_url} target="_blank" className="text-amber-600 underline">查看</a>
                </div>
              )}
            </div>
            <input type="datetime-local" value={newSermon.start_datetime} onChange={(e) => setNewSermon({ ...newSermon, start_datetime: e.target.value })} className="border rounded-xl px-4 py-2 text-sm" />

            <div className="flex items-center gap-2 md:col-span-2">
              <input
                id="is_current"
                type="checkbox"
                checked={newSermon.is_current}
                onChange={(e) => setNewSermon({ ...newSermon, is_current: e.target.checked })}
                className="accent-amber-600"
              />
              <label htmlFor="is_current" className="text-sm">設為「本週講道」</label>
            </div>

            <div className="md:col-span-2 flex items-center gap-3">
              <button type="submit" disabled={submitting} className="bg-amber-600 text-white px-6 py-2 rounded-xl text-sm font-medium disabled:opacity-60">
                {editingSermonId ? '更新' : '新增講道'}
              </button>
              {editingSermonId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-300"
                >
                  取消
                </button>
              )}
            </div>
          </form>

          <div className="bg-white rounded-xl border border-amber-100 overflow-hidden text-sm">
            {sermons.length === 0 ? (
              <div className="p-6 text-gray-500">暫無講道記錄</div>
            ) : (
              sermons.map((s) => (
                <div key={s.id} className="flex flex-col md:flex-row md:items-center gap-2 px-4 py-3 border-b last:border-b-0">
                  <div className="flex-1">
                    <div className="font-medium flex items-center gap-2">
                      {s.title}
                      {s.is_current && <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full">本週</span>}
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      {s.speaker} {s.scripture && `・${s.scripture}`}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => handleToggleCurrent(s)}
                      className={`px-3 py-1 rounded-full border ${s.is_current ? "bg-amber-600 text-white border-amber-600" : "hover:bg-amber-50"}`}
                    >
                      {s.is_current ? "取消本週" : "設為本週"}
                    </button>
                    <button onClick={() => startEditSermon(s)} className="text-amber-600 hover:text-amber-700">編輯</button>
                    <button onClick={() => handleDeleteSermon(s.id)} className="text-red-600 hover:text-red-700 px-2">刪除</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
