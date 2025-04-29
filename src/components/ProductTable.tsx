import {useState, useEffect} from "react"
import {toast} from "react-toastify"
import {useForm} from "react-hook-form"
import {getProducts, updateProduct} from "@/lib/api"
import {Product} from "@/lib/type"
import Modal from "./SharedComponents/Modal"
import PageTitle from "./SharedComponents/PageTitle"
import IconArrowBack from "./IconComponents/IconArrowBack"
import LoaderSpinner from "./SharedComponents/Loader"

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(products.length / itemsPerPage)

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<Product>()

  // Fetch products on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
        toast.error("Failed to load products", {
          position: "top-left",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleEditClick = (product: Product) => {
    setEditingProduct(product)
    setModalOpen(true)
    reset(product)
  }

  const handleEditCancel = () => {
    setEditingProduct(null)
    reset()
  }

  const handleEditSubmit = async (data: Product) => {
    if (!editingProduct) return
    console.log(data)
    try {
      setIsSubmitting(true)

      const updatedProduct = {
        ...data,
        id: editingProduct.id,
      }

      await updateProduct(updatedProduct)

      setProducts(
        products.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
      )

      toast.success("Product updated successfully", {
        position: "top-right",
      })
      handleEditCancel()
      setModalOpen(false)
    } catch (error) {
      console.error("Error updating product:", error)
      toast.error("Failed to update product", {
        position: "top-left",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Product List</h2>
        <p className="text-sm text-gray-500">{products.length} products</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Batch Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Expiry Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Unit
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No products found. Upload some products to get started.
                </td>
              </tr>
            ) : (
              paginatedProducts?.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.batchNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.expiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-[#346633] hover:text-blue-900 font-bold cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {products.length > itemsPerPage && (
          <div className="px-6 py-4 flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-[#346633] text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false)
          }}
          footer={
            <footer className="bg-[#F0F0F0] py-4 flex items-center justify-center">
              <div className="flex items-center gap-5">
                <button
                  onClick={() => {
                    setModalOpen(false)
                    handleEditCancel()
                    reset()
                  }}
                  disabled={isSubmitting}
                  className="bg-[#F0F0F0] text-[#346633] cursor-pointer px-4 py-3 rounded-[100px] flex items-center gap-2 text-[13px] border border-[#346633] font-[700] hover:bg-[#d4d4d4] transition"
                >
                  Cancel
                </button>

                <button
                  disabled={isSubmitting}
                  onClick={handleSubmit(handleEditSubmit)}
                  type="submit"
                  className="bg-[#346633] text-white px-4 py-3 rounded-[100px] cursor-pointer flex items-center gap-2 text-[13px] font-[700] hover:bg-[#174319] transition"
                >
                  Save Changes
                  {isSubmitting && (
                    <LoaderSpinner size={16} className="ml-1" color="#fffff" />
                  )}
                </button>
              </div>
            </footer>
          }
          headerComponent={
            <div className="h-[112px] flex items-center px-[25px] md:px-[38px] py-2 border-b border-[#F0F0F0]">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => {
                      setModalOpen(false)
                      reset()
                    }}
                    className="bg-[#FFFFFF] text-[#346633] px-4 py-2 rounded-[5px] flex items-center gap-2 text-[13px] border border-[#346633] font-[700] hover:bg-[#fcfbfb] transition"
                  >
                    <div>
                      <IconArrowBack />
                    </div>
                    Back
                  </button>
                  <PageTitle title="Edit Product" />
                </div>
              </div>
            </div>
          }
        >
          <div className="sm:flex sm:items-start">
            <div className="w-full max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
                {/* Product Name */}
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className={`mt-1 block w-full outline-none font-[600] rounded-md border-b ${
                      errors.productName
                        ? "border-b-red-300"
                        : "border-b-gray-300"
                    } focus:border-b-blue-500 focus:ring-blue-500 sm:text-sm`}
                    placeholder="Enter product name"
                    {...register("productName", {
                      required: "Product name is required",
                    })}
                  />
                  {errors.productName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.productName.message}
                    </p>
                  )}
                </div>

                {/* Batch Number */}
                <div>
                  <label
                    htmlFor="batchNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Batch Number
                  </label>
                  <input
                    type="text"
                    id="batchNumber"
                    className={`mt-1 block w-full outline-none font-[600] rounded-md border-b ${
                      errors.batchNumber
                        ? "border-b-red-300"
                        : "border-b-gray-300"
                    } focus:border-b-blue-500 focus:ring-blue-500 sm:text-sm`}
                    placeholder="Enter batch number"
                    {...register("batchNumber", {
                      required: "Batch number is required",
                    })}
                  />
                  {errors.batchNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.batchNumber.message}
                    </p>
                  )}
                </div>

                {/* Expiry Date */}
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    className={`mt-1 block w-full outline-none font-[600] rounded-md border-b ${
                      errors.expiryDate
                        ? "border-b-red-300"
                        : "border-b-gray-300"
                    } focus:border-b-blue-500 focus:ring-blue-500 sm:text-sm`}
                    {...register("expiryDate", {
                      required: "Expiry date is required",
                      validate: value =>
                        value === "N/A" ||
                        /^\d{4}-\d{2}-\d{2}$/.test(value) ||
                        "Use YYYY-MM-DD format",
                    })}
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.expiryDate.message}
                    </p>
                  )}
                </div>

                {/* Unit */}
                <div>
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Unit
                  </label>
                  <input
                    type="text"
                    id="unit"
                    className={`mt-1 block w-full outline-none font-[600] rounded-md border-b ${
                      errors.unit ? "border-b-red-300" : "border-b-gray-300"
                    } focus:border-b-blue-500 focus:ring-blue-500 sm:text-sm`}
                    placeholder="Enter unit"
                    {...register("unit", {
                      required: "Unit is required",
                    })}
                  />
                  {errors.unit && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.unit.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    className={`mt-1 block w-full outline-none font-[600] rounded-md border-b ${
                      errors.category ? "border-b-red-300" : "border-b-gray-300"
                    } focus:border-b-blue-500 focus:ring-blue-500 sm:text-sm`}
                    placeholder="Enter category"
                    {...register("category", {
                      required: "Category is required",
                    })}
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
