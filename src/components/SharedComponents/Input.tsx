import React, {forwardRef, InputHTMLAttributes} from "react"
import clsx from "clsx"

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  withoutIcon?: boolean
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({className, withoutIcon, ...props}, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={clsx(
          `w-full rounded-[100px] shrink-0 border text-[14px] font-[500] border-[#F0F0F0] ${
            withoutIcon
              ? "placeholder:text-[12px] placeholder:text-[#4B4B4B]"
              : "placeholder:text-[11px] placeholder:text-[#979797]"
          }  leading-[21px] h-[39px] px-4 ${withoutIcon ? "pl-4" : "pl-10"} ${
            withoutIcon ? "text-[#4B4B4B]" : "text-gray-800"
          }  focus:outline-none`,
          className
        )}
      />
    )
  }
)

TextInput.displayName = "TextInput"

export default TextInput
