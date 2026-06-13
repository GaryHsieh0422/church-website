import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Sermon } from "@/types/supabase";

export const dynamic = "force-dynamic";

export default async function Sermons() {
  const supabase = await createClient();

  // Exclude the current week's sermon (本週講道) from the archive
  const { data: sermonsData, error } = await supabase
    .from("sermons")
    .select("*")
    .eq("is_current", false)
    .order("start_datetime", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  const sermons = (sermonsData as Sermon[]) || [];

  // Simple client-side pagination will be added if needed; for now show all (or first 12)
  const displaySermons = sermons.slice(0, 24);

  return (
    <main
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #fef9e7, #f7e4bc, #ffffff)",
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-serif font-bold text-gray-900 text-center mb-10 tracking-tight">
          講道重溫
        </h1>

        {error && (
          <div className="max-w-lg mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 text-center">
            載入講道時發生錯誤。
          </div>
        )}

        {sermons.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-10 text-center">
            <p className="text-gray-600">目前暫無講道記錄。</p>
            <p className="text-sm text-gray-500 mt-2">管理員可於 /admin 新增講道。</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displaySermons.map((sermon) => {
                const href = `/live?video=${encodeURIComponent(
                  sermon.youtube_url || ""
                )}&title=${encodeURIComponent(sermon.title)}${
                  sermon.audio_url
                    ? `&audio=${encodeURIComponent(sermon.audio_url)}`
                    : ""
                }`;

                return (
                  <Link
                    href={href}
                    key={sermon.id}
                    className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-0 pb-[56.25%] bg-gray-100">
                      {sermon.cover_image_url ? (
                        <Image
                          src={sermon.cover_image_url}
                          alt={sermon.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                          講道重溫
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-serif font-semibold text-gray-900 line-clamp-2 leading-tight">
                        {sermon.title}
                      </h3>
                      {sermon.scripture && (
                        <p className="mt-1 text-sm font-sans text-gray-600 line-clamp-1">
                          經文：{sermon.scripture}
                        </p>
                      )}
                      {sermon.speaker && (
                        <p className="mt-0.5 text-sm font-sans text-gray-500">
                          {sermon.speaker}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

          </>
        )}
      </div>
    </main>
  );
}
