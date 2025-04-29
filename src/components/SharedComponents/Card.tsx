import React from 'react'
import IconArrowPointer from '../IconComponents/IconArrowPointer'

const Card = ({
  title,
  subtitle,
  icon,
  id,
  isGetStarted,
}: {
  title: string
  subtitle: string
  icon: React.ReactElement
  id: number
  isGetStarted?: boolean
}) => {
  return (
    <div
      className={`border-2 cursor-pointer border-green-800 rounded-[16px] pt-6 ${
        isGetStarted ? "px-5" : "px-7"
      } ${isGetStarted && "w-[100%]"}  max-w-[100%] ${
        isGetStarted ? "py-2" : "py-10"
      } shadow-sm`}
      data-aos="fade-up"
      data-aos-duration={`${2000 + id}`}
    >
      <div className="flex items-center mb-4">{icon}</div>
      <h3 className="font-[700] text-[#000000] text-[18px]">{title}</h3>
      <p className="text-[#000000] text-sm mt-2">{subtitle}</p>
      {isGetStarted && (
        <button className="bg-[#1C501E] text-white mt-6 px-6 h-[40px] rounded-full flex items-center justify-center gap-2 text-[13px] font-[700] w-full shadow-md hover:bg-[#174319] transition">
          Get Started Now
          <span className="animate-sway">
            <IconArrowPointer />
          </span>
        </button>
      )}
    </div>
  )
}

export default Card