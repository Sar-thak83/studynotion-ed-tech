import React from "react";

const IconBtn = ({ ...btnData }) => {
  const {
    children,
    text,
    onClickHandler,
    disabled,
    outline = false,
    customClasses,
    type,
  } = btnData;

  return (
    <div className="text-white">
      <button
        onClick={onClickHandler}
        disabled={disabled}
        type={type}
        className={` ${customClasses} rounded-md py-2 px-5 font-semibold text-[#000814] 
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${outline ? "border border-[#FFD60A] bg-transparent" : "bg-[#FFD60A]"}
        `}
      >
        {children ? (
          <div
            className={`flex items-center gap-x-2 
              ${outline && "text-[#FFD60A]"}
              `}
          >
            {text}
            {children}
          </div>
        ) : (
          <div>{text}</div>
        )}
      </button>
    </div>
  );
};

export default IconBtn;
