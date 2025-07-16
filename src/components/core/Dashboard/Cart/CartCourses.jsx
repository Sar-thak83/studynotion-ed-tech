import React from "react";
import { useSelector } from "react-redux";
import { removeFromCart } from "../../../../redux/slices/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import RatingStars from "../../../common/RatingStars";

const CartCourses = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 mt-5">
      {cartItems.map((course, ind) => (
        <div
          key={course._id}
          className={`flex flex-col md:flex-row items-start justify-between flex-wrap w-full gap-6
          ${ind !== cartItems.length - 1 && "border-b border-b-[#6E727F] pb-6"}
          ${ind !== 0 && "mt-6"}
          `}
        >
          <div
            className="flex flex-1 gap-4 lg:flex-row cursor-pointer "
            onClick={() => navigate(`/course/${course._id}`)}
          >
            <img
              src={course?.thumbnail}
              alt={course?.title}
              className=" h-[80px] md:h-[148px] w-[100px] md:w-[220px] rounded-lg object-cover"
            />

            <div className="">
              <h2 className="text-lg font-medium text-[#F1F2FF]">
                {course?.title}
              </h2>
              <p className="text-sm text-[#838894]">{course?.category?.name}</p>

              <div className="flex flex-col gap-2 mt-1">
                <div className="flex gap-2 items-center">
                  <p className="text-[#FFF970]">{course?.averageRating}</p>
                  <RatingStars rating={course?.averageRating} starSize={20} />
                </div>

                <div className="  text-[#6E727F]">
                  {course?.reviews?.length} Ratings
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-x-5 md:flex-col items-center md:items-end md:gap-y-2">
            <div
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-[#424854] bg-[#2C333F] py-3 px-3 text-[#EF476F]"
            >
              <RiDeleteBin6Line />
              <span> Remove</span>
            </div>

            <p className="md:mb-6 text-3xl font-medium text-[#E7C009]">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCourses;
