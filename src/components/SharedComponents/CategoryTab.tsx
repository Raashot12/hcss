import React, {Dispatch, useEffect, useState} from "react"

const CategoryTabs = ({
  data,
  setGetPercentage,
}: {
  data: {
    title: string
    id: number
    percent?: number
  }[]
  setGetPercentage?: Dispatch<React.SetStateAction<number>>
}) => {
  const [active, setActive] = useState(data[0]?.title)

  useEffect(() => {
    setActive(data[0]?.title)
  }, [data])
  return (
    <div className="overflow-x-auto w-fit scrollbar-hidden">
      <div className="flex gap-4 w-max px-4">
        {data.map(category => (
          <button
            key={category.id}
            onClick={() => {
              setActive(category.title)
              setGetPercentage?.(category?.percent as number)
            }}
            className={`shrink-0  z-10 px-6 py-2 cursor-pointer text-[10px] font-[500] rounded-full transition-colors duration-300 
              ${
                active === category.title
                  ? "bg-green-800 text-white font-[700]"
                  : "border border-green-800 text-green-800 hover:bg-green-100"
              }`}
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryTabs
