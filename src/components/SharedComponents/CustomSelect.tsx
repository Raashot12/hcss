/* eslint-disable @typescript-eslint/no-unused-expressions */
import clsx from "clsx"
import {useState, useRef, useEffect} from "react"
import IconSearchForDashboard from "../IconComponents/IconSearchForDashboard"
import LoaderSpinner from "./Loader"

export type Option = {value: string; label: string}

type CustomSelectProps = {
  data: Option[]
  placeholder?: string
  searchable?: boolean
  value?: string
  onChange?: (value: string) => void
  onItemSubmit?: (item: Option) => void
  className?: string
  label?: string
  loadingState?: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  data,
  placeholder = "Select...",
  searchable = false,
  className,
  onChange,
  label,
  loadingState,
  onItemSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropUp, setDropUp] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const dropdownHeight = 240
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top

      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropUp(true)
      } else {
        setDropUp(false)
      }
    }
  }, [isOpen])

  const filteredData = data.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    onChange && onChange(option.value)
    setIsOpen(false)
    onItemSubmit?.(option)
    setSearchValue("")
  }

  const dropdownStyle = dropUp
    ? {
        bottom: "calc(100% + 4px)",
        top: "auto",
        transformOrigin: "bottom",
        transform: isOpen ? "rotateX(0deg)" : "rotateX(90deg)",
        opacity: isOpen ? 1 : 0,
      }
    : {
        top: "calc(100% + 4px)",
        bottom: "auto",
        transformOrigin: "top",
        transform: isOpen ? "rotateX(0deg)" : "rotateX(-90deg)",
        opacity: isOpen ? 1 : 0,
      }

  return (
    <div className="relative" ref={containerRef}>
      <h1 className="text-[12px] font-[700] mb-[2px] text-[#000000]">
        {label} <span className="text-red-500">*</span>
      </h1>
      <div
        className="w-full rounded-[100px] shrink-0 border text-[14px] font-[500] border-[#F0F0F0] placeholder:text-[11px] placeholder:text-[#979797] leading-[21px] h-[42px] px-4  text-gray-800 focus:outline-none flex items-center justify-between"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span
          className={`${
            selectedOption
              ? "font-[500] text-[14px] text-[#4B4B4B]"
              : "text-[#4B4B4B] font-[500] text-[12px]"
          }`}
        >
          {selectedOption ? selectedOption?.label?.toUpperCase() : placeholder}
        </span>
        {loadingState ? (
          <LoaderSpinner size={10} color="#335F32" />
        ) : (
          <svg
            className={`w-4 h-4 ml-2 transition-transform duration-300 transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>

      <div
        className="absolute left-0 right-0 z-10 bg-white border border-[#F0F0F0]  rounded max-h-60 overflow-auto transition-transform duration-300"
        style={dropdownStyle}
      >
        {searchable && (
          <div className="p-2">
            <div className="relative w-full max-w-[374px]">
              <span className="absolute left-4 top-[10px] text-gray-400">
                <IconSearchForDashboard />
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Search..."
                className={clsx(
                  "w-full rounded-[10px] shrink-0 border text-[14px] font-[500] border-[#F0F0F0] placeholder:text-[11px] placeholder:text-[#979797] leading-[21px] h-[39px] px-4 pl-10 text-gray-800 focus:outline-none",
                  className
                )}
              />
            </div>
          </div>
        )}
        <ul>
          {filteredData.length > 0 ? (
            filteredData.map(option => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No options found</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default CustomSelect
