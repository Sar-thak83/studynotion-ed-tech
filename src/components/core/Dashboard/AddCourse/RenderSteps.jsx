import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformationForm/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilderForm/CourseBuilderForm";
import PublishCourse from "./PublishCourse/PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.addCourse);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div>
      <div className="flex w-full justify-center mb-2">
        {steps.map((item) => (
          <Fragment key={item.id}>
            <div
              className={`grid place-items-center aspect-square rounded-full w-[34px] border select-none
                ${item.id < step && "bg-[#FFD60A] text-[#FFD60A]"}
                ${
                  item.id === step &&
                  "border-[#FFD60A] bg-[#251400] text-[#FFD60A]"
                }
                ${
                  item.id > step &&
                  "border-[#2C333F] bg-[#161D29] text-[#838894]"
                }
              `}
            >
              {item.id < step ? (
                <FaCheck className="font-bold text-[#000814]" />
              ) : (
                item.id
              )}
            </div>

            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%] border-b-2 border-dashed 
                  ${item.id < step ? "border-[#FFD60A]" : "border-[#585D69]"}
                  `}
                ></div>
              </>
            )}
          </Fragment>
        ))}
      </div>

      <div className="mb-10 md:mb-16">
        <div className="hidden md:flex justify-between select-none ">
          {steps.map((item) => (
            <div
              key={item.id}
              className={`min-w-[130px] text-center text-sm 
              ${item.id <= step ? "text-[#F1F2FF]" : "text-[#585D69]"}`}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden font-semibold mb-5 text-xl">
        {step === 1 && "CourseInformationForm"}
        {step === 2 && "CourseBuilderForm"}
        {step === 3 && "PublishCourse"}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
};

export default RenderSteps;
