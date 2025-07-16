import React from "react";

const stats = [
  { count: "5K+", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StudyNotionStats = () => {
  return (
    <div className="bg-[#2C333F]">
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {stats.map((stat, index) => (
            <div className="flex flex-col py-5 lg:py-10" key={index}>
              <h1 className="text-[#F1F2FF] font-bold text-2xl lg:text-3xl ">
                {stat.count}
              </h1>
              <h2 className="font-semibold text-base text-[#585D69]">
                {stat.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyNotionStats;
