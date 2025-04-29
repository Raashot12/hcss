import {StaticImageData} from "next/image"
import React from "react"
import IconArrowPointer from "../IconComponents/IconArrowPointer"

interface CardProps {
  title: string
  description: string
  button1: {text: string; link: string}
  button2?: {text: string; link: string}
  image: StaticImageData
  index: number
}
const CardVariantTwo = ({
  title,
  description,
  button1,
  button2,
  image,
  index,
}: CardProps) => {
  return (
    <div
      className="relative"
      data-aos={`${index === 0 ? "fade-right" : "fade-left"}`}
      data-aos-duration="2000"
    >
      <div className="absolute top-[-5px] left-1 w-full h-full xl:h-[602px] bg-gradient-to-r from-[#EAA315] via-[#335F32] to-[#335F32] rounded-[40px] z-[-1]"></div>
      <div
        className={`flex flex-col gap-3 justify-between border border-[#000000] rounded-[40px]  xl:h-[593px] shadow-lg overflow-hidden ${
          title === "Invest" ? "bg-[#FFFFE8]" : "bg-white"
        }  `}
      >
        <div
          className={`w-full pb-6 px-6 ${
            title === "Short Lets" || title === "Services" ? "pt-12" : "p-6"
          }`}
        >
          <h3 className="text-[24px] font-[700] text-[#000000]">{title}</h3>
          <p className="text-[#000000] w-[100%] leading-[26px] font-[400] text-[16px] mt-2">
            {description}
          </p>
          <div className="flex gap-2 mt-4">
            <button className="bg-[#1C501E] text-white px-6 py-3 rounded-full flex items-center gap-2 text-[13px] font-[700] shadow-md hover:bg-[#174319] transition">
              {button1?.text}
              <span>
                <IconArrowPointer />
              </span>
            </button>
            <button className="bg-[#FFFFFF] border border-primaryGreen  text-[#335F32] w-[165px] flex items-center justify-center py-3 rounded-full  gap-2 text-[13px] font-[700] shadow-md hover:bg-[#eeeded] transition">
              {button2?.text}
            </button>
          </div>
        </div>
        {/* Image Container */}
        <div
          className="w-full h-[293px] bg-cover"
          style={{
            backgroundImage: `url(${image.src})`,
            backgroundPosition: "30% 70%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  )
}

export default CardVariantTwo
