import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { AnnualReport } from "@/types/supabase";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 10;

export default async function AnnualReport({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const searchTerm = (params.search || "").trim().toLowerCase();

  const supabase = await createClient();

  // Base query with optional search filter
  let query = supabase
    .from("annual_reports")
    .select("*", { count: "exact" })
    .order("year", { ascending: false });

  if (searchTerm) {
    // Filter years that contain the search term (e.g. "2024" or "25")
    query = query.ilike("year", `%${searchTerm}%`);
  }

  // Get total count for pagination
  const { count } = await query;

  const totalItems = count || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  // Fetch paginated data
  let dataQuery = supabase
    .from("annual_reports")
    .select("*")
    .order("year", { ascending: false })
    .range((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE - 1);

  if (searchTerm) {
    dataQuery = dataQuery.ilike("year", `%${searchTerm}%`);
  }

  const { data: reports, error } = await dataQuery;

  // Apply client-side filter as safety net (in case range + ilike order matters)
  const filteredReports = searchTerm
    ? (reports || []).filter((r: AnnualReport) => r.year.toLowerCase().includes(searchTerm))
    : (reports || []);

  // Build pagination URL helper
  const buildUrl = (page: number, search: string) => {
    const sp = new URLSearchParams();
    if (page > 1) sp.set("page", page.toString());
    if (search) sp.set("search", search);
    const qs = sp.toString();
    return `/resources/annual-report${qs ? `?${qs}` : ""}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fdfaf0] via-[#f9f0d8] to-[#f0e2b8] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-gray-900 text-center mb-8 tracking-tight leading-tight">
          雅博堂年報
        </h1>

        {/* Filter */}
        <div className="mb-6 flex justify-center">
          <form method="GET" className="flex w-full max-w-md gap-2">
            <input
              type="text"
              name="search"
              defaultValue={searchTerm}
              placeholder="搜尋年份"
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
                href="/resources/annual-report"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-300"
              >
                清除
              </Link>
            )}
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            載入年報時發生錯誤。請稍後再試。
          </div>
        )}

        {!filteredReports || filteredReports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-amber-100 p-12 text-center">
            <p className="text-gray-600 text-lg">找不到符合條件的年報。</p>
            {searchTerm && (
              <Link href="/resources/annual-report" className="text-amber-600 hover:underline mt-2 inline-block">
                查看全部年報
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-amber-50">
                    <th className="p-6 text-left text-xl font-serif font-semibold text-gray-800 tracking-wide">
                      年份
                    </th>
                    <th className="p-6 text-left text-xl font-serif font-semibold text-gray-800 tracking-wide">
                      下載
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredReports as AnnualReport[]).map((report) => (
                    <tr
                      key={report.id}
                      className="border-t border-amber-100 hover:bg-amber-50 transition-colors duration-200"
                    >
                      <td className="p-6 text-lg font-serif text-gray-700">
                        {report.year}
                      </td>
                      <td className="p-6">
                        <a
                          href={report.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-amber-600 hover:text-amber-800 font-serif text-lg underline transition-colors duration-200 hover:scale-105 transform"
                        >
                          下載 PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
