import React, {useState} from "react"
import IconArrowDown from "@/components/IconComponents/IconArrowDown"
import localFont from "next/font/local"
import TextInput from "@/components/SharedComponents/Input"
import IconSearchForDashboard from "@/components/IconComponents/IconSearchForDashboard"
import IconBell from "@/components/IconComponents/IconBell"
import IconClock from "@/components/IconComponents/IconClock"
import IconShare from "@/components/IconComponents/IconShare"
import CustomMenu from "@/components/SharedComponents/CustomMenu"
import IconSystem from "@/components/IconComponents/IconSystem"
import IconGuide from "@/components/IconComponents/IconGuide"
import IconVideo from "@/components/IconComponents/IconVideo"

const milliRegular = localFont({
  src: "../components/fonts/millik-regular/millik-Regular.otf",
  weight: "400",
  style: "normal",
})
export default function DashboardHeader({}: {
  toggleMobile?: () => void
  isOpened?: boolean
}) {
  const [search, setSearch] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <header
        className={`fixed top-0 right-0 w-full h-[100px] flex-shrink-0 flex py-[30px] justify-between px-[25px] md:px-[38px] border-b border-[#F0F0F0] bg-white z-50`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1 flex-col">
            <div className="flex items-center gap-2">
              <p
                className={`font-[40] ${milliRegular.className} text-[17px] leading-[26px]`}
              >
                HCSS Products
              </p>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-[12px] font-[400] text-black">
                Inventory management
              </span>
            </div>
          </div>
          <div className="hidden xl:flex relative w-full max-w-[374px]">
            <span className="absolute left-4 top-[10px] text-gray-400">
              <IconSearchForDashboard size={20} />
            </span>
            <TextInput
              type="text"
              placeholder="Search for anything"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex space-x-4 items-center cursor-pointer">
            <CustomMenu>
              <CustomMenu.Target>
                <div className="hidden xl:flex justify-center">
                  <button className="bg-[#F0F0F0] text-[#335F32] px-3 py-3 rounded-full flex items-center gap-2 text-[11px] font-[700] hover:bg-[#F0F0F0] transition">
                    <span className="animate-bounce">
                      <IconSystem />
                    </span>
                    Explore Our Products{" "}
                    <span>
                      <IconArrowDown fill="#335F32" />
                    </span>
                  </button>
                </div>
              </CustomMenu.Target>
              <CustomMenu.Dropdown>
                <CustomMenu.Item leftIcon={<IconGuide />}>
                  <p className="font-[500] text-[12px] text-black">
                    Product Tour & Guide
                  </p>
                </CustomMenu.Item>
                <CustomMenu.Item leftIcon={<IconVideo />}>
                  <p className="font-[500] text-[12px] text-black">
                    Video Tutorial
                  </p>
                </CustomMenu.Item>
              </CustomMenu.Dropdown>
            </CustomMenu>
            <IconBell />
            <IconClock />
            <IconShare />
          </div>
        </div>
      </header>
    </>
  )
}
