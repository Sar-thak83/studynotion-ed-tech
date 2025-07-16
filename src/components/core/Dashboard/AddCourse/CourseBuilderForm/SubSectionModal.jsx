import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import IconBtn from "../../../../common/IconBtn";
import { setCourse } from "../../../../../redux/slices/addCourseSlice";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/sectionSubsectionServices";
import { RxCross2 } from "react-icons/rx";
import UploadFile from "../UploadFile";
import useOnClickOutside from "../../../../../hooks/useOnClickOutside";

const SubSectionModal = ({
  modalData,
  setModalData,
  addMode = false,
  editMode = false,
  viewMode = false,
}) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.addCourse);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const modalDiv = useRef(null);

  useOnClickOutside(modalDiv, () => setModalData(null));

  useEffect(() => {
    if (viewMode || editMode) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, [viewMode, editMode, modalData, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      !(
        currentValues.lectureTitle === modalData.title &&
        currentValues.lectureDesc === modalData.description &&
        currentValues.lectureVideo === modalData.video
      )
    ) {
      return true;
    }
    return false;
  };

  const handleEditSubSection = async () => {
    // Update Sub section
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("courseId", course?._id);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.video) {
      formData.append("video", currentValues.lectureVideo);
      formData.append("timeDuration", currentValues.lectureDuration);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);

    if (result) {
      const updatedCourseSections = course.sections.map((section) =>
        section._id === modalData.section ? result : section
      );

      const updatedCourse = { ...course, sections: updatedCourseSections };
      dispatch(setCourse(updatedCourse));
    }
    setLoading(false);
    setModalData(null);
  };

  const handleSave = async (data) => {
    // View a section
    if (viewMode) {
      return;
    }

    // Edit a section
    if (editMode) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the lecture");
      } else {
        handleEditSubSection();
      }
      return;
    }

    // Create Sub section
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("courseId", course?._id);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    formData.append("timeDuration", data.lectureDuration);

    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      const updatedCourseSections = course.sections.map((section) => {
        if (section._id === modalData.sectionId) {
          const updatedSection = { ...section };
          updatedSection.subSections = [...updatedSection.subSections, result];
          return updatedSection;
        }
        return section;
      });

      const updatedCourse = { ...course, sections: updatedCourseSections };
      dispatch(setCourse(updatedCourse));
    }
    setLoading(false);
    setModalData(null);
  };

  return (
    <div className="fixed !mt-0 inset-0 grid overflow-auto place-items-center bg-white bg-opacity-10 backdrop-blur-sm z-10">
      <div
        className="my-10 w-11/12 max-w-[700px] rounded-lg bg-[#161D29] border border-[#6E727F]"
        ref={modalDiv}
      >
        {/* Modal header */}
        <div className="flex justify-between items-center bg-[#2C333F] p-5 rounded-t-lg">
          <p className="text-xl font-semibold text-[#F1F2FF]">
            {addMode && "Adding"} {editMode && "Editing"}{" "}
            {viewMode && "Viewing"} Lecture
          </p>
          <button onClick={() => setModalData(null)}>
            <RxCross2 className="text-2xl text-[#F1F2FF]" />
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(handleSave)}
          className="py-10 px-8 space-y-8"
        >
          <UploadFile
            label="Lecture Video"
            name="lectureVideo"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            video={true}
            durationName={"lectureDuration"}
            editData={editMode ? modalData.videoUrl : null}
            viewData={viewMode ? modalData.videoUrl : null}
          />

          <div className="flex flex-col">
            <label
              htmlFor="lectureTitle"
              className="mb-[8px] text-[14px] text-[#F1F2FF]"
            >
              Lecture Title <span className="text-[#EF476F]">*</span>{" "}
            </label>

            <input
              id="lectureTitle"
              className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
              disabled={viewMode || loading}
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && (
              <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
                Lecture Title is required
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="lectureDesc"
              className="mb-[8px] text-[14px] text-[#F1F2FF]"
            >
              Lecture Description
              <sup className="text-[#EF476F]">*</sup>
            </label>
            <textarea
              id="lectureDesc"
              disabled={viewMode || loading}
              placeholder="Enter Lecture Description"
              className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none] min-h-[130px] resize-x-none"
              {...register("lectureDesc", { required: true })}
            />
            {errors.lectureDesc && (
              <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
                {" "}
                Lecture Description is required
              </p>
            )}
          </div>

          {!viewMode && (
            <div className="flex justify-end">
              <IconBtn
                type="submit"
                disabled={loading}
                text={
                  loading ? "Loading..." : editMode ? "Save Changes" : "Save"
                }
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
