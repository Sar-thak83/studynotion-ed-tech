import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import countryCodes from "../../../data/countryCodes.json";
import { contactUs } from "../../../services/operations/contactServices";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (contactData) => {
    await contactUs(contactData, setLoading, reset);

    // reset({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   phoneNo: '',
    //   message: ''
    // })
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        <div className="flex flex-col md:flex-row gap-5">
          <label className="w-full">
            <p className="mb-[8px] text-[14px] text-[#F1F2FF] ">
              First Name <sup className="text-[#EF476F]"> *</sup>
            </p>

            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
              {...register("firstName", { required: true })}
            />

            {errors.firstName && (
              <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
                Please enter your first name
              </p>
            )}
          </label>

          <label className="w-full">
            <p className="mb-[8px] text-[14px] text-[#F1F2FF]">
              Last Name <sup className="text-[#EF476F]"> *</sup>
            </p>

            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
              {...register("lastName", { required: true })}
            />

            {errors.lastName && (
              <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
                Please enter your last name
              </p>
            )}
          </label>
        </div>

        <div>
          <label>
            <p className="mb-[8px] text-[14px] text-[#F1F2FF]">
              Email Address <sup className="text-[#EF476F]"> *</sup>
            </p>

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none] "
              {...register("email", { required: true })}
            />

            {errors.email && (
              <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
                Please enter your email address
              </p>
            )}
          </label>
        </div>

        <div>
          <label htmlFor="phoneNo">
            <p className="mb-[8px] text-[14px] text-[#F1F2FF]">
              Phone Number <sup className="text-[#EF476F]"> *</sup>
            </p>
          </label>

          <div className="flex items-center gap-x-4">
            <div className="w-[75px]">
              <select
                name="countryCode"
                className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
                defaultValue={"+91"}
                {...register("countryCode", { required: true })}
              >
                {countryCodes.map((code, index) => (
                  <option value={code.code} key={index}>
                    {code.code} - {code.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-[calc(100%-90px)]">
              <input
                type="number"
                name="phoneNo"
                id="phoneNo"
                placeholder="12345 67890"
                className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none] "
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter your Phone Number",
                  },
                  minLength: {
                    value: 10,
                    message: "Invalid Phone Number",
                  },
                  maxLength: {
                    value: 12,
                    message: "Invalid Phone Number",
                  },
                })}
              />

              {errors.phoneNo && (
                <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
                  {errors.phoneNo.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label>
            <p className="mb-[8px] text-[14px] text-[#F1F2FF]">
              Message <sup className="text-[#EF476F]"> *</sup>
            </p>

            <textarea
              name="message"
              cols={30}
              rows={3}
              placeholder="Enter your message here"
              className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none] "
              {...register("message", { required: true })}
            />

            {errors.message && (
              <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
                Please enter your message
              </p>
            )}
          </label>
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`mt-3 w-full
            text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold bg-[#FFD60A] 
            text-black drop-shadow-[2px_2px_rgba(255,255,255,0.5)] 
            disabled:bg-[#585D69] disabled:cursor-wait
            ${
              !loading &&
              "transition-all duration-200 hover:scale-95 hover:shadow-none"
            }
          `}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
