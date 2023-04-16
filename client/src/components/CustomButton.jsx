import React from "react";

const CustomButton = ({buttonType, title, styles, handleClick}) => {
  return (
    <button
      type={buttonType}
      onClick={handleClick}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] font-medium text-white min-h-[16px] rounded-[10px] px-4 ${styles}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
