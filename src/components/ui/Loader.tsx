import React from "react"

interface LoaderSpinnerProps {
  size?: number | string
  borderWidth?: number
  color?: string
  className?: string
}

const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({
  size = 40,
  borderWidth = 2,
  color,
  className = "",
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-t-transparent border-[${color}] ${className}`}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
        borderWidth: borderWidth,
      }}
    />
  )
}

export default LoaderSpinner
