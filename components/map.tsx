"use client";

import { useEffect, useState } from "react";

interface MapProps {
  backgroundImage?: string;
  blurLevel?: number;
  overlayOpacity?: number;
}

const Map = ({
  backgroundImage = "/church.png",
  blurLevel = 8,
  overlayOpacity = 0.3,
}: MapProps) => {
  const locations = [
    {
      title: "堂址",
      address: "東涌馬灣新村28號地下及一樓",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.131!2d113.9394!3d22.2878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE3JzE2LjEiTiAxMTPCsDU2JzI5LjUiRQ!5e0!3m2!1sen!2shk!4v1630000000000",
    },
    {
      title: "崇拜地址",
      address: "東涌富東邨寶安商會溫浩根小學禮堂",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.094!2d113.9418!3d22.2885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE3JzE4LjYiTiAxMTPCsDU2JzQxLjUiRQ!5e0!3m2!1sen!2shk!4v1630000000000",
    },
  ];

  const [bgImage, setBgImage] = useState(backgroundImage);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onerror = () => {
      setBgImage("/fallback-bg.png");
    };
  }, [backgroundImage]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center font-lora bg-gray-900">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap");
        .font-lora {
          font-family: "Lora", "Times New Roman", serif;
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: `blur(${blurLevel}px)`,
            backgroundSize: "cover",
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          }}
        />
      </div>
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 tracking-tight text-white drop-shadow-lg leading-tight sm:leading-snug">
          我們的地址
        </h1>
        {locations.map((location, index) => (
          <div key={index} className="w-full mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 tracking-wide text-white drop-shadow-md leading-snug">
              {location.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-gray-200 drop-shadow-sm max-w-prose">
              {location.address}
            </p>
            <iframe
              src={location.embedUrl}
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-4 sm:mt-6 w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
