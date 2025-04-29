import {StaticImageData} from "next/image"
import React from "react"
import Image from "next/image"
import IconArrowPointer from "../IconComponents/IconArrowPointer"

interface CardProps {
  title: string
  description: string
  button1: {text: string; link: string}
  button2?: {text: string; link: string}
  image: StaticImageData
  index: number;
}

const CardVariantOne: React.FC<CardProps> = ({
  title,
  description,
  button1,
  image,
  index,
}) => {
  return (
    <div
      className="relative xl:h-[328px]"
      data-aos={`${index === 0 ? "fade-right" : "fade-left"}`}
      data-aos-duration="2000"
    >
      <div className="absolute top-[-5px] left-1 w-full h-full xl:h-[340px] bg-primaryGreen rounded-[40px] z-[-1]"></div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start border border-[#000000] rounded-[40px] shadow-lg overflow-hidden bg-white">
        <div
          className={`sm:w-1/2 w-full pb-6 px-6 ${
            title === "Short Lets" || title === "Services" ? "pt-12" : "p-6"
          }`}
        >
          <h3 className="text-[24px] font-[700] text-[#000000]">{title}</h3>
          <p className="text-[#000000] xl:w-[259px] max-w-[100%] leading-[26px] font-[400] text-[16px] mt-2">
            {description}
          </p>
          <div className="flex gap-2 mt-4">
            <button className="bg-[#1C501E] text-white px-6 py-3 rounded-full flex items-center gap-2 text-[13px] font-[700] shadow-md hover:bg-[#174319] transition">
              {button1?.text}
              <span>
                <IconArrowPointer />
              </span>
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="sm:w-1/2 w-full h-[328px]">
          <Image
            src={image.src}
            width={285}
            height={317}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default CardVariantOne
