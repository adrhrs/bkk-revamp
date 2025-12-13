import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import BillerProduct from './pages/BillerProduct'
import Product from './pages/Product'
import ProductCategory from './pages/ProductCategory'
import ProductBrand from './pages/ProductBrand'
import ProductRouting from './pages/ProductRouting'
import ClientProduct from './pages/ClientProduct'
import GGSProduct from './pages/GGSProduct'
import GGSItem from './pages/GGSItem'
import GGSItemRouting from './pages/GGSItemRouting'
import './index.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/biller-product" element={<BillerProduct />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-category" element={<ProductCategory />} />
        <Route path="/product-brand" element={<ProductBrand />} />
        <Route path="/product-routing" element={<ProductRouting />} />
        <Route path="/client-product" element={<ClientProduct />} />
        <Route path="/ggs-product" element={<GGSProduct />} />
        <Route path="/ggs-item" element={<GGSItem />} />
        <Route path="/ggs-item-routing" element={<GGSItemRouting />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
