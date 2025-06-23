"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const sermons = [
  {
    id: "1",
    cover: "/2.png",
    title: "2025-06-01 - 信仰的根基",
    youtubeLink:
      "https://www.youtube.com/watch?si=d6DuxSepmhZvTnUB&v=nMJ7VXOVjdQ&feature=youtu.be",
    audio: "/sermon1.mp3",
    scripture: "羅馬書 12:1-2",
  },

];

export default function Sermons() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const sermonsPerPage = 6;

  const filteredSermons = sermons.filter((sermon) =>
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastSermon = currentPage * sermonsPerPage;
  const indexOfFirstSermon = indexOfLastSermon - sermonsPerPage;
  const currentSermons = filteredSermons.slice(
    indexOfFirstSermon,
    indexOfLastSermon
  );
  const totalPages = Math.ceil(filteredSermons.length / sermonsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <main
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #fef9e7, #f7e4bc, #ffffff)",
      }}
    >
      <style jsx global>{`
        @keyframes showUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-serif font-bold text-gray-900 text-center mb-10 tracking-tight">
          講道重溫
        </h1>

        <div className="mb-12 text-center">
          <div className="relative w-full max-w-lg mx-auto">
            <input
              type="text"
              placeholder="搜尋講道..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 pr-4 rounded-xl border border-gray-200 bg-white bg-opacity-95 text-gray-800 text-lg font-sans focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 shadow-sm"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1114.65 6.65a7.5 7.5 0 01-5.3 2.2"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentSermons.map((sermon, index) => (
            <Link
              href={`/live?video=${encodeURIComponent(
                sermon.youtubeLink
              )}&title=${encodeURIComponent(
                sermon.title
              )}&audio=${encodeURIComponent(sermon.audio)}`}
              key={sermon.id}
              className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-[showUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-0 pb-[56.25%]">
                <Image
                  src={sermon.cover}
                  alt={sermon.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl z-20"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-300 z-10"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-serif font-semibold text-gray-900 line-clamp-2 leading-tight">
                  {sermon.title}
                </h3>
                <p className="mt-1 text-sm font-sans text-gray-600 line-clamp-1">
                  經文: {sermon.scripture}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-amber-100 text-gray-800 rounded-lg hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            上一頁
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === number
                  ? "bg-amber-400 text-white"
                  : "bg-amber-100 text-gray-800 hover:bg-amber-200"
              } transition-colors`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-amber-100 text-gray-800 rounded-lg hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            下一頁
          </button>
        </div>
      </div>
    </main>
  );
}
