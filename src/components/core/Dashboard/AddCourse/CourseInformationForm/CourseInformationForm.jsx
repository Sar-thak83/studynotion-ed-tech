import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { MdNavigateNext } from "react-icons/md";
import { setCourse, setStep } from "../../../../../redux/slices/addCourseSlice";
import {
  addCourse,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseServices";
import ChipInput from "./ChipInput";
import UploadFile from "../UploadFile";
import RequirementsField from "./RequirementsField";
import toast from "react-hot-toast";

const CourseInformationForm = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { editCourse, course } = useSelector((state) => state.addCourse);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      setCourseCategories(categories);
      setLoading(false);
    };
    getCategories();
  }, []);

  useEffect(() => {
    // if form is in edit mode
    if (editCourse && courseCategories) {
      setValue("courseTitle", course.title);
      setValue("courseDesc", course.description);
      setValue("coursePrice", course.price);
      setValue("courseCategory", course.category._id);
      setValue("courseBenefits", course.whatYouWillLearn);
    }
  }, [editCourse, course, setValue, courseCategories]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      !(
        currentValues.courseTitle === course.title &&
        currentValues.courseDesc === course.description &&
        currentValues.coursePrice === course.price &&
        currentValues.courseCategory === course.category._id &&
        currentValues.courseBenefits === course.whatYouWillLearn &&
        currentValues.courseTags.toString() === course.tags.toString() &&
        currentValues.courseThumbnail === course.thumbnail &&
        currentValues.courseRequirements.toString() ===
          course.instructions.toString()
      )
    ) {
      return true;
    }
    return false;
  };

  const handleCourseEdit = async (data) => {
    const formData = new FormData();
    formData.append("courseId", course._id);

    if (data.courseTitle !== course.title) {
      formData.append("title", data.courseTitle);
    }

    if (data.courseDesc !== course.description) {
      formData.append("description", data.courseDesc);
    }

    if (data.coursePrice !== course.price) {
      formData.append("price", data.coursePrice);
    }

    if (data.courseCategory !== course.category._id) {
      formData.append("category", data.courseCategory);
    }

    if (data.courseBenefits !== course.whatYouWillLearn) {
      formData.append("whatYouWillLearn", data.courseBenefits);
    }

    if (data.courseTags.toString() !== course.tags.toString()) {
      formData.append("tags", JSON.stringify(data.courseTags));
    }

    if (data.courseThumbnail !== course.thumbnail) {
      formData.append("thumbnail", data.courseThumbnail);
    }

    if (data.courseRequirements.toString() !== course.instructions.toString()) {
      formData.append("instructions", JSON.stringify(data.courseRequirements));
    }

    setLoading(true);
    const result = await editCourseDetails(formData, token, dispatch, navigate);

    if (result) {
      dispatch(setCourse(result));
      dispatch(setStep(2));
    }
    setLoading(false);
  };

  const handleFormSubmit = async (data) => {
    // console.log("in submit")
    // console.log(data)

    if (editCourse) {
      // Edit course
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
        return;
      }
      handleCourseEdit(data);
      return;
    }

    // Create Course
    const formData = new FormData();
    formData.append("title", data.courseTitle);
    formData.append("description", data.courseDesc);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("tags", JSON.stringify(data.courseTags));
    formData.append("thumbnail", data.courseThumbnail);
    formData.append("instructions", JSON.stringify(data.courseRequirements));

    setLoading(true);
    const result = await addCourse(formData, token, dispatch, navigate);
    if (result) {
      dispatch(setCourse(result));
      dispatch(setStep(2));
    }
    setLoading(false);
  };

  return (
    <div className="border rounded-md border-[#2C333F] bg-[#161D29] py-6 px-3 md:px-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Course Title */}
        <div className="flex flex-col">
          <label
            className="mb-[8px] text-[14px] text-[#F1F2FF]"
            htmlFor="courseTitle"
          >
            Course Title <sup className="text-[#EF476F]">*</sup>
          </label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Enter Course Title"
            className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
            {...register("courseTitle", { required: true })}
          />
          {errors.courseTitle && (
            <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
              Course Title is required
            </p>
          )}
        </div>

        {/* Course Short Description */}
        <div className="flex flex-col">
          <label
            htmlFor="courseDesc"
            className="mb-[8px] text-[14px] text-[#F1F2FF]"
          >
            Course Short Description <sup className="text-[#EF476F]">*</sup>
          </label>
          <textarea
            id="courseDesc"
            placeholder="Enter Short Description"
            className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none] min-h-[130px] resize-x-none"
            {...register("courseDesc", { required: true })}
          />
          {errors.courseDesc && (
            <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
              Course Description is required
            </p>
          )}
        </div>

        {/* Course Price */}
        <div className="flex flex-col">
          <label
            htmlFor="coursePrice"
            className="mb-[8px] text-[14px] text-[#F1F2FF]"
          >
            Enter Course Price <sup className="text-[#EF476F]">*</sup>
          </label>
          <div className="relative">
            <input
              type="number"
              id="coursePrice"
              min={0}
              placeholder="Enter Course Price"
              className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none] !pl-12"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
              })}
            />
            <HiOutlineCurrencyRupee className="absolute top-1/2 -translate-y-1/2 text-2xl text-[#6E727F] left-3" />
          </div>

          {errors.coursePrice && (
            <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
              Course Price is required
            </p>
          )}
        </div>

        {/* Course Categories */}
        <div className="flex flex-col">
          <label
            htmlFor="courseCategory"
            className="mb-[8px] text-[14px] text-[#F1F2FF]"
          >
            Course Category <sup className="text-[#EF476F]">*</sup>
          </label>

          <select
            id="courseCategory"
            defaultValue={""}
            className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
            {...register("courseCategory", { required: true })}
          >
            <option value={""} disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategories?.map((category, ind) => (
                <option key={ind} value={category._id}>
                  {category?.name}
                </option>
              ))}
          </select>

          {errors.courseCategory && (
            <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
              Course Category is required
            </p>
          )}
        </div>

        {/* Course Tags */}
        <div>
          <ChipInput
            label={"Tags"}
            name={"courseTags"}
            placeholder={"Enter tags and press Enter"}
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
        </div>

        {/* Course Thumbnail */}
        <div>
          <UploadFile
            label={"Course Thumbnail"}
            name={"courseThumbnail"}
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            editData={editCourse ? course?.thumbnail : null}
          />
        </div>

        {/* Benefits of the Course */}
        <div className="flex flex-col">
          <label
            htmlFor="courseBenefits"
            className="mb-[8px] text-[14px] text-[#F1F2FF]"
          >
            Benefits of the course <sup className="text-[#EF476F]">*</sup>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter benefits of the course"
            className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none] min-h-[130px] resize-x-none"
            {...register("courseBenefits", { required: true })}
          />
          {errors.courseBenefits && (
            <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
              Benefits of the course is required
            </p>
          )}
        </div>

        {/* Course Requirements/Instructions */}
        <div>
          <RequirementsField
            label={"Requirements/Instructions"}
            name={"courseRequirements"}
            placeholder={"Add Course Requirements/Instructions"}
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
        </div>

        {/* Next Buttons  */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-2 md:justify-end md:items-center">
          {editCourse && (
            <div>
              <button
                type="submit"
                disabled={loading}
                onClick={() => dispatch(setStep(2))}
                className={
                  "bg-[#838894] py-2 px-5 rounded-md font-semibold text-[#000814] disabled:cursor-not-allowed"
                }
              >
                Continue Without Saving
              </button>
            </div>
          )}

          <IconBtn
            type={"submit"}
            text={editCourse ? "Save Changes" : "Next"}
            disabled={loading}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
