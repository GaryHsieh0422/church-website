"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TimelineItem {
  id: string;
  title: string;
  content: string;
  subItems?: string[];
  image?: string;
}

export default function About() {
  const [timelineItems] = useState<TimelineItem[]>([
    {
      id: "1",
      title: "關於教會",
      content: "test",
      image: "/1.png", 
    },
    {
      id: "2",
      title: "我們是誰",
      content: "test",
      image: "/1.png",
    },
    {
      id: "3",
      title: "我們的使命與願景",
      content: "test",
    },
    {
      id: "4",
      title: "核心價值",
      content: "test",
    },
    {
      id: "5",
      title: "認識我們的團隊",
      content: "test",
    },
    {
      id: "6",
      title: "我們的部門",
      content: "test",
    },
    {
      id: "7",
      title: "我們的歷程",
      content: "test",
    },
    {
      id: "8",
      title: "來訪我們",
      content: "test",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
    },
  };

  const markerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100/30 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-center mb-16 tracking-tight leading-tight drop-shadow-lg relative"
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
            關於教會
          </span>
          <motion.span
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </motion.h1>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute left-10 w-1.5 bg-gradient-to-b from-amber-400 to-amber-600 h-full rounded-full shadow-lg"></div>
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative mb-16 flex items-start"
              variants={cardVariants}
            >
              <div className="flex-shrink-0 w-20 flex justify-center relative">
                <motion.div
                  className="w-12 h-12 bg-amber-500 rounded-full absolute top-3 z-10 border-4 border-white shadow-xl flex items-center justify-center text-white font-serif font-bold text-lg"
                  variants={markerVariants}
                  whileHover={{
                    scale: 1.25,
                    backgroundColor: "#b45309",
                    rotate: 10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {index + 1}
                </motion.div>
              </div>
              <div className="flex-1 pl-8">
                <motion.div
                  className="bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-amber-200/30 p-6 sm:p-8 hover:bg-amber-50/90 transition-all duration-300"
                  onClick={() =>
                    setSelectedItem(selectedItem === item.id ? null : item.id)
                  }
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  variants={cardVariants}
                >
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-semibold text-gray-800 mb-4 tracking-tight">
                    {item.title}
                  </h2>
                  <AnimatePresence>
                    {selectedItem === item.id && (
                      <motion.div
                        className="mt-4"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{
                          opacity: 0,
                          y: 20,
                          transition: { duration: 0.3 },
                        }}
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/3">
                            {item.image ? (
                              <motion.div
                                className="w-full h-48 rounded-lg overflow-hidden relative shadow-inner"
                                variants={contentVariants}
                              >
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-lg"
                                  priority={index === 0}
                                />
                              </motion.div>
                            ) : (
                              <motion.div
                                className="w-full h-48 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center text-gray-600 text-base font-sans font-medium shadow-inner"
                                variants={contentVariants}
                              ></motion.div>
                            )}
                          </div>
                          <div className="md:w-2/3">
                            {item.subItems ? (
                              <ul className="list-none space-y-4 text-base font-sans text-gray-700 leading-relaxed">
                                {item.subItems.map((subItem, subIndex) => (
                                  <li
                                    key={subIndex}
                                    className="flex items-start"
                                  >
                                    <span className="text-amber-500 mr-2 text-xl leading-none">
                                      •
                                    </span>
                                    <div>
                                      <strong className="text-amber-700 font-semibold text-lg">
                                        {subItem}
                                      </strong>
                                      <p className="mt-1 text-gray-600 text-base leading-relaxed">
                                        {item.content}
                                      </p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-base sm:text-lg font-sans text-gray-600 leading-relaxed tracking-wide">
                                {item.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}