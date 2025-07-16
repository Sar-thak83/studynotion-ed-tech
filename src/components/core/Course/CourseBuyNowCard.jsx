import React from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ROLE_TYPE } from "../../../utils/constants";

const CourseBuyNowCard = ({
  courseData,
  handleBuyNowClick,
  handleAddToCart,
  handleShare,
  setConfirmationModalData,
}) => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-col gap-4 rounded-md bg-[#2C333F] text-[#F1F2FF] p-4 min-h-[600px]  max-w-[410px]">
      <img
        src={courseData.thumbnail}
        alt="course thumbnail"
        className="w-[400px] md:max-w-full min-h-[180px] max-h-[300px]  object-cover overflow-hidden rounded-2xl"
      />

      <div className="px-4">
        <p className="text-3xl font-semibold mb-4">₹ {courseData.price}</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleBuyNowClick}
            className="bg-[#FFD60A] py-2 px-5 rounded-md font-semibold text-[#000814]"
          >
            {user && courseData.studentsEnrolled.includes(user._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>

          {(!user ||
            (user.role === ROLE_TYPE.STUDENT &&
              !courseData.studentsEnrolled.includes(user._id))) && (
            <button
              onClick={handleAddToCart}
              className="bg-[#161D29] py-2 px-5 rounded-md font-semibold text-[#F1F2FF]"
            >
              Add to Cart
            </button>
          )}
        </div>

        <p className="text-center text-sm text-[#DBDDEA] mb-3 mt-6">
          30-Day Money-Back Guarantee
        </p>
        <h2 className="text-xl font-semibold my-2">This Course Includes :</h2>

        <div className="flex flex-col gap-3 text-sm text-[#06D6A0]">
          {courseData?.instructions.map((ins, ind) => (
            <div className="flex items-center gap-2" key={ind}>
              <BsFillCaretRightFill />
              <p>{ins}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto text-center">
          <button className="py-6 text-[#E7C009]" onClick={handleShare}>
            <div className="flex items-center gap-2">
              <FaShareSquare size={15} />
              <p>Share</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseBuyNowCard;
