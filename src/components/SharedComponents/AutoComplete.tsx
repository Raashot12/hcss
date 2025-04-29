/* eslint-disable @typescript-eslint/no-unused-expressions */
import clsx from "clsx"
import {useState, useRef, useEffect} from "react"
import LoaderSpinner from "./Loader"

export interface AutocompleteItem {
  value: string
  [key: string]: string
}

type CustomSelectProps = {
  data: AutocompleteItem[]
  placeholder?: string
  searchable?: boolean
  value?: string
  handleSelectChange?: (value: string) => void
  onItemSubmit?: (item: AutocompleteItem) => void
  className?: string
  label?: string
  notFound?: React.ReactElement
  loadingState: boolean
} & React.HTMLAttributes<HTMLDivElement>

const AutoComplete: React.FC<CustomSelectProps> = ({
  data,
  placeholder = "Select...",
  searchable = false,
  className,
  handleSelectChange,
  label,
  onItemSubmit,
  notFound,
  loadingState,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropUp, setDropUp] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [, setSelectedOption] = useState<AutocompleteItem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

      setDropUp(spaceBelow < dropdownHeight && spaceAbove > spaceBelow)
    }
  }, [isOpen])

  const handleSelect = (option: AutocompleteItem) => {
    setSelectedOption(option)
    onItemSubmit?.(option)
    setIsOpen(false)
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
      <div className="w-full rounded-[100px] shrink-0 border text-[14px] font-[500] border-[#F0F0F0] placeholder:text-[11px] placeholder:text-[#979797] leading-[21px] h-[41px] px-4 text-gray-800 focus:outline-none flex items-center justify-between">
        {searchable && (
          <input
            type="text"
            value={searchValue}
            onClick={() => setIsOpen(true)}
            {...rest}
            onChange={e => {
              setSearchValue(e.target.value)
              handleSelectChange && handleSelectChange(e.target.value)
            }}
            placeholder={placeholder}
            className={clsx(
              className,
              "text-[#4B4B4B] w-fit outline-none text-[14px] font-[500] placeholder:font-[500] placeholder:text-[12px] placeholder:text-[#4B4B4B]"
            )}
          />
        )}
        {loadingState ? (
          <div className="flex py-2 items-center justify-center">
            <LoaderSpinner size={16} color="#335F32" />
          </div>
        ) : (
          <svg
            className={`w-4 h-4 ml-2 transition-transform duration-300 transform ${
              isOpen && searchValue?.length >= 2 ? "rotate-180" : ""
            }`}
            onClick={() => setIsOpen(!isOpen)}
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
      {searchValue?.length > 2 && (
        <div
          className="absolute left-0 right-0 z-10 bg-white border border-[#F0F0F0] rounded max-h-60 overflow-auto transition-transform duration-300"
          style={dropdownStyle}
        >
          {
            <ul>
              {data.length > 0
                ? data.map(option => (
                    <li
                      key={option.value}
                      onClick={() => {
                        setSearchValue(option.value)

                        handleSelect(option)
                      }}
                      className="p-2 text-[11px] text-[#000000] font-[500] hover:bg-gray-100 cursor-pointer"
                    >
                      {option.value}
                    </li>
                  ))
                : notFound || (
                    <li className="p-2 text-center text-gray-500">
                      No options found
                    </li>
                  )}
            </ul>
          }
        </div>
      )}
    </div>
  )
}

export default AutoComplete
