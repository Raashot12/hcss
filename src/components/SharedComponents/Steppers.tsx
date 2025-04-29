import React from "react"

interface SteppersProps {
  percent: number
}

const Steppers: React.FC<SteppersProps> = ({percent}) => {
  const boxTwoBg = percent >= 50 ? "#335f32" : "#D9D9D9"
  const boxTwoText = percent >= 50 ? "white" : "#D9D9D9"
  const boxThreeBg = percent >= 100 ? "#335f32" : "#D9D9D9"
  const boxThreeText = percent >= 100 ? "white" : "#D9D9D9"

  return (
    <div className="relative w-full h-[8px]  mx-auto xl:w-[5px] xl:h-full">
      <div className="relative w-full block mx-auto bg-[#d9d9d9] rounded-[2px] h-[4px] xl:h-[575px]">
        <div
          className="hidden xl:block bg-[#335f32] rounded-[2px] absolute transition-all duration-[3000ms] ease-in-out left-0 top-0 w-full"
          style={{height: `${percent}%`}}
        />

        <div
          className="block xl:hidden bg-[#335f32] rounded-[2px] absolute transition-all duration-[3000ms] ease-in-out left-0 top-0 h-full"
          style={{width: `${percent}%`}}
        />
      </div>

      <div className="absolute top-[49.9%] left-0 transform -translate-y-1/2 flex flex-row justify-between items-center w-full h-auto cursor-pointer  xl:bottom-0 xl:left-1/2 xl:transform xl:-translate-x-1/2 xl:flex-col xl:justify-between xl:items-center xl:h-full">
        {/* Step 1 */}
        <div className="flex flex-col items-center relative">
          <div className="w-[57px] h-[57px] bg-[#335f32] flex items-center justify-center text-white rounded-full text-[24px] font-bold">
            1
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center relative">
          <div
            className="w-[57px] h-[57px] flex items-center justify-center rounded-full text-[24px] font-bold transition-all duration-1000 ease-in-out"
            style={{backgroundColor: boxTwoBg, color: boxTwoText}}
          >
            2
          </div>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center relative">
          <div
            className="w-[57px] h-[57px] flex items-center justify-center rounded-full text-[24px] font-bold transition-all duration-300 ease-in-out"
            style={{backgroundColor: boxThreeBg, color: boxThreeText}}
          >
            3
          </div>
        </div>
      </div>
    </div>
  )
}

export default Steppers
