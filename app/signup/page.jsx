"use client";
// Import necessary hooks and Framer Motion
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./style.module.css";
import { signUpUser } from "../../server/controller/signup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
// Define the page transition settings and variants
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.1,
};

const pageVariants = {
  initial: { opacity: 0, x: "100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "-100vw" },
};

// The main Signup component
const Page = () => {
  const router=useRouter()
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [nameErr, setNameErr] = useState("");
  const [emailError, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [firstnameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [page, setPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("chala");
    validatePage3();
    if (!error) {
      try {
        toast.loading("User creating");
     let res  = await signUpUser({
          username,
          email,
          password,
          firstName,
          lastName,
          phone,
          address,
        });
        if(res.message=="success"){

        setMessage("User signed up successfully");
        setUsername("");
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setAddress("");
        setPhone("");
        // nextPage();
        toast.dismiss();
        toast.success("User created Successfully");
        router.push("/")

      }
else{throw new Error}
      } catch (error) {
        console.log(error.message, "error ayya");
        toast.dismiss();
        toast.error("some thing went wrong");
      }
    }
  };

  const nextPage = () => setPage((prev) => prev + 1);

  function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    if (password.length >= 8) {
      return true;
    }
  }

  const validatePage1 = () => {
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(password);
    console.log(validEmail, validPassword, "ok");
    if (username == "") {
      setNameErr("*required");
    } else {
      setNameErr("");
    }
    if (!validEmail) {
      setEmailErr("email is not valid");
    } else {
      setEmailErr("");
    }
    if (email === "") {
      setEmailErr("*required");
    } else {
      setPasswordErr("");
    }
    if (password == "") {
      setPasswordErr("*required");
    } else if (!validPassword) {
      setPasswordErr("Min 8 character required");
    } else {
      setPasswordErr("");
    }
    if (validEmail && validPassword && nameErr == "") {
      nextPage();
    }
  };

  const validatePage3 = () => {
    let err = false;

    if (firstName === "") {
      setFirstNameErr("*required");
      err = true;
    } else {
      setFirstNameErr("");
    }

    if (lastName === "") {
      setLastNameErr("*required");
      err = true;
    } else {
      setLastNameErr("");
    }
    if (address === "") {
      setAddressErr("*required");
      err = true;
    } else {
      setAddressErr("");
    }
    if (phone === "") {
      setPhoneErr("*required");
      err = true;
    } else {
      setPhoneErr("");
    }

    if (err) {
      setError(true);
      return;
    }
  };

  // Individual page components
  // const PageOne = () => (
  //   <motion.div
  //     initial="initial"
  //     animate="in"
  //     exit="out"
  //     variants={pageVariants}
  //     transition={pageTransition}
  //     className="p-4"
  //   >
  //     <div className={styles.login}>
  //       <div className={styles.loginFormContainer}>
  //         <form>
  //           <h1>SignUp</h1>
  //           <div className={styles.input}>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="20px"
  //               height="20px"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 fill="#000"
  //                 d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
  //               />
  //             </svg>
  //             <input
  //               // value={username}
  //               onChange={(e) => setUsername(e.target.value)}
  //               type="text"
  //               placeholder="Username"
  //             />
  //           </div>
  //           <div className={styles.input}>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="20px"
  //               height="20px"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 fill="#000"
  //                 d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
  //               />
  //             </svg>
  //             <input
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               type="text"
  //               placeholder="Email"
  //             />
  //           </div>
  //           <div className={styles.input}>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="20px"
  //               height="20px"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 fill="#000"
  //                 d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15q0-.825-.587-1.412T12 13q-.825 0-1.412.588T10 15q0 .825.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6z"
  //               />
  //             </svg>
  //             <input
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               type="password"
  //               placeholder="Password"
  //             />
  //           </div>
  //           {error && <p>{error}</p>}
  //           {message && <p>{message}</p>}
  //           <div className="flex w-full justify-center mt-[15px]">
  //             <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded bg-blue-500"></div>
  //             <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded "></div>
  //             <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded"></div>
  //           </div>
  //           <button className="bg-white w-40 h-10 rounded-3xl text-[#122285] text-sm font-bold mt-[20px]">
  //             Continue
  //           </button>
  //           <Link href={"/login"}>
  //             <p className="text-sm text-black text-center mt-[20px]">
  //               Don't have a account? &nbsp;
  //               <span className="underline">Login</span>
  //             </p>
  //           </Link>
  //         </form>
  //       </div>
  //       <div className={styles.earthContainer}>
  //         <div className={styles.earthOverlay}>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <img
  //             className="h-[80%] w-[90%] rounded-lg"
  //             src="bin2.jpeg"
  //             alt=""
  //           />
  //           {/* <Earth /> */}
  //         </div>
  //       </div>
  //     </div>
  //   </motion.div>
  // );

  // const PageTwo = () => (
  //   <motion.div
  //     initial="initial"
  //     animate="in"
  //     exit="out"
  //     variants={pageVariants}
  //     transition={pageTransition}
  //     className="p-4"
  //   >
  //     <div className={styles.login}>
  //       <div className={styles.loginFormContainer}>
  //         <form>
  //           <h1 className="pb-[50px]">Verify Email</h1>

  //           <div className="flex justify-between gap-[10px]">
  //             {[...Array(4)].map((_, index) => (
  //               <input
  //                 key={index}
  //                 className="border p-2 w-[100px] h-[100px] rounded-[10px] text-[30px] text-center"
  //                 type="text"
  //                 maxLength="1"
  //               />
  //             ))}
  //           </div>

  //           <div className="flex w-full justify-center mt-[15px]">
  //             <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded "></div>
  //             <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded bg-blue-500"></div>
  //             <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded"></div>
  //           </div>
  //           <button
  //             onClick={(e) => {
  //               e.preventDefault(); // Prevent form submission
  //               nextPage(); // Call nextPage function
  //             }}
  //             className="bg-white w-40 h-10 rounded-3xl text-[#122285] text-sm font-bold mt-[20px]"
  //           >
  //             Continue
  //           </button>
  //         </form>
  //       </div>
  //       <div className={styles.earthContainer}>
  //         <div className={styles.earthOverlay}>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <img
  //             className="h-[80%] w-[90%] rounded-lg"
  //             src="bin2.jpeg"
  //             alt=""
  //           />
  //           {/* <Earth /> */}
  //         </div>
  //       </div>
  //     </div>
  //   </motion.div>
  // );

  // const PageThree = () => (
  //   <motion.div
  //     initial="initial"
  //     animate="in"
  //     exit="out"
  //     variants={pageVariants}
  //     transition={pageTransition}
  //     className="p-4"
  //   >
  //     <div className={styles.login}>
  //       <div className={styles.loginFormContainer}>
  //         <form>
  //           <h1>Personal information</h1>
  //           <div className={styles.input}>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="20px"
  //               height="20px"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 fill="#000"
  //                 d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
  //               />
  //             </svg>
  //             <input type="text" placeholder="Username" />
  //           </div>
  //           <div className={styles.input}>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="20px"
  //               height="20px"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 fill="#000"
  //                 d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
  //               />
  //             </svg>
  //             <input type="text" placeholder="Address" />
  //           </div>
  //           <div className={styles.input}>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="20px"
  //               height="20px"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 fill="#000"
  //                 d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15q0-.825-.587-1.412T12 13q-.825 0-1.412.588T10 15q0 .825.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6z"
  //               />
  //             </svg>
  //             <input type="text" placeholder="Phone Number" />
  //           </div>

  //           <div className="flex w-full justify-center mt-[15px]">
  //             <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded "></div>
  //             <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded"></div>
  //             <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded bg-blue-500"></div>
  //           </div>
  //           <button
  //             onClick={(e) => {
  //               e.preventDefault(); // Prevent form submission
  //               nextPage();
  //             }}
  //             className="bg-white w-40 h-10 rounded-3xl text-[#122285] text-sm font-bold mt-[20px]"
  //           >
  //             Continue
  //           </button>
  //         </form>
  //       </div>
  //       <div className={styles.earthContainer}>
  //         <div className={styles.earthOverlay}>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <img
  //             className="h-[80%] w-[90%] rounded-lg"
  //             src="bin1.jpeg"
  //             alt=""
  //           />
  //           {/* <Earth /> */}
  //         </div>
  //       </div>
  //     </div>
  //   </motion.div>
  // );

  // Render the current page
  // const renderPage = () => {
  //   switch (page) {
  //     case 1:
  //       return <PageOne key="page1" />;
  //     // case 2:
  //     //   return <PageTwo key="page2" />;
  //     // case 3:
  //     //   return <PageThree key="page3" />;
  //     default:
  //       return <div>Signup Complete</div>;
  //   }
  // };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" className="">
        {/* {renderPage()} */}
        {page == 1 && (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="p-4"
          >
            <div className={styles.login}>
              <div className={styles.loginFormContainer}>
                <form>
                  <h1>SignUp</h1>
                  <div className={styles.input}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                      />
                    </svg>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="w-[60%]">
                    {nameErr && <p className="text-red-500">{nameErr}</p>}
                  </div>

                  <div className={styles.input}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                      />
                    </svg>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Email"
                    />
                  </div>
                  <div className="w-[60%]">
                    {emailError && (
                      <p className="text-red-500 whitespace=nowrap">
                        {emailError}
                      </p>
                    )}
                  </div>
                  <div className={styles.input}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15q0-.825-.587-1.412T12 13q-.825 0-1.412.588T10 15q0 .825.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6z"
                      />
                    </svg>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="w-[60%]">
                    {passwordErr && (
                      <p className="text-red-500 whitespace=nowrap whitespace=nowrap">
                        {passwordErr}
                      </p>
                    )}
                  </div>

                  <div className="flex w-full justify-center mt-[15px]">
                    <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded bg-blue-500"></div>
                    <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded "></div>
                    <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded"></div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      validatePage1();
                    }}
                    className="bg-white w-40 h-10 rounded-3xl text-[#122285] text-sm font-bold mt-[20px]"
                  >
                    Continue
                  </button>
                  <Link href={"/login"}>
                    <p className="text-sm text-black text-center mt-[20px]">
                      Don{`&apos;`}t have a account? &nbsp;
                      <span className="underline">Login</span>
                    </p>
                  </Link>
                </form>
              </div>
              <div className={styles.earthContainer}>
                <div className={styles.earthOverlay}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <img
                    className="h-[80%] w-[90%] rounded-lg"
                    src="bin2.jpeg"
                    alt=""
                  />
                  {/* <Earth /> */}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {page === 2 && (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="p-4"
          >
            <div className={styles.login}>
              <div className={styles.loginFormContainer}>
                <form>
                  <h1 className="pb-[50px]">Verify Email</h1>

                  <div className="flex justify-between gap-[10px]">
                    {[...Array(4)].map((_, index) => (
                      <input
                        key={index}
                        className="border p-2 w-[100px] h-[100px] rounded-[10px] text-[30px] text-center"
                        type="text"
                        maxLength="1"
                      />
                    ))}
                  </div>

                  <div className="flex w-full justify-center mt-[15px]">
                    <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded "></div>
                    <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded bg-blue-500"></div>
                    <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded"></div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submission
                      nextPage(); // Call nextPage function
                    }}
                    className="bg-white w-40 h-10 rounded-3xl text-[#122285] text-sm font-bold mt-[20px]"
                  >
                    Continue
                  </button>
                </form>
              </div>
              <div className={styles.earthContainer}>
                <div className={styles.earthOverlay}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <img
                    className="h-[80%] w-[90%] rounded-lg"
                    src="bin3.jpeg"
                    alt=""
                  />
                  {/* <Earth /> */}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {page == 3 && (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="p-4"
          >
            <div className={styles.login}>
              <div className={styles.loginFormContainer}>
                <form onSubmit={handleSubmit}>
                  <h1>Personal information</h1>
                  <div className={styles.input}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                      />
                    </svg>
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      type="text"
                      placeholder="Fisrt Name"
                    />
                  </div>
                  <div className="w-[60%]">
                    {firstnameErr && (
                      <p className="text-red-500 whitespace=nowrap">
                        {firstnameErr}
                      </p>
                    )}
                  </div>
                  <div className={styles.input}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                      />
                    </svg>
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="w-[60%]">
                    {lastNameErr && (
                      <p className="text-red-500 whitespace=nowrap">
                        {lastNameErr}
                      </p>
                    )}
                  </div>

                  <div className={styles.input}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                      />
                    </svg>
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      type="text"
                      placeholder="Address"
                    />
                  </div>
                  <div className="w-[60%]">
                    {addressErr && (
                      <p className="text-red-500 whitespace=nowrap">
                        {addressErr}
                      </p>
                    )}
                  </div>
                  <div className={styles.input}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15q0-.825-.587-1.412T12 13q-.825 0-1.412.588T10 15q0 .825.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6z"
                      />
                    </svg>
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      type="text"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="w-[60%]">
                    {phoneErr && (
                      <p className="text-red-500 whitespace=nowrap">
                        {phoneErr}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full justify-center mt-[15px]">
                    <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded "></div>
                    <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded"></div>
                    <div className="h-[10px] w-[15%] m-5 border-blue-500 border-[1px] rounded bg-blue-500"></div>
                  </div>
                  <button
                    type="submit"
                    className="bg-white w-40 h-10 rounded-3xl text-[#122285] text-sm font-bold mt-[20px]"
                  >
                    Continue
                  </button>
                </form>
              </div>
              <div className={styles.earthContainer}>
                <div className={styles.earthOverlay}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <img
                    className="h-[80%] w-[90%] rounded-lg"
                    src="bin1.jpeg"
                    alt=""
                  />
                  {/* <Earth /> */}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
