import React, { useEffect, useRef, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SectionAccordion = ({
  section,
  currentOpenSection,
  setCurrentOpenSection,
  currentSubSection,
  setCurrentSubSection,
}) => {
  const { courseData, completedVideos } = useSelector(
    (state) => state.viewCourse
  );
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);
  const sectionEle = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsSectionOpen(section._id === currentOpenSection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOpenSection]);

  useEffect(() => {
    setSectionHeight(isSectionOpen ? sectionEle?.current?.scrollHeight : 0);
  }, [isSectionOpen]);

  return (
    <div className="mt-2 cursor-pointer text-sm text-[F1F2FF]">
      <div
        className="px-2 md:px-5 py-2 flex items-center justify-between gap-2 bg-[#2C333F]"
        onClick={() => setCurrentOpenSection(section._id)}
      >
        <p className="w-[70%] font-semibold ">{section.title}</p>
        <i
          className={`${
            isSectionOpen && "rotate-90"
          }  translate-all duration-[0.35s] ease-[ease]`}
        >
          <AiOutlineRight />
        </i>
      </div>

      <div
        ref={sectionEle}
        className="overflow-hidden bg-[#161D29] h-0 transition-all duration-[0.35s] ease-[ease]"
        style={{ height: sectionHeight }}
      >
        {section.subSections.map((subSection, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(
                `/view-course/${courseData._id}/section/${section._id}/sub-section/${subSection._id}`
              )
            }
            className={`flex gap-3 px-2 md:px-5 py-5 md:py-2 items-center
              ${
                subSection._id === currentSubSection._id
                  ? "bg-[#CFAB08] font-semibold text-[#161D29]"
                  : "hover:bg-[#000814] text-[#DBDDEA]"
              }
              `}
          >
            <input
              type="checkbox"
              checked={completedVideos.includes(subSection._id)}
              onChange={() => {}}
              className="check-box-style"
            />

            <p>{subSection.title.substring(0, 50)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionAccordion;
