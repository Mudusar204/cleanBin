import { CheckBadgeIcon, TicketIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
const PriceCard = (props) => {
  const router=useRouter()
  return (
    <div className={`${props.bg?  "bg-[#DCEEFC]":"bg-white" } w-[30%] max-lg:w-[70%] max-md:w-[90%] max-2xl:w-[60%] px-[50px] py-[50px] flex flex-col justify-center items-center  gap-[20px]`}>
      <div className="flex gap-[20px]">
      <img className="mt-[-10px]" height={100} width={100} src={props.img} alt="" />
        <p className="text-[24px] font-extrabold">{props?.heading}</p>
      </div>
      <div className="flex items-center"><span className="text-[20px] font-medium">$</span> <p className="text-[30px] font-bold">{props.price}</p></div>
      <div className="w-full justify-center px-[50px]"> 
        <div className="flex justify-between w-full text-[20px] font-thin mb-[10px]"> <p>Red Dustbin |</p> <p><CheckBadgeIcon className="h-10 w-10 text-green-500"/></p></div>
        <div className="flex justify-between w-full text-[20px] font-thin mb-[10px]"> <p>Blue Dustbin |</p> <p><CheckBadgeIcon className="h-10 w-10 text-green-500"/></p></div>
        <div className="flex justify-between w-full text-[20px] font-thin mb-[10px]"> <p>Green Dustbin |</p> <p><CheckBadgeIcon className="h-10 w-10 text-green-500"/></p></div>
      </div>
      <div>
        <button onClick={()=>{router.push("/checkoutPage")}} className={` bg-blue-600 rounded-2xl px-[50px] py-[10px] text-white font-semibold`}>Order Now</button>
      </div>
    </div>
  );
};

export default PriceCard;
