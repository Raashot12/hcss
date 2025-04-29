import React from "react"
import {IconArticle, IconRefreshDot} from "@tabler/icons-react"

interface EmptyStateProps {
  resetFunct?: () => void
  emptyStateMessage?: string
  buttonText?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
  resetFunct,
  emptyStateMessage = "No article found",
  buttonText,
}) => {
  return (
    <div className="flex items-center justify-center h-[330px] py-3">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <div className="w-[120px] h-[120px] flex items-center justify-center mb-12 rounded-full bg-white shadow-md">
            <IconArticle size={48} className="text-gray-700" />
          </div>
        </div>
        <p className="text-lg font-medium text-gray-900">No Estate found</p>
        <p className="mt-2 text-gray-700 font-medium">{emptyStateMessage}</p>
        {buttonText && (
          <div className="mt-8 flex justify-center">
            <button
              className="flex items-center px-4 py-2 bg-[#335F32] text-white rounded-md shadow-md hover:[#335F32] transition duration-300"
              onClick={resetFunct}
            >
              {buttonText}
              <IconRefreshDot size={20} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmptyState
