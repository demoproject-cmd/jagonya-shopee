'use client'

import { useState } from 'react'
import { products, categoryInfo, subcategoryInfo } from '../data/products'

// Product Card component (same as main page)
function ProductCard({ product }) {
  const priceNum = parseInt(product.price.replace(/[^0-9]/g, ''))
  const originalPrice = Math.round(priceNum * 100 / (100 - product.discount))
  
  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="product-card bg-white rounded-sm overflow-hidden block border border-gray-100 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        <span className="absolute top-0 left-0 bg-shopee-orange text-white text-[10px] px-1.5 py-0.5 font-bold">
          {product.discount}% OFF
        </span>
        <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-1.5 py-0.5 font-bold flash-pulse">
          ⚡
        </span>
      </div>
      
      <div className="p-2">
        <h3 className="text-xs text-gray-700 line-clamp-2 min-h-[32px] leading-tight">
          {product.name}
        </h3>
        
        <div className="mt-2">
          <span className="text-shopee-orange font-bold text-sm">Rp{priceNum.toLocaleString('id-ID')}</span>
          <span className="text-gray-400 text-[10px] line-through ml-1">Rp{originalPrice.toLocaleString('id-ID')}</span>
        </div>
        
        <div className="mt-1.5 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-orange-400' : 'text-gray-300'}>★</span>
            ))}
            <span className="text-gray-400 ml-0.5">{product.rating}</span>
          </div>
          <span className="text-gray-400">Terjual {product.sold}</span>
        </div>
      </div>
    </a>
  )
}

export default function CategoryPage({ params }) {
  const { category } = params
  const [activeTab, setActiveTab] = useState('rekomendasi')
  const [activeSubcategory, setActiveSubcategory] = useState('all')
  
  const info = categoryInfo[category]
  if (!info) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl">🔍</span>
          <p className="text-lg text-gray-500 mt-4">Kategori tidak ditemukan</p>
          <a href="/" className="text-shopee-orange hover:underline mt-4 inline-block">← Kembali ke Beranda</a>
        </div>
      </div>
    )
  }
  
  // Get subcategories for this category
  const subcats = Object.keys(products[category] || {})
  
  // Get products
  const getProducts = () => {
    if (activeSubcategory === 'all') {
      const all = []
      Object.entries(products[category] || {}).forEach(([sub, items]) => {
        items.forEach(item => all.push({ ...item, subCategory: sub }))
      })
      return all
    }
    return (products[category]?.[activeSubcategory] || []).map(item => ({ ...item, subCategory: activeSubcategory }))
  }
  
  const baseProducts = getProducts()
  
  const sortedProducts = [...baseProducts].sort((a, b) => {
    if (activeTab === 'terlaris') return parseInt(b.sold) - parseInt(a.sold)
    if (activeTab === 'terbaru') return b.id - a.id
    return b.rating - a.rating
  })
  
  // Generate JSON-LD for this category
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${info.name} - Rekomendasi Produk Terbaik | Jagonya My ID`,
    "description": info.description,
    "url": `https://jagonya.my.id/${category}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": sortedProducts.length,
      "itemListElement": sortedProducts.slice(0, 10).map((product, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "image": `https://jagonya.my.id${product.img}`,
          "offers": {
            "@type": "Offer",
            "price": product.price.replace(/[^0-9]/g, ''),
            "priceCurrency": "IDR"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "bestRating": 5
          }
        }
      }))
    }
  }
  
  return (
    <main className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-shopee-orange sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 h-14">
            <a href="/" className="flex-shrink-0">
              <img src="/jagonya-shopee-logo.png" alt="Jagonya Shopee" className="h-9 rounded" style={{mixBlendMode: "screen"}} />
            </a>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative flex">
                <input
                  type="text"
                  placeholder={`Cari ${info.name.toLowerCase()}...`}
                  className="w-full px-4 py-2 rounded-l-sm text-sm focus:outline-none bg-white"
                />
                <button className="bg-shopee-darkOrange hover:bg-red-600 px-5 rounded-r-sm text-white font-medium text-sm">
                  🔍
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-white">
              <span className="hidden md:flex flex-col items-center cursor-pointer">
                <span className="text-lg">🛒</span>
                <span className="text-[9px]">Keranjang</span>
              </span>
            </div>
          </div>
        </div>
      </header>
      
      {/* BREADCRUMB */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-500">
            <a href="/" className="hover:text-shopee-orange">Beranda</a>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{info.name}</span>
          </nav>
        </div>
      </div>
      
      {/* CATEGORY HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-4xl">{info.icon}</span>
            {info.name}
          </h1>
          <p className="text-gray-500 text-sm mt-2">{info.description}</p>
        </div>
      </div>
      
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="bg-white rounded-sm shadow-sm sticky top-20 overflow-hidden">
              <div className="bg-shopee-orange text-white px-4 py-2.5 font-bold text-sm">
                📂 Sub Kategori
              </div>
              <nav className="py-2">
                <button
                  onClick={() => setActiveSubcategory('all')}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                    activeSubcategory === 'all' ? 'bg-orange-50 text-shopee-orange font-medium border-l-2 border-shopee-orange' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>🏷️</span><span>Semua</span>
                </button>
                {subcats.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubcategory(sub)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      activeSubcategory === sub ? 'bg-orange-50 text-shopee-orange font-medium border-l-2 border-shopee-orange' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {subcategoryInfo[sub]?.name || sub}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
          
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="bg-white rounded-sm shadow-sm mb-4">
              <div className="flex border-b border-gray-100">
                {[
                  { id: 'rekomendasi', label: 'Rekomendasi' },
                  { id: 'terlaris', label: 'Terlaris' },
                  { id: 'terbaru', label: 'Terbaru' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                      activeTab === tab.id ? 'text-shopee-orange' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-shopee-orange" />}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {sortedProducts.map((product) => (
                <ProductCard key={`${product.subCategory}-${product.id}`} product={product} />
              ))}
            </div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-sm">
                <span className="text-6xl">🔍</span>
                <p className="text-lg text-gray-500 mt-4">Produk tidak ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* FOOTER */}
      <footer className="bg-shopee-darkOrange text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <img src="/jagonya-shopee-logo.png" alt="Jagonya Shopee" className="h-10 rounded mb-3" style={{mixBlendMode: "screen"}} />
              <p className="text-xs text-orange-200">Rekomendasi Produk Terbaik</p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Kategori</h4>
              <ul className="space-y-2 text-xs text-orange-200">
                <li><a href="/skincare" className="hover:text-white">Skincare</a></li>
                <li><a href="/makeup" className="hover:text-white">Makeup</a></li>
                <li><a href="/parfum" className="hover:text-white">Parfum</a></li>
                <li><a href="/haircare" className="hover:text-white">Haircare</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Bantuan</h4>
              <ul className="space-y-2 text-xs text-orange-200">
                <li>Hubungi Kami</li>
                <li>Cara Belanja</li>
                <li>Cara Pembayaran</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Ikuti Kami</h4>
              <p className="text-sm font-medium">📱 @jagonya_shopee</p>
            </div>
          </div>
          <div className="border-t border-orange-600 mt-6 pt-6 text-center">
            <p className="text-[11px] text-orange-300">© 2026 Jagonya Shopee. Semua hak dilindungi. 🧡</p>
          </div>
        </div>
      </footer>
      
      {/* SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
