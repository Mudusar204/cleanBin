// import React from "react";

// const Navbar = () => {
//   return (
//     <div className="bg-[rgb(230,243,255)] flex justify-between px-[100px] py-[50px] ">
//       <p className="w-[50%] text-[28px] font-thin">○ L A U N D R Y ○ S H O P ○</p>
//       <div className="flex w-[50%] justify-between text-[28px] font-extrabold">
//         <p>OUR SERVICES</p>
//         <p>PRICELIST</p>
//         <p>CONTACT</p>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

"use client"
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[rgb(230,243,255)] px-[100px] max-sm:px-[20px] py-[50px] flex justify-between items-center">
      <p className="text-[28px] font-thin">○ L A U N D R Y ○ S H O P ○</p>
      <div className="flex max-lg:flex-row-reverse items-center">
        <div className="lg:hidden" onClick={toggleMenu}>
         {isMenuOpen? 
         <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-[28px] w-[28px] cursor-pointer"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth="2"
           d="M6 18L18 6M6 6l12 12"
         />
       </svg>:
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[28px] w-[28px] cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>}
        </div>
        <div className={`lg:flex ${isMenuOpen ? 'flex flex-col' : 'hidden'} text-[28px] max-xl:text-[20px] font-extrabold`}>
          <p className="mx-4 cursor-pointer">OUR SERVICES</p>
          <p className="mx-4 cursor-pointer">PRICELIST</p>
          <Link href={"/login"} className="mx-4 cursor-pointer">LOGIN</Link>
          <Link href={"/signup"} className="mx-4 cursor-pointer">SIGNUP</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
