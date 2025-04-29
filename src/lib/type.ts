export interface Product {
  id: string
  productName: string
  batchNumber: string
  expiryDate: string
  unit: string
  category: string
}

export interface FileParseResult {
  data: Omit<Product, "id">[]
  errors: string[]
  isValid: boolean
}
