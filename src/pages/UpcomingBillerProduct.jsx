import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Sample upcoming biller products - simulating products that need to be mapped
const initialUpcomingProducts = [
  { id: '1', biller_code: 'lapak_gaming', biller_product_code: 'MLBBGLO9999-S1', price: 5500000, status: 'active' },
  { id: '2', biller_code: 'lapak_gaming', biller_product_code: 'MLBBGLO8888-S1', price: 8800000, status: 'active' },
  { id: '3', biller_code: 'rbxchest', biller_product_code: 'RBXC100-NEW', price: 1500000, status: 'active' },
  { id: '4', biller_code: 'lapak_gaming', biller_product_code: 'FF100-S99', price: 12000000, status: 'non_active' },
  { id: '5', biller_code: 'rbxchest', biller_product_code: 'RBXC500-NEW', price: 7500000, status: 'active' },
  { id: '6', biller_code: 'lapak_gaming', biller_product_code: 'MLBBGLO7777-S1', price: 15000000, status: 'active' },
  { id: '7', biller_code: 'lapak_gaming', biller_product_code: 'FF200-S88', price: 24000000, status: 'non_active' },
  { id: '8', biller_code: 'rbxchest', biller_product_code: 'RBXC1000-NEW', price: 15000000, status: 'active' },
]

// Sample products data - simulating available products to map to
const availableProducts = [
  { code: '8BP110', price: 9561000, status: 'non_active' },
  { code: 'FF50', price: 621100, status: 'active' },
  { code: '8BP112000', price: 9561000, status: 'non_active' },
  { code: '8BP15STS', price: 4634200, status: 'non_active' },
  { code: '8BP20', price: 1909900, status: 'non_active' },
  { code: '8BP20000', price: 1909900, status: 'non_active' },
  { code: 'FFMINGGUAN', price: 2587900, status: 'active' },
  { code: 'FFBPC', price: 3881800, status: 'active' },
  { code: '8BP250', price: 19124800, status: 'non_active' },
  { code: '8BP256000', price: 19124800, status: 'non_active' },
  { code: 'FF70', price: 840000, status: 'active' },
  { code: 'MLBB100', price: 2500000, status: 'active' },
  { code: 'MLBB500', price: 12500000, status: 'active' },
]

function formatPrice(price) {
  const divided = price / 100
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(divided)
}

function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
      status === 'active' 
        ? 'text-green-700 bg-green-50' 
        : 'text-red-700 bg-red-50'
    }`}>
      {status}
    </span>
  )
}

function MapToProductModal({ isOpen, onClose, onSave, upcomingProduct }) {
  const [productCode, setProductCode] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  const [checkError, setCheckError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setProductCode('')
      setProductDetails(null)
      setCheckError('')
    }
  }, [isOpen])

  const handleCodeChange = (e) => {
    setProductCode(e.target.value)
    setProductDetails(null)
    setCheckError('')
  }

  const handleCheckProduct = async () => {
    if (!productCode.trim()) {
      setCheckError('Please enter a product code')
      return
    }

    setIsChecking(true)
    setCheckError('')
    setProductDetails(null)

    // Simulate API call
    setTimeout(() => {
      const foundProduct = availableProducts.find(
        p => p.code.toLowerCase() === productCode.trim().toLowerCase()
      )

      if (foundProduct) {
        setProductDetails(foundProduct)
        setCheckError('')
      } else {
        setCheckError('Product not found')
        setProductDetails(null)
      }
      setIsChecking(false)
    }, 500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (productDetails) {
      onSave(upcomingProduct, productDetails)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200">
        <div className="bg-neutral-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-100">Map to Product</h2>
          <p className="text-neutral-400 text-sm mt-1">Biller Product: {upcomingProduct?.biller_product_code}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Product Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={productCode}
                onChange={handleCodeChange}
                placeholder="Enter product code..."
                className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
              />
              <button
                type="button"
                onClick={handleCheckProduct}
                disabled={isChecking || !productCode.trim()}
                className={`px-4 py-2.5 rounded-md font-medium transition-all flex items-center gap-2 ${
                  isChecking || !productCode.trim()
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isChecking ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                Check
              </button>
            </div>
            {checkError && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {checkError}
              </p>
            )}
          </div>

          {/* Product Details (shown when found) */}
          {productDetails && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-green-800">Product Found</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Product Code:</span>
                  <span className="font-medium text-neutral-800">{productDetails.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Price:</span>
                  <span className="font-medium text-neutral-800">{formatPrice(productDetails.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Status:</span>
                  <span className={`font-medium ${productDetails.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {productDetails.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-md font-medium hover:bg-neutral-200 transition-colors border border-neutral-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!productDetails}
              className={`flex-1 px-4 py-2.5 rounded-md font-medium transition-all ${
                productDetails
                  ? 'bg-neutral-800 text-white hover:bg-neutral-900'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function IgnoreConfirmModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4 overflow-hidden border border-neutral-200">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 text-center mb-2">Ignore Biller Product</h3>
          <p className="text-neutral-600 text-center text-sm mb-6">
            Are you sure you want to ignore <span className="font-medium">{productName}</span>? It will be removed from the upcoming list.
          </p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-md font-medium hover:bg-neutral-200 transition-colors border border-neutral-300">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-all">
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function UpcomingBillerProduct() {
  const [upcomingProducts, setUpcomingProducts] = useState(initialUpcomingProducts)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)
  const [isIgnoreModalOpen, setIsIgnoreModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openMapModal = (product) => {
    setSelectedProduct(product)
    setIsMapModalOpen(true)
  }

  const closeMapModal = () => {
    setIsMapModalOpen(false)
    setSelectedProduct(null)
  }

  const openIgnoreModal = (product) => {
    setSelectedProduct(product)
    setIsIgnoreModalOpen(true)
  }

  const closeIgnoreModal = () => {
    setIsIgnoreModalOpen(false)
    setSelectedProduct(null)
  }

  const handleMapToProduct = (upcomingProduct, targetProduct) => {
    // In a real app, this would create a biller product with the mapping
    console.log('Mapping:', upcomingProduct.biller_product_code, 'to', targetProduct.code)
    // Remove from upcoming list after mapping
    setUpcomingProducts(prev => prev.filter(p => p.id !== upcomingProduct.id))
    closeMapModal()
  }

  const handleIgnore = () => {
    // Remove from upcoming list
    setUpcomingProducts(prev => prev.filter(p => p.id !== selectedProduct.id))
    closeIgnoreModal()
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-neutral-500 hover:text-neutral-800 transition-colors">
              ← Back
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-neutral-800">Upcoming Biller Products</h1>
              <p className="text-sm text-neutral-500 mt-0.5">New biller products that need to be mapped or ignored</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">Actions</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">biller_code</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">biller_product_code</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-600 min-w-[120px]">price</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                      No upcoming biller products. All products have been mapped or ignored.
                    </td>
                  </tr>
                ) : (
                  upcomingProducts.map((product, index) => (
                    <tr 
                      key={product.id} 
                      className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openMapModal(product)}
                            className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
                          >
                            Map to Product
                          </button>
                          <button
                            onClick={() => openIgnoreModal(product)}
                            className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 rounded border border-amber-200 hover:bg-amber-100 transition-colors"
                          >
                            Ignore
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-neutral-700">{product.biller_code}</td>
                      <td className="px-4 py-3 text-neutral-700">{product.biller_product_code}</td>
                      <td className="px-6 py-3 text-right text-neutral-800 tabular-nums">{formatPrice(product.price)}</td>
                      <td className="px-4 py-3"><StatusBadge status={product.status} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Results count */}
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
            {upcomingProducts.length} upcoming product{upcomingProducts.length !== 1 ? 's' : ''} to review
          </div>
        </div>
      </div>

      {/* Map to Product Modal */}
      <MapToProductModal
        isOpen={isMapModalOpen}
        onClose={closeMapModal}
        onSave={handleMapToProduct}
        upcomingProduct={selectedProduct}
      />

      {/* Ignore Confirmation Modal */}
      <IgnoreConfirmModal
        isOpen={isIgnoreModalOpen}
        onClose={closeIgnoreModal}
        onConfirm={handleIgnore}
        productName={selectedProduct?.biller_product_code}
      />
    </div>
  )
}

export default UpcomingBillerProduct

