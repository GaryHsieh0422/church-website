import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Newsletter } from "@/types/supabase";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 5;

export default async function Newsletter({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const searchTerm = (params.search || "").trim().toLowerCase();

  const supabase = await createClient();

  // Count query with filter
  let countQuery = supabase
    .from("newsletters")
    .select("*", { count: "exact" })
    .order("date", { ascending: false });

  if (searchTerm) {
    countQuery = countQuery.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
  }

  const { count } = await countQuery;

  const totalItems = count || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  // Data query with pagination + filter
  let dataQuery = supabase
    .from("newsletters")
    .select("*")
    .order("date", { ascending: false })
    .range((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE - 1);

  if (searchTerm) {
    dataQuery = dataQuery.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
  }

  const { data: newsletters, error } = await dataQuery;

  const buildUrl = (page: number, search: string) => {
    const sp = new URLSearchParams();
    if (page > 1) sp.set("page", page.toString());
    if (search) sp.set("search", search);
    const qs = sp.toString();
    return `/resources/newsletter${qs ? `?${qs}` : ""}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-gray-900 text-center mb-8 tracking-tight leading-tight">
          電子週刊
        </h1>

        {/* Filter */}
        <div className="mb-8 flex justify-center">
          <form method="GET" className="flex w-full max-w-lg gap-2">
            <input
              type="text"
              name="search"
              defaultValue={searchTerm}
              placeholder="搜尋標題或內容"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700"
            >
              搜尋
            </button>
            {searchTerm && (
              <Link
                href="/resources/newsletter"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-300 flex items-center"
              >
                清除
              </Link>
            )}
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            載入電子週刊時發生錯誤。請稍後再試。
          </div>
        )}

        {!newsletters || newsletters.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">找不到符合條件的電子週刊。</p>
            {searchTerm && (
              <Link href="/resources/newsletter" className="text-amber-600 hover:underline mt-2 inline-block">
                查看全部
              </Link>
            )}
          </div>
        ) : (
          <>
            {(newsletters as Newsletter[]).map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-8 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 font-sans mb-4">日期：{item.date}</p>

                {item.image_url && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-amber-100">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-auto max-h-[420px] object-cover"
                    />
                  </div>
                )}

                <div className="text-gray-700 font-sans leading-relaxed whitespace-pre-line">
                  {item.content}
                </div>

                {index < (newsletters.length - 1) && (
                  <hr className="my-8 border-gray-200" />
                )}
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2 text-sm">
                <Link
                  href={buildUrl(Math.max(1, safePage - 1), searchTerm)}
                  className={`px-4 py-2 rounded-lg border ${safePage === 1 ? "pointer-events-none opacity-50 bg-gray-100" : "bg-white hover:bg-amber-50"}`}
                >
                  上一頁
                </Link>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={buildUrl(pageNum, searchTerm)}
                    className={`px-4 py-2 rounded-lg border ${pageNum === safePage ? "bg-amber-600 text-white border-amber-600" : "bg-white hover:bg-amber-50"}`}
                  >
                    {pageNum}
                  </Link>
                ))}

                <Link
                  href={buildUrl(Math.min(totalPages, safePage + 1), searchTerm)}
                  className={`px-4 py-2 rounded-lg border ${safePage === totalPages ? "pointer-events-none opacity-50 bg-gray-100" : "bg-white hover:bg-amber-50"}`}
                >
                  下一頁
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
