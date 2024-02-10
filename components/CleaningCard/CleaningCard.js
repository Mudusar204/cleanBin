import React from 'react'

const CleaningCard = ({ title, description,date }) => {
    return (
      <div className=" rounded overflow-hidden shadow-lg w-[500px] h-[200px]">
       
        <div className="px-6 py-4 flex flex-col gap-3">
          <div className="font-bold text-xl mb-2 text-center">{title}</div>
          <div className='flex justify-between'><p>Pick Up:</p> <p>{date}</p></div>
          <div className='flex justify-between'><p>Time:</p> <p>9:PM</p></div>
          <div className='flex justify-between'><p>Address:</p> <p>Madina town faisalabad</p></div>
          <div className='flex justify-between text-base'><p>Note:</p> <p>{description}</p></div>
        </div>
      </div>
    );
  };

export default CleaningCard