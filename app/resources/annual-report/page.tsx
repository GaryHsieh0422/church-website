"use client";

import { useState } from "react";

export default function AnnualReport() {
  const [reports] = useState([
    { id: "1", year: "2024", fileUrl: "/reports/2024-annual-report.pdf" },
    { id: "2", year: "2023", fileUrl: "/2.png" },
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fdfaf0] via-[#f9f0d8] to-[#f0e2b8] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-gray-900 text-center mb-12 tracking-tight leading-tight animate-fade-in">
          雅博堂年報
        </h1>
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
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-t border-amber-100 hover:bg-amber-50 transition-colors duration-200"
                >
                  <td className="p-6 text-lg font-serif text-gray-700">
                    {report.year}
                  </td>
                  <td className="p-6">
                    <a
                      href={report.fileUrl}
                      download
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
      </div>
    </main>
  );
}
