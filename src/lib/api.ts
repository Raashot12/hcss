import {Product} from "./type"

// Mock API functions - in a real app, these would make actual API calls
export async function getProducts(): Promise<Product[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Return mock data from local storage or fallback to default
  const storedProducts = localStorage.getItem("hcss-products")
  if (storedProducts) {
    return JSON.parse(storedProducts)
  }

  const mockProducts: Product[] = [
    {
      id: "1",
      productName: "Acetaminophen 500mg",
      batchNumber: "B12345",
      expiryDate: "2026-05-15",
      unit: "Bottle",
      category: "Pain Relief",
    },
    {
      id: "2",
      productName: "Amoxicillin 250mg",
      batchNumber: "B22467",
      expiryDate: "2025-11-30",
      unit: "Box",
      category: "Antibiotics",
    },
    {
      id: "3",
      productName: "Blood Pressure Monitor",
      batchNumber: "B98765",
      expiryDate: "2027-02-28",
      unit: "Unit",
      category: "Devices",
    },
    {
      id: "4",
      productName: "Vitamin D3 1000IU",
      batchNumber: "B34567",
      expiryDate: "2027-02-28",
      unit: "Bottle",
      category: "Supplements",
    },
    {
      id: "5",
      productName: "Insulin Syringes",
      batchNumber: "B45678",
      expiryDate: "2026-12-01",
      unit: "Pack",
      category: "Diabetes",
    },
  ]

  localStorage.setItem("hcss-products", JSON.stringify(mockProducts))
  return mockProducts
}

export async function updateProduct(updatedProduct: Product): Promise<Product> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 600))

  // Update product in local storage
  const products = await getProducts()
  const updatedProducts = products.map(p =>
    p.id === updatedProduct.id ? updatedProduct : p
  )

  localStorage.setItem("hcss-products", JSON.stringify(updatedProducts))
  return updatedProduct
}

export async function bulkUploadProducts(
  products: Omit<Product, "id">[]
): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 1200))

  const existingProducts = await getProducts()

  // Combine all products for duplicate checking
  const combined = [...existingProducts]

  // Filter out duplicates
  const newProducts: Product[] = []
  products.forEach((product, index) => {
    const isDuplicate = combined.some(
      p =>
        p.productName === product.productName &&
        p.batchNumber === product.batchNumber &&
        p.expiryDate === product.expiryDate
    )

    if (!isDuplicate) {
      const newProduct: Product = {
        ...product,
        id: `new-${Date.now()}-${index}`,
      }
      newProducts.push(newProduct)
      combined.push(newProduct)
    }
  })

  const allProducts = [...existingProducts, ...newProducts]
  localStorage.setItem("hcss-products", JSON.stringify(allProducts))

  return newProducts
}
