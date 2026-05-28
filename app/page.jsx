'use client'

import { useState, useEffect } from 'react'

// Real Shopee product names (extracted via og:title)
const products = {
  skincare: {
    moisturizer: [
      { id: 1, name: "HA PRO Niacinamide & Alpha Arbutin Glowing Moisturizer", link: "https://s.shopee.co.id/9Kf8dWRnV1", price: "Rp45.000", rating: 4.8, sold: "2.3rb", img: "/products/moisturizer.jpg", discount: 20 },
      { id: 2, name: "SKINTIFIC 5X Ceramide Barrier Moisturizer", link: "https://s.shopee.co.id/4LGSge9GGN", price: "Rp52.000", rating: 4.9, sold: "1.8rb", img: "/products/moisturizer-serum.jpg", discount: 25 },
      { id: 3, name: "FYNE Bright Barrier+ Moisturizer Pria 30gr", link: "https://s.shopee.co.id/40dcI3evMO", price: "Rp38.000", rating: 4.7, sold: "3.1rb", img: "/products/moisturizer-glow-up.jpg", discount: 15 },
      { id: 4, name: "ACNENO Paket Acne Bebas Jerawat dan Bruntusan", link: "https://s.shopee.co.id/20sXuPAkFf", price: "Rp42.000", rating: 4.8, sold: "2.5rb", img: "/products/moisturizer-cica.jpg", discount: 30 },
      { id: 5, name: "BROMEN Brightening Simpel Booster", link: "https://s.shopee.co.id/8fPRqgStF6", price: "Rp55.000", rating: 4.9, sold: "1.9rb", img: "/products/moisturizer-niacinamide.jpg", discount: 18 },
    ],
    retinol: [
      { id: 1, name: "SOMETHINC Level 1% Encapsulated Retinol Serum", link: "https://s.shopee.co.id/gNAK2DfDD", price: "Rp68.000", rating: 4.7, sold: "1.2rb", img: "/products/retinol.jpg", discount: 22 },
      { id: 2, name: "Erto's Serum Pori-Pori Mengencangkan Kulit", link: "https://s.shopee.co.id/3B4VIiTQ15", price: "Rp75.000", rating: 4.8, sold: "890", img: "/products/retinol-night.jpg", discount: 15 },
      { id: 3, name: "HA PRO Special Bundle 2 in 1 Glow Series", link: "https://s.shopee.co.id/7pqKrK7PLf", price: "Rp82.000", rating: 4.6, sold: "650", img: "/products/retinol-peptide.jpg", discount: 28 },
      { id: 4, name: "Hanasui Power Retinol Expert Serum 20ml", link: "https://s.shopee.co.id/AUr62F44R7", price: "Rp95.000", rating: 4.9, sold: "420", img: "/products/retinol-concentrate.jpg", discount: 35 },
      { id: 5, name: "SKINTIFIC Retinol 2pcs Set Skin Renewal", link: "https://s.shopee.co.id/3VhLhOclq2", price: "Rp78.000", rating: 4.7, sold: "580", img: "/products/retinol-renewal.jpg", discount: 20 },
    ],
    sunscreen: [
      { id: 1, name: "Kahf Bright Fresh Sunscreen Serum SPF 50 PA++++", link: "https://s.shopee.co.id/7VDUSr3jdc", price: "Rp35.000", rating: 4.9, sold: "5.2rb", img: "/products/sunscreen.jpg", discount: 25 },
      { id: 2, name: "Hanasui Collagen Water Sunscreen SPF 50", link: "https://s.shopee.co.id/2VooVgQHgX", price: "Rp42.000", rating: 4.8, sold: "4.1rb", img: "/products/sunscreen-gel.jpg", discount: 30 },
      { id: 3, name: "Ultra Light Daily Sunscreen SPF 50+ PA++++", link: "https://s.shopee.co.id/3qKC69PPVI", price: "Rp48.000", rating: 4.7, sold: "3.5rb", img: "/products/sunscreen-tinted.jpg", discount: 18 },
      { id: 4, name: "SKINTIFIC 5X Ceramide Serum Sunscreen SPF 50+", link: "https://s.shopee.co.id/AAEFdoK4lw", price: "Rp52.000", rating: 4.8, sold: "2.8rb", img: "/products/sunscreen-watery.jpg", discount: 22 },
      { id: 5, name: "Hanasui Ceramide Probiotics Moisturizer Gel", link: "https://s.shopee.co.id/4Ax2UoIOOt", price: "Rp45.000", rating: 4.6, sold: "1.9rb", img: "/products/sunscreen-matte.jpg", discount: 15 },
    ],
    acne: [
      { id: 1, name: "Hanasui Acne Expert Series Mengurangi Jerawat", link: "https://s.shopee.co.id/2LVOJVNtSF", price: "Rp58.000", rating: 4.8, sold: "2.1rb", img: "/products/acne-serum.jpg", discount: 20 },
      { id: 2, name: "ACNENO Paket Acne Bebas Jerawat dan Bruntusan", link: "https://s.shopee.co.id/6L1X4sIi9N", price: "Rp32.000", rating: 4.7, sold: "3.8rb", img: "/products/acne-spot.jpg", discount: 35 },
      { id: 3, name: "dr Ertos Acne Expert Night Cream", link: "https://s.shopee.co.id/4qCjI8ZI9i", price: "Rp45.000", rating: 4.6, sold: "2.9rb", img: "/products/acne-cleanser.jpg", discount: 25 },
      { id: 4, name: "BREYLEE Tea Tree Acne Gel Perawatan Jerawat", link: "https://s.shopee.co.id/7VDUT3cU8z", price: "Rp28.000", rating: 4.5, sold: "4.2rb", img: "/products/acne-cream.jpg", discount: 40 },
      { id: 5, name: "THE FACE Temulawak Acne Package", link: "https://s.shopee.co.id/9UyYqkpus0", price: "Rp25.000", rating: 4.9, sold: "6.5rb", img: "/products/acne-patch.jpg", discount: 30 },
    ],
  },
  makeup: {
    liptint: [
      { id: 1, name: "IMPLORA Glossy Plumpy Jelly Tint", link: "https://s.shopee.co.id/1qZ7il8dSi", price: "Rp18.000", rating: 4.8, sold: "8.5rb", img: "/products/liptint.jpg", discount: 25 },
      { id: 2, name: "CINDYNAL Matte Lipstick Capsule 10 Warna", link: "https://s.shopee.co.id/20sXv5Bn6D", price: "Rp22.000", rating: 4.7, sold: "6.2rb", img: "/products/liptint-matte.jpg", discount: 30 },
      { id: 3, name: "True to Skin Juicy Glass Melting Balm", link: "https://s.shopee.co.id/2BBy7PS4ma", price: "Rp15.000", rating: 4.9, sold: "9.1rb", img: "/products/liptint-water.jpg", discount: 20 },
      { id: 4, name: "BIOAQUA Liptint Fantastic Me Glossy", link: "https://s.shopee.co.id/AKXfqR6xks", price: "Rp25.000", rating: 4.6, sold: "4.8rb", img: "/products/liptint-glowing.jpg", discount: 35 },
      { id: 5, name: "Implora Jelly Tint with Omega & Vit E", link: "https://s.shopee.co.id/17TXTQemW", price: "Rp28.000", rating: 4.8, sold: "3.2rb", img: "/products/liptint-velvet.jpg", discount: 18 },
    ],
    cushion: [
      { id: 1, name: "SKINTIFIC Perfect Stay Serum Matte Cushion SPF 50", link: "https://s.shopee.co.id/40dcIuF2xG", price: "Rp65.000", rating: 4.7, sold: "4.5rb", img: "/products/cushion.jpg", discount: 22 },
      { id: 2, name: "SKINTIFIC Perfect Stay Velvet Matte Cushion Mini", link: "https://s.shopee.co.id/3qKC6cHxSv", price: "Rp72.000", rating: 4.8, sold: "3.8rb", img: "/products/cushion-matte.jpg", discount: 28 },
      { id: 3, name: "BIOAQUA Hydrating Air Cushion BB Cream", link: "https://s.shopee.co.id/3LNvViSG09", price: "Rp78.000", rating: 4.9, sold: "2.1rb", img: "/products/cushion-glow.jpg", discount: 15 },
      { id: 4, name: "Skintific Cover All Perfect Air Cushion", link: "https://s.shopee.co.id/AAEFeI1dIy", price: "Rp55.000", rating: 4.6, sold: "5.2rb", img: "/products/cushion-bb.jpg", discount: 35 },
      { id: 5, name: "GMEELAN 2 in 1 Perfect Cover Cushion Foundation", link: "https://s.shopee.co.id/40dcIykuTD", price: "Rp85.000", rating: 4.8, sold: "1.9rb", img: "/products/cushion-foundation.jpg", discount: 20 },
    ],
    settingspray: [
      { id: 1, name: "Pramy Setting Spray Matte/Dewy", link: "https://s.shopee.co.id/8fPRrbt5Rk", price: "Rp42.000", rating: 4.8, sold: "5.8rb", img: "/products/setting-spray.jpg", discount: 25 },
      { id: 2, name: "O.TWO.O Makeup Setting Spray Long-lasting", link: "https://s.shopee.co.id/5q5GUQ7asu", price: "Rp38.000", rating: 4.7, sold: "4.2rb", img: "/products/setting-spray-matte.jpg", discount: 30 },
      { id: 3, name: "DAZZLE ME Get a Grip! Setting Spray Dewy Fix", link: "https://s.shopee.co.id/3qKC6lRevx", price: "Rp45.000", rating: 4.9, sold: "3.5rb", img: "/products/setting-spray-dewy.jpg", discount: 22 },
      { id: 4, name: "Hanasui Next Level Matte/Glow Lock Setting Spray", link: "https://s.shopee.co.id/3LNvVrUOcl", price: "Rp48.000", rating: 4.6, sold: "2.8rb", img: "/products/setting-spray-long.jpg", discount: 18 },
      { id: 5, name: "SKINTIFIC Lock The Look Setting Spray", link: "https://s.shopee.co.id/9zupS8CAtp", price: "Rp52.000", rating: 4.7, sold: "1.9rb", img: "/products/setting-spray-primer.jpg", discount: 28 },
    ],
  },
  parfum: {
    unisex: [
      { id: 1, name: "Fabric Mist Parfum Tahan Lama", link: "https://s.shopee.co.id/2VooWV5Xsd", price: "Rp89.000", rating: 4.8, sold: "3.2rb", img: "/products/parfum.jpg", discount: 30 },
      { id: 2, name: "BRASOV Parfum Female Pearl EDP 35ML", link: "https://s.shopee.co.id/7pqKsJuFwG", price: "Rp75.000", rating: 4.7, sold: "2.8rb", img: "/products/parfum-cologne.jpg", discount: 22 },
      { id: 3, name: "NCO Vanilla Orchid EDP Parfum Wanita", link: "https://s.shopee.co.id/9Kf8f6BW0R", price: "Rp95.000", rating: 4.9, sold: "1.5rb", img: "/products/parfum-woody.jpg", discount: 25 },
      { id: 4, name: "Perfume Black Edition Bundle 3in1", link: "https://s.shopee.co.id/1100jnfWtj", price: "Rp68.000", rating: 4.6, sold: "2.1rb", img: "/products/parfum-citrus.jpg", discount: 35 },
      { id: 5, name: "Morris Triple Perfume Set Red Gold Silver EDP", link: "https://s.shopee.co.id/4Ax2VdfvSD", price: "Rp82.000", rating: 4.8, sold: "1.8rb", img: "/products/parfum-musk.jpg", discount: 20 },
    ],
    bodymist: [
      { id: 1, name: "SLAVINA Body Mist by Nagita", link: "https://s.shopee.co.id/1VwHKnSFzI", price: "Rp35.000", rating: 4.7, sold: "4.5rb", img: "/products/bodymist.jpg", discount: 28 },
      { id: 2, name: "Firda Parfume Body Mist Grapefruit 100ML", link: "https://s.shopee.co.id/AAEFek5Rk0", price: "Rp32.000", rating: 4.8, sold: "3.8rb", img: "/products/bodymist-fruity.jpg", discount: 22 },
      { id: 3, name: "ALETIA Fragrance Mist 100ml", link: "https://s.shopee.co.id/6feNUKrZ3e", price: "Rp38.000", rating: 4.6, sold: "2.9rb", img: "/products/bodymist-ocean.jpg", discount: 18 },
      { id: 4, name: "Holigrels Parfume Bodymist", link: "https://s.shopee.co.id/5q5GUp224j", price: "Rp28.000", rating: 4.9, sold: "5.2rb", img: "/products/bodymist-vanilla.jpg", discount: 35 },
      { id: 5, name: "BRASOV Parfum Female Pearl EDP 35ML Combo", link: "https://s.shopee.co.id/2LVOKPIjYN", price: "Rp30.000", rating: 4.7, sold: "4.1rb", img: "/products/bodymist-peach.jpg", discount: 25 },
    ],
  },
  haircare: {
    haircare: [
      { id: 1, name: "L'Oreal Paris Elseve Extraordinary Oil Gold", link: "https://s.shopee.co.id/5Apb3Oulkd", price: "Rp45.000", rating: 4.8, sold: "3.5rb", img: "/products/hair-oil.jpg", discount: 22 },
      { id: 2, name: "Cultusia Hair Care Creambath Strawberry 1000ml", link: "https://s.shopee.co.id/3qKDT3tARx", price: "Rp38.000", rating: 4.7, sold: "2.8rb", img: "/products/hair-mask.jpg", discount: 30 },
      { id: 3, name: "HazelOile Shampoo Non SLS Professional Therapy", link: "https://s.shopee.co.id/W3lV0zA9x", price: "Rp52.000", rating: 4.9, sold: "4.2rb", img: "/products/shampoo.jpg", discount: 18 },
      { id: 4, name: "CHARISSE Hair Tonic Ginseng Booster", link: "https://s.shopee.co.id/4LGU48mbd6", price: "Rp65.000", rating: 4.8, sold: "2.1rb", img: "/products/hair-tonic.jpg", discount: 25 },
      { id: 5, name: "Kelaya Hair Revitalizer Mist 100ml", link: "https://s.shopee.co.id/6feOqTv4Yr", price: "Rp48.000", rating: 4.7, sold: "3.2rb", img: "/products/hair-spray.jpg", discount: 20 },
    ],
  },
}

// Category icons (Shopee style)
const categoryIcons = [
  { id: 'skincare', icon: '🧴', name: 'Skincare' },
  { id: 'makeup', icon: '💄', name: 'Makeup' },
  { id: 'parfum', icon: '🌸', name: 'Parfum' },
  { id: 'haircare', icon: '💇', name: 'Haircare' },
]

// Flash sale items
const flashSaleItems = [
  products.skincare.moisturizer[0],
  products.skincare.sunscreen[0],
  products.makeup.liptint[0],
  products.makeup.cushion[0],
  products.parfum.unisex[0],
  products.parfum.bodymist[0],
  products.skincare.acne[1],
  products.makeup.settingspray[0],
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
            <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-2xl hover:bg-orange-100 transition-colors border border-orange-100 cursor-pointer">
                {cat.icon}
              </div>
              <span className="text-[11px] text-gray-600 text-center">{cat.name}</span>
            </div>
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
  
  const allProducts = []
  Object.entries(products).forEach(([mainCat, subcats]) => {
    Object.entries(subcats).forEach(([subCat, items]) => {
      items.forEach((item) => {
        allProducts.push({ ...item, mainCategory: mainCat, subCategory: subCat })
      })
    })
  })
  
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
            <p className="text-2xl md:text-3xl font-black text-white tracking-wider mb-1" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
              JAGONYA SHOPEE, JAGONYA BELANJA! 🧡
            </p>
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
    </main>
  )
}
