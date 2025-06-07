import React from "react";

const ScheduleBlock = ({
  title,
  date,
  time,
}: {
  title: string;
  date: string;
  time: React.ReactNode;
}) => (
  <div className="relative bg-gradient-to-br from-amber-100 via-white to-orange-100 bg-opacity-80 p-8 rounded-2xl shadow-2xl text-gray-900 hover:bg-opacity-95 hover:scale-105 hover:-rotate-1 hover:shadow-[0_10px_20px_rgba(251,191,36,0.5)] transition-all duration-300 ease-in-out w-full max-w-sm mx-auto border-2 border-solid border-amber-400 backdrop-blur-sm overflow-hidden">
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent border-b-2 border-amber-200 pb-3 pl-8 font-serif font-lora">
      {title}
    </h3>
    <p className="mt-4 text-lg font-serif font-lora text-amber-600 font-medium drop-shadow-sm">
      {date}
    </p>
    <p className="mt-3 text-lg font-serif font-lora text-orange-600 font-medium drop-shadow-sm">
      {time}
    </p>
  </div>
);

const Schedule = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative border-2 border-solid border-white">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/image.png')",
            filter: "blur(8px)",
            backgroundSize: "cover",
            backgroundColor: "rgba(0, 0, 0, 0.2)",

          }}
        />
      </div>
      <div className="relative text-center max-w-4xl w-full z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-serif font-lora">
          崇拜時間表
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-center">
          <ScheduleBlock
            title="成人崇拜"
            date="週日上午"
            time="10:00 - 11:30"
          />
          <ScheduleBlock
            title="兒童崇拜"
            date="週日上午"
            time="10:00 - 11:30"
          />
          <ScheduleBlock
            title="家庭崇拜及家聚"
            date="每月第二週合堂崇拜"
            time={
              <>
                家庭崇拜：10:00 - 11:30
                <br />
                家聚：11:30 - 13:00
              </>
            }
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-center">
          <ScheduleBlock
            title="少年GPS慶典"
            date="每月第三個週六"
            time="15:00 - 18:00"
          />
          <ScheduleBlock title="少年小組" date="週六" time="16:00 - 18:00" />
          <ScheduleBlock
            title="祈禱會"
            date="每月第三個崇拜後"
            time="11:30 - 13:00"
          />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
