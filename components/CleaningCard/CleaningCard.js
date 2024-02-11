import React from "react";

// @ts-ignore
const CleaningCard = ({ item ,w}) => {
  return (
    <div className={` rounded overflow-hidden shadow-lg w-[${w}] max-lg:w-[100%] `}>
      <div className="px-6 py-4 flex flex-col gap-3">
        {item.title && (
          <p className="text-center font-semibold text-[22px]">{item.title}</p>
        )}
        {item.name && (
          <div className="flex justify-between">
            <p>Name:</p> <p>{item.name}</p>
          </div>
        )}
        {item.email && (
          <div className="flex justify-between">
            <p>Email:</p> <p>{item.email}</p>
          </div>
        )}
        <div className="flex justify-between">
          <p>Pick Up:</p> <p>{item.date}</p>
        </div>
        <div className="flex justify-between">
          <p>Time:</p> <p>{item.time}</p>
        </div>
        <div className="flex justify-between">
          <p>Address:</p> <p>{item.address}</p>
        </div>
        <div className="flex justify-between text-base">
          <p>Note:</p> <p>{item.note}</p>
        </div>
      </div>
    </div>
  );
};

export default CleaningCard;
