import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

// Sample biller products data - simulating available biller products
const availableBillerProducts = [
  { id: '1', biller_product_code: 'MLBBGLOWDP-S1', price: 2325600, status: 'active' },
  { id: '2', biller_product_code: 'MLBBGLOTL-S1', price: 12127500, status: 'active' },
  { id: '3', biller_product_code: 'MLBBGLO7740_1548-S1', price: 183799700, status: 'active' },
  { id: '4', biller_product_code: 'MLBBGLO7740_1548-S117', price: 194956900, status: 'active' },
  { id: '5', biller_product_code: 'MLBBGLO7740_1548-S10', price: 168030300, status: 'non_active' },
  { id: '6', biller_product_code: 'MLBBGLO4649_883-S1', price: 110281500, status: 'active' },
  { id: '7', biller_product_code: 'MLBBGLO4649_883-S117', price: 116972800, status: 'active' },
  { id: '8', biller_product_code: 'MLBBGLO4649_883-S10', price: 100818200, status: 'non_active' },
  { id: '9', biller_product_code: 'MLBBGLO3099_589-S1', price: 73518200, status: 'active' },
  { id: '10', biller_product_code: 'MLBBGLO3099_589-S117', price: 77980800, status: 'active' },
  { id: '11', biller_product_code: 'FF70-S29', price: 84000000, status: 'active' },
  { id: '12', biller_product_code: 'FF70-S24', price: 84870000, status: 'active' },
  { id: '13', biller_product_code: 'FF50-S1', price: 62000000, status: 'active' },
  { id: '14', biller_product_code: '8BP110-MAIN', price: 950000000, status: 'active' },
]

// Sample routing data - in real app this would come from API
const initialRoutingData = {
  'FF70': [
    { id: '1', code: 'FF70', biller_product_code: 'FF70-S29', price: 840000, biller_price: 840000, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '2', code: 'FF70', biller_product_code: 'FF70-S24', price: 840000, biller_price: 848700, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '3', code: 'FF70', biller_product_code: 'FF70-S13', price: 840000, biller_price: 882300, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '4', code: 'FF70', biller_product_code: 'FF70-S58', price: 840000, biller_price: 834500, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '5', code: 'FF70', biller_product_code: 'FF70-S24B2C', price: 840000, biller_price: 875000, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '6', code: 'FF70', biller_product_code: 'FF70-S15', price: 840000, biller_price: 913400, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '7', code: 'FF70', biller_product_code: 'FF70-S1000', price: 840000, biller_price: 880000, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '8', code: 'FF70', biller_product_code: 'FF70-S888', price: 840000, biller_price: 832500, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '9', code: 'FF70', biller_product_code: 'FF70-S97', price: 840000, biller_price: 904500, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '10', code: 'FF70', biller_product_code: 'FF70-S18', price: 840000, biller_price: 912000, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '11', code: 'FF70', biller_product_code: 'FF70-S19', price: 840000, biller_price: 854600, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '12', code: 'FF70', biller_product_code: 'FF70-SDummy', price: 840000, biller_price: 907500, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '13', code: 'FF70', biller_product_code: 'FF70-S9090', price: 840000, biller_price: 832700, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '14', code: 'FF70', biller_product_code: 'FF70-S44', price: 840000, biller_price: 822500, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '15', code: 'FF70', biller_product_code: 'FF70-S115', price: 840000, biller_price: 886200, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '16', code: 'FF70', biller_product_code: 'FF70-S54', price: 840000, biller_price: 850000, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '17', code: 'FF70', biller_product_code: 'FF70-S113', price: 840000, biller_price: 854900, routing_status: 'non_active', product_status: 'active', bp_status: 'non_active' },
    { id: '18', code: 'FF70', biller_product_code: 'FF70-S53', price: 840000, biller_price: 840000, routing_status: 'active', product_status: 'active', bp_status: 'active' },
  ],
  '8BP110': [
    { id: '19', code: '8BP110', biller_product_code: '8BP110-MAIN', price: 9561000, biller_price: 9500000, routing_status: 'active', product_status: 'active', bp_status: 'active' },
  ],
  'FF50': [
    { id: '20', code: 'FF50', biller_product_code: 'FF50-S1', price: 621100, biller_price: 620000, routing_status: 'active', product_status: 'active', bp_status: 'active' },
  ],
}

function formatPrice(price) {
  const divided = price / 100
  return new Intl.NumberFormat('id-ID').format(divided)
}

function generateId() {
  return crypto.randomUUID()
}

function AddRoutingModal({ isOpen, onClose, onSave, productCode, existingRoutings }) {
  const [billerProductCode, setBillerProductCode] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  const [checkError, setCheckError] = useState('')

  // Filter out biller products that are already in the routing
  const existingBillerProductCodes = existingRoutings.map(r => r.biller_product_code)

  useEffect(() => {
    if (isOpen) {
      setBillerProductCode('')
      setProductDetails(null)
      setCheckError('')
    }
  }, [isOpen])

  const handleCodeChange = (e) => {
    setBillerProductCode(e.target.value)
    // Reset product details when code changes
    setProductDetails(null)
    setCheckError('')
  }

  const handleCheckProduct = async () => {
    if (!billerProductCode.trim()) {
      setCheckError('Please enter a biller product code')
      return
    }

    setIsChecking(true)
    setCheckError('')
    setProductDetails(null)

    // Simulate API call - will be replaced with actual API later
    setTimeout(() => {
      // Check if the code exists in available biller products
      const foundProduct = availableBillerProducts.find(
        bp => bp.biller_product_code.toLowerCase() === billerProductCode.trim().toLowerCase()
      )

      if (foundProduct) {
        // Check if already exists in routing
        if (existingBillerProductCodes.includes(foundProduct.biller_product_code)) {
          setCheckError('This biller product is already in the routing')
          setProductDetails(null)
        } else {
          setProductDetails(foundProduct)
          setCheckError('')
        }
      } else {
        setCheckError('Biller product not found')
        setProductDetails(null)
      }
      setIsChecking(false)
    }, 500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (productDetails) {
      onSave(productDetails)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200">
        <div className="bg-neutral-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-100">Add Routing</h2>
          <p className="text-neutral-400 text-sm mt-1">Product Code: {productCode}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Biller Product Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={billerProductCode}
                onChange={handleCodeChange}
                placeholder="Enter biller product code..."
                className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
              />
              <button
                type="button"
                onClick={handleCheckProduct}
                disabled={isChecking || !billerProductCode.trim()}
                className={`px-4 py-2.5 rounded-md font-medium transition-all flex items-center gap-2 ${
                  isChecking || !billerProductCode.trim()
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
                  <span className="text-neutral-600">Code:</span>
                  <span className="font-medium text-neutral-800">{productDetails.biller_product_code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Biller Price:</span>
                  <span className="font-medium text-neutral-800">Rp {formatPrice(productDetails.price)}</span>
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

function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4 overflow-hidden border border-neutral-200">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 text-center mb-2">Delete Routing</h3>
          <p className="text-neutral-600 text-center text-sm mb-6">
            Are you sure you want to delete routing to <span className="font-medium">{itemName}</span>? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-md font-medium hover:bg-neutral-200 transition-colors border border-neutral-300">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-all">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
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

function ProductRouting() {
  const [searchParams] = useSearchParams()
  const productCode = searchParams.get('code') || ''
  
  const [routings, setRoutings] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingRouting, setDeletingRouting] = useState(null)

  // Load routing data based on product code
  useEffect(() => {
    if (productCode && initialRoutingData[productCode]) {
      setRoutings(initialRoutingData[productCode])
    } else {
      setRoutings([])
    }
  }, [productCode])

  const openCreateModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openDeleteModal = (routing) => {
    setDeletingRouting(routing)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingRouting(null)
  }

  const handleDelete = () => {
    setRoutings(prev => prev.filter(r => r.id !== deletingRouting.id))
    closeDeleteModal()
  }

  const handleSave = (billerProduct) => {
    // Use the biller product's price as both price and biller_price (dummy price)
    const newRouting = {
      id: generateId(),
      code: productCode,
      biller_product_code: billerProduct.biller_product_code,
      price: billerProduct.price, // dummy price same as biller price
      biller_price: billerProduct.price,
      routing_status: 'non_active',
      product_status: 'active',
      bp_status: billerProduct.status === 'active' ? 'active' : 'non_active',
    }
    setRoutings(prev => [newRouting, ...prev])
    closeModal()
  }

  if (!productCode) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-neutral-800 mb-4">No Product Selected</h1>
          <p className="text-neutral-600 mb-6">Please select a product from the Products page to view its routing.</p>
          <Link 
            to="/product" 
            className="px-4 py-2 bg-neutral-800 text-white rounded-md font-medium hover:bg-neutral-900 transition-all"
          >
            Go to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/product" className="text-neutral-500 hover:text-neutral-800 transition-colors">
              ← Back to Products
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-neutral-800">Product - Biller Product Routing</h1>
              <p className="text-sm text-neutral-500 mt-0.5">Product Code: <span className="font-medium text-neutral-700">{productCode}</span></p>
            </div>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-neutral-800 text-white rounded-md font-medium hover:bg-neutral-900 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Routing
          </button>
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
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">code</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">biller_product_code</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-600 min-w-[120px]">price</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-600 min-w-[120px]">biller_price</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">routing_status</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">product_status</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">bp_status</th>
                </tr>
              </thead>
              <tbody>
                {routings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-neutral-500">
                      No routing configured for this product. Click "Add Routing" to create one.
                    </td>
                  </tr>
                ) : (
                  routings.map((routing, index) => (
                    <tr 
                      key={routing.id} 
                      className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openDeleteModal(routing)}
                          className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded border border-red-200 hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-4 py-3 text-neutral-700">{routing.code}</td>
                      <td className="px-4 py-3 text-neutral-700">{routing.biller_product_code}</td>
                      <td className="px-6 py-3 text-right text-neutral-800 tabular-nums">{formatPrice(routing.price)}</td>
                      <td className="px-6 py-3 text-right text-neutral-800 tabular-nums">{formatPrice(routing.biller_price)}</td>
                      <td className="px-4 py-3"><StatusBadge status={routing.routing_status} /></td>
                      <td className="px-4 py-3"><StatusBadge status={routing.product_status} /></td>
                      <td className="px-4 py-3"><StatusBadge status={routing.bp_status} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Results count */}
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
            {routings.length} routing{routings.length !== 1 ? 's' : ''} configured
          </div>
        </div>
      </div>

      {/* Add Routing Modal */}
      <AddRoutingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        productCode={productCode}
        existingRoutings={routings}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemName={deletingRouting?.biller_product_code}
      />
    </div>
  )
}

export default ProductRouting
