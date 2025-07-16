import React from "react";
import IconBtn from "../../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dateFormatter from "../../../utils/dateFormatter";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="bg-[#000814] text-white mx-0 md:mx-5">
      <h1 className="font-medium text-[#F1F2FF] text-3xl mb-7 md:mb-14">
        My Profile
      </h1>

      <div className="flex items-center justify-between rounded-md border border-[#2C333F] bg-[#161D29] p-8 px-3 md:px-12">
        <div className="flex flex-row gap-x-2 md:gap-x-4 items-center">
          <div>
            <img
              src={user?.avatar}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[60px] md:w-[78px] rounded-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#F1F2FF]">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-[#838894]">{user?.email}</p>
          </div>
        </div>

        <IconBtn
          customClasses={"hidden md:block"}
          text={"Edit"}
          onClickHandler={() => navigate("/dashboard/settings")}
          children={<RiEditBoxLine />}
        />
      </div>

      <div className="md:hidden">
        <IconBtn
          text={"Edit Profile"}
          onClickHandler={() => navigate("/dashboard/settings")}
          customClasses="w-full my-5 !py-1 text-center grid place-items-center"
          children={<RiEditBoxLine />}
        />
      </div>

      <div className="flex flex-col gap-y-10 my-7 md:my-10 rounded-md border border-[#2C333F] p-8 px-3 md:px-12 bg-[#161D29]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#F1F2FF]">About</h2>
          <IconBtn
            text={"Edit"}
            customClasses="hidden md:block"
            onClickHandler={() => navigate("/dashboard/settings")}
            children={<RiEditBoxLine />}
          />
        </div>
        <p
          className={`${
            user?.profile?.about ? "text-[#F1F2FF]" : "text-[#6E727F]"
          } text-sm font-medium`}
        >
          {user?.profile?.about || "Write Something About Yourself"}
        </p>
      </div>

      <div className="flex flex-col gap-y-5 md:gap-y-10 rounded-md border border-[#2C333F] p-8 px-3 md:px-12 bg-[#161D29] ">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold text-[#F1F2FF]">
            Personal Details
          </h2>
          <IconBtn
            text={"Edit"}
            customClasses="hidden md:block"
            onClickHandler={() => navigate("/dashboard/settings")}
            children={<RiEditBoxLine />}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-y-5">
          <div className="w-full md:w-1/2">
            <p className="mb-2 text-sm text-[#424854]">First Name</p>
            <p className="text-sm text-[#F1F2FF] font-medium">
              {user?.firstName}
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <p className="mb-2 text-sm text-[#424854]">Last Name</p>
            <p className="text-sm text-[#F1F2FF] font-medium">
              {user?.lastName}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-y-5">
          <div className="w-full md:w-1/2">
            <p className="mb-2 text-sm text-[#424854]">Email</p>
            <p className="text-sm text-[#F1F2FF] font-medium">{user?.email}</p>
          </div>

          <div className="w-full md:w-1/2">
            <p className="mb-2 text-sm text-[#424854]">Phone Number</p>
            <p
              className={`text-sm font-medium ${
                user?.profile?.contactNumber
                  ? "text-[#F1F2FF]"
                  : "text-[#6E727F]"
              } `}
            >
              {user?.profile?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-y-5">
          <div className="w-full md:w-1/2">
            <p className="mb-2 text-sm text-[#424854]">Gender</p>
            <p
              className={`text-sm font-medium ${
                user?.profile?.gender ? "text-[#F1F2FF]" : "text-[#6E727F]"
              } `}
            >
              {user?.profile?.gender ?? "Add Gender"}
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <p className="mb-2 text-sm text-[#424854]">Date of Birth</p>
            <p
              className={`text-sm font-medium ${
                user?.profile?.dob ? "text-[#F1F2FF]" : "text-[#6E727F]"
              } `}
            >
              {user?.profile?.dob
                ? dateFormatter(user?.profile?.dob)
                : "Add Date of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
