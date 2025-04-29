import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import BulkUpload from "@/components/BulkUpload"

jest.mock("@/lib/api", () => ({
  bulkUploadProducts: jest.fn(),
}))

describe("BulkUpload Component", () => {
  test("renders upload form", () => {
    render(<BulkUpload />)

    expect(screen.getByText("Bulk Upload Products")).toBeInTheDocument()
    expect(screen.getByText("Select File (.csv or .xlsx)")).toBeInTheDocument()
    expect(screen.getByText("Download template")).toBeInTheDocument()
  })

  test("handles file change", async () => {
    render(<BulkUpload />)

    const file = new File(["dummy content"], "test.csv", {type: "text/csv"})
    const input = screen.getByLabelText("Select File (.csv or .xlsx)")

    Object.defineProperty(input, "files", {
      value: [file],
    })

    fireEvent.change(input)

    await waitFor(() => {})
  })
})
