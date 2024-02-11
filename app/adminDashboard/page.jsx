"use client";
import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

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
import "react-calendar/dist/Calendar.css";
const Page = () => {
  const [value, onChange] = useState(new Date());
  const [activeItem, setActiveItem] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [clients, setClients] = useState([
    {
      name: "test1",
      email: "test1@gmail.com",
      phone: "03210000",
      address: "chak 204",
      plan: "daily",
    },
    {
      name: "test",
      email: "test@gmail.com",
      phone: "03210000",
      address: "chak 204",
      plan: "Monthly",
    },
    {
      name: "test",
      email: "test@gmail.com",
      phone: "03210000",
      address: "chak 204",
      plan: "Monthly",
    },
  ]);
  const [paymentHistory, setPaymentHistory] = useState([
    {
      date: "12/12/1212",
      from: "text",
      amount: "10",
      status: "received",
      recipientNo: "11",
    },
    {
      date: "12/12/1212",
      from: "text2",
      amount: "20",
      status: "received",
      recipientNo: "111",
    },
    {
      date: "12/12/1212",
      from: "text3",
      amount: "30",
      status: "received",
      recipientNo: "233",
    },
  ]);

  const [todayCleaning, setTodayCleaning] = useState([
    {
      name: "test",
      email: "test@gmail.com",
      date: "12/10/1010",
      time: "9 PM",
      address: "faisalabad punjab",
      note: "this is not form user",
    },
    {
      name: "test",
      email: "test@gmail.com",
      date: "12/10/1010",
      time: "9 PM",
      address: "faisalabad punjab",
      note: "this is not form user",
    },
    {
      name: "test",
      email: "test@gmail.com",
      date: "12/10/1010",
      time: "9 PM",
      address: "faisalabad punjab",
      note: "this is not form user",
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
            <div className="flex justify-between w-full max-lg:flex-wrap mt-[30px]">
              <div className="w-full">
                <p className="text-center font-bold text-[26px] mb-2">
                  Today Cleaning
                </p>
                <div>
                  {todayCleaning.map((item, i) => (
                    <CleaningCard item={item} w={"100%"}/>
                  ))}
                </div>
              </div>
              <div className="w-full">
                <p className="text-center font-bold text-[26px] mb-2">
                  Tomorrow Cleaning
                </p>

                <div>
                  {todayCleaning.map((item, i) => (
                    <CleaningCard item={item} w={"100%"} />
                  ))}
                </div>
              </div>
            </div>
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
              <ClientCard client={client} />
            ))}
          </div>
        </div>
      )}

      {activeItem == 2 && (
        <div className="w-full mx-[50px] max-sm:mx-0 h-screen overflow-scroll">
          <p className="text-center text-[40px] mt-10">Pending Payments</p>
          <div className="  overflow-hidden border-b-2 border-gray-800 w-full mt-[20px]">
            <div className="px-6 py-4 flex justify-between gap-3">
              <div className="flex font-bold w-[10%]">
                {" "}
                <p>From</p>
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
              <div className="flex font-bold w-[10%]">
                <p>Status</p>
              </div>
              <div className=" font-bold w-[10%]">Print</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-[30px]">
            {paymentHistory.map((item, i) => (
              <PaymentHistory item={item} />
            ))}
          </div>
          <p className="text-center text-[40px] mt-10">Received Payments</p>
          <div className="  overflow-hidden border-b-2 border-gray-800 w-full mt-[20px]">
            <div className="px-6 py-4 flex justify-between gap-3">
              <div className="flex font-bold w-[10%]">
                {" "}
                <p>From</p>
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
              <div className="flex font-bold w-[10%]">
                <p>Status</p>
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
  );
};

export default Page;
