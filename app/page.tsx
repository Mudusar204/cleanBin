"use client";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import ServiceCard from "../components/ServiceCard/ServiceCard";
import PriceCard from "../components/PriceCard/PriceCard";
export default function Home() {
  let services = [
    {
      bg: "#E1EDF9",
      img: "/serviceImg1.png",
      heading: "SELF SERVICE",
      title: "Enjoy our relaxing atmosphere, while your laundry washed",
      description:
        "I'm a paragraph. Use this area to describe one of your services. You can change the title to the service you provide and use this text area to describe your service. Feel free to change the image.",
    },
    {
      bg: "",

      img: "/serviceImg2.png",
      heading: "DROP-OFF SERVICE",
      title: "Drop your laundry off in our Shop, and let us do it all for you.",
      description:
        "I'm a paragraph. Use this area to describe one of your services. You can change the title to the service you provide and use this text area to describe your service. Feel free to change the image.",
    },
    {
      bg: "#E1EDF9",

      img: "/serviceImg3.png",
      heading: "FULL SERVICE",
      title: "You Order > We Collect > We Clean > We Deliver",
      description:
        "I'm a paragraph. Use this area to describe one of your services. You can change the title to the service you provide and use this text area to describe your service. Feel free to change the image.",
    },
    {
      bg: "",

      img: "/serviceImg4.png",
      heading: "COMMERCIAL",
      title: "Let us do the laundry for your business",
      description:
        "I'm a paragraph. Use this area to describe one of your services. You can change the title to the service you provide and use this text area to describe your service. Feel free to change the image..",
    },
  ];

  let priceCard = [
    {
      bg: "#DCEEFC",
      heading: "WASH & FOLD SERVICE",
      img: "/priceCard1.png",
      shirt: 2,
      suitJacket: 3,
      suitPent: 3,
      skirtDress: 5,
      pants: 1,
      blouse: 9,
    },
    {
      bg: "",

      heading: "DRY-CLEANING SERVICE",
      img: "/priceCard2.png",
      shirt: 2,
      suitJacket: 3,
      suitPent: 3,
      skirtDress: 5,
      pants: 1,
      blouse: 9,
    },
    {
      bg: "#DCEEFC",

      heading: "IRONING SERVICE",
      img: "/priceCard3.png",
      shirt: 2,
      suitJacket: 3,
      suitPent: 3,
      skirtDress: 5,
      pants: 1,
      blouse: 9,
    },
  ];
  return (
    <div>
      <Navbar />

      {/* header */}
      <div className="bg-white py-[100px] px-[15%] w-[100%] flex justify-center h-auto">
        <div className="relative rounded-[100%] border-[15px] border-black p-[30px] max-lg:h-[650px] max-sm:h-[500px]  h-[800px] w-[800px]">
          <div className="bg-[#CFE6FA]  rounded-[100%] w-full h-full flex flex-col justify-center items-center text-[110px] max-lg:text-[80px] max-md:text-[60px] font-extrabold">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10] ">
              <p>LAUNDRY</p> <p>○ SHOP ○</p>
              <p className="flex justify-center">
                <img
                  height={70}
                  width={70}
                  src="/topArrow.png"
                  className="mt-[40px] rotate-180"
                  alt=""
                />
              </p>
            </div>
            <div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1] h-[600px] max-lg:h-[500px] max-sm:h-[320px] max-lg:w-[500px] max-sm:w-[320px] rounded-[100%] w-[600px]"
              style={{
                backgroundImage: "url('/shirt.gif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Serivices section */}
      <div className=" ">
        <div className="bg-[#CFE6FA] pt-[100px] pb-[50px] px-[15%]">
          <p className="text-[55px] font-extrabold ">
            {" "}
            <span className="border-b-[10px] border-black pb-[20px]">
              OUR SERV
            </span>
            ICES
          </p>
          <p className="text-[20px] font-thin mt-[50px]">
            OUR SERVICES I'm a paragraph. Click here to add your own text and
            edit me. It{`&apos;`}s easy. Just click “Edit Text” or double click me to add
            your own content and make changes to the font. I{`&apos;`}m a great place for
            you to tell a story and let your users know a little more about you.
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
        <div className="bg-[#E1EDF9] pt-[100px] pb-[50px] px-[15%]">
          <p className="text-[55px] font-extrabold ">
            {" "}
            <span className="border-b-[10px] border-black pb-[20px]">
              PRICELIST
            </span>
          </p>
          <p className="text-[20px] font-thin mt-[50px]">
            OUR SERVICES I'm a paragraph. Click here to add your own text and
            edit me. It{`&apos;`}s easy. Just click “Edit Text” or double click me to add
            your own content and make changes to the font. I{`&apos;`}m a great place for
            you to tell a story and let your users know a little more about you.
          </p>
        </div>
        <div className="flex justify-center max-2xl:flex-wrap max-2xl:gap-[30px] bg-[#E6F3FF]">
          {priceCard.map((service, index) => (
            <PriceCard
              heading={service.heading}
              shirtPrice={service.shirt}
              suitJacketPrice={service.suitJacket}
              suitJacketPent={service.suitPent}
              skirtDressPrice={service.skirtDress}
              pentPrice={service.pants}
              blousePrice={service.blouse}
              img={service.img}
              bg={service.bg}
              key={index}
            />
          ))}
        </div>
      </div>
      {/* Contact Us */}
      <div>
        <div className="bg-[#E1EDF9] pt-[100px] pb-[50px] px-[15%]">
          <p className="text-[55px] font-extrabold ">
            <span className="border-b-[10px] border-black pb-[20px]">
              CONTACT
            </span>
          </p>
          <div className="flex justify-between gap-[100px] mt-[60px]">
            <div className="flex flex-col gap-[20px]">
              <div>
                <p className="text-[24px] font-extrabold">ADDRESS</p>
                <p className="text-[24px] font-thin">
                  500 Terry Francine Street San Francisco,CA 94158
                </p>
              </div>
              <div>
                <p className="text-[24px] font-extrabold">TEL</p>
                <p className="text-[24px] font-thin">123-456-7890</p>
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div>
                <p className="text-[24px] font-extrabold">EMAIL</p>
                <p className="text-[24px] font-thin">info@mysite.com</p>
              </div>
              <div>
                <p className="text-[24px] font-extrabold">OPENING HOURS</p>
                <p className="text-[24px] font-thin">
                  Mon - Fri: 8am - 8pm <br />
                  ​​Saturday: 9am - 7pm <br />
                  ​Sunday: 9am - 8pm
                </p>
              </div>
            </div>
          </div>
        </div>
        <img className="my-[20px]" src="/mapImg.png" alt="" />
      </div>
      {/* footer */}
      <div className="bg-[#E1EDF9] pb-[50px] flex flex-col justify-center items-center ">
        <img
          height={70}
          width={70}
          src="/topArrow.png"
          className="mt-[40px]"
          alt=""
        />
        <p className="text-[24px] font-extrabold text-center mb-[40px] ">
          BACK TO TOP
        </p>

        <p className="text-[20px] font-thin text-center">
          © 2035 by Laundry Shop. Powered and secured by Wix
        </p>
      </div>
    </div>
  );
}
