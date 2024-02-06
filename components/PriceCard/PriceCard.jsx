import React from "react";

const PriceCard = (props) => {
  return (
    <div className={`${props.bg?  "bg-[#DCEEFC]":"bg-white" } w-[30%] max-lg:w-[70%] max-md:w-[90%] max-2xl:w-[60%] px-[50px] py-[50px] flex flex-col justify-center items-center  gap-[20px]`}>
      <div className="flex gap-[20px]">
      <img className="mt-[-10px]" height={100} width={100} src={props.img} alt="" />
        <p className="text-[24px] font-extrabold">{props?.heading}</p>
      </div>
      <div className="w-full justify-center px-[50px]"> 
        <div className="flex justify-between w-full text-[20px] font-thin mb-[10px]"> <p>Shirts |</p> <p>${props.shirtPrice}</p></div>
        <div className="flex justify-between w-full text-[20px] font-thin mb-[10px]"> <p>Suit Jacket |</p> <p>${props.suitJacketPrice}</p></div>
        <div className="flex justify-between w-full text-[20px] font-thin mb-[10px]"> <p>Suit ﻿Pants |</p> <p>${props.suitJacketPent}</p></div>
        <div className="flex justify-between w-full text-[20px] font-thin mb-[10px]"> <p>Skirt/Dress |</p> <p>${props.skirtDressPrice}</p></div>
        <div className="flex justify-between w-full text-[20px] font-thin mb-[10px]"> <p>Pants |</p> <p>${props.pentPrice}</p></div>
        <div className="flex justify-between w-full text-[20px] font-thin mb-[10px]"> <p>Blouse |</p> <p>${props.blousePrice}</p></div>
      </div>
    </div>
  );
};

export default PriceCard;
