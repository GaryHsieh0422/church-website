"use client";

const Map = () => {
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

  return (
    <div className="min-h-screen flex items-center justify-center relative border-2 border-solid border-white">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: "url('/church.png')",
          filter: "blur(8px)",
          backgroundSize: "cover",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      />
      <div className="relative text-center max-w-5xl w-full z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 font-serif font-lora tracking-tight drop-shadow-md">
          我們的地址
        </h1>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-start">
          {locations.map((location, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-amber-100 via-white to-orange-100 bg-opacity-80 p-8 rounded-2xl shadow-2xl text-gray-900 hover:bg-opacity-95 hover:scale-105 hover:-rotate-1 hover:shadow-[0_10px_20px_rgba(251,191,36,0.5)] transition-all duration-300 ease-in-out w-full sm:w-1/2 max-w-md border-2 border-solid border-amber-400 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute top-4 left-4 w-6 h-6 bg-amber-300 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent border-b-2 border-amber-200 pb-3 pl-8 font-serif font-lora tracking-tight drop-shadow-sm">
                {location.title}
              </h2>
              <p className="mt-4 text-lg font-serif font-lora text-amber-600 font-medium drop-shadow-sm leading-relaxed">
                {location.address}
              </p>
              <iframe
                src={location.embedUrl}
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "8px", marginTop: "16px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
