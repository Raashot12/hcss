/* eslint-disable @typescript-eslint/no-explicit-any */
import IconPaginateLeft from "@/components/IconComponents/IconPaginateLeft"
import IconPaginateRight from "@/components/IconComponents/IconPaginateRight"
import {useRouter} from "next/router"
import React, {FC, useEffect} from "react"

interface IPaginationProps {
  idToClampTo?: string
  data?: any[]
  pagination: any[]
  prevPage: (e: any) => void
  nextPage: (e: any) => void
  changePage: (page: number, e?: any) => void
}

const Pagination: FC<IPaginationProps> = ({
  idToClampTo = "",
  data,
  pagination,
  prevPage,
  nextPage,
  changePage,
}) => {
  const router = useRouter()

  // When data changes, navigate to page 1
  useEffect(() => {
    changePage(1)
  }, [data])

  // Utility function to scroll back to the target section
  const handleClamp = () => {
    if (idToClampTo) {
      const pathAndSlug = router.asPath.split("#")[0]
      const newPath = `${pathAndSlug}#${idToClampTo}`
      window.location.replace(newPath)
    }
  }

  return (
    <div className="flex justify-start items-center gap-1">
      {/* Left Arrow Button */}
      <button
        onClick={e => {
          prevPage(e)
          handleClamp()
        }}
        className={`${
          pagination.length === 0 ? "hidden" : "flex"
        } items-center bg-transparent hover:bg-transparent active:bg-transparent`}
      >
        <IconPaginateLeft />
      </button>

      {/* Pagination Numbers */}
      <ul className="hidden  gap-2  items-center justify-center">
        {pagination.map(page => {
          if (!page.ellipsis) {
            return (
              <li key={page.id}>
                <button
                  onClick={e => {
                    changePage(page.id, e)
                    handleClamp()
                  }}
                  className={`text-sm font-normal text-[#0A0A0A] h-6 px-2 py-1 rounded 
                    ${page.current ? "bg-[#F0F0F0]" : "bg-transparent"} 
                    hover:bg-[#F0F0F0] active:bg-[#F0F0F0]`}
                >
                  {page.id}
                </button>
              </li>
            )
          }
          return (
            <li key={page.id} className="list-none">
              <button className="bg-transparent text-[#051438] h-9 px-2 py-1 rounded hover:bg-transparent">
                &hellip;
              </button>
            </li>
          )
        })}
      </ul>

      {/* Right Arrow Button */}
      <button
        onClick={e => {
          nextPage(e)
          handleClamp()
        }}
        className={`${
          pagination.length === 0 ? "hidden" : "flex"
        } items-center  bg-transparent hover:bg-transparent active:bg-transparent`}
      >
        <IconPaginateRight />
      </button>
    </div>
  )
}

export default Pagination
