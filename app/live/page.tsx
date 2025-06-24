"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Live() {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("video");
  const [title, setTitle] = useState<string>("");
  const [selectedMedia, setSelectedMedia] = useState<
    "youtube" | "audio" | null
  >(videoUrl ? "youtube" : null);
  const [youtubeError, setYoutubeError] = useState<boolean>(false);
  const [reflection, setReflection] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const titleParam = urlParams.get("title");
    if (titleParam) {
      setTitle(decodeURIComponent(titleParam));
    } else {
      const sermonTitles: Record<string, string> = {
        "https://www.youtube.com/watch?si=d6DuxSepmhZvTnUB&v=nMJ7VXOVjdQ&feature=youtu.be":
          "2025-06-01 - 信仰的根基",
      };
      setTitle(sermonTitles[videoUrl ?? ""] || "Selected Sermon");
    }
    if (reflection) {
      setReflection(decodeURIComponent(reflection));
    } else {
      const reflections = {
        "https://www.youtube.com/watch?si=d6DuxSepmhZvTnUB&v=nMJ7VXOVjdQ&feature=youtu.be":
          "你如何在日常生活中體現對神的信仰？",
      };
      setReflection(reflections[videoUrl as keyof typeof reflections] || "請反思這次講道的內容。");
    }
  }, [videoUrl]);

  const getYoutubeEmbedUrl = (url: string | null): string | null => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    } catch {
      setYoutubeError(true);
      return null;
    }
  };

  const embedUrl = getYoutubeEmbedUrl(videoUrl);
  const audioUrl = searchParams.get("audio") || "/sermon1.mp3";

  return (
    <main className="w-full min-h-screen font-sans relative bg-gradient-to-br from-[#fdfaf0] via-[#f9f0d8] to-[#f0e2b8] overflow-hidden">
      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        main::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c7a0' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2zM6 34v4h4v2H6v4H4v-4H0v-2h4v-4h2zm0-30v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          background-repeat: repeat;
          z-index: 0;
        }
        .container {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center tracking-tight leading-tight animate-fadeInUp">
            {title}
          </h2>
          <div className="w-full max-w-5xl animate-fadeInUp animation-delay-200">
            {selectedMedia === "youtube" && embedUrl && !youtubeError ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <iframe
                  src={embedUrl}
                  title={title}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0"
                />
              </div>
            ) : selectedMedia === "youtube" && youtubeError ? (
              <div className="text-center text-red-600 bg-red-50 p-6 rounded-xl text-lg font-medium shadow-sm">
                YouTube 影片無法載入，請檢查連結或稍後再試。
              </div>
            ) : selectedMedia === "audio" && audioUrl ? (
              <audio
                controls
                className="w-full rounded-xl bg-white p-6 shadow-lg border border-gray-100"
              >
                <source src={audioUrl} type="audio/mpeg" />
                您的瀏覽器不支援音頻播放。
              </audio>
            ) : (
              <div className="text-center text-gray-600 text-xl font-medium">
                請選擇播放方式：
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp animation-delay-400">
            <button
              onClick={() => setSelectedMedia("youtube")}
              className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md ${
                selectedMedia === "youtube"
                  ? "bg-amber-600 text-white"
                  : "bg-amber-50 text-gray-800 hover:bg-amber-100 hover:shadow-lg"
              }`}
              aria-label="播放 YouTube 影片"
            >
              YouTube 影片
            </button>
            <button
              onClick={() => setSelectedMedia("audio")}
              className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md ${
                selectedMedia === "audio"
                  ? "bg-amber-600 text-white"
                  : "bg-amber-50 text-gray-800 hover:bg-amber-100 hover:shadow-lg"
              }`}
              aria-label="播放音頻"
            >
              音頻播放
            </button>
          </div>
          <p className="text-3xl font-bold text-black text-center my-8">
            {reflection}
          </p>
          <Link
            href="/sermons"
            className="mt-6 px-8 py-3 rounded-xl text-lg font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 shadow-md animate-fadeInUp animation-delay-600"
            aria-label="返回講道頁面"
          >
            返回講道
          </Link>
        </div>
      </div>
    </main>
  );
}
