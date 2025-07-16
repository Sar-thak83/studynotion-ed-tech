import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ course, currentCard, setCurrentCard }) => {
  return (
    <div
      onClick={() => setCurrentCard(course.heading)}
      className={`w-[360px] lg:w-[30%] h-[300px]  cursor-grab text-[#DBDDEA]
      ${
        course.heading === currentCard
          ? "bg-white shadow-[12px_12px_0_0] shadow-[#FFD60A]"
          : "bg-[#161D29]"
      }`}
    >
      <div className=" flex flex-col gap-3 h-[80%] p-6 border-b-2 border-dashed border-[#6E727F]">
        <h2
          className={`font-semibold text-xl
        ${course?.heading === currentCard && "text-[#161D29]"}`}
        >
          {course.heading}
        </h2>
        <h2 className="text-[#6E727F]">{course.description}</h2>
      </div>

      <div
        className={`flex flex-row justify-between px-6 py-3 font-medium
              ${
                course?.heading === currentCard
                  ? "text-[#0F7A9D]"
                  : "text-[#838894]"
              }`}
      >
        <div className="flex flex-row items-center gap-2 text-base">
          <HiUsers />
          {course.level}
        </div>

        <div className="flex flex-row items-center  gap-2 text-base">
          <ImTree />
          {course.lessionNumber} Lesson
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
