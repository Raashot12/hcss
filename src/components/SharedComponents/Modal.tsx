import React, {useEffect} from "react"
import ScrollArea from "./ScrollArea"

type ModalProps = {
  children: React.ReactNode
  isOpen: boolean
  onClose?: () => void
  headerComponent: React.ReactElement
  footer: React.ReactElement
}

const Modal: React.FC<ModalProps> = ({
  children,
  headerComponent,
  footer,
  isOpen,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-end">
      <div className="w-full h-full bg-white flex flex-col">
        {headerComponent}
        <ScrollArea className="flex-1 h-[calc(100vh-100px)] px-[25px] md:px-[38px] overflow-y-auto">
          {children}
        </ScrollArea>
        {footer}
      </div>
    </div>
  )
}

export default Modal
