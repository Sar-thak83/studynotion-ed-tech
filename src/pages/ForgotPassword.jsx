import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { forgotPassword } from "../services/operations/authServices";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email, setEmailSent, dispatch, navigate);
  };

  return (
    <div className="text-white bg-[#000814] min-h-[calc(100vh-3.5rem)] flex place-items-center">
      {loading ? (
        <div className="w-full">
          {" "}
          <Spinner />
        </div>
      ) : (
        <div className="w-11/12 max-w-[500px] p-4 lg:p-8 mx-auto  flex flex-col">
          <h2 className="text-3xl font-semibold leading-[2.375rem] text-[#F1F2FF]">
            {!emailSent ? "Reset your password" : "Check email"}
          </h2>

          <p className="text-[#AFB2BF] my-4 text-lg leading-[1.625rem]">
            {!emailSent ? (
              <p>
                Have no fear. We'll email you instructions to reset your
                password. If you don't have access to your email we can try
                account recovery
              </p>
            ) : (
              <p>
                We have sent the reset email to your email account{" "}
                <span className="font-bold">{email}</span>
              </p>
            )}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-sm leading-[1.375rem] text-[#F1F2FF]">
                  Email Address <sup className="text-[#EF476F]">*</sup>
                </p>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full placeholder:text-[#6E727F] rounded-lg p-3 pr-12 bg-[#2C333F] text-[#F1F2FF] shadow-[0_1px_0] shadow-[rgba(255,255,255,0.5)]"
                />
              </label>
            )}

            <button
              type="submit"
              className="w-full mt-6 rounded-lg bg-[#FFD60A] p-3 font-medium text-[#000814]"
            >
              {!emailSent ? "Send Reset Link" : "Resend Reset Link"}
            </button>
          </form>

          <Link to={"/login"}>
            <div className="mt-6 flex items-center gap-x-2 text-[#F1F2FF] ">
              <BiArrowBack />
              <p>Back To Login</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
