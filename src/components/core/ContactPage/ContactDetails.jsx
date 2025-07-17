import React from "react";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "studynotioninfo8574@gmail.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "RRU Campus, 1nd Floor, New Boys Hostel, lavad, Dahegam, Gandhinagar, Gujarat 382305",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-[#161D29] p-4 lg:p-6">
      {contactDetails.map((data, ind) => {
        const Icon = Icon1[data.icon] || Icon2[data.icon] || Icon3[data.icon];

        return (
          <div className="flex flex-col gap-[2px] text-[#999DAA] p-3 text-sm">
            <div className="flex flex-row gap-3 items-center ">
              <Icon size={25} />
              <h1 className="text-[#F1F2FF] font-semibold text-lg">
                {data.heading}
              </h1>
            </div>

            <p className="font-medium">{data.description}</p>
            <p className="font-medium">{data.details}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
