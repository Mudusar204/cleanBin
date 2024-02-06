import React from "react";

const Navbar = () => {
  return (
    <div className="bg-[rgb(230,243,255)] flex justify-between px-[100px] py-[50px] ">
      <p className="w-[50%] text-[28px] font-thin">○ L A U N D R Y ○ S H O P ○</p>
      <div className="flex w-[50%] justify-between text-[28px] font-extrabold">
        <p>OUR SERVICES</p>
        <p>PRICELIST</p>
        <p>CONTACT</p>
      </div>
    </div>
  );
};

export default Navbar;
