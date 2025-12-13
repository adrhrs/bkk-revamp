import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Initial GGS Products data based on screenshots
const initialGGSProducts = [
  {
    id: 'efb23019-01b8-4754-adb6-6683bce8c74d',
    name: 'PUBG Mobile',
    image: 'https://dummyjson.com/image/150',
    status: 'active',
    highlighted: false,
    region: 'id',
    currency: 'IDR',
    category: 'topup',
    slug: '/topup/uc-pubgm-indonesia-games',
    product_config: '{}',
    score: 0,
  },
  {
    id: '0199ff47-e4fa-7dc0-816c-7642a5b0f72a',
    name: 'Mobile Legends',
    image: 'https://dummyjson.com/image/150',
    status: 'active',
    highlighted: false,
    region: 'id',
    currency: 'IDR',
    category: 'topup',
    slug: '/topup/mobile-legends',
    product_config: '{}',
    score: 0,
  },
  {
    id: 'b0b66b4f-d283-4a45-8a0b-5e8b6a18ac21',
    name: 'Free Fire MAX',
    image: 'https://dummyjson.com/image/150',
    status: 'active',
    highlighted: true,
    region: 'id',
    currency: 'IDR',
    category: 'topup',
    slug: '/topup/free-fire-max-games',
    product_config: '{}',
    score: 0,
  },
  {
    id: '8fb08b4-2234-476a-8046-71d56aeb8fe3',
    name: 'POINT BLANK',
    image: 'https://dummyjson.com/image/150',
    status: 'active',
    highlighted: false,
    region: 'id',
    currency: 'IDR',
    category: 'voucher',
    slug: '/voucher/voucher-point-blank-pb-games',
    product_config: '{}',
    score: 0,
  },
  {
    id: '5b00ce3-6a13-4b91-9310-12394baf1f70',
    name: 'Jade Dynasty: New Fantasy',
    image: 'https://dummyjson.com/image/150',
    status: 'non-active',
    highlighted: false,
    region: 'id',
    currency: 'IDR',
    category: 'topup',
    slug: '/topup/jade-dynasty-new-fantasy-games',
    product_config: '{}',
    score: 0,
  },
  {
    id: '706b9f19-53c7-4065-854e-c0fcd6c0ef1',
    name: 'Roblox',
    image: 'https://dummyjson.com/image/150',
    status: 'non-active',
    highlighted: false,
    region: 'id',
    currency: 'IDR',
    category: 'voucher',
    slug: '/voucher/roblox',
    product_config: '{"ui_config":{"icon":"https://gogogo.id/assets/images/games/1759989058_1a9bf56df35838102b40.webp","mobile_img":"https://gogogo.id/assets/images/games/1759989058_953097688af8b74398fd.webp","inquiry_form":[],"parent_category":[{"id":"rbx_5_hari","tag":"Termurah! 🤑","name":"RBX 5 Hari","inquiry_form":["username"],"category_info":"Robux kamu akan masuk ke akunmu 5-6 hari setelah pembayaranmu sukses.","game_pass_url":"https://create.roblox.com/dashboard/creations","is_use_user_img":true,"topup_guideline":[{"className":"!mb-2 tracking-wide","description":"Masukkan username Roblox kamu"},{"className":"!mb-2 tracking-wide","description":"Pilih jumlah Robux yang mau dibeli"},{"className":"!mb-2 tracking-wide","description":"Selanjutnya, kamu akan diarahkan untuk buat Game Pass dengan jumlah sesuai nominal pembelianmu"},{"className":"!mb-2 tracking-wide","video_url":"https://youtu.be/JSUHrZLDk_Y","description":"Kalau udah bikin Game Pass yang sesuai, silakan lanjut bayar. Robux akan diterima dalam 5 sampai 6 hari setelah pembayaran berhasil."},{"type":"accordion","title":"Cara Buat Game Pass","content":[{"description":"Di aplikasi Roblox-mu, klik menu Lainnya/More"},{"description":"Lalu, klik menu Buat/Create"},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_3.png","description":"Kalau udah masuk, scroll ke bawah lalu klik Place kamu."},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_4.png","description":"Lalu klik tombol garis tiga pada kiri atas halaman."},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_5.png","description":"Scroll ke bawah dan klik Passes di bawah kategori Monetization"},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_6.png","description":"Di halaman Passes, klik Create A Pass"},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_7.png","description":"Masukkan nama (bisa apa aja), lalu klik Create Pass"},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_8.png","description":"Kalau udah dibuat, pass-nya akan muncul di halaman Passes. Lalu, klik pass yang tadi kamu buat."},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_9.png","description":"Klik lagi tombol garis tiga di kiri atas halaman."},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_10.png","description":"Setelah itu, klik Sales."},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_11.png","description":"Di halaman Sales, aktifkan Item for Sale."},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_12.png","description":"Isi \'Default Price\' "},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_13.png","description":"PENTING: Non-aktifkan dulu Regional Pricing."},{"image_url":"https://assets.flip.id/mobile/dpt/gogogo/icons/robux_step_14_new.png","description":"Terakhir, klik Save Changes."}],"title_button":"Lihat Cara Bikin Game Pass"}],"is_inquiry_enabled":true,"is_need_inquiry_type":true,"topup_guideline_title":"Robux 5 Hari via Game Pass","is_hide_tab_categories":true,"create_trx_loading_label":"Mengecek Game Pass-mu","custom_product_item_form":{"title":"Pilih jumlah Robux yang mau dibeli","isHideSubTitle":true},"custom_inquiry_form_label":{"placeholder":"Pastiin username-nya benar ya","after_inquiry":"Roblox Username","before_inquiry":"Masukkan Username Roblox"},"custom_product_card_header":{"badge_text_1":"Jaminan Termurah!","badge_text_2":"100% Aman Pasti Sampai","product_name":"Robux TERMURAH!","product_sub_name":"5 hari via Game Pass","how_to_top_up_label":"Lihat Caranya","is_in_page_guideline":true,"product_sub_name_color":"bg-lime-green ","is_show_how_to_top_up_link_in_desktop":true},"is_hide_multiplication_qty":true,"is_need_product_validation":true,"is_hide_inquiry_form_result":true,"custom_inquiry_error_message":"Usernamenya gak ketemu. Cek lagi dan pastiin benar ya.","custom_inquiry_loading_label":"Mengecek username...","custom_product_item_form_input":{"fields":[{"label":"Jumlah Robux","leftIcon":"https://assets.flip.id/mobile/dpt/gogogo/icons/ic_robux_purchase.png","leftIconStyle":{"width":60,"height":22}},{"label":"Kamu bayar","leftIcon":"https://assets.flip.id/mobile/dpt/gogogo/icons/ic_rp.png","leftIconStyle":{"width":25,"height":15}}],"product_name":"Robux"},"product_item_parent_category_tabs":["Pilihan Cepat","Isi Jumlah Sendiri"]},{"id":"global_instant","name":"Roblox Global Instan","topup_guideline":[{"description":"Pilih Nominal Voucher Roblox yang kamu inginkan"},{"description":"Pilih metode pembayaran yang kamu inginkan"},{"description":"Selesaikan pembayaran"},{"description":"Kode voucher akan segera kamu dapatkan"},{"description":"Buka Roblox.com/redeem di browser kamu"},{"description":"Log in atau buat akun"},{"description":"Temukan PIN lalu masukkan di situs web"},{"description":"Gunakan dana kamu untuk Robux atau subscription Roblox Premium"},{"description":"Buka Roblox.com/upgrades/robux di browser kamu"},{"description":"Beli Robux menggunakan kredit yang tersedia di akunmu"},{"description":"Dapatkan 25% Robux extra secara otomatis dan gunakan Robux untuk pembelian item di dalam game"}],"is_inquiry_enabled":false,"custom_product_card_header":{"badge_text_1":"Jaminan Termurah!","badge_text_2":"100% Aman Pasti Sampai","product_name":"Robux TERMURAH!","product_sub_name":"Global Instan","how_to_top_up_label":"Lihat Caranya","is_in_page_guideline":false,"product_sub_name_color":"bg-golden-yellow","is_show_how_to_top_up_link_in_desktop":false}}],"topup_guideline":[{"description":"Pilih Nominal Voucher Roblox yang kamu inginkan"},{"description":"Pilih metode pembayaran yang kamu inginkan"},{"description":"Selesaikan pembayaran"},{"description":"Kode voucher akan segera kamu dapatkan"},{"description":"Buka Roblox.com/redeem di browser kamu"},{"description":"Log in atau buat akun"},{"description":"Temukan PIN lalu masukkan di situs web"},{"description":"Gunakan dana kamu untuk Robux atau subscription Roblox Premium"},{"description":"Buka Roblox.com/upgrades/robux di browser kamu"},{"description":"Beli Robux menggunakan kredit yang tersedia di akunmu"},{"description":"Dapatkan 25% Robux extra secara otomatis dan gunakan Robux untuk pembelian item di dalam game"}],"topup_description":"","is_inquiry_enabled":false,"check_your_id_guideline":[],"product_item_categories":[{"info":"","category":""}],"product_items_categories":["Roblox Gift Card IDR","Roblox Global-Instan","Roblox Gift Card-US Account Only"]},"high_traffic_mode":false,"blacklist_payment_methods":[]}',
    score: 0,
  },
  {
    id: 'd56dd5fb-1324-4b60-a377-aa83116634ab',
    name: 'MapleStory M',
    image: 'https://dummyjson.com/image/150',
    status: 'non-active',
    highlighted: false,
    region: 'id',
    currency: 'IDR',
    category: 'topup',
    slug: '/topup/maplestory-m-games',
    product_config: '{}',
    score: 0,
  },
  {
    id: 'b9819f7d-10d4-4ec2-83d6-81acd8a47b42',
    name: 'Magic Chess: Go Go',
    image: 'https://dummyjson.com/image/150',
    status: 'active',
    highlighted: false,
    region: 'id',
    currency: 'IDR',
    category: 'topup',
    slug: '/topup/magic-chess-go-go',
    product_config: '{}',
    score: 0,
  },
  {
    id: 'b312d027-e85c-49d4-b96a-6603bce8c74e',
    name: 'PERFECT WORLD',
    image: 'https://dummyjson.com/image/150',
    status: 'non-active',
    highlighted: false,
    region: 'id',
    currency: 'IDR',
    category: 'topup',
    slug: '/topup/perfect-world-games',
    product_config: '{}',
    score: 0,
  },
  {
    id: '6dfab092-6274-43b6-4e2953149d90',
    name: 'OVO',
    image: 'https://dummyjson.com/image/150',
    status: 'active',
    highlighted: false,
    region: 'id',
    currency: 'IDR',
    category: 'e-wallet',
    slug: '/e-wallet/ovo',
    product_config: '{}',
    score: 0,
  },
]

function generateId() {
  return crypto.randomUUID()
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

// Dynamic JSON Form Editor Component
function DynamicJsonEditor({ data, onChange, path = [] }) {
  const updateValue = (key, newValue, currentPath) => {
    const fullPath = [...currentPath, key]
    onChange(fullPath, newValue)
  }

  const renderField = (key, value, currentPath) => {
    const fieldPath = [...currentPath, key]
    const pathString = fieldPath.join('.')

    // Handle different value types
    if (value === null) {
      return (
        <div key={pathString} className="flex items-center gap-3 py-2">
          <label className="text-sm font-medium text-neutral-600 min-w-[120px]">{key}</label>
          <span className="text-sm text-neutral-400 italic">null</span>
        </div>
      )
    }

    if (typeof value === 'boolean') {
      return (
        <div key={pathString} className="flex items-center gap-3 py-2">
          <label className="text-sm font-medium text-neutral-600 min-w-[120px]">{key}</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => updateValue(key, e.target.checked, currentPath)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neutral-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-800"></div>
            <span className="ml-2 text-sm text-neutral-600">{value ? 'true' : 'false'}</span>
          </label>
        </div>
      )
    }

    if (typeof value === 'number') {
      return (
        <div key={pathString} className="flex items-center gap-3 py-2">
          <label className="text-sm font-medium text-neutral-600 min-w-[120px]">{key}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => updateValue(key, Number(e.target.value), currentPath)}
              className="flex-1 px-3 py-1.5 bg-white border border-neutral-300 rounded-md text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
        </div>
      )
    }

    if (typeof value === 'string') {
      const isLongText = value.length > 50 || value.includes('\n')
      return (
        <div key={pathString} className="flex items-start gap-3 py-2">
          <label className="text-sm font-medium text-neutral-600 min-w-[120px] pt-1.5">{key}</label>
          {isLongText ? (
            <textarea
              value={value}
              onChange={(e) => updateValue(key, e.target.value, currentPath)}
              rows={3}
              className="flex-1 px-3 py-1.5 bg-white border border-neutral-300 rounded-md text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all font-mono"
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => updateValue(key, e.target.value, currentPath)}
              className="flex-1 px-3 py-1.5 bg-white border border-neutral-300 rounded-md text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
            />
          )}
        </div>
      )
    }

    if (Array.isArray(value)) {
      return (
        <div key={pathString} className="py-2">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium text-neutral-600">{key}</label>
            <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">Array ({value.length} items)</span>
          </div>
          <div className="ml-4 pl-4 border-l-2 border-neutral-200 space-y-2">
            {value.length === 0 ? (
              <p className="text-sm text-neutral-400 italic py-2">Empty array</p>
            ) : (
              value.map((item, index) => (
                <div key={`${pathString}[${index}]`} className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-neutral-200">
                    <span className="text-xs font-medium text-neutral-500">Item {index + 1}</span>
                  </div>
                  {typeof item === 'object' && item !== null ? (
                    <DynamicJsonEditor
                      data={item}
                      onChange={onChange}
                      path={[...fieldPath, index]}
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(item)}
                      onChange={(e) => updateValue(index, e.target.value, fieldPath)}
                      className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded-md text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )
    }

    if (typeof value === 'object') {
      return (
        <div key={pathString} className="py-2">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium text-neutral-600">{key}</label>
            <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">Object</span>
          </div>
          <div className="ml-4 pl-4 border-l-2 border-neutral-200">
            <DynamicJsonEditor
              data={value}
              onChange={onChange}
              path={fieldPath}
            />
          </div>
        </div>
      )
    }

    return null
  }

  if (!data || typeof data !== 'object') {
    return <p className="text-sm text-neutral-400 italic">No configuration data</p>
  }

  const keys = Object.keys(data)
  if (keys.length === 0) {
    return <p className="text-sm text-neutral-400 italic">Empty configuration</p>
  }

  return (
    <div className="space-y-1">
      {keys.map(key => renderField(key, data[key], path))}
    </div>
  )
}

function GGSProductModal({ isOpen, onClose, onSave, product, mode }) {
  const [activeTab, setActiveTab] = useState('basic')
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    status: 'non-active',
    highlighted: false,
    region: 'id',
    currency: 'IDR',
    category: 'topup',
    slug: '',
    product_config: '{}',
    score: 0,
  })
  const [configData, setConfigData] = useState({})
  const [previewImage, setPreviewImage] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [jsonText, setJsonText] = useState('{}')
  const [jsonError, setJsonError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setActiveTab('basic')
      setAdvancedMode(false)
      setJsonError('')
      if (mode === 'edit' && product) {
        setFormData({
          name: product.name,
          image: product.image,
          status: product.status,
          highlighted: product.highlighted,
          region: product.region,
          currency: product.currency,
          category: product.category,
          slug: product.slug,
          product_config: product.product_config,
          score: product.score,
        })
        setPreviewImage(product.image)
        try {
          const parsed = JSON.parse(product.product_config || '{}')
          setConfigData(parsed)
          setJsonText(JSON.stringify(parsed, null, 2))
        } catch {
          setConfigData({})
          setJsonText('{}')
        }
      } else {
        setFormData({
          name: '',
          image: '',
          status: 'non-active',
          highlighted: false,
          region: 'id',
          currency: 'IDR',
          category: 'topup',
          slug: '',
          product_config: '{}',
          score: 0,
        })
        setPreviewImage('')
        setConfigData({})
        setJsonText('{}')
      }
    }
  }, [isOpen, product, mode])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'score' ? Number(value) : value)
    }))
  }

  const handleConfigChange = (path, newValue) => {
    setConfigData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)) // Deep clone
      let current = newData
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]]
      }
      current[path[path.length - 1]] = newValue
      return newData
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result
        setFormData(prev => ({ ...prev, image: base64 }))
        setPreviewImage(base64)
      }
      reader.readAsDataURL(file)
    }
  }

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
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result
        setFormData(prev => ({ ...prev, image: base64 }))
        setPreviewImage(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }))
    setPreviewImage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let finalConfig
    if (advancedMode) {
      try {
        // Validate and use the JSON text
        JSON.parse(jsonText)
        finalConfig = jsonText
      } catch {
        setJsonError('Invalid JSON. Please fix before saving.')
        return
      }
    } else {
      finalConfig = JSON.stringify(configData)
    }
    const finalData = {
      ...formData,
      product_config: finalConfig
    }
    onSave(finalData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 overflow-hidden border border-neutral-200 max-h-[90vh] flex flex-col">
        <div className="bg-neutral-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-100">
            {mode === 'create' ? 'Create GGS Product' : 'Edit GGS Product'}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 bg-neutral-50">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'basic'
                ? 'text-neutral-800 bg-white'
                : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            Basic Information
            {activeTab === 'basic' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-800" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'config'
                ? 'text-neutral-800 bg-white'
                : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            Product Config
            {activeTab === 'config' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-800" />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="p-6 space-y-5 bg-white">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name..."
                  required
                  className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Image</label>
                
                {previewImage ? (
                  <div className="relative inline-block">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border border-neutral-200"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <p className="text-xs text-neutral-500 mt-2">Click × to remove and upload a new image</p>
                  </div>
                ) : (
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                      isDragging 
                        ? 'border-neutral-500 bg-neutral-100' 
                        : 'border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-neutral-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium text-neutral-700">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                  >
                    <option value="non-active">non-active</option>
                    <option value="active">active</option>
                  </select>
                </div>

                {/* Highlighted */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Highlighted</label>
                  <div className="flex items-center h-[42px]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="highlighted"
                        checked={formData.highlighted}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neutral-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-800"></div>
                      <span className="ml-3 text-sm text-neutral-600">{formData.highlighted ? 'Yes' : 'No'}</span>
                    </label>
                  </div>
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
                    placeholder="e.g., id"
                    className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                  />
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                  >
                    <option value="IDR">IDR</option>
                    <option value="USD">USD</option>
                    <option value="MYR">MYR</option>
                    <option value="SGD">SGD</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                  >
                    <option value="topup">topup</option>
                    <option value="voucher">voucher</option>
                    <option value="e-wallet">e-wallet</option>
                  </select>
                </div>

                {/* Score */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Score</label>
                  <input
                    type="number"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                  />
                </div>
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e.g., /topup/game-name"
                  className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-md text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-all"
                />
              </div>
            </div>
          )}

          {/* Product Config Tab */}
          {activeTab === 'config' && (
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-700 mb-1">Product Configuration</h3>
                  <p className="text-xs text-neutral-500">
                    {advancedMode 
                      ? 'Edit the raw JSON directly. Make sure the JSON is valid before saving.'
                      : 'Edit the configuration values below. The form is dynamically generated based on the JSON structure.'
                    }
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600">Advanced Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advancedMode}
                      onChange={(e) => {
                        if (e.target.checked) {
                          // Switching to advanced mode - sync configData to JSON string
                          setJsonText(JSON.stringify(configData, null, 2))
                          setJsonError('')
                        } else {
                          // Switching from advanced mode - try to parse JSON
                          try {
                            const parsed = JSON.parse(jsonText)
                            setConfigData(parsed)
                            setJsonError('')
                          } catch (err) {
                            setJsonError('Invalid JSON. Please fix before switching modes.')
                            return
                          }
                        }
                        setAdvancedMode(e.target.checked)
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neutral-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-800"></div>
                  </label>
                </div>
              </div>
              
              {advancedMode ? (
                <div className="space-y-2">
                  {jsonError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                      {jsonError}
                    </div>
                  )}
                  <textarea
                    value={jsonText}
                    onChange={(e) => {
                      setJsonText(e.target.value)
                      try {
                        JSON.parse(e.target.value)
                        setJsonError('')
                      } catch {
                        setJsonError('Invalid JSON syntax')
                      }
                    }}
                    className="w-full h-[500px] px-4 py-3 bg-white border border-neutral-300 rounded-md text-sm font-mono text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400"
                    spellCheck={false}
                  />
                </div>
              ) : (
                <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-4">
                  <DynamicJsonEditor
                    data={configData}
                    onChange={handleConfigChange}
                    path={[]}
                  />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="p-6 bg-white border-t border-neutral-200">
            <div className="flex gap-3">
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
          <h3 className="text-lg font-semibold text-neutral-800 text-center mb-2">Delete GGS Product</h3>
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
    ? '/templates/ggs-product-bulk-upload-template.xlsx' 
    : '/templates/ggs-product-bulk-edit-template.xlsx'

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-neutral-200">
        <div className="bg-neutral-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-100">
            {type === 'upload' ? 'Bulk Upload GGS Products' : 'Bulk Edit GGS Products'}
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

function GGSProduct() {
  const [products, setProducts] = useState(initialGGSProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingProduct, setDeletingProduct] = useState(null)
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false)
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false)

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ field: 'name', direction: 'asc' })

  // Filter state
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    status: '',
    category: '',
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
    setFilters({ id: '', name: '', status: '', category: '' })
  }

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Apply filters
    if (filters.id) {
      result = result.filter(p => p.id.toLowerCase().includes(filters.id.toLowerCase()))
    }
    if (filters.name) {
      result = result.filter(p => p.name.toLowerCase().includes(filters.name.toLowerCase()))
    }
    if (filters.status) {
      result = result.filter(p => p.status === filters.status)
    }
    if (filters.category) {
      result = result.filter(p => p.category === filters.category)
    }

    // Apply sorting
    if (sortConfig.field) {
      result.sort((a, b) => {
        let aVal = a[sortConfig.field]
        let bVal = b[sortConfig.field]

        if (sortConfig.field === 'score') {
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

  const openDeleteModal = (product) => {
    setDeletingProduct(product)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeletingProduct(null)
  }

  const handleDelete = () => {
    setProducts(prev => prev.filter(p => p.id !== deletingProduct.id))
    closeDeleteModal()
  }

  const handleSave = (formData) => {
    if (modalMode === 'create') {
      const newProduct = {
        id: generateId(),
        ...formData,
      }
      setProducts(prev => [newProduct, ...prev])
    } else {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData }
          : p
      ))
    }
    closeModal()
  }

  const handleBulkUpload = (file) => {
    console.log('Bulk upload file:', file.name)
    alert(`File "${file.name}" uploaded successfully! In a real app, this would process the file and create GGS products.`)
  }

  const handleBulkEdit = (file) => {
    console.log('Bulk edit file:', file.name)
    alert(`File "${file.name}" uploaded successfully! In a real app, this would process the file and update GGS products.`)
  }

  const hasActiveFilters = filters.id || filters.name || filters.status || filters.category

  // Get unique categories for filter dropdown
  const categories = [...new Set(products.map(p => p.category))]

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-neutral-500 hover:text-neutral-800 transition-colors">
              ← Back
            </Link>
            <h1 className="text-xl font-semibold text-neutral-800">GGS Product / Game</h1>
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
              Create GGS Product
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
                  <SortableHeader label="name" field="name" sortConfig={sortConfig} onSort={handleSort} />
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">image</th>
                  <SortableHeader label="status" field="status" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="highlighted" field="highlighted" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="region" field="region" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="currency" field="currency" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="category" field="category" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="slug" field="slug" sortConfig={sortConfig} onSort={handleSort} />
                  <SortableHeader label="score" field="score" sortConfig={sortConfig} onSort={handleSort} align="right" />
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-4 py-8 text-center text-neutral-500">
                      No GGS products found matching your filters.
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
                          <Link
                            to={`/ggs-item?product_id=${product.id}`}
                            className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
                          >
                            Items
                          </Link>
                          <button
                            onClick={() => openEditModal(product)}
                            className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 rounded border border-neutral-300 hover:bg-neutral-200 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(product)}
                            className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded border border-red-200 hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-neutral-600 font-mono text-xs max-w-[150px] truncate" title={product.id}>{product.id}</td>
                      <td className="px-4 py-3 text-neutral-700 font-medium">{product.name}</td>
                      <td className="px-4 py-3">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded border border-neutral-200"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div 
                          className="w-10 h-10 bg-neutral-100 rounded border border-neutral-200 items-center justify-center text-neutral-400"
                          style={{ display: product.image ? 'none' : 'flex' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
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
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          product.highlighted 
                            ? 'text-blue-700 bg-blue-50' 
                            : 'text-neutral-600 bg-neutral-100'
                        }`}>
                          {product.highlighted ? 'true' : 'false'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-600">{product.region}</td>
                      <td className="px-4 py-3 text-neutral-600">{product.currency}</td>
                      <td className="px-4 py-3 text-neutral-600">{product.category}</td>
                      <td className="px-4 py-3 text-neutral-600 font-mono text-xs max-w-[200px] truncate" title={product.slug}>{product.slug}</td>
                      <td className="px-4 py-3 text-right text-neutral-800 tabular-nums">{product.score}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Results count */}
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
            Showing {filteredAndSortedProducts.length} of {products.length} GGS products
          </div>
        </div>
      </div>

      {/* Modal */}
      <GGSProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        product={editingProduct}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemName={deletingProduct?.name}
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

export default GGSProduct
