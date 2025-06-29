"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Donate() {
  const [donationData] = useState({
    bankAccount: "123-456-789-012",
    bankName: "Example Bank",
    fpsId: "987654321",
    atmInstruction: "存款至指定銀行賬戶，櫃員機存款後請保留收據。",
    onlineBanking:
      "收款人名稱：\n如個別網上銀行限制收款人名稱字母數目，請順序由左至右輸入，直至受限制為止。",
    fpsQR: "/2.png",
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const donationMethods = [
    {
      title: "郵寄支票",
      content: (
        <div>
          <p>請將支票抬頭寫為「中國基督教播道會雅博堂」並郵寄到教會地址。</p>
        </div>
      ),
    },
    {
      title: "轉數快 FPS",
      content: (
        
        <div className="space-y-3">
          <p>
            <span className="font-semibold">轉數快 ID:</span> {donationData.fpsId}
          </p>
          <Image
            src={donationData.fpsQR}
            alt="FPS QR Code"
            width={200}
            height={200}
            className="rounded-lg shadow-md"
          />
        </div>

      ),
    },
    {
      title: "櫃員機 ATM",
      content: (
        <div className="space-y-3">
          <p>
            <span className="font-semibold">銀行名稱:</span>{" "}
            {donationData.bankName}
          </p>
          <p>
            <span className="font-semibold">戶口號碼:</span>{" "}
            {donationData.bankAccount}
          </p>
          <p>{donationData.atmInstruction}</p>
        </div>
      ),
    },
    {
      title: "網上銀行",
      content: (
        <div className="space-y-3">
          <p>
            <span className="font-semibold">銀行名稱:</span>{" "}
            {donationData.bankName}
          </p>
          <p>
            <span className="font-semibold">戶口號碼:</span>{" "}
            {donationData.bankAccount}
          </p>
          <p className="whitespace-pre-line">{donationData.onlineBanking}</p>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div
        className="relative bg-cover bg-center h-96 flex items-center justify-center"
        style={{
          backgroundImage: "url('/donation-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        <div className="relative text-center z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            奉獻
          </h1>
        </div>
      </div>
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
          {donationMethods.map((method, index) => (
            <div
              key={index}
              className="border-b border-amber-100 last:border-b-0"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-6 px-8 text-left text-xl font-serif text-gray-800 hover:bg-amber-50/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-expanded={openIndex === index}
                aria-controls={`accordion-content-${index}`}
              >
                <span className="font-semibold">{method.title}</span>
                <ChevronDownIcon
                  className={`w-6 h-6 text-amber-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`accordion-content-${index}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-[600px] py-8 px-8" : "max-h-0"
                }`}
              >
                <div className="text-base md:text-lg font-serif text-gray-700 leading-relaxed">
                  {method.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-3xl shadow-2xl p-10 text-gray-800 border border-amber-100">
          <h2 className="text-2xl font-serif font-semibold text-amber-800 mb-6">
            奉獻須知
          </h2>
          <p className="mb-8 text-base md:text-lg font-serif leading-relaxed">
            感謝您以奉獻支持教會事工！請將「支票」、「銀行收據」、「轉數記錄」、「轉數快
            FPS」、櫃員機或網上銀行「交易詳情」，連同個人資料（姓名、身份證中間六個號碼及聯絡電話）及註明堂點，郵寄或電郵至
            <a
              href="mailto:tfc.donation@tungfook.com"
              className="text-amber-600 hover:text-amber-700 hover:underline font-medium transition-colors duration-200"
            >
              tfc.donation@tungfook.com
            </a>
            (支票不適用於電郵)；以作記錄。如未能提供以上資料，將無法發出有效奉獻收據。若無特別註明奉獻用途（例如：常費、慈惠、宣教等），全數將撥作「建堂基金」。
          </p>
          <div className="text-base md:text-lg font-serif leading-relaxed">
            <p className="font-semibold mb-4 text-amber-800">備註：</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                在奉獻轉賬日起計 7
                天內，若未收到奉獻者的個人資料及奉獻用途，教會將以無名氏身份把奉獻金額撥作「建堂基金」。
              </li>
              <li>
                在奉獻轉賬日起計 7 天內，若未收到轉賬副本，恕未能安排奉獻收據。
              </li>
              <li>教會於每年 4 月底發出該年度奉獻收據。</li>
              <li>
                教會不會代弟兄姊妹轉交奉獻或奉獻收據予其他機構或特別指定之肢體。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
