'use client'

import { useState, useEffect } from 'react'
import { products, categoryInfo, getAllProducts } from './data/products'

// Category icons (Shopee style)
const categoryIcons = [
  { id: 'skincare', icon: '🧴', name: 'Skincare' },
  { id: 'makeup', icon: '💄', name: 'Makeup' },
  { id: 'parfum', icon: '🌸', name: 'Parfum' },
  { id: 'haircare', icon: '💇', name: 'Haircare' },
]

// Flash sale items
const flashSaleItems = [
  products.skincare.moisturizer[5], // Azarine Sunscreen
  products.skincare.moisturizer[8], // SKINTIFIC Mugwort
  products.makeup.liptint[6], // Luxcrime Blush Cushion
  products.parfum.unisex[7], // AL Rehab Choco Musk
  products.haircare.haircare[9], // Ellips Hair Vitamin
  products.skincare.moisturizer[0],
  products.makeup.liptint[0],
  products.parfum.unisex[0],
]

// Product Card (Shopee style)
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

// Flash Sale Section
function FlashSaleSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 })
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  
  const pad = (n) => String(n).padStart(2, '0')
  
  return (
    <section className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-shopee-orange flex items-center gap-1">
              <span className="flash-pulse">⚡</span> FLASH SALE
            </span>
            <span className="text-xs text-gray-400">Berakhir dalam:</span>
            <div className="flex items-center gap-0.5">
              <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">{pad(timeLeft.hours)}</span>
              <span className="text-red-500 font-bold">:</span>
              <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">{pad(timeLeft.minutes)}</span>
              <span className="text-red-500 font-bold">:</span>
              <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">{pad(timeLeft.seconds)}</span>
            </div>
          </div>
          <span className="text-shopee-orange text-xs cursor-pointer hover:underline">Lihat Semua →</span>
        </div>
        
        <div className="flex overflow-x-auto gap-3 py-3 scrollbar-hide">
          {flashSaleItems.map((product, idx) => (
            <div key={idx} className="flex-shrink-0 w-32">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Category Icons Section
function CategoryIconsSection() {
  return (
    <section className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-6 py-4 scrollbar-hide">
          {categoryIcons.map((cat) => (
            <a key={cat.id} href={`/${cat.id}`} className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-2xl hover:bg-orange-100 transition-colors border border-orange-100 cursor-pointer">
                {cat.icon}
              </div>
              <span className="text-[11px] text-gray-600 text-center">{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('rekomendasi')
  const [searchQuery, setSearchQuery] = useState('')
  
  const allProducts = getAllProducts()
  
  const baseProducts = activeCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.mainCategory === activeCategory)
  
  const filteredProducts = searchQuery
    ? baseProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : baseProducts
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (activeTab === 'terlaris') return parseInt(b.sold) - parseInt(a.sold)
    if (activeTab === 'terbaru') return b.id - a.id
    return b.rating - a.rating
  })
  
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
                  placeholder="Cari skincare, makeup, parfum favoritmu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              <span className="hidden md:flex flex-col items-center cursor-pointer">
                <span className="text-lg">👤</span>
                <span className="text-[9px]">Akun</span>
              </span>
            </div>
          </div>
        </div>
      </header>
      
      {/* BANNER */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-wider mb-1" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
              JAGONYA SHOPEE, JAGONYA BELANJA! 🧡
            </h1>
            <p className="text-xs text-white/80">Diskon s/d 80% • Gratis Ongkir • COD Tersedia</p>
          </div>
        </div>
      </div>
      
      {/* CATEGORY ICONS */}
      <CategoryIconsSection />
      
      {/* FLASH SALE */}
      <FlashSaleSection />
      
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="bg-white rounded-sm shadow-sm sticky top-20 overflow-hidden">
              <div className="bg-shopee-orange text-white px-4 py-2.5 font-bold text-sm">
                📂 Kategori
              </div>
              <nav className="py-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                    activeCategory === 'all' ? 'bg-orange-50 text-shopee-orange font-medium border-l-2 border-shopee-orange' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>🏷️</span><span>Semua</span>
                </button>
                {categoryIcons.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                      activeCategory === cat.id ? 'bg-orange-50 text-shopee-orange font-medium border-l-2 border-shopee-orange' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat.icon}</span><span>{cat.name}</span>
                  </button>
                ))}
              </nav>
              <div className="mx-3 mb-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-sm p-3 border border-orange-100">
                <p className="text-[11px] font-bold text-shopee-orange mb-1">🎁 GRATIS ONGKIR</p>
                <p className="text-[10px] text-gray-500">Minimal belanja Rp50.000</p>
              </div>
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
      
      {/* WHY SHOP */}
      <section className="bg-white border-t border-b mt-4">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">Kenapa Belanja di Jagonya Shopee?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🚚</div>
              <h3 className="font-bold text-gray-800 text-sm">Gratis Ongkir</h3>
              <p className="text-[11px] text-gray-500 mt-1">Promo setiap hari</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">✅</div>
              <h3 className="font-bold text-gray-800 text-sm">Produk Original</h3>
              <p className="text-[11px] text-gray-500 mt-1">100% asli</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">💰</div>
              <h3 className="font-bold text-gray-800 text-sm">Harga Terbaik</h3>
              <p className="text-[11px] text-gray-500 mt-1">Termurah dijamin</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🔄</div>
              <h3 className="font-bold text-gray-800 text-sm">Garansi 7 Hari</h3>
              <p className="text-[11px] text-gray-500 mt-1">Mudah dikembalikan</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-shopee-darkOrange text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <img src="/jagonya-shopee-logo.png" alt="Jagonya Shopee" className="h-10 rounded mb-3" style={{mixBlendMode: "screen"}} />
              <p className="text-xs text-orange-200">Rekomendasi Produk Terbaik</p>
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
              <h4 className="font-bold text-sm mb-3">Kebijakan</h4>
              <ul className="space-y-2 text-xs text-orange-200">
                <li>Kebijakan Pengembalian</li>
                <li>Kebijakan Privasi</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Ikuti Kami</h4>
              <p className="text-xs text-orange-200 mb-2">Follow kami untuk update!</p>
              <p className="text-sm font-medium">📱 @jagonya_shopee</p>
            </div>
          </div>
          <div className="border-t border-orange-600 mt-6 pt-6 text-center">
            <p className="text-[11px] text-orange-300">© 2026 Jagonya Shopee. Semua hak dilindungi. 🧡</p>
          </div>
        </div>
      </footer>
      
      {/* SCHEMA MARKUP - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Jagonya Shopee",
            "url": "https://jagonya.my.id",
            "description": "Rekomendasi produk skincare, makeup, parfum & haircare terbaik dari Shopee",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://jagonya.my.id/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </main>
  )
}
