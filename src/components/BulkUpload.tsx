import {useState, useRef} from "react"
import {toast} from "react-toastify"
import {useForm} from "react-hook-form"
import {read, utils} from "xlsx"
import {parse as parseCsv} from "papaparse"
import {bulkUploadProducts} from "@/lib/api"
import {FileParseResult} from "@/lib/type"

export default function BulkUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [parseResult, setParseResult] = useState<FileParseResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    register,
    reset,
    formState: {errors},
  } = useForm()
  const {
    ref: registerRef,
    onChange: registerOnChange,
    ...restRegister
  } = register("file", {required: "Please select a file"})

  const requiredColumns = [
    "Product Name",
    "Batch Number",
    "Expiry Date",
    "Unit",
    "Category",
  ]

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await parseFile(file)
      setParseResult(result)
    } catch (error) {
      console.error("File parsing error:", error)
      toast.error(
        "Failed to parse file. Please check the format and try again.",
        {
          position: "top-left",
        }
      )
    }
  }

  const getValueByHeaderCaseInsensitive = (
    row: Record<string, string>,
    header: string
  ) => {
    const matchedKey = Object.keys(row).find(
      key => key.trim().toLowerCase() === header.toLowerCase()
    )
    return matchedKey ? row[matchedKey] : ""
  }

  const parseFile = async (file: File): Promise<FileParseResult> => {
    const result: FileParseResult = {
      data: [],
      errors: [],
      isValid: false,
    }

    if (file.name.endsWith(".csv")) {
      return new Promise(resolve => {
        parseCsv(file, {
          header: true,
          skipEmptyLines: true,
          complete: results => {
            const parsedData = results.data as Record<string, string>[]

            const headers = Object.keys(parsedData[0] || {})
            const missingColumns = requiredColumns.filter(
              col =>
                !headers.find(h => h.trim().toLowerCase() === col.toLowerCase())
            )

            if (missingColumns.length > 0) {
              result.errors.push(
                `Missing required columns: ${missingColumns.join(", ")}`
              )
            } else {
              result.data = parsedData.map(row => ({
                productName: getValueByHeaderCaseInsensitive(
                  row,
                  "Product Name"
                ),
                batchNumber: getValueByHeaderCaseInsensitive(
                  row,
                  "Batch Number"
                ),
                expiryDate: getValueByHeaderCaseInsensitive(row, "Expiry Date"),
                unit: getValueByHeaderCaseInsensitive(row, "Unit"),
                category: getValueByHeaderCaseInsensitive(row, "Category"),
              }))

              validateData(result)
            }

            resolve(result)
          },
          error: error => {
            result.errors.push(`CSV parsing error: ${error.message}`)
            resolve(result)
          },
        })
      })
    } else if (file.name.endsWith(".xlsx")) {
      const data = await file.arrayBuffer()
      const workbook = read(data)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = utils.sheet_to_json<Record<string, string>>(worksheet)

      if (jsonData.length > 0) {
        const headers = Object.keys(jsonData[0] || {})
        const missingColumns = requiredColumns.filter(
          col =>
            !headers.find(h => h.trim().toLowerCase() === col.toLowerCase())
        )

        if (missingColumns.length > 0) {
          result.errors.push(
            `Missing required columns: ${missingColumns.join(", ")}`
          )
        } else {
          result.data = jsonData.map(row => ({
            productName: getValueByHeaderCaseInsensitive(row, "Product Name"),
            batchNumber: getValueByHeaderCaseInsensitive(row, "Batch Number"),
            expiryDate: getValueByHeaderCaseInsensitive(row, "Expiry Date"),
            unit: getValueByHeaderCaseInsensitive(row, "Unit"),
            category: getValueByHeaderCaseInsensitive(row, "Category"),
          }))

          validateData(result)
        }
      } else {
        result.errors.push("No data found in the Excel file")
      }

      return result
    } else {
      result.errors.push("Unsupported file format. Please use .csv or .xlsx")
      return result
    }
  }

  const validateData = (result: FileParseResult) => {
    result.data.forEach((product, index) => {
      if (!product.productName) {
        result.errors.push(`Row ${index + 1}: Product Name is required`)
      }
      if (!product.batchNumber) {
        result.errors.push(`Row ${index + 1}: Batch Number is required`)
      }
      if (!product.expiryDate) {
        result.errors.push(`Row ${index + 1}: Expiry Date is required`)
      }

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (
        product.expiryDate &&
        product.expiryDate !== "N/A" &&
        !dateRegex.test(product.expiryDate)
      ) {
        result.errors.push(
          `Row ${index + 1}: Expiry Date must be in YYYY-MM-DD format`
        )
      }
    })

    result.isValid = result.errors.length === 0
  }

  const handleUpload = async () => {
    if (!parseResult?.data || parseResult.data.length === 0) return

    try {
      setIsUploading(true)
      await bulkUploadProducts(parseResult.data)
      toast.success(
        `Successfully uploaded ${parseResult.data.length} products`,
        {
          position: "top-right",
        }
      )
      setParseResult(null)
      reset()
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload products. Please try again.", {
        position: "top-right",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setParseResult(null)
    reset()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="bg-red shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Bulk Upload Products</h2>

      {!parseResult ? (
        <div>
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Upload a CSV or Excel file with product data. The file should
              include the following columns:
            </p>
            <ul className="list-disc font-[600] list-inside text-gray-600 mb-4 pl-4">
              <li>Product Name</li>
              <li>Batch Number</li>
              <li>Expiry Date (format: YYYY-MM-DD)</li>
              <li>Unit</li>
              <li>Category</li>
            </ul>
          </div>

          <div className="mt-6">
            <label
              htmlFor="file-upload"
              className="block text-[16px] font-medium text-gray-700 mb-2"
            >
              Select File (.csv or .xlsx)
            </label>
            <input
              type="file"
              id="file-upload"
              ref={el => {
                registerRef(el)
                fileInputRef.current = el
              }}
              accept=".csv,.xlsx"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0 file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={e => {
                registerOnChange(e)
                handleFileChange(e)
              }}
              {...restRegister}
            />

            {errors.file && (
              <p className="mt-1 text-sm text-red-600">
                {errors.file.message as string}
              </p>
            )}
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Need a sample file?{" "}
              <a
                href="https://docs.google.com/spreadsheets/d/1pFcnKLXEIXao7jTM5Ued0P1pmE6irmyk/edit?usp=sharing&ouid=101873280503512721957&rtpof=true&sd=true"
                className="text-[#346633] hover:underline"
              >
                Download template
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Preview Data</h3>
              <span className="text-sm text-gray-500">
                {parseResult.data.length} products found
              </span>
            </div>

            {parseResult.errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <h4 className="text-sm font-medium text-red-800 mb-2">
                  Please correct the following errors:
                </h4>
                <ul className="list-disc list-inside text-sm text-red-700">
                  {parseResult.errors.slice(0, 5).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                  {parseResult.errors.length > 5 && (
                    <li>...and {parseResult.errors.length - 5} more errors</li>
                  )}
                </ul>
              </div>
            )}

            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Batch Number
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Expiry Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Unit
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parseResult.data.slice(0, 5).map((product, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {product.productName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {product.batchNumber}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {product.expiryDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {product.unit}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {product.category}
                      </td>
                    </tr>
                  ))}
                  {parseResult.data.length > 5 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-3 text-sm text-gray-500 text-center"
                      >
                        ...and {parseResult.data.length - 5} more rows
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={handleCancel}
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                !parseResult.isValid || isUploading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleUpload}
              disabled={!parseResult.isValid || isUploading}
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                "Upload Products"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
