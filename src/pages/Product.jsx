import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const initialProducts = [
  {
    id: '019a5e80-9675-76f3-9cbe-54901ffb7355',
    category_code: 'game-voucher',
    category_name: 'Game Voucher',
    brand_name: 'game voucher',
    description: '110 Cash',
    price: 9561000,
    disturbance_level: '',
    status: 'non_active',
    created_at: '2025-11-07 13:27:55',
    updated_at: '',
    code: '8BP110',
    currency: 'IDR',
  },
  {
    id: '0199ff66-4859-7331-9e42-707c4be2c900',
    category_code: 'game-voucher',
    category_name: 'Game Voucher',
    brand_name: 'game voucher',
    description: '50 Diamonds',
    price: 621100,
    disturbance_level: '',
    status: 'active',
    created_at: '2025-10-20 02:15:17',
    updated_at: '',
    code: 'FF50',
    currency: 'IDR',
  },
  {
    id: '019a5e80-9678-7f19-9869-9104719dfec1',
    category_code: 'game-voucher',
    category_name: 'Game Voucher',
    brand_name: 'game voucher',
    description: '112000 Coin',
    price: 9561000,
    disturbance_level: '',
    status: 'non_active',
    created_at: '2025-11-07 13:27:55',
    updated_at: '',
    code: '8BP112000',
    currency: 'IDR',
  },
  {
    id: '019a5e80-9679-7a68-83a8-b64764ce8c96',
    category_code: 'game-voucher',
    category_name: 'Game Voucher',
    brand_name: 'game voucher',
    description: '15 Scratchers',
    price: 4634200,
    disturbance_level: '',
    status: 'non_active',
    created_at: '2025-11-07 13:27:55',
    updated_at: '',
    code: '8BP15STS',
    currency: 'IDR',
  },
  {
    id: '019a5e80-967a-7613-a56f-fdb5854ac24b',
    category_code: 'game-voucher',
    category_name: 'Game Voucher',
    brand_name: 'game voucher',
    description: '20 Cash',
    price: 1909900,
    disturbance_level: '',
    status: 'non_active',
    created_at: '2025-11-07 13:27:55',
    updated_at: '',
    code: '8BP20',
    currency: 'IDR',
  },
  {
    id: '019a5e80-967b-7132-91ca-19d40537c9b6',
    category_code: 'game-voucher',
    category_name: 'Game Voucher',
    brand_name: 'game voucher',
    description: '20000 Coin',
    price: 1909900,
    disturbance_level: '',
    status: 'non_active',
    created_at: '2025-11-07 13:27:55',
    updated_at: '',
    code: '8BP20000',
    currency: 'IDR',
  },
  {
    id: '0199ff66-485d-7068-b23e-5b73c5e5e976',
    category_code: 'game-voucher',
    category_name: 'Game Voucher',
    brand_name: 'game voucher',
    description: 'Mingguan Membership',
    price: 2587900,
    disturbance_level: '',
    status: 'active',
    created_at: '2025-10-20 02:15:17',
    updated_at: '',
    code: 'FFMINGGUAN',
    currency: 'IDR',
  },
  {
    id: '0199ff66-485e-71fc-84c8-721f2660fc6d',
    category_code: 'game-voucher',
    category_name: 'Game Voucher',
    brand_name: 'game voucher',
    description: 'BP Card',
    price: 3881800,
    disturbance_level: '',
    status: 'active',
    created_at: '2025-10-20 02:15:17',
    updated_at: '',
    code: 'FFBPC',
    currency: 'IDR',
  },
  {
    id: '019a5e80-967c-72c2-b3d8-6a8fae04c2db',
    category_code: 'e-wallet',
    category_name: 'E-Wallet',
    brand_name: 'dana',
    description: '250 Cash',
    price: 19124800,
    disturbance_level: '',
    status: 'non_active',
    created_at: '2025-11-07 13:27:55',
    updated_at: '',
    code: '8BP250',
    currency: 'IDR',
  },
  {
    id: '019a5e80-967d-724e-a92a-04a4eb47dbb8',
    category_code: 'mobile-credit',
    category_name: 'Mobile Credit',
    brand_name: 'telkomsel',
    description: '256000 Coin',
    price: 19124800,
    disturbance_level: '',
    status: 'non_active',
    created_at: '2025-11-07 13:27:55',
    updated_at: '',
    code: '8BP256000',
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

function ProductModal({ isOpen, onClose, onSave, product, mode }) {
  const [formData, setFormData] = useState({
    category_code: '',
    category_name: '',
    brand_name: '',
    description: '',
    price: '',
    status: 'non_active',
    code: '',
    currency: 'IDR',
  })

  useEffect(() => {
    if (isOpen) {
      setFormData({
        category_code: product?.category_code || '',
        category_name: product?.category_name || '',
        brand_name: product?.brand_name || '',
        description: product?.description || '',
        price: product?.price || '',
        status: product?.status || 'non_active',
        code: product?.code || '',
        currency: 'IDR',
      })
    }
  }, [isOpen, product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-neutral-800 px-6 py-4 sticky top-0">
          <h2 className="text-xl font-semibold text-neutral-100">
            {mode === 'create' ? 'Create Product' : 'Edit Product'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          {/* Category Code */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Category Code
            </label>
            <input
              type="text"
              name="category_code"
              value={formData.category_code}
              onChange={handleChange}
              placeholder="e.g., game-voucher"
              required
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
          </div>

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Category Name
            </label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              placeholder="e.g., Game Voucher"
              required
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
          </div>

          {/* Brand Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Brand Name
            </label>
            <input
              type="text"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleChange}
              placeholder="e.g., telkomsel"
              required
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., 110 Cash"
              required
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g., 8BP110"
              required
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Price (in cents)
            </label>
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
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Status
            </label>
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

          {/* Currency (readonly) */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Currency
            </label>
            <input
              type="text"
              value="IDR"
              disabled
              className="w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-md text-neutral-500 cursor-not-allowed"
            />
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
              className="flex-1 px-4 py-2.5 bg-neutral-800 text-white rounded-md font-medium hover:bg-neutral-900 transition-all"
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
  const fileInputRef = useState(null)

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
    ? '/templates/bulk-upload-template.xlsx' 
    : '/templates/bulk-edit-template.xlsx'

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200">
        {/* Header */}
        <div className="bg-neutral-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-100">
            {type === 'upload' ? 'Bulk Upload Products' : 'Bulk Edit Products'}
          </h2>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          {/* Template Link */}
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

          {/* File Upload Area */}
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

          {/* Actions */}
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

function Product() {
  const [products, setProducts] = useState(initialProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false)
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false)

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ field: null, direction: null })

  // Filter state
  const [filters, setFilters] = useState({
    id: '',
    code: '',
    brand_name: '',
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
    setFilters({ id: '', code: '', brand_name: '', status: '' })
  }

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Apply filters
    if (filters.id) {
      result = result.filter(p => p.id.toLowerCase().includes(filters.id.toLowerCase()))
    }
    if (filters.code) {
      result = result.filter(p => p.code.toLowerCase().includes(filters.code.toLowerCase()))
    }
    if (filters.brand_name) {
      result = result.filter(p => p.brand_name.toLowerCase().includes(filters.brand_name.toLowerCase()))
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
  }, [products, filters, sortConfig])

  const navigate = useNavigate()

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

  const openRouting = (product) => {
    navigate(`/product-routing?code=${encodeURIComponent(product.code)}`)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleSave = (formData) => {
    if (modalMode === 'create') {
      const newProduct = {
        id: generateId(),
        ...formData,
        disturbance_level: '',
        created_at: getCurrentDateTime(),
        updated_at: '',
      }
      setProducts(prev => [newProduct, ...prev])
    } else {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, updated_at: getCurrentDateTime() }
          : p
      ))
    }
    closeModal()
  }

  const handleBulkUpload = (file) => {
    // In a real app, this would parse the file and create products
    console.log('Bulk upload file:', file.name)
    // For demo purposes, just show an alert
    alert(`File "${file.name}" uploaded successfully! In a real app, this would process the file and create products.`)
  }

  const handleBulkEdit = (file) => {
    // In a real app, this would parse the file and update products
    console.log('Bulk edit file:', file.name)
    // For demo purposes, just show an alert
    alert(`File "${file.name}" uploaded successfully! In a real app, this would process the file and update products.`)
  }

  const hasActiveFilters = filters.id || filters.code || filters.brand_name || filters.status

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              ← Back
            </Link>
            <h1 className="text-xl font-semibold text-neutral-800">Products</h1>
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
              Create Product
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
              <label className="block text-xs font-medium text-neutral-500 mb-1">Code</label>
              <input
                type="text"
                name="code"
                value={filters.code}
                onChange={handleFilterChange}
                placeholder="Search by code..."
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">Brand Name</label>
              <input
                type="text"
                name="brand_name"
                value={filters.brand_name}
                onChange={handleFilterChange}
                placeholder="Search by brand..."
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
                  <SortableHeader label="code" field="code" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="category_name" field="category_name" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="brand_name" field="brand_name" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">description</th>
                  <th className="text-right px-6 py-3 font-medium text-neutral-600 min-w-[140px]">
                    <div className="flex items-center gap-1 justify-end cursor-pointer hover:bg-neutral-100 -mx-2 px-2 py-1 rounded transition-colors" onClick={() => handleSort('price')}>
                      price
                      <SortIcon direction={sortConfig.field === 'price' ? sortConfig.direction : null} />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">disturbance_level</th>
                  <SortableHeader label="status" field="status" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="created_at" field="created_at" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">updated_at</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">currency</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center text-neutral-500">
                      No products found matching your filters.
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
                          <button
                            onClick={() => openRouting(product)}
                            className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
                          >
                            Routing
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-neutral-600 font-mono text-xs">{product.id}</td>
                      <td className="px-4 py-3 text-neutral-700">{product.code}</td>
                      <td className="px-4 py-3 text-neutral-700">{product.category_name}</td>
                      <td className="px-4 py-3 text-neutral-700">{product.brand_name}</td>
                      <td className="px-4 py-3 text-neutral-700">{product.description}</td>
                      <td className="px-6 py-3 text-right text-neutral-800 tabular-nums font-medium min-w-[140px]">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-4 py-3 text-neutral-400">{product.disturbance_level || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          product.status === 'active' 
                            ? 'text-green-700 bg-green-50' 
                            : 'text-red-700 bg-red-50'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">{product.created_at}</td>
                      <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">{product.updated_at || '-'}</td>
                      <td className="px-4 py-3 text-neutral-500">{product.currency}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Results count */}
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        product={editingProduct}
        mode={modalMode}
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

export default Product
