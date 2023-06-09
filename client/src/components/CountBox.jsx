import React from "react";

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-bold font-epilogue text-[30px] text-white p-3 bg-[#2b1c1c] rounded-t-[10px] w-full text-center truncate">
        {value} 
      </h4>
      <h4 className="font-epilogue font-normal text-[16px] text-[#808191] bg-[28282e] px-3 py-2 w-full rounded-b-[10px] text-center">
        {title} 
      </h4>
    </div>
  );
};

export default CountBox;
