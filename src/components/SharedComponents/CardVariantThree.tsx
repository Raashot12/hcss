import React from "react"
import CustomMenu from "./CustomMenu"
import IconEye from "../IconComponents/IconEye"
import IconHorizontalDot from "../IconComponents/IconHorizontalDot"
import IconPencil from "../IconComponents/IconPencil"
import IconAddHouse from "../IconComponents/IconAddHouse"
import IconDelete from "../IconComponents/IconDelete"

interface CardProps {
  id: string
  tag: string
  title: string
  description: string
  image: string
  setIsViewHouse: React.Dispatch<
    React.SetStateAction<{
      booleanState: boolean
      estateId: string
    }>
  >
}

const CardVariantThree = ({
  title,
  description,
  tag,
  image,
  id,
  setIsViewHouse,
}: CardProps) => {
  return (
    <div className="relative">
      <div className="absolute top-2 left-2">
        <button
          className={`shrink-0 z-10 px-3 py-1 cursor-pointer text-[11px] font-[600] rounded-[100px] transition-colors duration-300 bg-green-100 border border-green-800 text-green-800 hover:bg-green-100`}
        >
          {tag}
        </button>
      </div>
      <div
        style={{boxShadow: "0px 4px 4px 1px #00000003"}}
        className={`flex flex-col gap-4 border border-[#D9D9D9] rounded-[8px]  xl:h-[270px] overflow-hidden bg-white `}
      >
        <div
          className="w-full h-[110.66666412353516px] bg-cover flex-shrink-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "30% 60%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className={`w-full pb-6 px-6 pt-0 mx-auto`}>
          <div className="flex items-center flex-col justify-center">
            <h3
              className="text-[24px] font-[700] text-[#000000] overflow-hidden text-ellipsis break-words whitespace-normal"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
              className="text-[#000000] text-center w-[100%] leading-[26px] overflow-hidden text-ellipsis break-words whitespace-normal font-[400] text-[16px] mt-2"
            >
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <CustomMenu>
          <CustomMenu.Target>
            <IconHorizontalDot />
          </CustomMenu.Target>
          <CustomMenu.Dropdown direction="auto" align="right" width="130">
            <CustomMenu.Item
              leftIcon={<IconEye />}
              onClick={() => setIsViewHouse({booleanState: true, estateId: id})}
            >
              <p className="font-[400] ml-2 text-[11px] text-[#4B4B4B]">
                View House
              </p>
            </CustomMenu.Item>
            <CustomMenu.Item leftIcon={<IconPencil />}>
              <p className="font-[400]  ml-2 text-[11px] text-[#4B4B4B]">
                Edit Estate
              </p>
            </CustomMenu.Item>
            <CustomMenu.Item leftIcon={<IconAddHouse />}>
              <p className="font-[400]  ml-2 text-[11px] text-[#4B4B4B]">
                Add House
              </p>
            </CustomMenu.Item>

            <CustomMenu.Item
              leftIcon={
                <div className="animate-swayout">
                  <IconDelete />
                </div>
              }
            >
              <p className="font-[700]  ml-2 text-[11px] text-[#E40000]">
                Delete
              </p>
            </CustomMenu.Item>
          </CustomMenu.Dropdown>
        </CustomMenu>
      </div>
    </div>
  )
}

export default CardVariantThree
