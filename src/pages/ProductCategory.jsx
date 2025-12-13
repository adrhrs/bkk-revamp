import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const initialCategories = [
  { id: '17ab5757-16ed-482e-8f3f-a1dea213ac51', code: 'e-wallet', name: 'E-Wallet', created_at: '2025-08-29 06:31:59' },
  { id: '623e1a87-16aa-4620-9e77-9ca0435aba66', code: 'mobile-data', name: 'Mobile Data', created_at: '2025-08-29 06:31:59' },
  { id: 'ef46b7a8-d8d2-41bc-9cd5-604dbb2ecb1b', code: 'mobile-credit', name: 'Mobile Credit', created_at: '2025-08-29 06:31:59' },
  { id: '16c3da24-6767-4d53-a551-87656fe4e854', code: 'electricity-postpaid', name: 'Electricity Postpaid', created_at: '2025-08-29 06:31:59' },
  { id: 'bde98f6a-d237-498e-bf7b-4d4ffeaaab56', code: 'water-utility', name: 'Water Utility (PDAM)', created_at: '2025-08-29 06:31:59' },
  { id: '46530093-d03f-4e4f-bca9-24eed6d37e6d', code: 'bpjs-health', name: 'BPJS Health', created_at: '2025-08-29 06:31:59' },
  { id: '5d4ea98e-afa4-4b38-8445-11182df7127f', code: 'electricity-token', name: 'Electricity Token (Prepaid)', created_at: '2025-08-29 06:31:59' },
  { id: '56ed43a8-393e-4629-9105-48382bdd770e', code: 'multifinance', name: 'Multifinance', created_at: '2025-08-29 06:31:59' },
  { id: 'cb3c7942-21ed-4803-9b56-a5c975a212ec', code: 'mobile-postpaid', name: 'Mobile Postpaid', created_at: '2025-08-29 06:31:59' },
  { id: '89eec95b-b4dd-43dd-8eba-fba765afa508', code: 'game-voucher', name: 'Game Voucher', created_at: '2025-08-29 06:31:59' },
  { id: '503de7de-c92b-4d52-b907-08b49d7a3a62', code: 'pulsa', name: 'Pulsa', created_at: '2025-10-24 08:28:15' },
  { id: '32a29dc2-281c-409d-b674-d47fe3b5b307', code: 'voucher', name: 'Voucher', created_at: '2025-10-24 08:28:15' },
]

function generateId() {
  return crypto.randomUUID()
}

function getCurrentDateTime() {
  const now = new Date()
  return now.toISOString().slice(0, 19).replace('T', ' ')
}

function CategoryModal({ isOpen, onClose, onSave, category, mode }) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
  })

  useEffect(() => {
    if (isOpen) {
      setFormData({
        code: category?.code || '',
        name: category?.name || '',
      })
    }
  }, [isOpen, category])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200">
        <div className="bg-neutral-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-100">
            {mode === 'create' ? 'Create Category' : 'Edit Category'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          {mode === 'edit' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">ID</label>
              <input
                type="text"
                value={category?.id || ''}
                disabled
                className="w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-md text-neutral-500 font-mono text-sm cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g., game-voucher"
              required
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Game Voucher"
              required
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
          </div>

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
          <h3 className="text-lg font-semibold text-neutral-800 text-center mb-2">Delete Category</h3>
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

function ProductCategory() {
  const [categories, setCategories] = useState(initialCategories)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [editingCategory, setEditingCategory] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState(null)

  const openCreateModal = () => {
    setModalMode('create')
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const openEditModal = (category) => {
    setModalMode('edit')
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
  }

  const openDeleteModal = (category) => {
    setDeletingCategory(category)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingCategory(null)
  }

  const handleDelete = () => {
    setCategories(prev => prev.filter(c => c.id !== deletingCategory.id))
    closeDeleteModal()
  }

  const handleSave = (formData) => {
    if (modalMode === 'create') {
      const newCategory = {
        id: generateId(),
        ...formData,
        created_at: getCurrentDateTime(),
      }
      setCategories(prev => [newCategory, ...prev])
    } else {
      setCategories(prev => prev.map(c => 
        c.id === editingCategory.id ? { ...c, ...formData } : c
      ))
    }
    closeModal()
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-neutral-500 hover:text-neutral-800 transition-colors">← Back</Link>
            <h1 className="text-xl font-semibold text-neutral-800">Product Categories</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-neutral-800 text-white rounded-md font-medium hover:bg-neutral-900 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Category
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">Actions</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">id</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">code</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">name</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">created_at</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr 
                    key={category.id} 
                    className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(category)}
                          className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 rounded border border-neutral-300 hover:bg-neutral-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(category)}
                          className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded border border-red-200 hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 font-mono text-xs">{category.id}</td>
                    <td className="px-4 py-3 text-neutral-700">{category.code}</td>
                    <td className="px-4 py-3 text-neutral-700">{category.name}</td>
                    <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">{category.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        category={editingCategory}
        mode={modalMode}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemName={deletingCategory?.name}
      />
    </div>
  )
}

export default ProductCategory

