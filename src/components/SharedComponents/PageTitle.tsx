import localFont from "next/font/local"
import React from "react"

const milliRegular = localFont({
  src: "../../components/fonts/millik-regular/millik-Regular.otf",
  weight: "400",
  style: "normal",
})
const PageTitle = ({title}: {title: string}) => {
  return (
    <>
      <h1
        className={`${milliRegular.className} text-[24px] leading-[48px] font-[400] text-[#000000]`}
      >
        {title}
      </h1>
    </>
  )
}

export default PageTitle
