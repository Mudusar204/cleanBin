// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Oval } from "react-loader-spinner";

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
import ClientCard from "../../components/ClientCard/ClientCard";
import PaymentCard from "../../components/PaymentCard/PaymentCard";
import PaymentHistory from "../../components/PaymentHistory/PaymentHistory";
import Calendar from "react-calendar";
import {
  getAllUser,
  deleteUser,
  blockUnBlockUser,
  getTodayCleanings,
  getTomorrowCleanings,
  getAllPayments,
} from "@/store/adminSlice";
import { getUserDetails, setUser } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Page = () => {
  const dispatch = useDispatch();
  const router=useRouter()
  const [activeItem, setActiveItem] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [clients, setClients] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const [todayCleaning, setTodayCleaning] = useState([]);
  const [tomorrowCleaning, setTomorrowCleaning] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  // @ts-ignore
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  useEffect(() => {
   let role = localStorage.getItem("role");
    if (role == "admin") {
      setIsAdmin(true);
    }else{
      toast.dismiss()
      toast.error("you are not admin")
      router.push("/login")

    }
  }, []);
  useEffect(() => {
    try {
      const getAllUserFun = async () => {
        let user = await dispatch(getUserDetails());
        dispatch(setUser(user.payload));

        let res = await dispatch(getAllUser());
        let res1 = await dispatch(getTodayCleanings());
        let res2 = await dispatch(getTomorrowCleanings());
        console.log(res.payload.data, "all user get from db");
        setClients(res.payload.data);
        setTodayCleaning(res1.payload.data);
        setTomorrowCleaning(res2.payload.data);
        getAllPaymentHistory();
      };
      getAllUserFun();
    } catch (error) {
      console.log(error, "errro while getting user from admin page");
    }
  }, []);

  const deleteUserFun = async (id) => {
    try {
      toast.loading("deleting...");
      let res = await dispatch(deleteUser(id));
      console.log(res, "response in the delete user,");
      if (res.payload.message === "success") {
        let filterArr = clients.filter((item, i) => {
          return item._id != id;
        });
        setClients(filterArr);
      }
      toast.dismiss();
      toast.success(`Succes`);
    } catch (error) {
      toast.dismiss();
      toast.error("something went wrong");
      console.log(error, "error while deleting user");
    }
  };

  const blockUnBlockUserFun = async (id) => {
    try {
      toast.loading("plz wait");
      let res = await dispatch(blockUnBlockUser(id));
      console.log(res, "response in the delete user,");
      if (res.payload.message === "success") {
        let filterArr = clients.map((item, i) => {
          if (item._id === id) {
            let obj = { ...item, isBlock: !item.isBlock };
            return obj;
          } else {
            return item;
          }
        });
        toast.dismiss();
        toast.success(`Succes`);
        setClients(filterArr);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("something went wrong");
      console.log(error, "error while deleting user");
    }
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

  const getAllPaymentHistory = async () => {
    try {
      let res = await dispatch(getAllPayments());
      console.log(
        res,
        "============================payments==================="
      );
      setPaymentHistory(res.payload.data.Payments);
    } catch (error) {
      console.log(error, "error white geting paymetns");
    }
  };

  return (
    <>
      {isAdmin ? (
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
                icon={<UserGroupIcon className="h-[40px] w-[40px]" />}
                text="Clients"
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
              <div>
                <p className="text-center text-[40px] mt-10">Dashboard</p>
                {todayCleaning.length > 0 ? (
                  <div className="flex justify-between w-full max-lg:flex-wrap mt-[30px]">
                    <div className="w-full">
                      <p className="text-center font-bold text-[26px] mb-2">
                        Today Cleaning
                      </p>
                      <div>
                        {todayCleaning.map((item, i) => (
                          <CleaningCard item={item} key={i} w={"100%"} />
                        ))}
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-center font-bold text-[26px] mb-2">
                        Tomorrow Cleaning
                      </p>

                      <div>
                        {tomorrowCleaning.map((item, i) => (
                          <CleaningCard item={item} key={i} w={"100%"} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full justify-start ml-[45%] items-center h-[300px] mt-[200px]">
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
                )}
              </div>

              {/* <div className="w-full mt-10 h-[300px]">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              eventContent={renderEventContent}
              events={[
                { title: "event 1", date: "2024-14-02" },
                { title: "event 2", date: "2024-04-02" },
              ]}
            />
          </div> */}
            </div>
          )}

          {activeItem == 1 && (
            <div className="w-full mx-[50px] max-sm:mx-0  h-screen overflow-scroll">
              <p className="text-center text-[40px] mt-10">Clients</p>
              <div className="flex flex-col gap-5 mt-[30px] ">
                {clients.map((client, i) => (
                  <ClientCard
                    key={i}
                    client={client}
                    deleteUserFun={deleteUserFun}
                    blockUnBlockUserFun={blockUnBlockUserFun}
                  />
                ))}
              </div>
            </div>
          )}

          {activeItem == 2 && (
            <div className="w-full mx-[50px] max-sm:mx-0 h-screen overflow-scroll">
              {/* <p className="text-center text-[40px] mt-10">Pending Payments</p> */}
              {/* <div className="  overflow-hidden border-b-2 border-gray-800 w-full mt-[20px]">
                <div className="px-6 py-4 flex justify-between gap-3">
                  <div className="flex font-bold w-[10%]">
                    {" "}
                    <p>From</p>
                  </div>
                  <div className="flex font-bold w-[10%]">
                    <p>Email:</p>
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
              </div> */}
              {/* <div className="flex flex-col gap-5 mt-[30px]">
                {paymentHistory.length > 0 ? (
                  paymentHistory.map((item, i) => (
                    <PaymentHistory item={item} key={i} />
                  ))
                ) : (
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
                )}
              </div> */}
              <p className="text-center text-[40px] mt-10">Received Payments</p>
              <div className="  overflow-hidden border-b-2 border-gray-800 w-full mt-[20px]">
                <div className="px-6 py-4 flex justify-between gap-3">
                  <div className="flex font-bold w-[10%]">
                    {" "}
                    <p>From</p>
                  </div>
                  <div className="flex font-bold w-[10%]">
                    <p>Email:</p>
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
                {paymentHistory.length > 0 ? (
                  paymentHistory.map((item, i) => (
                    <PaymentHistory key={i} item={item} />
                  ))
                ) : (
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
                )}
              </div>
            </div>
          )}

          <div className="mr-[30px] flex flex-col justify-end items-end max-lg:w-[10px]">
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
      ) : null}
    </>
  );
};

export default Page;
