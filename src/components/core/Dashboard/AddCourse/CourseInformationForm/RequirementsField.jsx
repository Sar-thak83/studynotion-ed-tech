import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

const RequirementsField = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [courseRequirements, setCourseRequirements] = useState([]);
  const { editCourse, course } = useSelector((state) => state.addCourse);

  useEffect(() => {
    if (editCourse) setCourseRequirements(course?.instructions);

    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, courseRequirements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseRequirements]);

  const handleRequirementAdd = () => {
    const requirementValue = getValues("requirement");
    if (requirementValue && !courseRequirements.includes(requirementValue)) {
      setCourseRequirements([...courseRequirements, requirementValue]);
      setValue("requirement", "");
    }
  };

  const handleRequirementDelete = (reqInd) => {
    const updatedReqs = courseRequirements.filter((_, ind) => ind !== reqInd);
    setCourseRequirements(updatedReqs);
  };

  return (
    <div className="flex flex-col">
      <label
        className="mb-[8px] text-[14px] text-[#F1F2FF]"
        htmlFor="requirement"
      >
        {label} <sup className="text-[#EF476F]">*</sup>
      </label>
      <input
        type="text"
        id={"requirement"}
        placeholder={placeholder}
        className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
        {...register("requirement")}
      />
      {errors[name] && (
        <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
          {label} are required
        </p>
      )}

      <button
        type="button"
        onClick={handleRequirementAdd}
        className="font-semibold text-[#E7C009] text-left mt-2"
      >
        Add
      </button>

      <div>
        {courseRequirements.length > 0 && (
          <ul className="mt-2 list-inside list-disc ">
            {courseRequirements.map((req, ind) => (
              <li
                key={ind}
                className="flex items-center gap-x-2 text-[#F1F2FF] "
              >
                {req}
                <button
                  type="button"
                  className=" text-[#888888] font-semibold"
                  onClick={() => handleRequirementDelete(ind)}
                >
                  <MdClose />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RequirementsField;
