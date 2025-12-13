import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

// Product mapping for display
const PRODUCTS = {
  '0199ff47-e4fa-7dc0-816c-7642a5b0f72a': 'Mobile Legends',
  'efb23019-01b8-4754-adb6-6683bce8c74d': 'PUBG Mobile',
  '706b9f19-53c7-4065-854e-c0fcd6c0ef1': 'Roblox',
}

// Initial GGS Items data based on screenshot
const initialGGSItems = [
  {
    id: '26f9adfa-afa6-4dbc-80d2-050c61a25010',
    product_id: '0199ff47-e4fa-7dc0-816c-7642a5b0f72a',
    name: '10 Diamonds',
    image: 'https://gogogo.id/assets/images/product/1741155472_a2d17841b02220d6b4c1.png',
    category: '10 Diamond Rp10 - Login & Pakai Promo SERBA10',
    status: 'active',
    config: '{"slash_price":""}',
    region: 'ID',
    pricing: '{"cost_price":1580,"member_price":3087,"public_price":3087,"static_price":true,"margin_member":4,"margin_public":4,"auto_markup_status":false}',
  },
  {
    id: '019a4931-c5aa-710d-863a-29bb8015d626',
    product_id: '0199ff47-e4fa-7dc0-816c-7642a5b0f72a',
    name: '3640 Diamonds',
    image: 'https://gogogo.id/assets/images/product/1735180039_24c16492b591d481c378.webp',
    category: 'Diamonds',
    status: 'active',
    config: '{"slash_price":506800}',
    region: 'ID',
    pricing: '{"cost_price":426109,"member_price":450397,"public_price":450397,"static_price":true,"margin_member":4,"margin_public":4,"auto_markup_status":false}',
  },
  {
    id: '019a4931-c51b-78c8-915e-5081a4cc7403',
    product_id: '0199ff47-e4fa-7dc0-816c-7642a5b0f72a',
    name: '2200 Diamonds',
    image: 'https://gogogo.id/assets/images/product/1735180039_24c16492b591d481c378.webp',
    category: 'Diamonds',
    status: 'active',
    config: '{"slash_price":307900}',
    region: 'ID',
    pricing: '{"cost_price":260782,"member_price":275647,"public_price":275647,"static_price":true,"margin_member":4,"margin_public":4,"auto_markup_status":false}',
  },
  {
    id: '019a4931-c48f-79de-8a58-0204b780ca05',
    product_id: '0199ff47-e4fa-7dc0-816c-7642a5b0f72a',
    name: '2180 Diamonds',
    image: 'https://gogogo.id/assets/images/product/1735180039_24c16492b591d481c378.webp',
    category: 'Diamonds',
    status: 'active',
    config: '{"slash_price":303900}',
    region: 'ID',
    pricing: '{"cost_price":255160,"member_price":269592,"public_price":269592,"static_price":true,"margin_member":4,"margin_public":4,"auto_markup_status":false}',
  },
  {
    id: '019a4931-c401-7ac7-b417-81b1fb988f10',
    product_id: '0199ff47-e4fa-7dc0-816c-7642a5b0f72a',
    name: '1450 Diamonds',
    image: 'https://gogogo.id/assets/images/product/1735180039_24c16492b591d481c378.webp',
    category: 'Diamonds',
    status: 'active',
    config: '{"slash_price":202100}',
    region: 'ID',
    pricing: '{"cost_price":169580,"member_price":179190,"public_price":179190,"static_price":true,"margin_member":4,"margin_public":4,"auto_markup_status":false}',
  },
  {
    id: '019a4931-c377-713a-b818-e2365ab2d104',
    product_id: '0199ff47-e4fa-7dc0-816c-7642a5b0f72a',
    name: '1075 Diamonds',
    image: 'https://gogogo.id/assets/images/product/1735180039_24c16492b591d481c378.webp',
    category: 'Diamonds',
    status: 'active',
    config: '{"slash_price":149900}',
    region: 'ID',
    pricing: '{"cost_price":127305,"member_price":134561,"public_price":134561,"static_price":true,"margin_member":4,"margin_public":4,"auto_markup_status":false}',
  },
  {
    id: '019a4931-c2e3-70c0-810c-ef0dfc60a73d',
    product_id: '0199ff47-e4fa-7dc0-816c-7642a5b0f72a',
    name: '1080 Diamonds',
    image: 'https://gogogo.id/assets/images/product/1735180039_24c16492b591d481c378.webp',
    category: 'Diamonds',
    status: 'active',
    config: '{"slash_price":145900}',
    region: 'ID',
    pricing: '{"cost_price":126790,"member_price":136156,"public_price":133000,"static_price":true,"margin_member":4,"margin_public":4,"auto_markup_status":false}',
  },
  {
    id: '019a4931-c257-7803-a155-019b988ec220',
    product_id: '0199ff47-e4fa-7dc0-816c-7642a5b0f72a',
    name: '1050 Diamonds',
    image: 'https://gogogo.id/assets/images/product/1735180039_24c16492b591d481c378.webp',
    category: 'Diamonds',
    status: 'active',
    config: '{"slash_price":142300}',
    region: 'ID',
    pricing: '{"cost_price":124990,"member_price":132114,"public_price":132114,"static_price":true,"margin_member":4,"margin_public":4,"auto_markup_status":false}',
  },
]

function generateId() {
  return crypto.randomUUID()
}

function getProductName(productId) {
  return PRODUCTS[productId] || productId
}

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price)
}

function parsePricing(pricingStr) {
  try {
    return JSON.parse(pricingStr || '{}')
  } catch {
    return {}
  }
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

function SortableHeader({ label, field, sortConfig, onSort, align = 'left', className = '' }) {
  const isSorted = sortConfig.field === field
  return (
    <th 
      className={`text-${align} px-3 py-3 font-medium text-neutral-600 cursor-pointer hover:bg-neutral-100 transition-colors select-none ${className}`}
      onClick={() => onSort(field)}
    >
      <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : ''}`}>
        {label}
        <SortIcon direction={isSorted ? sortConfig.direction : null} />
      </div>
    </th>
  )
}

function GGSItemModal({ isOpen, onClose, onSave, item, mode, productId }) {
  const [formData, setFormData] = useState({
    product_id: productId || '',
    name: '',
    image: '',
    category: '',
    status: 'active',
    config: '{}',
    region: 'ID',
    cost_price: 0,
    member_price: 0,
    public_price: 0,
    static_price: true,
    margin_member: 4,
    margin_public: 4,
    auto_markup_status: false,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && item) {
        const pricing = parsePricing(item.pricing)
        setFormData({
          product_id: item.product_id,
          name: item.name,
          image: item.image,
          category: item.category,
          status: item.status,
          config: item.config,
          region: item.region,
          cost_price: pricing.cost_price || 0,
          member_price: pricing.member_price || 0,
          public_price: pricing.public_price || 0,
          static_price: pricing.static_price ?? true,
          margin_member: pricing.margin_member || 4,
          margin_public: pricing.margin_public || 4,
          auto_markup_status: pricing.auto_markup_status ?? false,
        })
        setImagePreview(item.image || null)
      } else {
        setFormData({
          product_id: productId || '',
          name: '',
          image: '',
          category: '',
          status: 'active',
          config: '{}',
          region: 'ID',
          cost_price: 0,
          member_price: 0,
          public_price: 0,
          static_price: true,
          margin_member: 4,
          margin_public: 4,
          auto_markup_status: false,
        })
        setImagePreview(null)
      }
    }
  }, [isOpen, item, mode, productId])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (
        ['cost_price', 'member_price', 'public_price', 'margin_member', 'margin_public'].includes(name) 
          ? Number(value) 
          : value
      )
    }))
  }

  const handleImageDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleImageDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleImageDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file)
    }
  }

  const handleImageFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleImageFile(file)
    }
  }

  const handleImageFile = (file) => {
    // Create a preview URL for the image
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
      // In a real app, you would upload the file to a server and get a URL back
      // For now, we'll use the data URL as the image value
      setFormData(prev => ({ ...prev, image: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    setFormData(prev => ({ ...prev, image: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { cost_price, member_price, public_price, static_price, margin_member, margin_public, auto_markup_status, ...rest } = formData
    const pricing = JSON.stringify({
      cost_price,
      member_price,
      public_price,
      static_price,
      margin_member,
      margin_public,
      auto_markup_status,
    })
    onSave({ ...rest, pricing })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 overflow-hidden border border-neutral-200 max-h-[90vh] overflow-y-auto">
        <div className="bg-neutral-800 px-6 py-4 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-neutral-100">
            {mode === 'create' ? 'Create GGS Item' : 'Edit GGS Item'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter item name..."
              required
              className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Image</label>
            {imagePreview ? (
              <div className="relative inline-block">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border border-neutral-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div
                onDragOver={handleImageDragOver}
                onDragLeave={handleImageDragLeave}
                onDrop={handleImageDrop}
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                  isDragging 
                    ? 'border-neutral-500 bg-neutral-100' 
                    : 'border-neutral-300 bg-white hover:border-neutral-400'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium text-neutral-700">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-neutral-500">PNG, JPG, GIF, or WEBP</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Diamonds"
                className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
              >
                <option value="active">active</option>
                <option value="non-active">non-active</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Region</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="e.g., ID"
                className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
              />
            </div>

            {/* Config */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Config (JSON)</label>
              <input
                type="text"
                name="config"
                value={formData.config}
                onChange={handleChange}
                placeholder='{"slash_price":0}'
                className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all font-mono text-sm"
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-t border-neutral-200 pt-5">
            <h3 className="text-sm font-semibold text-neutral-800 mb-4">Pricing</h3>
            
            <div className="grid grid-cols-3 gap-4">
              {mode === 'edit' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Cost Price</label>
                  <input
                    type="number"
                    name="cost_price"
                    value={formData.cost_price}
                    readOnly
                    disabled
                    className="w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-md text-neutral-500 cursor-not-allowed"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Member Price</label>
                <input
                  type="number"
                  name="member_price"
                  value={formData.member_price}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Public Price</label>
                <input
                  type="number"
                  name="public_price"
                  value={formData.public_price}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Margin Member</label>
                <input
                  type="number"
                  name="margin_member"
                  value={formData.margin_member}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Margin Public</label>
                <input
                  type="number"
                  name="margin_public"
                  value={formData.margin_public}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                />
              </div>
              <div className="flex flex-col gap-3 justify-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      name="static_price"
                      checked={formData.static_price}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neutral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-700"></div>
                  </div>
                  <span className="text-sm text-neutral-700">Static Price</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      name="auto_markup_status"
                      checked={formData.auto_markup_status}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neutral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-700"></div>
                  </div>
                  <span className="text-sm text-neutral-700">Auto Markup</span>
                </label>
              </div>
            </div>
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
              disabled={!formData.name}
              className={`flex-1 px-4 py-2.5 rounded-md font-medium transition-all ${
                !formData.name
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
          <h3 className="text-lg font-semibold text-neutral-800 text-center mb-2">Delete GGS Item</h3>
          <p className="text-neutral-600 text-center text-sm mb-6">
            Are you sure you want to delete <span className="font-medium">{itemName}</span>? This action cannot be undone.
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
    ? '/templates/ggs-item-bulk-upload-template.xlsx' 
    : '/templates/ggs-item-bulk-edit-template.xlsx'

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200">
        <div className="bg-neutral-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-100">
            {type === 'upload' ? 'Bulk Upload GGS Items' : 'Bulk Edit GGS Items'}
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

function GGSItem() {
  const [searchParams] = useSearchParams()
  const productIdParam = searchParams.get('product_id')
  
  const [items, setItems] = useState(initialGGSItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [editingItem, setEditingItem] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingItem, setDeletingItem] = useState(null)
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false)
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false)

  // Inline editing state
  const [editingRowId, setEditingRowId] = useState(null)
  const [editingPricing, setEditingPricing] = useState({})

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ field: 'name', direction: 'asc' })

  // Filter state
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    status: '',
  })

  // Filter items by product_id if provided in URL
  const baseItems = useMemo(() => {
    if (productIdParam) {
      return items.filter(item => item.product_id === productIdParam)
    }
    return items
  }, [items, productIdParam])

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
    setFilters({ name: '', category: '', status: '' })
  }

  const filteredAndSortedItems = useMemo(() => {
    let result = [...baseItems]

    // Apply filters
    if (filters.name) {
      result = result.filter(p => p.name.toLowerCase().includes(filters.name.toLowerCase()))
    }
    if (filters.category) {
      result = result.filter(p => p.category.toLowerCase().includes(filters.category.toLowerCase()))
    }
    if (filters.status) {
      result = result.filter(p => p.status === filters.status)
    }

    // Apply sorting
    if (sortConfig.field) {
      result.sort((a, b) => {
        let aVal, bVal

        // Handle pricing fields
        if (['cost_price', 'member_price', 'public_price', 'margin_member', 'margin_public'].includes(sortConfig.field)) {
          const aPricing = parsePricing(a.pricing)
          const bPricing = parsePricing(b.pricing)
          aVal = aPricing[sortConfig.field] || 0
          bVal = bPricing[sortConfig.field] || 0
        } else {
          aVal = a[sortConfig.field]
          bVal = b[sortConfig.field]
        }

        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [baseItems, filters, sortConfig])

  const openCreateModal = () => {
    setModalMode('create')
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item) => {
    setModalMode('edit')
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const openDeleteModal = (item) => {
    setDeletingItem(item)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingItem(null)
  }

  const handleDelete = () => {
    setItems(prev => prev.filter(p => p.id !== deletingItem.id))
    closeDeleteModal()
  }

  const handleSave = (formData) => {
    if (modalMode === 'create') {
      const newItem = {
        id: generateId(),
        ...formData,
      }
      setItems(prev => [newItem, ...prev])
    } else {
      setItems(prev => prev.map(p => 
        p.id === editingItem.id 
          ? { ...p, ...formData }
          : p
      ))
    }
    closeModal()
  }

  const handleBulkUpload = (file) => {
    console.log('Bulk upload file:', file.name)
    alert(`File "${file.name}" uploaded successfully! In a real app, this would process the file and create GGS items.`)
  }

  const handleBulkEdit = (file) => {
    console.log('Bulk edit file:', file.name)
    alert(`File "${file.name}" uploaded successfully! In a real app, this would process the file and update GGS items.`)
  }

  // Inline editing functions
  const startInlineEdit = (item) => {
    const pricing = parsePricing(item.pricing)
    setEditingRowId(item.id)
    setEditingPricing({
      cost_price: pricing.cost_price || 0,
      member_price: pricing.member_price || 0,
      public_price: pricing.public_price || 0,
      static_price: pricing.static_price ?? true,
      margin_member: pricing.margin_member || 4,
      margin_public: pricing.margin_public || 4,
      auto_markup_status: pricing.auto_markup_status ?? false,
    })
  }

  const cancelInlineEdit = () => {
    setEditingRowId(null)
    setEditingPricing({})
  }

  const saveInlineEdit = (itemId) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const currentPricing = parsePricing(item.pricing)
        const newPricing = JSON.stringify({
          ...currentPricing,
          ...editingPricing,
        })
        return { ...item, pricing: newPricing }
      }
      return item
    }))
    setEditingRowId(null)
    setEditingPricing({})
  }

  const handleInlinePricingChange = (field, value) => {
    setEditingPricing(prev => ({
      ...prev,
      [field]: ['static_price', 'auto_markup_status'].includes(field) ? value : Number(value)
    }))
  }

  const hasActiveFilters = filters.name || filters.category || filters.status

  // Get unique categories for filter dropdown
  const categories = [...new Set(baseItems.map(p => p.category))]

  // Get product name for header
  const currentProductName = productIdParam ? getProductName(productIdParam) : null

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/ggs-product" className="text-neutral-500 hover:text-neutral-800 transition-colors">
              ← Back to Products
            </Link>
            <h1 className="text-xl font-semibold text-neutral-800">
              GGS Items {currentProductName && <span className="text-neutral-500">- {currentProductName}</span>}
            </h1>
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
              Create Item
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Search by name..."
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300 transition-all"
              >
                <option value="">All</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
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
                <option value="non-active">non-active</option>
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
                  <th className="text-left px-3 py-3 font-medium text-neutral-600 w-[200px]">Actions</th>
                  <th className="text-left px-3 py-3 font-medium text-neutral-600 w-[80px]">id</th>
                  <SortableHeader label="product" field="product_id" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="name" field="name" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="text-left px-3 py-3 font-medium text-neutral-600">image</th>
                  <SortableHeader label="category" field="category" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="status" field="status" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="text-left px-3 py-3 font-medium text-neutral-600">region</th>
                  <SortableHeader label="cost_price" field="cost_price" sortConfig={sortConfig} onSort={handleSort} align="right" />
                  <SortableHeader label="member_price" field="member_price" sortConfig={sortConfig} onSort={handleSort} align="right" />
                  <SortableHeader label="public_price" field="public_price" sortConfig={sortConfig} onSort={handleSort} align="right" />
                  <th className="text-right px-3 py-3 font-medium text-neutral-600">margin_m</th>
                  <th className="text-right px-3 py-3 font-medium text-neutral-600">margin_p</th>
                  <th className="text-center px-3 py-3 font-medium text-neutral-600">auto_markup</th>
                  <th className="text-center px-3 py-3 font-medium text-neutral-600">static</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedItems.length === 0 ? (
                  <tr>
                    <td colSpan={15} className="px-4 py-8 text-center text-neutral-500">
                      No GGS items found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedItems.map((item, index) => {
                    const pricing = parsePricing(item.pricing)
                    const isEditing = editingRowId === item.id
                    const displayPricing = isEditing ? editingPricing : pricing
                    
                    return (
                      <tr 
                        key={item.id} 
                        className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                        }`}
                      >
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={() => saveInlineEdit(item.id)}
                                  className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded border border-green-200 hover:bg-green-100 transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelInlineEdit}
                                  className="px-2 py-1 text-xs font-medium text-neutral-700 bg-neutral-100 rounded border border-neutral-300 hover:bg-neutral-200 transition-colors"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <Link
                                  to={`/ggs-item-routing?item_id=${item.id}`}
                                  className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded border border-purple-200 hover:bg-purple-100 transition-colors"
                                >
                                  Bundle Config
                                </Link>
                                <button
                                  onClick={() => openEditModal(item)}
                                  className="px-2 py-1 text-xs font-medium text-neutral-700 bg-neutral-100 rounded border border-neutral-300 hover:bg-neutral-200 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => openDeleteModal(item)}
                                  className="px-2 py-1 text-xs font-medium text-red-700 bg-red-50 rounded border border-red-200 hover:bg-red-100 transition-colors"
                                >
                                  Del
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-neutral-500 font-mono text-xs max-w-[80px] truncate" title={item.id}>
                          {item.id.slice(0, 8)}...
                        </td>
                        <td className="px-3 py-2 text-neutral-700 text-xs">{getProductName(item.product_id)}</td>
                        <td className="px-3 py-2 text-neutral-800 font-medium">{item.name}</td>
                        <td className="px-3 py-2">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-8 h-8 object-cover rounded border border-neutral-200"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-neutral-100 rounded border border-neutral-200 flex items-center justify-center text-neutral-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-2 text-neutral-600 text-xs max-w-[150px] truncate" title={item.category}>{item.category}</td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            item.status === 'active' 
                              ? 'text-green-700 bg-green-50' 
                              : 'text-red-700 bg-red-50'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-neutral-600 text-xs">{item.region}</td>
                        
                        {/* cost_price - display only */}
                        <td className="px-3 py-2 text-right">
                          <span className="text-neutral-800 tabular-nums text-xs">{formatPrice(pricing.cost_price || 0)}</span>
                        </td>
                        
                        {/* member_price - always editable */}
                        <td className="px-3 py-2 text-right">
                          <input
                            type="number"
                            value={displayPricing.member_price ?? pricing.member_price ?? 0}
                            onChange={(e) => {
                              if (!isEditing) startInlineEdit(item)
                              handleInlinePricingChange('member_price', e.target.value)
                            }}
                            onFocus={() => { if (!isEditing) startInlineEdit(item) }}
                            className="w-24 px-2 py-1 text-xs text-right text-black bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                          />
                        </td>
                        
                        {/* public_price - always editable */}
                        <td className="px-3 py-2 text-right">
                          <input
                            type="number"
                            value={displayPricing.public_price ?? pricing.public_price ?? 0}
                            onChange={(e) => {
                              if (!isEditing) startInlineEdit(item)
                              handleInlinePricingChange('public_price', e.target.value)
                            }}
                            onFocus={() => { if (!isEditing) startInlineEdit(item) }}
                            className="w-24 px-2 py-1 text-xs text-right text-black bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                          />
                        </td>
                        
                        {/* margin_member - always editable */}
                        <td className="px-3 py-2 text-right">
                          <input
                            type="number"
                            value={displayPricing.margin_member ?? pricing.margin_member ?? 0}
                            onChange={(e) => {
                              if (!isEditing) startInlineEdit(item)
                              handleInlinePricingChange('margin_member', e.target.value)
                            }}
                            onFocus={() => { if (!isEditing) startInlineEdit(item) }}
                            className="w-16 px-2 py-1 text-xs text-right text-black bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                          />
                        </td>
                        
                        {/* margin_public - always editable */}
                        <td className="px-3 py-2 text-right">
                          <input
                            type="number"
                            value={displayPricing.margin_public ?? pricing.margin_public ?? 0}
                            onChange={(e) => {
                              if (!isEditing) startInlineEdit(item)
                              handleInlinePricingChange('margin_public', e.target.value)
                            }}
                            onFocus={() => { if (!isEditing) startInlineEdit(item) }}
                            className="w-16 px-2 py-1 text-xs text-right text-black bg-white border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                          />
                        </td>
                        
                        {/* auto_markup - toggle */}
                        <td className="px-3 py-2">
                          <div className="flex items-center justify-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={displayPricing.auto_markup_status ?? pricing.auto_markup_status ?? false}
                                onChange={(e) => {
                                  if (!isEditing) startInlineEdit(item)
                                  handleInlinePricingChange('auto_markup_status', e.target.checked)
                                }}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neutral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-700"></div>
                            </label>
                          </div>
                        </td>
                        
                        {/* static - toggle (moved to very right) */}
                        <td className="px-3 py-2">
                          <div className="flex items-center justify-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={displayPricing.static_price ?? pricing.static_price ?? false}
                                onChange={(e) => {
                                  if (!isEditing) startInlineEdit(item)
                                  handleInlinePricingChange('static_price', e.target.checked)
                                }}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neutral-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-700"></div>
                            </label>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          {/* Results count */}
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
            Showing {filteredAndSortedItems.length} of {baseItems.length} items
          </div>
        </div>
      </div>

      {/* Modal */}
      <GGSItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        item={editingItem}
        mode={modalMode}
        productId={productIdParam}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemName={deletingItem?.name}
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

export default GGSItem
