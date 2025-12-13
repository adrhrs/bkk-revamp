import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

// GGS Items mapping
const GGS_ITEMS = {
  '26f9adfa-afa6-4dbc-80d2-050c61a25010': '10 Diamonds',
  '019a4931-c5aa-710d-863a-29bb8015d626': '3640 Diamonds',
  '019a4931-c51b-78c8-915e-5081a4cc7403': '2200 Diamonds',
  '019a4931-c48f-79de-8a58-0204b780ca05': '2180 Diamonds',
  '019a4931-c401-7ac7-b417-81b1fb988f10': '1450 Diamonds',
  '019a4931-c377-713a-b818-e2365ab2d104': '1075 Diamonds',
  '019a4931-c2e3-70c0-810c-ef0dfc60a73d': '1080 Diamonds',
  '019a4931-c257-7803-a155-019b988ec220': '1050 Diamonds',
}

// Product codes (from client product / biller)
const PRODUCT_CODES = {
  '019abe73-97c2-72e6-adbc-4a9f018a5afe': 'FF5',
  '019abe73-97c0-7c80-a19f-df123bec1806': 'FF10',
  '019abe73-97bf-77ca-a983-a28b32a022d0': 'FF20',
  '019abe73-97bd-7cf6-bff5-7d55bced8902': 'FF50',
  '019abe73-97bc-74e4-a59f-c3c4ae9406e8': 'FF100',
  '019abe73-97bb-71af-bd5b-dd830d309de7': 'FF200',
  '019abe73-97b9-7c05-960c-444770df2e6f': 'FF500',
  '019abe73-97b8-781c-be4c-8ce2997a2882': 'FF1000',
}

// Available product options for dropdown
const availableProducts = [
  { id: '019abe73-97c2-72e6-adbc-4a9f018a5afe', code: 'FF5', description: '5 Diamonds' },
  { id: '019abe73-97c0-7c80-a19f-df123bec1806', code: 'FF10', description: '10 Diamonds' },
  { id: '019abe73-97bf-77ca-a983-a28b32a022d0', code: 'FF20', description: '20 Diamonds' },
  { id: '019abe73-97bd-7cf6-bff5-7d55bced8902', code: 'FF50', description: '50 Diamonds' },
  { id: '019abe73-97bc-74e4-a59f-c3c4ae9406e8', code: 'FF100', description: '100 Diamonds' },
  { id: '019abe73-97bb-71af-bd5b-dd830d309de7', code: 'FF200', description: '200 Diamonds' },
  { id: '019abe73-97b9-7c05-960c-444770df2e6f', code: 'FF500', description: '500 Diamonds' },
  { id: '019abe73-97b8-781c-be4c-8ce2997a2882', code: 'FF1000', description: '1000 Diamonds' },
]

// Initial routing data
const initialRoutings = [
  {
    id: 'd230a46f-79a2-4267-abb4-4e46b2aac3e4',
    product_item_id: '26f9adfa-afa6-4dbc-80d2-050c61a25010',
    biller_product_id: '019abe73-97c2-72e6-adbc-4a9f018a5afe',
    biller_price: 790,
    status: 'active',
  },
  {
    id: '36738261-dc77-41bd-a6ed-03b1e621eeef',
    product_item_id: '26f9adfa-afa6-4dbc-80d2-050c61a25010',
    biller_product_id: '019abe73-97c2-72e6-adbc-4a9f018a5afe',
    biller_price: 790,
    status: 'active',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    product_item_id: '019a4931-c5aa-710d-863a-29bb8015d626',
    biller_product_id: '019abe73-97b9-7c05-960c-444770df2e6f',
    biller_price: 425000,
    status: 'active',
  },
]

function generateId() {
  return crypto.randomUUID()
}

function getItemName(itemId) {
  return GGS_ITEMS[itemId] || itemId
}

function getProductCode(productId) {
  return PRODUCT_CODES[productId] || productId
}

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price)
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
      className={`text-${align} px-4 py-3 font-medium text-neutral-600 cursor-pointer hover:bg-neutral-100 transition-colors select-none ${className}`}
      onClick={() => onSort(field)}
    >
      <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : ''}`}>
        {label}
        <SortIcon direction={isSorted ? sortConfig.direction : null} />
      </div>
    </th>
  )
}

function RoutingModal({ isOpen, onClose, onSave, itemId }) {
  const [formData, setFormData] = useState({
    biller_product_id: '',
    biller_price: 0,
    status: 'active',
  })

  useEffect(() => {
    if (isOpen) {
      setFormData({
        biller_product_id: '',
        biller_price: 0,
        status: 'active',
      })
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'biller_price' ? Number(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      product_item_id: itemId,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200">
        <div className="bg-neutral-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-100">Add Routing</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          {/* Item Name (read-only) */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Item</label>
            <input
              type="text"
              value={getItemName(itemId)}
              readOnly
              disabled
              className="w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-md text-neutral-500 cursor-not-allowed"
            />
          </div>

          {/* Biller Product (Product Code) */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Biller Code (Product Code)</label>
            <select
              name="biller_product_id"
              value={formData.biller_product_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            >
              <option value="">Select product...</option>
              {availableProducts.map(product => (
                <option key={product.id} value={product.id}>
                  {product.code} - {product.description}
                </option>
              ))}
            </select>
          </div>

          {/* Biller Price */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Biller Price</label>
            <input
              type="number"
              name="biller_price"
              value={formData.biller_price}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
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
              disabled={!formData.biller_product_id}
              className={`flex-1 px-4 py-2.5 rounded-md font-medium transition-all ${
                !formData.biller_product_id
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  : 'bg-neutral-800 text-white hover:bg-neutral-900'
              }`}
            >
              Add Routing
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, routingId }) {
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
            Are you sure you want to delete this routing? This action cannot be undone.
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

function GGSItemRouting() {
  const [searchParams] = useSearchParams()
  const itemIdParam = searchParams.get('item_id')
  
  const [routings, setRoutings] = useState(initialRoutings)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingRouting, setDeletingRouting] = useState(null)

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ field: 'id', direction: 'asc' })

  // Filter routings by item_id if provided in URL
  const baseRoutings = useMemo(() => {
    if (itemIdParam) {
      return routings.filter(r => r.product_item_id === itemIdParam)
    }
    return routings
  }, [routings, itemIdParam])

  const handleSort = (field) => {
    setSortConfig(prev => {
      if (prev.field === field) {
        if (prev.direction === 'asc') return { field, direction: 'desc' }
        if (prev.direction === 'desc') return { field: null, direction: null }
      }
      return { field, direction: 'asc' }
    })
  }

  const sortedRoutings = useMemo(() => {
    let result = [...baseRoutings]

    if (sortConfig.field) {
      result.sort((a, b) => {
        let aVal = a[sortConfig.field]
        let bVal = b[sortConfig.field]

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
  }, [baseRoutings, sortConfig])

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

  const handleSave = (formData) => {
    const newRouting = {
      id: generateId(),
      ...formData,
    }
    setRoutings(prev => [newRouting, ...prev])
    closeModal()
  }

  // Get item name for header
  const currentItemName = itemIdParam ? getItemName(itemIdParam) : null

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/ggs-item" className="text-neutral-500 hover:text-neutral-800 transition-colors">
              ← Back to Items
            </Link>
            <h1 className="text-xl font-semibold text-neutral-800">
              GGS Item Routing {currentItemName && <span className="text-neutral-500">- {currentItemName}</span>}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {itemIdParam && (
              <button
                onClick={openCreateModal}
                className="px-4 py-2 bg-neutral-800 text-white rounded-md font-medium hover:bg-neutral-900 transition-all flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Routing
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <SortableHeader label="id" field="id" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">item_name</th>
                  <SortableHeader label="product_item_id" field="product_item_id" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">biller_code</th>
                  <SortableHeader label="biller_price" field="biller_price" sortConfig={sortConfig} onSort={handleSort} align="right" />
                  <SortableHeader label="status" field="status" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="text-left px-4 py-3 font-medium text-neutral-600 w-[80px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedRoutings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                      {itemIdParam 
                        ? 'No routing configured for this item. Click "Add Routing" to create one.'
                        : 'No routings found. Select an item from GGS Items page to manage routing.'}
                    </td>
                  </tr>
                ) : (
                  sortedRoutings.map((routing, index) => (
                    <tr 
                      key={routing.id} 
                      className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                      }`}
                    >
                      <td className="px-4 py-3 text-neutral-600 font-mono text-xs">{routing.id}</td>
                      <td className="px-4 py-3 text-neutral-800 font-medium">{getItemName(routing.product_item_id)}</td>
                      <td className="px-4 py-3 text-neutral-600 font-mono text-xs">{routing.product_item_id}</td>
                      <td className="px-4 py-3 text-orange-600 font-medium">{getProductCode(routing.biller_product_id)}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-neutral-800 tabular-nums">{formatPrice(routing.biller_price)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          routing.status === 'active' 
                            ? 'text-green-700 bg-green-50' 
                            : 'text-red-700 bg-red-50'
                        }`}>
                          {routing.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openDeleteModal(routing)}
                          className="px-2 py-1 text-xs font-medium text-red-700 bg-red-50 rounded border border-red-200 hover:bg-red-100 transition-colors"
                        >
                          Del
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Results count and sum */}
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500 flex justify-between items-center">
            <span>Showing {sortedRoutings.length} routing{sortedRoutings.length !== 1 ? 's' : ''}</span>
            <span className="font-medium text-neutral-700">
              Total Biller Price: <span className="text-neutral-900">{formatPrice(sortedRoutings.reduce((sum, r) => sum + (r.biller_price || 0), 0))}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <RoutingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        itemId={itemIdParam}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        routingId={deletingRouting?.id}
      />
    </div>
  )
}

export default GGSItemRouting
