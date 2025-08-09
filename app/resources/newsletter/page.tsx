"use client";
import Image from "next/image";

const announcements = [
  {
    id: "1",
    title: "MJ牧區「真理探險隊」暑期學校",
    content:
      "將於7月14-18日0在舉行，內容包括遊戲、信息、戶外活動及服侍。歡迎K2至小三小朋友參加。費用$200 (包戶外活動及午餐)。查詢及報名請聯絡申融融傳道或兒童導師。",
    date: "2025-06-28",
    image: "/2.png",
  },
];

export default function Newsletter() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-gray-900 text-center mb-12 tracking-tight leading-tight animate-fade-in">
          電子週刊
        </h1>

        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-8 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4 tracking-wide">
              {announcement.title}
            </h3>
            <div className="mb-6">
              <Image
                src={announcement.image}
                alt={announcement.title}
                width={0} 
                height={192} 
                layout="responsive" 
              />
            </div>
            <p className="text-gray-600 text-base sm:text-lg font-sans leading-relaxed mb-4">
              {announcement.content}
            </p>
            <p className="text-sm text-gray-500 font-sans italic">
              日期: {announcement.date}
            </p>
            {index < announcements.length - 1 && (
              <hr className="my-6 border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
