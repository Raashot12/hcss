import localFont from 'next/font/local'
import React from 'react'

const milliRegular = localFont({
  src: "../../components/fonts/millik-regular/millik-Regular.otf",
  weight: "400",
  style: "normal",
})
const Title = ({title, subTitle}: {title: string; subTitle: string}) => {
  return (
    <>
      <h1
        data-aos="fade-left"
        data-aos-duration="2000"
        className={`${milliRegular.className} text-center text-[36px] leading-[48px] font-[700] text-primaryGreen relative after:content-[''] after:block after:w-[80px] after:h-[2px] after:bg-primaryGreen after:mx-auto after:transition-transform after:duration-300 after:scale-x-100`}
      >
        {title}
      </h1>
      {subTitle && (
        <p
          data-aos="fade-right"
          data-aos-duration="2000"
          className="mx-auto text-center mt-4 w-[401px] max-w-[100%]"
        >
          {subTitle}
        </p>
      )}
    </>
  )
}

export default Title