import React, {forwardRef, TextareaHTMLAttributes} from "react"
import clsx from "clsx"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string
  withoutIcon?: boolean
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({className, withoutIcon, ...props}, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={clsx(
          `w-full rounded-[8px] shrink-0 border pt-2 text-[14px] font-[500] border-[#F0F0F0] ${
            withoutIcon
              ? "placeholder:text-[12px] placeholder:text-[#4B4B4B]"
              : "placeholder:text-[11px] placeholder:text-[#979797]"
          } leading-[21px] h-[39px] px-4 ${withoutIcon ? "pl-4" : "pl-10"} ${
            withoutIcon ? "text-[#4B4B4B]" : "text-gray-800"
          } focus:outline-none`,
          className
        )}
      />
    )
  }
)

TextArea.displayName = "TextArea"

export default TextArea
