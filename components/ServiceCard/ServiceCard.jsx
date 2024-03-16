// @ts-nocheck
import React from "react";

const ServiceCard = (props) => {
  return (
    <div className={`${props.bg? "bg-white": "bg-[#CFE6FA]" } px-[15%] flex justify-start items-start py-[70px] gap-[20px]`}>
      <img className="mt-[-10px]" height={100} width={100} src={props.img} alt="" />
      <div>
        <p className="text-[24px] font-extrabold">{props?.heading}</p>
        <p className="text-[20px] font-thin my-[30px]">{props?.title}</p>
        <p className="text-[20px] font-thin">{props?.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
