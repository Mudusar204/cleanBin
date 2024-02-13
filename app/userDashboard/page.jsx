"use client";
import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Oval } from "react-loader-spinner";
import {getUserDetails,setUser} from "../../store/userSlice"
import { useDispatch ,useSelector} from "react-redux";
// const events = [
//   { title: 'Meeting', start: new Date() }
// ]

import {
  BeakerIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Sidebar from "../../components/DashboardSidebar/DashboardSidebar";
import { SidebarItem } from "../../components/DashboardSidebar/DashboardSidebar";
import CleaningCard from "../../components/CleaningCard/CleaningCard";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import PaymentCard from "../../components/PaymentCard/PaymentCard";
import PaymentHistory from "../../components/PaymentHistory/PaymentHistory";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
const Page = () => {

  const router=useRouter()
  const dispatch=useDispatch()
  const [value, onChange] = useState(new Date());
  const [activeItem, setActiveItem] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);

// @ts-ignore
const {userDetail,isUserLogin}=useSelector((store)=>store.userSlice)
// useEffect(()=>{
// if(!localStorage.getItem("userId")){
//   router.push("/login")
// }
// },[])
  useEffect(() => {
    // Simulate loading delay (replace with actual data fetching logic)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const [paymentHistory, setPaymentHistory] = useState([
    {
      date: "12/12/1212",
      to: "text",
      amount: "10",
      recipientNo: "11",
    },
    {
      date: "12/12/1212",
      to: "text2",
      amount: "20",
      recipientNo: "111",
    },
    {
      date: "12/12/1212",
      to: "text3",
      amount: "30",
      recipientNo: "233",
    },
  ]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  // @ts-ignore
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  // @ts-ignore
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  const item = {
    date: "12/10/1010",
    time: "9 PM",
    address: "faisalabad punjab",
    note: "this is not form user",
    title: "Next Cleaning",
  };
  const item1 = {
    date: "12/10/1010",
    time: "9 PM",
    address: "faisalabad punjab",
    note: "this is not form user",
    title: "Previous Cleaning",
  };


  useEffect(() => {
    const getUserDetail = async () => {
      try {
        // @ts-ignore
        let user = await dispatch(getUserDetails()); 
        console.log(user, "user fetched success");
      dispatch(setUser(user.payload))
      } catch (error) {
        console.error(error, "error fetching user");
      }
    };
    if(isUserLogin){

      getUserDetail();
    }else{
  router.push("/login")

    }
  }, []);

  return (
    <div className="flex justify-between items-start">
      <div className="w-[20%] max-sm:w-[10%]">
        <Sidebar>
          <SidebarItem
            icon={<RectangleGroupIcon className="h-[40px] w-[40px]" />}
            text="Dashboard"
            active={activeItem === 0}
            onClick={() => handleItemClick(0)}
            alert={activeItem === 0}
          />
          <SidebarItem
            icon={<DocumentChartBarIcon className="h-[40px] w-[40px]" />}
            text="Cleaning History"
            alert={activeItem === 1}
            active={activeItem === 1}
            onClick={() => handleItemClick(1)}
          />
          <SidebarItem
            icon={<CurrencyDollarIcon className="h-[40px] w-[40px]" />}
            text="Payments"
            alert={activeItem === 2}
            active={activeItem === 2}
            onClick={() => handleItemClick(2)}
          />
        </Sidebar>
      </div>

      {activeItem == 0 && (
        <div className="w-full mx-[50px] max-sm:mx-0 h-screen overflow-scroll">
          <p className="text-center text-[40px] mt-10">Dashboard</p>
          <div className="flex justify-between flex-wrap mt-[30px]">
            <CleaningCard item={item} w={"50%"} />
            <CleaningCard item={item1} w={"50%"} />
          </div>
          <div className="w-full justify-center   items-center mt-10 h-[300px]">
            {loading ? (
              <div className="w-full justify-start ml-[45%] items-center h-full">

              <Oval
                visible={true}
                height="80"
                width="80"
                color="lightblue"
                ariaLabel="oval-loading"
                wrapperStyle={{ color: "red" }}
                secondaryColor="blue"
                wrapperClass=""
              />
              </div>

            ) : (
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={[
                  { title: "event 1", date: "2024-14-02" },
                  { title: "event 2", date: "2024-04-02" },
                ]}
              />
            )}
          </div>
        </div>
      )}

      {activeItem == 1 && (
        <div className="w-full mx-[50px] max-sm:mx-0 h-screen overflow-scroll">
          <p className="text-center text-[40px] mt-10">Cleaning History</p>
          <div className="flex flex-col gap-5 mt-[30px] ">
            <HistoryCard
              title="Next Cleaning"
              date="10/10/2024"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              index={1}
            />
            <HistoryCard
              title="Previous Cleaning"
              date="11/10/2024"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              index={2}
            />
            <HistoryCard
              title="Previous Cleaning"
              date="11/10/2024"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              index={2}
            />
            <HistoryCard
              title="Previous Cleaning"
              date="11/10/2024"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              index={2}
            />
          </div>
        </div>
      )}

      {activeItem == 2 && (
        <div className="w-full mx-[50px] max-sm:mx-0 h-screen overflow-scroll">
          <p className="text-center text-[40px] mt-10">Payments</p>
          <div className="flex flex-col gap-5 mt-[30px]">
            <PaymentCard
              title="Next Cleaning"
              date="10/10/2024"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>
          <p className="text-center text-[40px] mt-10">Payments History</p>
          <div className="  overflow-hidden border-b-2 border-gray-800 w-full mt-[20px]">
            <div className="px-6 py-4 flex justify-between gap-3">
              <div className="flex font-bold w-[10%]">
                {" "}
                <p>To</p>
              </div>
              <div className="flex font-bold w-[10%]">
                <p>Date:</p>
              </div>
              <div className="flex font-bold w-[10%] whitespace-nowrap">
                <p>Recipient No</p>
              </div>
              <div className="flex font-bold w-[10%]">
                <p>Amount</p>
              </div>
              <div className=" font-bold w-[10%]">Print</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-[30px]">
            {paymentHistory.map((item, i) => (
              <PaymentHistory item={item} />
            ))}
          </div>
        </div>
      )}

      <div className="mr-[30px] flex flex-col justify-end items-end">
        <UserCircleIcon
          className="rounded-full h-16 w-16 max-sm:w-[40px] max-sm:h-[40px] mt-4 cursor-pointer"
          onClick={toggleMenu}
          //   onMouseLeave={toggleMenu}
        />
        {showMenu && (
          <div className="flex flex-col  mt-4 bg-slate-100">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200 whitespace-nowrap">
              <UserCircleIcon className="h-5 w-5 " />
              Sign Out
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200">
              <QuestionMarkCircleIcon className="h-5 w-5" />
              Help
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200">
              <Cog8ToothIcon className="h-5 w-5" />
              Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
