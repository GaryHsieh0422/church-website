"use client";

import { useState, useEffect } from "react";

export default function ThisWeekSermons() {
  const [sermons, setSermons] = useState([
    {
      id: "1",
      title: "真。生命的糧 你食咗未?",
      scripture: "約 6:22-40",
      speaker: "申融融傳道",
      youtubeLiveUrl: "https://www.youtube.com/live/LMn0FtNwaDg",
      startDateTime: "2025-06-29 10:00 AM HKT",
    },
  ]);
  const [embedUrls, setEmbedUrls] = useState<{ [key: string]: string | null }>(
    {}
  );

  useEffect(() => {
    const fetchEmbedUrls = async () => {
      const urls = {};
      for (const sermon of sermons) {
        try {
          const urlObj = new URL(sermon.youtubeLiveUrl);
          let videoId = "";
          if (urlObj.pathname.startsWith("/live/")) {
            videoId = urlObj.pathname.split("/live/")[1];
          } else {
            videoId = urlObj.searchParams.get("v") || "";
          }
          if (videoId) {
            const isLive = true; // Placeholder; replace with YouTube Data API
            urls[sermon.id] = isLive
              ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
              : null;
          } else {
            urls[sermon.id] = null;
          }
        } catch {
          urls[sermon.id] = null;
        }
      }
      setEmbedUrls(urls);
    };
    fetchEmbedUrls();
  }, [sermons]);

  const getThumbnailUrl = (url: string): string => {
    const urlObj = new URL(url);
    let videoId = "";
    if (urlObj.pathname.startsWith("/live/")) {
      videoId = urlObj.pathname.split("/live/")[1];
    } else {
      videoId = urlObj.searchParams.get("v") || "";
    }
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : "";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fef8e8] via-[#f9f0d8] to-[#f0e2b8] py-16 font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 text-center mb-12 tracking-tight leading-tight">
          本週講道
        </h1>
        {sermons.map((sermon) => (
          <div
            key={sermon.id}
            className="bg-gradient-to-t from-amber-50 to-white rounded-2xl shadow-2xl p-8 mb-10 border border-amber-200 hover:shadow-3xl transition-shadow duration-300"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4 tracking-tight">
              {sermon.title}
            </h2>
            <p className="text-lg md:text-xl font-sans font-medium text-gray-700 mb-2">
              開始時間: {sermon.startDateTime}
            </p>
            <p className="text-lg md:text-xl font-sans font-medium text-gray-700 mb-2">
              經文: {sermon.scripture}
            </p>
            <p className="text-lg md:text-xl font-sans font-medium text-gray-700 mb-6">
              講師: {sermon.speaker}
            </p>
            <div className="aspect-video border border-amber-200 rounded-xl overflow-hidden">
                <iframe
                  src={embedUrls[sermon.id] || undefined}
                  title={`${sermon.title} Live`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl"
                ></iframe>
 
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
