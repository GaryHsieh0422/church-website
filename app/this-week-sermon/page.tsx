import { createClient } from "@/lib/supabase/server";
import type { Sermon } from "@/types/supabase";

export const dynamic = "force-dynamic";

function getYouTubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    let videoId = "";
    if (urlObj.pathname.startsWith("/live/")) {
      videoId = urlObj.pathname.split("/live/")[1];
    } else {
      videoId = urlObj.searchParams.get("v") || "";
    }
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
  } catch {
    return null;
  }
}

export default async function ThisWeekSermon() {
  const supabase = await createClient();

  // Prefer the one explicitly marked current. Fall back to the most recent by start time or created_at.
  const { data: currentSermons } = await supabase
    .from("sermons")
    .select("*")
    .eq("is_current", true)
    .limit(1);

  let sermon: Sermon | null = (currentSermons && currentSermons[0]) as Sermon | null;

  if (!sermon) {
    const { data: latest } = await supabase
      .from("sermons")
      .select("*")
      .order("start_datetime", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(1);
    sermon = (latest && latest[0]) as Sermon | null;
  }

  const embedUrl = sermon ? getYouTubeEmbedUrl(sermon.youtube_url) : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fef8e8] via-[#f9f0d8] to-[#f0e2b8] py-16 font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 text-center mb-12 tracking-tight leading-tight">
          本週講道
        </h1>

        {!sermon ? (
          <div className="bg-white/90 rounded-2xl shadow-xl p-12 text-center border border-amber-200">
            <p className="text-gray-600 text-xl">本週講道即將公佈。</p>
            <p className="text-sm text-gray-500 mt-2">請稍後再查看或聯絡教會。</p>
          </div>
        ) : (
          <div className="bg-gradient-to-t from-amber-50 to-white rounded-2xl shadow-2xl p-8 mb-10 border border-amber-200 hover:shadow-3xl transition-shadow duration-300">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4 tracking-tight">
              {sermon.title}
            </h2>

            {sermon.start_datetime && (
              <p className="text-lg md:text-xl font-sans font-medium text-gray-700 mb-2">
                開始時間：{new Date(sermon.start_datetime).toLocaleString("zh-HK", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            )}
            {sermon.scripture && (
              <p className="text-lg md:text-xl font-sans font-medium text-gray-700 mb-2">
                經文：{sermon.scripture}
              </p>
            )}
            {sermon.speaker && (
              <p className="text-lg md:text-xl font-sans font-medium text-gray-700 mb-6">
                講師：{sermon.speaker}
              </p>
            )}

            {embedUrl ? (
              <div className="aspect-video border border-amber-200 rounded-xl overflow-hidden bg-black">
                <iframe
                  src={embedUrl}
                  title={sermon.title}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl"
                />
              </div>
            ) : sermon.youtube_url ? (
              <a
                href={sermon.youtube_url}
                target="_blank"
                className="block text-center py-8 text-amber-700 underline"
              >
                點擊觀看 YouTube 直播 / 錄影
              </a>
            ) : (
              <div className="aspect-video bg-amber-100 rounded-xl flex items-center justify-center text-gray-500">
                暫無影片連結
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
