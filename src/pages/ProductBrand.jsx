import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const initialBrands = [
  { id: '6f8b2ae6-e736-4cba-8d35-9a5b23b86e91', name: 'smartfren' },
  { id: '85238859-210a-4014-a753-68431c47adb8', name: 'game voucher' },
  { id: '459045e9-61e8-435f-9121-f41999c05252', name: 'axis' },
  { id: 'f919f6fd-9952-4c17-829e-de17cab6f184', name: 'telkomsel' },
  { id: 'd5c36454-96f1-4923-85a4-fb838e5b9fd6', name: 'dana' },
  { id: '4684bb05-5f0f-423e-aed5-39bf2c227ff0', name: 'bolt' },
  { id: '74a335ca-ade8-4f72-a559-2cb51b4f33ca', name: 'indosat' },
  { id: '475a6fb5-4526-4241-a37b-eb43d4aa2c6f', name: 'tri' },
  { id: '752b1349-79f7-4b71-9963-65f8dd0bf0c8', name: 'xl' },
  { id: 'c80e2e08-87cb-45bc-aa80-0db58f8db197', name: 'bca' },
  { id: '5f1ec064-016c-46bb-a531-1ce5da55f8f0', name: 'gopay' },
  { id: '004cc5ee-e3ef-45cf-a218-c2a2b05861eb', name: 'adira' },
  { id: '98fdc7e8-b8ae-4f89-8260-92ab42bb5210', name: 'multifinance' },
  { id: '28539422-15c3-41a6-b4b5-59002ac84932', name: 'fif' },
  { id: '605c5fb2-3fd6-4b21-9a33-411913bab679', name: 'linkaja' },
  { id: 'f14c3b8d-4666-4922-8a45-3a0af14df6bf', name: 'ovo' },
  { id: '5ae0320e-82ee-4746-bf84-bced422850b0', name: 'pdam' },
  { id: 'dd017522-fe12-4e61-a36b-430222128b84', name: 'balifiber' },
  { id: '475ab613-695c-4fbf-94cc-14e33d7c4a6e', name: 'bpjs' },
]

function generateId() {
  return crypto.randomUUID()
}

function BrandModal({ isOpen, onClose, onSave, brand, mode }) {
  const [formData, setFormData] = useState({ name: '' })

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: brand?.name || '' })
    }
  }, [isOpen, brand])

  const handleChange = (e) => {
    setFormData({ name: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200">
        <div className="bg-neutral-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-100">
            {mode === 'create' ? 'Create Brand' : 'Edit Brand'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          {mode === 'edit' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">ID</label>
              <input
                type="text"
                value={brand?.id || ''}
                disabled
                className="w-full px-4 py-2.5 bg-neutral-100 border border-neutral-300 rounded-md text-neutral-500 font-mono text-sm cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., telkomsel"
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
          <h3 className="text-lg font-semibold text-neutral-800 text-center mb-2">Delete Brand</h3>
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

function ProductBrand() {
  const [brands, setBrands] = useState(initialBrands)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [editingBrand, setEditingBrand] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingBrand, setDeletingBrand] = useState(null)

  const openCreateModal = () => {
    setModalMode('create')
    setEditingBrand(null)
    setIsModalOpen(true)
  }

  const openEditModal = (brand) => {
    setModalMode('edit')
    setEditingBrand(brand)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingBrand(null)
  }

  const openDeleteModal = (brand) => {
    setDeletingBrand(brand)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingBrand(null)
  }

  const handleDelete = () => {
    setBrands(prev => prev.filter(b => b.id !== deletingBrand.id))
    closeDeleteModal()
  }

  const handleSave = (formData) => {
    if (modalMode === 'create') {
      const newBrand = {
        id: generateId(),
        ...formData,
      }
      setBrands(prev => [newBrand, ...prev])
    } else {
      setBrands(prev => prev.map(b => 
        b.id === editingBrand.id ? { ...b, ...formData } : b
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
            <h1 className="text-xl font-semibold text-neutral-800">Product Brands</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-neutral-800 text-white rounded-md font-medium hover:bg-neutral-900 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Brand
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
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">name</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand, index) => (
                  <tr 
                    key={brand.id} 
                    className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(brand)}
                          className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 rounded border border-neutral-300 hover:bg-neutral-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(brand)}
                          className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded border border-red-200 hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 font-mono text-xs">{brand.id}</td>
                    <td className="px-4 py-3 text-neutral-700">{brand.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <BrandModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        brand={editingBrand}
        mode={modalMode}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemName={deletingBrand?.name}
      />
    </div>
  )
}

export default ProductBrand

