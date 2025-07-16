import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { updateProfile } from "../../../../services/operations/settingsServices";
const EditProfile = () => {
  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];

  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitProfileForm = async (formData) => {
    // console.log(data)
    await updateProfile(token, formData, setLoading, dispatch, navigate);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitProfileForm)}>
        <div className="my-5 rounded-md border border-[#2C333F] bg-[#161D29] py-8 px-5 md:px-12">
          <h1 className="text-lg mb-6 font-semibold text-[#F1F2FF]">
            Profile Information
          </h1>

          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col md:flex-row gap-5">
              <label className="w-full">
                <p className="mb-[8px] text-[14px] text-[#F1F2FF]">
                  First Name <span className="text-[#F37290]">*</span>
                </p>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  defaultValue={user?.firstName}
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
                  Last Name <span className="text-[#F37290]">*</span>
                </p>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  defaultValue={user?.lastName}
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

            <div className="flex flex-col md:flex-row gap-5">
              <label className="w-full">
                <p className="mb-[8px] text-[14px] text-[#F1F2FF]">
                  Date of Birth <span className="text-[#F37290]">*</span>
                </p>
                <input
                  type="date"
                  name="dob"
                  max={new Date().toISOString().split("T")[0]}
                  placeholder="Enter first name"
                  defaultValue={user?.profile?.dob?.split("T")[0]}
                  className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
                  {...register("dob", {
                    required: {
                      value: true,
                      message: "Please enter your Date of Birth",
                    },
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date of Birth cannot be in the future",
                    },
                  })}
                />

                {errors.dob && (
                  <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
                    {errors.dob.message}
                  </p>
                )}
              </label>

              <label className="w-full">
                <p className="mb-[8px] text-[14px] text-[#F1F2FF]">
                  Gender <span className="text-[#F37290]">*</span>
                </p>
                <select
                  type="text"
                  name="gender"
                  className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
                  defaultValue={user?.profile?.gender}
                  {...register("gender", { required: true })}
                >
                  {genders.map((gender, ind) => (
                    <option className="text-[#F1F2FF]" key={ind} value={gender}>
                      {" "}
                      {gender}{" "}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <label className="w-full">
                <p className="mb-[8px] text-[14px] text-[#F1F2FF]">
                  Contact Number <span className="text-[#F37290]">*</span>
                </p>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Enter contact number"
                  defaultValue={user?.profile?.contactNumber}
                  className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
                  {...register("contactNumber", {
                    required: {
                      value: true,
                      message: "Please enter your Contact Number",
                    },
                    maxLength: {
                      value: 12,
                      message: "Invalid Contact Number",
                    },
                    minLength: {
                      value: 10,
                      message: "Invalid Contact Number",
                    },
                  })}
                />

                {errors.contactNumber && (
                  <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
                    {errors.contactNumber.message}
                  </p>
                )}
              </label>

              <label className="w-full">
                <p className="mb-[8px] text-[14px] text-[#F1F2FF]">
                  About <span className="text-[#F37290]">*</span>
                </p>
                <input
                  type="text"
                  name="about"
                  placeholder="Enter Bio Details"
                  defaultValue={user?.profile?.about}
                  className="w-[100%] rounded-[0.5rem] bg-[#2C333F] text-[#F1F2FF] p-[0.75rem] shadow-[0_1px_0_0_rgba(255,255,255,0.5)] placeholder:text-[#6E727F] focus:outline-[none]"
                  {...register("about", { required: true })}
                />

                {errors.about && (
                  <p className="mt-[0.25rem] text-[0.75rem] text-[#EF476F] tracking-[0.025em]">
                    Please enter your Bio Details
                  </p>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className={`rounded-md bg-[#2C333F] py-2 px-5 font-semibold text-[#C5C7D4]
          ${loading ? "cursor-not-allowed" : "cursor-pointer"}
          `}
          >
            Cancel
          </button>

          <IconBtn
            type={"submit"}
            disabled={loading}
            text={loading ? "Saving..." : "Save"}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
