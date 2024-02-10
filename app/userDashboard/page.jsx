"use client";
import React, { useState } from "react";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from "./styles.module.css"
const Page = () => {
    const [value, onChange] = useState(new Date());
  const [activeItem, setActiveItem] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  // @ts-ignore
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  return (
    <div className="flex justify-between items-start">
      <div className="w-[20%]">
        <Sidebar>
          <SidebarItem
            icon={<RectangleGroupIcon className="h-[40px] w-[40px]" />}
            text="Dashboard"
            active={activeItem === 0}
            onClick={() => handleItemClick(0)}
            alert={true}
          />
          <SidebarItem
            icon={<DocumentChartBarIcon className="h-[40px] w-[40px]" />}
            text="Cleaning History"
            alert={true}
            active={activeItem === 1}
            onClick={() => handleItemClick(1)}
          />
          <SidebarItem
            icon={<CurrencyDollarIcon className="h-[40px] w-[40px]" />}
            text="Payments"
            alert={true}
            active={activeItem === 2}
            onClick={() => handleItemClick(2)}
          />
        </Sidebar>
      </div>

      <div className="w-full mx-[50px]">
        <p className="text-center text-[40px] mt-10">Dashboard</p>
        <div className="flex justify-between mt-[30px]">
          <CleaningCard
            title="Next Cleaning"
            date="10/10/2024"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <CleaningCard
            title="Previous Cleaning"
            date="11/10/2024"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
        <div className="w-full mt-10 h-[300px]">
    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        eventContent={renderEventContent}
        events={[
            { title: 'event 1', date: '2024-14-02' },
            { title: 'event 2', date: '2024-04-02' }
        ]}
    />
</div>
      </div>

      <div className="mr-[30px] flex flex-col justify-end items-end">
        <UserCircleIcon
          className="rounded-full h-16 w-16 mt-4 cursor-pointer"
          onClick={toggleMenu}
          //   onMouseLeave={toggleMenu}
        />
        {showMenu && (
          <div className="flex flex-col  mt-4 bg-slate-100">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-200">
              <UserCircleIcon className="h-5 w-5" />
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
