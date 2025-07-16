import React from "react";
import { useSelector } from "react-redux";
import CartCourses from "./CartCourses";
import CartAmount from "./CartAmount";
import Spinner from "../../../common/Spinner";

const Cart = () => {
  const { cartItemsCount } = useSelector((state) => state.cart);
  const { paymentLoading } = useSelector((state) => state.profile);

  return (
    <div>
      {paymentLoading ? (
        <div className="flex min-h-[calc(100vh-10rem)] justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="bg-[#000814] text-white">
          <h2 className=" text-3xl font-medium text-[#F1F2FF] mb-5 md:mb-10">
            Cart
          </h2>
          <p className="font-semibold text-[#6E727F] border-b border-[#6E727F] pb-2">
            {cartItemsCount} Courses in Cart
          </p>

          <div>
            {cartItemsCount === 0 ? (
              <div>
                <p className=" text-3xl text-center text-[#AFB2BF] mt-14">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="flex flex-col-reverse lg:flex-row items-start mt-8 gap-x-10 gap-y-6">
                <CartCourses />
                <CartAmount />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
