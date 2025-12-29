import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Client mapping - rarely changes
const CLIENTS = {
  '18428781-cb86-40b2-a78d-98a040120f79': 'GOGOGO',
}

// Sample products that can be "inherited" to client products
const availableProducts = [
  { id: '019abe73-97c2-72e6-adbc-4a9f018a5afe', code: 'MLBB100', description: '100 Diamonds' },
  { id: '019abe73-97c0-7c80-a19f-df123bec1806', code: 'MLBB200', description: '200 Diamonds' },
  { id: '019abe73-97bf-77ca-a983-a28b32a022d0', code: 'MLBB500', description: '500 Diamonds' },
  { id: '019abe73-97bd-7cf6-bff5-7d55bced8902', code: 'FF70', description: '70 Diamonds' },
  { id: '019abe73-97bc-74e4-a59f-c3c4ae9406e8', code: 'FF100', description: '100 Diamonds' },
  { id: '019abe73-97bb-71af-bd5b-dd830d309de7', code: 'PUBG60', description: '60 UC' },
  { id: '019abe73-97b9-7c05-960c-444770df2e6f', code: 'PUBG120', description: '120 UC' },
  { id: '019abe73-97b8-781c-be4c-8ce2997a2882', code: 'GENSHIN60', description: '60 Genesis Crystals' },
  { id: '019abe73-97b7-7085-8a0c-e262bb773a62', code: 'GENSHIN300', description: '300 Genesis Crystals' },
  { id: '019abe73-97b5-7a7b-8e38-5729ed18955f', code: 'VALORANT475', description: '475 VP' },
  // Additional products without client products (for testing)
  { id: '019abe73-97b4-7a1c-9e12-1234567890ab', code: 'MLBB1000', description: '1000 Diamonds' },
  { id: '019abe73-97b3-7b2d-8f23-2345678901bc', code: 'FF500', description: '500 Diamonds' },
  { id: '019abe73-97b2-7c3e-7g34-3456789012cd', code: 'PUBG600', description: '600 UC' },
  { id: '019abe73-97b1-7d4f-6h45-4567890123de', code: 'GENSHIN980', description: '980 Genesis Crystals' },
  { id: '019abe73-97b0-7e5g-5i56-5678901234ef', code: 'VALORANT1000', description: '1000 VP' },
]

// Initial client products data based on the screenshot
const initialClientProducts = [
  {
    id: '019abe77-714c-76cd-b236-1465bc226ca3',
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '019abe73-97c2-72e6-adbc-4a9f018a5afe',
    price: 100077500,
    status: 'non_active',
    config: '{}',
    created_at: '2025-11-26 04:41:30',
    currency: 'IDR',
  },
  {
    id: '019abe77-714a-7e52-b9cd-a13543d4eb6e',
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '019abe73-97c0-7c80-a19f-df123bec1806',
    price: 90066500,
    status: 'active',
    config: '{}',
    created_at: '2025-11-26 04:41:30',
    currency: 'IDR',
  },
  {
    id: '019abe77-7149-789a-a719-4484a7eeb8ed',
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '019abe73-97bf-77ca-a983-a28b32a022d0',
    price: 80077500,
    status: 'non_active',
    config: '{}',
    created_at: '2025-11-26 04:41:30',
    currency: 'IDR',
  },
  {
    id: '019abe77-7145-7ba0-8a34-30c9aef72acb',
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '019abe73-97bd-7cf6-bff5-7d55bced8902',
    price: 70066500,
    status: 'active',
    config: '{}',
    created_at: '2025-11-26 04:41:30',
    currency: 'IDR',
  },
  {
    id: '019abe77-7144-786c-aa7b-97611c3ad375',
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '019abe73-97bc-74e4-a59f-c3c4ae9406e8',
    price: 60077500,
    status: 'non_active',
    config: '{}',
    created_at: '2025-11-26 04:41:30',
    currency: 'IDR',
  },
  {
    id: '019abe77-7143-7675-8ec4-b6e816d1bf95',
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '019abe73-97bb-71af-bd5b-dd830d309de7',
    price: 50065000,
    status: 'active',
    config: '{}',
    created_at: '2025-11-26 04:41:30',
    currency: 'IDR',
  },
  {
    id: '019abe77-7142-7333-86d5-50953412aaea',
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '019abe73-97b9-7c05-960c-444770df2e6f',
    price: 45077500,
    status: 'non_active',
    config: '{}',
    created_at: '2025-11-26 04:41:30',
    currency: 'IDR',
  },
  {
    id: '019abe77-7140-7cfc-acb8-67b4856d95a2',
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '019abe73-97b8-781c-be4c-8ce2997a2882',
    price: 40066500,
    status: 'active',
    config: '{}',
    created_at: '2025-11-26 04:41:30',
    currency: 'IDR',
  },
  {
    id: '019abe77-713f-7338-bd5f-dd4e0945e54c',
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '019abe73-97b7-7085-8a0c-e262bb773a62',
    price: 35077500,
    status: 'non_active',
    config: '{}',
    created_at: '2025-11-26 04:41:30',
    currency: 'IDR',
  },
  {
    id: '019abe77-713d-756e-88b7-8d2624e768ce',
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '019abe73-97b5-7a7b-8e38-5729ed18955f',
    price: 30058000,
    status: 'active',
    config: '{}',
    created_at: '2025-11-26 04:41:30',
    currency: 'IDR',
  },
]

function formatPrice(price) {
  const divided = price / 100
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(divided)
}

function generateId() {
  return crypto.randomUUID()
}

function getCurrentDateTime() {
  const now = new Date()
  return now.toISOString().slice(0, 19).replace('T', ' ')
}

function getClientName(clientId) {
  return CLIENTS[clientId] || clientId
}

function getProductCode(productId) {
  const product = availableProducts.find(p => p.id === productId)
  return product?.code || '-'
}

function SortIcon({ direction }) {
  if (!direction) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    )
  }
  return direction === 'asc' ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function SortableHeader({ label, field, sortConfig, onSort, align = 'left' }) {
  const isSorted = sortConfig.field === field
  return (
    <th 
      className={`text-${align} px-4 py-3 font-medium text-neutral-600 cursor-pointer hover:bg-neutral-100 transition-colors select-none`}
      onClick={() => onSort(field)}
    >
      <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : ''}`}>
        {label}
        <SortIcon direction={isSorted ? sortConfig.direction : null} />
      </div>
    </th>
  )
}

function ClientProductModal({ isOpen, onClose, onSave, clientProduct, mode, existingClientProducts }) {
  const [formData, setFormData] = useState({
    client_id: '18428781-cb86-40b2-a78d-98a040120f79',
    product_id: '',
    price: '',
    status: 'non_active',
    config: '{}',
  })

  // Product lookup state
  const [productCodeInput, setProductCodeInput] = useState('')
  const [isCheckingProduct, setIsCheckingProduct] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  const [checkError, setCheckError] = useState('')


  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && clientProduct) {
        setFormData({
          client_id: clientProduct.client_id,
          product_id: clientProduct.product_id,
          price: clientProduct.price,
          status: clientProduct.status,
          config: clientProduct.config,
        })
        // Reset product lookup state and show existing product
        const existingProduct = availableProducts.find(p => p.id === clientProduct.product_id)
        if (existingProduct) {
          setProductCodeInput(existingProduct.code)
          setProductDetails(existingProduct)
        } else {
          setProductCodeInput('')
          setProductDetails(null)
        }
        setCheckError('')
      } else {
        setFormData({
          client_id: '18428781-cb86-40b2-a78d-98a040120f79',
          product_id: '',
          price: '',
          status: 'non_active',
          config: '{}',
        })
        setProductCodeInput('')
        setProductDetails(null)
        setCheckError('')
      }
    }
  }, [isOpen, clientProduct, mode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value
    }))
  }

  const handleProductCodeInputChange = (e) => {
    setProductCodeInput(e.target.value)
    setProductDetails(null)
    setCheckError('')
    // Clear the product_id in formData when input changes
    setFormData(prev => ({ ...prev, product_id: '' }))
  }

  const handleCheckProduct = async () => {
    if (!productCodeInput.trim()) {
      setCheckError('Please enter a product code')
      return
    }

    setIsCheckingProduct(true)
    setCheckError('')
    setProductDetails(null)

    // Simulate API call
    setTimeout(() => {
      const foundProduct = availableProducts.find(
        p => p.code.toLowerCase() === productCodeInput.trim().toLowerCase()
      )

      if (foundProduct) {
        // Check if this product is already added for the selected client (composite key: client_id + product_id)
        const isDuplicate = existingClientProducts.some(
          cp => cp.client_id === formData.client_id && cp.product_id === foundProduct.id
        )
        
        if (isDuplicate && mode === 'create') {
          setCheckError('This product is already added for this client')
          setProductDetails(null)
        } else {
          setProductDetails(foundProduct)
          setCheckError('')
        }
      } else {
        setCheckError('Product not found')
        setProductDetails(null)
      }
      setIsCheckingProduct(false)
    }, 500)
  }

  const handleAddProduct = () => {
    if (productDetails) {
      setFormData(prev => ({ ...prev, product_id: productDetails.id }))
    }
  }

  const handleRemoveProduct = () => {
    setFormData(prev => ({ ...prev, product_id: '' }))
    setProductCodeInput('')
    setProductDetails(null)
    setCheckError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200 max-h-[90vh] overflow-y-auto">
        <div className="bg-neutral-800 px-6 py-4 sticky top-0">
          <h2 className="text-xl font-semibold text-neutral-100">
            {mode === 'create' ? 'Create Client Product' : 'Edit Client Product'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Client</label>
            <select
              name="client_id"
              value={formData.client_id}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            >
              {Object.entries(CLIENTS).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Price (in cents)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 5000000"
              required
              min="0"
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            >
              <option value="non_active">non_active</option>
              <option value="active">active</option>
            </select>
          </div>

          {/* Config */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Config (JSON)</label>
            <textarea
              name="config"
              value={formData.config}
              onChange={handleChange}
              placeholder='{"key": "value"}'
              rows={3}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all font-mono text-sm"
            />
          </div>

          {/* Separator */}
          <hr className="border-neutral-200" />

          {/* Product Mapping Section */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Map to Product {mode === 'create' && <span className="text-red-500">*</span>}
            </label>
            <p className="text-xs text-neutral-500 mb-3">Link this client product to a product</p>
            
            {formData.product_id ? (
              // Show selected product
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-green-800">Product Mapped</span>
                  </div>
                  {mode === 'create' && (
                    <button
                      type="button"
                      onClick={handleRemoveProduct}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Product Code:</span>
                    <span className="font-medium text-neutral-800">{productDetails?.code || getProductCode(formData.product_id)}</span>
                  </div>
                  {productDetails && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Description:</span>
                      <span className="font-medium text-neutral-800">{productDetails.description}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Product ID:</span>
                    <span className="font-medium text-neutral-800 font-mono text-xs">{formData.product_id}</span>
                  </div>
                </div>
              </div>
            ) : (
              // Show product lookup form
              <>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={productCodeInput}
                    onChange={handleProductCodeInputChange}
                    placeholder="Enter product code..."
                    className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleCheckProduct}
                    disabled={isCheckingProduct || !productCodeInput.trim()}
                    className={`px-4 py-2.5 rounded-md font-medium transition-all flex items-center gap-2 ${
                      isCheckingProduct || !productCodeInput.trim()
                        ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isCheckingProduct ? (
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

                {/* Product Details (shown when found) */}
                {productDetails && !formData.product_id && (
                  <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-md">
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
                        <span className="text-neutral-600">Description:</span>
                        <span className="font-medium text-neutral-800">{productDetails.description}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Product ID:</span>
                        <span className="font-medium text-neutral-800 font-mono text-xs">{productDetails.id}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddProduct}
                      className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-all text-sm"
                    >
                      Add Product Mapping
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Actions */}
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
              disabled={mode === 'create' && !formData.product_id}
              className={`flex-1 px-4 py-2.5 rounded-md font-medium transition-all ${
                (mode === 'create' && !formData.product_id)
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  : 'bg-neutral-800 text-white hover:bg-neutral-900'
              }`}
            >
              {mode === 'create' ? 'Create' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


function BulkUploadModal({ isOpen, onClose, onUpload, type }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null)
    }
  }, [isOpen])

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedFile) {
      onUpload(selectedFile)
      onClose()
    }
  }

  const templateUrl = type === 'upload' 
    ? '/templates/client-product-bulk-upload-template.xlsx' 
    : '/templates/client-product-bulk-edit-template.xlsx'

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200">
        <div className="bg-neutral-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-100">
            {type === 'upload' ? 'Bulk Upload Client Products' : 'Bulk Edit Client Products'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-md">
            <span className="text-sm text-neutral-600">Download the template file to get started</span>
            <a 
              href={templateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Template Here
            </a>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              isDragging 
                ? 'border-neutral-500 bg-neutral-100' 
                : selectedFile 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-neutral-300 bg-neutral-50 hover:border-neutral-400'
            }`}
          >
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            {selectedFile ? (
              <div className="space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium text-neutral-700">{selectedFile.name}</p>
                <p className="text-xs text-neutral-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div className="space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-neutral-600">
                  <span className="font-medium text-neutral-700">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-neutral-500">XLSX, XLS, or CSV files</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-neutral-100 text-neutral-600 rounded-md font-medium hover:bg-neutral-200 transition-colors border border-neutral-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedFile}
              className={`flex-1 px-4 py-2.5 rounded-md font-medium transition-all ${
                selectedFile 
                  ? 'bg-neutral-800 text-white hover:bg-neutral-900' 
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {type === 'upload' ? 'Upload' : 'Apply Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ClientProduct() {
  const [clientProducts, setClientProducts] = useState(initialClientProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false)
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false)

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ field: 'config', direction: 'desc' })

  // Filter state
  const [filters, setFilters] = useState({
    id: '',
    client_id: '',
    product_id: '',
    status: '',
  })

  const handleSort = (field) => {
    setSortConfig(prev => {
      if (prev.field === field) {
        if (prev.direction === 'asc') return { field, direction: 'desc' }
        if (prev.direction === 'desc') return { field: null, direction: null }
      }
      return { field, direction: 'asc' }
    })
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setFilters({ id: '', client_id: '', product_id: '', status: '' })
  }

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...clientProducts]

    // Apply filters
    if (filters.id) {
      result = result.filter(p => p.id.toLowerCase().includes(filters.id.toLowerCase()))
    }
    if (filters.client_id) {
      result = result.filter(p => p.client_id.toLowerCase().includes(filters.client_id.toLowerCase()))
    }
    if (filters.product_id) {
      result = result.filter(p => p.product_id.toLowerCase().includes(filters.product_id.toLowerCase()))
    }
    if (filters.status) {
      result = result.filter(p => p.status === filters.status)
    }

    // Apply sorting
    if (sortConfig.field) {
      result.sort((a, b) => {
        let aVal = a[sortConfig.field]
        let bVal = b[sortConfig.field]

        if (sortConfig.field === 'price') {
          aVal = Number(aVal)
          bVal = Number(bVal)
        } else if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [clientProducts, filters, sortConfig])


  const openCreateModal = () => {
    setModalMode('create')
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setModalMode('edit')
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleSave = (formData) => {
    if (modalMode === 'create') {
      const newClientProduct = {
        id: generateId(),
        ...formData,
        created_at: getCurrentDateTime(),
        currency: 'IDR',
      }
      setClientProducts(prev => [newClientProduct, ...prev])
    } else {
      setClientProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData }
          : p
      ))
    }
    closeModal()
  }

  const handleBulkUpload = (file) => {
    console.log('Bulk upload file:', file.name)
    alert(`File "${file.name}" uploaded successfully! In a real app, this would process the file and create client products.`)
  }

  const handleBulkEdit = (file) => {
    console.log('Bulk edit file:', file.name)
    alert(`File "${file.name}" uploaded successfully! In a real app, this would process the file and update client products.`)
  }

  const hasActiveFilters = filters.id || filters.client_id || filters.product_id || filters.status

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-neutral-500 hover:text-neutral-800 transition-colors">
              ← Back
            </Link>
            <h1 className="text-xl font-semibold text-neutral-800">Client Products</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBulkUploadModalOpen(true)}
              className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md font-medium hover:bg-neutral-200 transition-all flex items-center gap-2 border border-neutral-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Bulk Upload
            </button>
            <button
              onClick={() => setIsBulkEditModalOpen(true)}
              className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md font-medium hover:bg-neutral-200 transition-all flex items-center gap-2 border border-neutral-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Bulk Edit
            </button>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-neutral-800 text-white rounded-md font-medium hover:bg-neutral-900 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Client Product
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 pt-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-neutral-700">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">ID</label>
              <input
                type="text"
                name="id"
                value={filters.id}
                onChange={handleFilterChange}
                placeholder="Search by ID..."
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">Client ID</label>
              <input
                type="text"
                name="client_id"
                value={filters.client_id}
                onChange={handleFilterChange}
                placeholder="Search by client ID..."
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">Product ID</label>
              <input
                type="text"
                name="product_id"
                value={filters.product_id}
                onChange={handleFilterChange}
                placeholder="Search by product ID..."
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300 transition-all"
              >
                <option value="">All</option>
                <option value="active">active</option>
                <option value="non_active">non_active</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">Actions</th>
                  <SortableHeader label="id" field="id" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">code</th>
                  <SortableHeader label="client_id" field="client_id" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="product_id" field="product_id" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="price" field="price" sortConfig={sortConfig} onSort={handleSort} align="right" />
                  <SortableHeader label="status" field="status" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="config" field="config" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="created_at" field="created_at" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">currency</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-neutral-500">
                      No client products found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedProducts.map((product, index) => (
                    <tr 
                      key={product.id} 
                      className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 rounded border border-neutral-300 hover:bg-neutral-200 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-neutral-600 font-mono text-xs">{product.id}</td>
                      <td className="px-4 py-3 text-neutral-700">{getProductCode(product.product_id)}</td>
                      <td className="px-4 py-3 text-neutral-700">{getClientName(product.client_id)}</td>
                      <td className="px-4 py-3 text-neutral-600 font-mono text-xs">{product.product_id}</td>
                      <td className="px-4 py-3 text-right text-neutral-800 tabular-nums font-medium">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          product.status === 'active' 
                            ? 'text-green-700 bg-green-50' 
                            : 'text-red-700 bg-red-50'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-600 font-mono text-xs max-w-[200px] truncate" title={product.config || '-'}>
                        {product.config || '-'}
                      </td>
                      <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">{product.created_at}</td>
                      <td className="px-4 py-3 text-neutral-500">{product.currency}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Results count */}
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
            Showing {filteredAndSortedProducts.length} of {clientProducts.length} client products
          </div>
        </div>
      </div>

      {/* Modal */}
      <ClientProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        clientProduct={editingProduct}
        mode={modalMode}
        existingClientProducts={clientProducts}
      />


      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkUploadModalOpen}
        onClose={() => setIsBulkUploadModalOpen(false)}
        onUpload={handleBulkUpload}
        type="upload"
      />

      {/* Bulk Edit Modal */}
      <BulkUploadModal
        isOpen={isBulkEditModalOpen}
        onClose={() => setIsBulkEditModalOpen(false)}
        onUpload={handleBulkEdit}
        type="edit"
      />
    </div>
  )
}

export default ClientProduct

