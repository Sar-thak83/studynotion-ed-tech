import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import IconBtn from "../../common/IconBtn";
import toast from "react-hot-toast";
import { createReview } from "../../../services/operations/studentFeaturesServices";
import { useDispatch } from "react-redux";

const AddReviewModal = ({ setIsOpenReviewModal }) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { courseData } = useSelector((state) => state.viewCourse);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("rating", 0);
    setValue("review", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddReview = async (data) => {
    if (data.rating === 0) {
      toast.error("Please give a rating");
      return;
    }

    setLoading(true);
    // create a review
    await createReview({ ...data, courseId: courseData._id }, token, dispatch);
    setIsOpenReviewModal(false);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] !mt-0 h-screen w-screen  grid place-items-center overflow-hidden bg-white bg-opacity-10 backdrop-blur-sm  text-white">
      <div className="w-11/12 max-w-[700px] border border-[#6E727F] bg-[161D29] rounded-lg">
        {/* Modal Header */}
        <div className="p-5 flex justify-between items-center bg-[#2C333F] rounded-t-lg border-b-2 border-[#AFB2BF]">
          <p className="text-xl font-semibold text-[#F1F2FF]">Add Review</p>

          <button onClick={() => setIsOpenReviewModal(false)}>
            <RxCross2 className="text-2xl  text-[#F1F2FF]" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="flex gap-x-4 justify-center items-center">
            <img
              src={user.avatar}
              alt="user-avatar"
              className="w-[50px] aspect-square rounded-full object-cover"
            />

            <div className="flex flex-col gap-y-1">
              <p className="text-[#F1F2FF] font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[#DBDDEA] text-sm">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleAddReview)}
            className="flex flex-col items-center mt-6 mb-2"
          >
            <ReactStars
              count={5}
              onChange={(newRating) => setValue("rating", newRating)}
              size={30}
              activeColor="#ffd700"
            />

            <div className="w-11/12 flex flex-col gap-y-1 mt-2">
              <label
                htmlFor="review"
                className="mb-[8px] text-[14px] text-[#F1F2FF]"
              >
                Add Your Experience <span className="text-[#EF476F]"> *</span>{" "}
              </label>
              <textarea
                id="review"
                name="review"
                placeholder="Share Details of your own experience for this course"
                className="rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none] resize-x-none min-h-[130px] w-full"
                {...register("review", { required: true })}
              />

              {errors.review && (
                <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em] !ml-2">
                  Please write your review
                </p>
              )}
            </div>

            <div className="mt-6 w-11/12 flex items-center justify-end gap-x-5">
              <button
                disabled={loading}
                onClick={() => setIsOpenReviewModal(false)}
                className="bg-[#2C333F] py-2 px-5 font-semibold text-[#AFB2BF] rounded-md "
              >
                Cancel
              </button>

              <IconBtn
                type="submit"
                disabled={loading}
                text={loading ? "Writing Review" : "Save"}
                customClasses={
                  "!drop-shadow-[2px_2px_rgba(255,255,255,0.18)]  !hover:drop-shadow-none"
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
