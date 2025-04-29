import React, {useRef, useState, useEffect} from "react"

interface ScrollAreaProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [thumbHeight, setThumbHeight] = useState(0)
  const [thumbTop, setThumbTop] = useState(0)

  const updateThumb = () => {
    const container = containerRef.current
    if (!container) return
    const {clientHeight, scrollHeight, scrollTop} = container
    const heightRatio = clientHeight / scrollHeight
    // Ensure the thumb has a minimum height (e.g., 20px)
    const newThumbHeight = Math.max(clientHeight * heightRatio, 20)
    const maxThumbTop = clientHeight - newThumbHeight
    // Calculate thumb top proportionally
    const newThumbTop =
      (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop || 0
    setThumbHeight(newThumbHeight)
    setThumbTop(newThumbTop)
  }

  useEffect(() => {
    updateThumb()
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", updateThumb)
      window.addEventListener("resize", updateThumb)
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateThumb)
      }
      window.removeEventListener("resize", updateThumb)
    }
  }, [])

  return (
    <div className={`relative ${className || ""}`} style={style}>
      <div
        ref={containerRef}
        className="overflow-auto h-full"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      <div className="absolute top-0 right-0 h-full w-2 bg-gray-200 rounded">
        <div
          className="bg-gray-500 rounded w-full"
          style={{
            height: thumbHeight,
            transform: `translateY(${thumbTop}px)`,
          }}
        />
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default ScrollArea
