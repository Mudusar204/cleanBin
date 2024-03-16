'use client'
import Image from 'next/image'
import Navbar from '../components/Navbar/Navbar'
import ServiceCard from '../components/ServiceCard/ServiceCard'
import PriceCard from '../components/PriceCard/PriceCard'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { setUserLogin } from '@/store/userSlice'
export default function Home() {
  const dispatch = useDispatch()
  const pathname = usePathname()

  //   useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (pathname !== "/") {
  //       if (!localStorage.getItem("token")) {
  //         window.location.href = "/";
  //       }
  //     }
  //     if (pathname === "/") {
  //       if (localStorage.getItem("token")) {
  //       dispatch(setUserLogin(true));

  //         window.location.href = "/";
  //       }
  //     }
  //   }
  // }, []);

  useEffect(() => {
    let id = localStorage.getItem('userId')
    console.log(id, 'from local storage')

    if (localStorage.getItem('userId')) {
      dispatch(setUserLogin(true))

      // window.location.href = "/";
    }
  }, [])

  const { userDetail, isUserLogin } = useSelector((store: any) => store.userSlice)

  let services = [
    {
      bg: '#E1EDF9',
      img: '/serviceImg1.png',
      heading: 'Bin Cleaning Service',
      title: 'Enjoy our at-home bin cleaning service whether you are home or not.  ',
      description:
        'Our team comes to your location to clean you bin (compost/recycling/garbage). We empty the bin, rinse it, wash it thoroughly, and then dry it – all you have to do is provide the water connection. ',
    },
    {
      bg: '',

      img: '/serviceImg2.png',
      heading: 'Car Wash Service ',
      title: 'Your car cleaned at your convenience',
      description:
        'Our team comes to your location to clean your car (exterior). The service includes rinse, lather with soap and washing off the soap and lastly hand drying the car – all you have to do is provide the water connection. ',
    },
    {
      bg: '#E1EDF9',

      img: '/serviceImg3.png',
      heading: 'Multiple Services',
      title: 'Enjoy $5 off of each service if you combine multiple services.',
      description:
        'If you order both car wash and one bin cleaning or two bin cleaning or any combination thereof, Enjoy 5$ off of each service as a thank you from us.',
    },
    {
      bg: '',

      img: '/serviceImg4.png',
      heading: 'Pressure Wash',
      title: 'Let us do the cleaning for your home and business',
      description:
        'We provide professional pressure washing services for any surface for both water cleaning soap wash. ',
    },
  ]

  let priceCard = [
    {
      bg: '#DCEEFC',
      heading: 'Bin Clean',
      img: '/priceCard1.png',
      shirt: 2,
      price: '30$ / Bin',
      suitPent: 3,
      skirtDress: 5,
      pants: 1,
      blouse: 9,
      service1:"Red Dustbin |",
      service2:"Blue Dustbin |",
      service3:"Green Dustbin |",
    },
    {
      bg: '',

      heading: 'Car Wash',
      img: '/priceCard2.png',
      shirt: 2,
      price: '30$ / Car',
      suitPent: 3,
      skirtDress: 5,
      pants: 1,
      blouse: 9,
      service1:"Inside |",
      service2:"Outside |",
      service3:"Engine |",
    },
    {
      bg: '#DCEEFC',

      heading: 'Commercial Cleaning',
      img: '/priceCard3.png',
      shirt: 2,
      price: '3$ / sq ft',
      suitPent: 3,
      skirtDress: 5,
      pants: 1,
      blouse: 9,
      service1:"Floor Cleaning |",
      service2:"Roof Cleaning|",
      service3:"Carpet Cleaning |",
    },
  ]
  return (
    <div>
      <Navbar />

      {/* header */}
      <div className='bg-white py-[100px] px-[15%] w-[100%] flex justify-center h-auto'>
        <div className='relative rounded-[100%] border-[15px] border-black p-[30px] max-lg:h-[650px] max-sm:h-[500px]  h-[800px] w-[800px]'>
          <div className='bg-[#CFE6FA]  rounded-[100%] w-full h-full flex flex-col justify-center items-center text-[110px] max-lg:text-[80px] max-md:text-[60px] font-extrabold'>
            <div className='absolute left-1/2  top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10] '>
              <p>CLEAN</p> <p>○ BIN ○</p>
            </div>
            <div
              className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1] h-[600px] max-lg:h-[500px] max-sm:h-[320px] max-lg:w-[500px] max-sm:w-[320px] rounded-[100%] w-[600px]'
              style={{
                backgroundImage: "url('/shirt.gif')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
          <div>
            {' '}
            <p className='flex justify-center'>
              <img
                height={70}
                width={70}
                src='/topArrow.png'
                className=' rotate-180 mt-[-60px]'
                alt=''
              />
            </p>
          </div>
        </div>
      </div>

      {/* Serivices section */}
      <div className=' '>
        <div className='bg-[#CFE6FA] pt-[100px] pb-[50px] px-[15%]'>
          <p className='text-[55px] font-extrabold '>
            {' '}
            <span className='border-b-[10px] border-black pb-[20px]'>OUR SERV</span>
            ICES
          </p>
          <p className='text-[20px] font-thin mt-[50px]'>
            Clean Bin provides bin washing services to both{' '}
            <b> residential and commercial garbage,</b> recycling and composting bins. We clean
            residential municipal collection bins with satisfaction guarantee. All our commercial
            services are custom quoted, <b> please contact us using the form </b> (hyperlink to the
            form)
          </p>
        </div>
        {services.map((service, index) => (
          <ServiceCard
            heading={service.heading}
            title={service.title}
            description={service.description}
            img={service.img}
            bg={service.bg}
            key={index}
          />
        ))}
      </div>
      {/* Pricing section */}
      <div>
        <div className=' pt-[100px] pb-[50px] px-[15%]'>
          <p className='text-[55px] font-extrabold '>
            {' '}
            <span className='border-b-[10px] border-black pb-[20px]'>PRICELIST</span>
          </p>
          <p className='text-[20px] font-thin mt-[50px]'>OUR SERVICES:</p>
        </div>
        <div className='flex justify-center   max-2xl:flex-wrap max-2xl:gap-[30px] '>
          {priceCard.map((service, index) => (
            <PriceCard
              heading={service.heading}
              price={service.price}
              img={service.img}
              bg={service.bg}
              key={index}
              service1={service.service1}
              service2={service.service2}
              service3={service.service3}
            />
          ))}
        </div>
      </div>
      {/* Contact Us */}

      {/* footer */}
      <div className=' pt-5 pb-[50px] flex flex-col justify-center items-center '>
        <p className='text-[24px] font-extrabold text-center mb-[40px] '>BACK TO TOP</p>

        <p className='text-[20px] font-thin text-center'>
          © 2024 by Clean Bin. Powered and secured by Wix
        </p>
      </div>
    </div>
  )
}
