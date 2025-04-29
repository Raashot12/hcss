import BulkUpload from "@/components/BulkUpload"
import DashboardHeader from "@/components/DashboardHeader"
import ProductTable from "@/components/ProductTable"
import {AppShell} from "@/components/ui/AppShell"
import {useState} from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"upload" | "manage">("upload")
  return (
    <AppShell header={<DashboardHeader />}>
      <div className="min-h-screen mt-22">
        <header>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                HCSS Admin Dashboard
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("upload")}
                className={`${
                  activeTab === "upload"
                    ? "border-[#346633] text-[#346633]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Bulk Upload
              </button>
              <button
                onClick={() => setActiveTab("manage")}
                className={`${
                  activeTab === "manage"
                    ? "border-[#346633] text-[#346633]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Manage Products
              </button>
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === "upload" ? <BulkUpload /> : <ProductTable />}
          </div>
        </main>
      </div>
    </AppShell>
  )
}
