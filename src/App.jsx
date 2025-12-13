import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Hello LPT Team</h1>
        <div className="flex flex-col gap-4">
          <Link 
            to="/biller-product" 
            className="px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700"
          >
            View Biller Products
          </Link>
          <Link 
            to="/product" 
            className="px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700"
          >
            View Products
          </Link>
          <Link 
            to="/client-product" 
            className="px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700"
          >
            View Client Products
          </Link>
          <Link 
            to="/product-category" 
            className="px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700"
          >
            View Product Categories
          </Link>
          <Link 
            to="/product-brand" 
            className="px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700"
          >
            View Product Brands
          </Link>
          <Link 
            to="/ggs-product" 
            className="px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700"
          >
            View GGS Products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default App
