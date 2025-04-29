import React, {useState} from "react"


interface AppShellProps {
  header?: React.ReactNode
  children: React.ReactNode
}

export const AppShell: React.FC<AppShellProps> = ({
  header,
  children,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Overlay for mobile */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      {/* Header */}
      <header>
        <div className="flex-1">{header}</div>
      </header>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
