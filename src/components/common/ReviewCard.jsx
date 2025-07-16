import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const [readMore, setReadMore] = useState(false);

  const MAX_NO_OF_WORDS = 15;
  const truncatedReview =
    review.review.split(" ").length > MAX_NO_OF_WORDS
      ? `${review.review.split(" ").slice(0, MAX_NO_OF_WORDS).join(" ")} ...`
      : review.review;

  return (
    <div
      className={`w-[300px]  flex flex-col  gap-y-2 px-3 py-3 bg-[#161D29] text-white rounded-sm
    ${readMore ? "h-fit" : "h-[180px]"}
    `}
    >
      <div className="flex gap-x-3 items-center">
        <div>
          <img
            src={review.user?.avatar}
            alt={"student-avatar"}
            className="w-9 aspect-square rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-[#F1F2FF] text-lg font-semibold">
            {review.user?.firstName} {review.user?.lastName}
          </p>
          <p className="text-[#999DAA] text-xs font-medium">
            {review.course.title}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="text-[#C5C7D4] font-medium text-sm">
          {review.review.split(" ").length > MAX_NO_OF_WORDS ? (
            <div>
              {readMore ? review.review : truncatedReview}
              <span> </span>
              {
                <span
                  className="underline text-[#118AB2] cursor-pointer"
                  onClick={() => setReadMore((prev) => !prev)}
                >
                  {readMore ? "Read Less" : "Read More"}
                </span>
              }
            </div>
          ) : (
            <p>{review.review}</p>
          )}
        </div>

        <div className="flex gap-x-2 items-center">
          <p className="text-[#E7C009] font-semibold">{review.rating}</p>

          <ReactStars
            count={5}
            value={review.rating}
            size={20}
            edit={false}
            activeColor={"#ffd700"}
            emptyIcon={<FaStar />}
            fullIcon={<FaStar />}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
