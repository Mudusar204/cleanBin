"use client";
import React from "react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import StripeCheckout from "@/components/StripeCheckout/StripeCheckout";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { addCleanings } from "@/store/userSlice";
import { useDispatch,useSelector } from "react-redux";
function Page() {
  const dispatch=useDispatch()
  const router=useRouter()
  const [modal, setModal] = useState(false);
const [plan,setPlan]=useState("")
useEffect(()=>{
  if(!localStorage.getItem("userId")){
    router.push("/login")
  }
  },[])

  const addCleaningFun=async()=>{
    try {
      // @ts-ignore
      let res=await dispatch(addCleanings(plan))
      router.push("/userDashboard")
      console.log(res,"cleaning added");

    } catch (error) {
      console.log(error,"cleaing adding");
    }
  }
  return (
    <div className="bg-[#CFE6FA] flex flex-col justify-center h-screen items-center">
      <p className="text-center text-[40px] font-semibold mb-10">
        Confirm Your Order
      </p>
      <select name="cleanType" id="" value={plan} onChange={(e)=>setPlan(e.target.value)} className="p-5 mb-2 rounded-2xl w-[50%] ">
        <option value="">Choose a Plan</option>
        <option value="quick">Quick</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <div className="w-[50%] flex justify-between flex-wrap items-start gap-[40px] p-[40px] bg-[#FFFFFF] rounded-[24px]">
        <div className="flex flex-col items-start  gap-[10px]">
          <p className="text-black font-poppins text-[34px] font-medium">
            Fee Charges
          </p>
          <div className="flex items-center justify-center  gap-[12px]">
            <CurrencyDollarIcon className="h-[40px] w-[40px] text-blue-500" />
            <p className="text-[#589CFF] font-poppins text-[64px] font-semibold">
              {(plan === "quick" && 50) || (plan === "monthly" && 200) ||(plan === "yearly" && 1000) || (plan === "" && 0)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[10px] w-[336px] h-auto">
          <img
            src="/paymentCard.png"
            alt="picture"
            className="border border-blue-400 rounded-xl"
          />
          <div className="flex justify-center items-center self-stretch gap-[10px]">
            <button
              onClick={() => setModal(true)}
              className="flex justify-center items-center py-[4px] px-[8px] gap-[4px] border-1 border-[#4989E6] rounded-[4px] bg-[#589CFF] shadow-[rgba(0, 0, 0, 0.10)]"
            >
              <p className="font-poppins text-white text-[14px] font-semibold text-center whitespace-nowrap">
                Add card
              </p>
            </button>
            <button className="flex justify-center items-center py-[4px] px-[8px] gap-[4px] border-1 border-[#4989E6] rounded-[4px] bg-[#589CFF] shadow-[rgba(0, 0, 0, 0.10)]">
              <p className="font-poppins text-white text-[14px] font-semibold text-center whitespace-nowrap">
                Remove card
              </p>
            </button>
            <button className="flex gap-4">
              <ChevronLeftIcon className="h-[30px] w-[30px] " />
              <ChevronRightIcon className="h-[30px] w-[30px] " />
            </button>
          </div>
        </div>
      </div>
      <div className="w-[50%] mt-5 flex ">
        <input
          type="text"
          placeholder="Enter you note"
          className="w-full p-5 rounded-xl "
        />
      </div>
      <div className="w-[50%] mt-5 flex ">
        <button onClick={()=>{addCleaningFun()}} disabled={plan===""? true:false} className={` font-poppins bg-blue-500 px-8 py-2 rounded-lg text-white text-[20px] font-semibold text-center whitespace-nowrap`}>
          Confirm Order
        </button>
      </div>
      <div className="">{modal && <StripeCheckout setModal={setModal} />}</div>
    </div>
  );
}

export default Page;
