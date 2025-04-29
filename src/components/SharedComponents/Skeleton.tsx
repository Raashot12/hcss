import React from "react"
import clsx from "clsx"

interface SkeletonProps {
  width?: string
  height?: string
  rounded?: string
  animated?: boolean
  className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  rounded = "md",
  animated = true,
  className = "",
}) => {
  return (
    <div
      className={clsx(
        `bg-[#E6E9EC] dark:bg-gray-700`,
        animated && `animate-pulse`,
        `rounded-${rounded}`,
        className
      )}
      style={{height: height, width: width}}
    ></div>
  )
}

export default Skeleton
