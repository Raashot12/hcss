import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import ProductTable from "@/components/ProductTable"
import * as api from "@/lib/api"

// Mock products data
const mockProducts = [
  {
    id: "1",
    productName: "Test Product",
    batchNumber: "B12345",
    expiryDate: "2025-12-31",
    unit: "Box",
    category: "Test",
  },
]

jest.mock("@/lib/api", () => ({
  getProducts: jest.fn().mockResolvedValue([]),
  updateProduct: jest.fn(),
}))

describe("ProductTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(api.getProducts as jest.Mock).mockResolvedValue(mockProducts)
  })

  test("renders product table after loading", async () => {
    render(<ProductTable />)

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument()
      expect(screen.getByText("B12345")).toBeInTheDocument()
    })
  })

  test("opens edit modal when clicking edit button", async () => {
    render(<ProductTable />)

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument()
    })

    const editButton = screen.getByText("Edit")
    fireEvent.click(editButton)

    expect(screen.getByText("Edit Product")).toBeInTheDocument()
    expect(screen.getByLabelText("Product Name")).toHaveValue("Test Product")
  })
})
