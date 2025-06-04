"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen] = useState(false);

  return (
    <>
      <div className="min-h-[100px]"></div>

      <nav className="bg-amber-100 w-full">
        <div className="px-4 py-3 mx-auto flex justify-center">
          <div className="flex items-center w-full">
            <ul
              className={`flex flex-col md:flex-row font-medium mt-0 space-y-2 md:space-y-0 md:space-x-4 rtl:space-x-reverse text-sm w-full justify-between ${
                isOpen ? "block" : "hidden md:flex"
              }`}
              id="navbar-menu"
            >
              {[
                { href: "/", text: "主頁" },
                { href: "/sermons", text: "講道重溫" },
                { href: "/about", text: "關於教會" },
                { href: "/this-week-sermon", text: "本週講道" },
                { href: "/donate", text: "奉獻" },
              ].map((item) => (
                <li className="flex-1" key={item.text}>
                  <Link href={item.href} passHref>
                    <button className="w-full text-gray-800 hover:text-amber-700 hover:underline hover:decoration-2 hover:underline-offset-4 transition-colors duration-200 font-medium tracking-wide py-2 px-4 text-center">
                      {item.text}
                    </button>
                  </Link>
                </li>
              ))}
              <li className="flex-1 relative group">
                <button className="w-full text-gray-800 hover:text-amber-700 hover:underline hover:decoration-2 hover:underline-offset-4 transition-colors duration-200 font-medium tracking-wide py-2 px-4 text-center flex items-center justify-center">
                  資源下載
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <ul className="absolute hidden group-hover:block bg-amber-50 shadow-lg rounded-md mt-1 w-40 z-10 left-1/2 transform -translate-x-1/2">
                  {[
                    { href: "/resources/newsletter", text: "電子週刊" },
                    { href: "/resources/annual-report", text: "年報" },
                  ].map((subItem) => (
                    <li key={subItem.text}>
                      <Link href={subItem.href} passHref>
                        <button className="w-full text-gray-800 hover:bg-amber-100 hover:text-amber-700 hover:underline hover:decoration-2 hover:underline-offset-4 transition-colors duration-200 font-normal tracking-normal py-2 px-4 text-sm text-center">
                          {subItem.text}
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
