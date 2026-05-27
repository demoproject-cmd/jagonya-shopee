'use client'

import { useState } from 'react'

// Affiliate links database with product names
const products = {
  skincare: {
    moisturizer: [
      { id: 1, name: "Moisturizer Glowing Korea", link: "https://s.shopee.co.id/9Kf8dWRnV1", used: true, price: "Rp45.000", rating: 4.8, sold: "2.3rb", img: "/products/moisturizer.jpg" },
      { id: 2, name: "Moisturizer Glowing Serum", link: "https://s.shopee.co.id/4LGSge9GGN", used: true, price: "Rp52.000", rating: 4.9, sold: "1.8rb", img: "/products/moisturizer-serum.jpg" },
      { id: 3, name: "Moisturizer Glow Up", link: "https://s.shopee.co.id/40dcI3evMO", used: true, price: "Rp38.000", rating: 4.7, sold: "3.1rb", img: "/products/moisturizer.jpg" },
      { id: 4, name: "Moisturizer Cica Gel", link: "https://s.shopee.co.id/20sXuPAkFf", used: true, price: "Rp42.000", rating: 4.8, sold: "2.5rb", img: "/products/moisturizer-cica.jpg" },
      { id: 5, name: "Moisturizer Niacinamide", link: "https://s.shopee.co.id/8fPRqgStF6", used: true, price: "Rp55.000", rating: 4.9, sold: "1.9rb", img: "/products/moisturizer-niacinamide.jpg" },
    ],
    retinol: [
      { id: 1, name: "Retinol Serum Anti Aging", link: "https://s.shopee.co.id/gNAK2DfDD", used: true, price: "Rp68.000", rating: 4.7, sold: "1.2rb", img: "/products/retinol.jpg" },
      { id: 2, name: "Retinol Serum Night", link: "https://s.shopee.co.id/3B4VIiTQ15", used: false, price: "Rp75.000", rating: 4.8, sold: "890", img: "/products/retinol-night.jpg" },
      { id: 3, name: "Retinol Peptide Serum", link: "https://s.shopee.co.id/7pqKrK7PLf", used: false, price: "Rp82.000", rating: 4.6, sold: "650", img: "/products/retinol-peptide.jpg" },
      { id: 4, name: "Retinol Concentrate", link: "https://s.shopee.co.id/AUr62F44R7", used: false, price: "Rp95.000", rating: 4.9, sold: "420", img: "/products/retinol-concentrate.jpg" },
      { id: 5, name: "Retinol Renewal", link: "https://s.shopee.co.id/3VhLhOclq2", used: false, price: "Rp78.000", rating: 4.7, sold: "580", img: "/products/retinol-renewal.jpg" },
    ],
    sunscreen: [
      { id: 1, name: "Sunscreen SPF50 Ringan", link: "https://s.shopee.co.id/7VDUSr3jdc", used: true, price: "Rp35.000", rating: 4.9, sold: "5.2rb", img: "/products/sunscreen.jpg" },
      { id: 2, name: "Sunscreen Gel UV Protect", link: "https://s.shopee.co.id/2VooVgQHgX", used: true, price: "Rp42.000", rating: 4.8, sold: "4.1rb", img: "/products/sunscreen-gel.jpg" },
      { id: 3, name: "Sunscreen Tinted Glow", link: "https://s.shopee.co.id/3qKC69PPVI", used: true, price: "Rp48.000", rating: 4.7, sold: "3.5rb", img: "/products/sunscreen-tinted.jpg" },
      { id: 4, name: "Sunscreen Watery Essence", link: "https://s.shopee.co.id/AAEFdoK4lw", used: false, price: "Rp52.000", rating: 4.8, sold: "2.8rb", img: "/products/sunscreen-watery.jpg" },
      { id: 5, name: "Sunscreen Matte Finish", link: "https://s.shopee.co.id/4Ax2UoIOOt", used: false, price: "Rp45.000", rating: 4.6, sold: "1.9rb", img: "/products/sunscreen-matte.jpg" },
    ],
    acne: [
      { id: 1, name: "Acne Serum Treatment", link: "https://s.shopee.co.id/2LVOJVNtSF", used: true, price: "Rp58.000", rating: 4.8, sold: "2.1rb", img: "/products/acne-serum.jpg" },
      { id: 2, name: "Acne Spot Gel", link: "https://s.shopee.co.id/6L1X4sIi9N", used: true, price: "Rp32.000", rating: 4.7, sold: "3.8rb", img: "/products/acne-spot.jpg" },
      { id: 3, name: "Acne Cleanser Wash", link: "https://s.shopee.co.id/4qCjI8ZI9i", used: true, price: "Rp45.000", rating: 4.6, sold: "2.9rb", img: "/products/acne-cleanser.jpg" },
      { id: 4, name: "Acne Cream Obat", link: "https://s.shopee.co.id/7VDUT3cU8z", used: false, price: "Rp28.000", rating: 4.5, sold: "4.2rb", img: "/products/acne-cream.jpg" },
      { id: 5, name: "Acne Patch Invisible", link: "https://s.shopee.co.id/9UyYqkpus0", used: false, price: "Rp25.000", rating: 4.9, sold: "6.5rb", img: "/products/acne-patch.jpg" },
    ],
  },
  makeup: {
    liptint: [
      { id: 1, name: "Lip Tint Korea Murah", link: "https://s.shopee.co.id/1qZ7il8dSi", used: true, price: "Rp18.000", rating: 4.8, sold: "8.5rb", img: "/products/liptint.jpg" },
      { id: 2, name: "Lip Tint Matte", link: "https://s.shopee.co.id/20sXv5Bn6D", used: true, price: "Rp22.000", rating: 4.7, sold: "6.2rb", img: "/products/liptint-matte.jpg" },
      { id: 3, name: "Lip Tint Water Tint", link: "https://s.shopee.co.id/2BBy7PS4ma", used: true, price: "Rp15.000", rating: 4.9, sold: "9.1rb", img: "/products/liptint-water.jpg" },
      { id: 4, name: "Lip Tint Glowing", link: "https://s.shopee.co.id/AKXfqR6xks", used: true, price: "Rp25.000", rating: 4.6, sold: "4.8rb", img: "/products/liptint-glowing.jpg" },
      { id: 5, name: "Lip Tint Velvet", link: "https://s.shopee.co.id/17TXTQemW", used: false, price: "Rp28.000", rating: 4.8, sold: "3.2rb", img: "/products/liptint-velvet.jpg" },
    ],
    cushion: [
      { id: 1, name: "Cushion Cover Sempurna", link: "https://s.shopee.co.id/40dcIuF2xG", used: true, price: "Rp65.000", rating: 4.7, sold: "4.5rb", img: "/products/cushion.jpg" },
      { id: 2, name: "Cushion Matte Full", link: "https://s.shopee.co.id/3qKC6cHxSv", used: true, price: "Rp72.000", rating: 4.8, sold: "3.8rb", img: "/products/cushion-matte.jpg" },
      { id: 3, name: "Cushion Glow Korea", link: "https://s.shopee.co.id/3LNvViSG09", used: false, price: "Rp78.000", rating: 4.9, sold: "2.1rb", img: "/products/cushion-glow.jpg" },
      { id: 4, name: "Cushion BB Cream", link: "https://s.shopee.co.id/AAEFeI1dIy", used: false, price: "Rp55.000", rating: 4.6, sold: "5.2rb", img: "/products/cushion-bb.jpg" },
      { id: 5, name: "Cushion Foundation", link: "https://s.shopee.co.id/40dcIykuTD", used: false, price: "Rp85.000", rating: 4.8, sold: "1.9rb", img: "/products/cushion-foundation.jpg" },
    ],
    settingspray: [
      { id: 1, name: "Setting Spray Lock", link: "https://s.shopee.co.id/8fPRrbt5Rk", used: true, price: "Rp42.000", rating: 4.8, sold: "5.8rb", img: "/products/setting-spray.jpg" },
      { id: 2, name: "Setting Spray Matte", link: "https://s.shopee.co.id/5q5GUQ7asu", used: true, price: "Rp38.000", rating: 4.7, sold: "4.2rb", img: "/products/setting-spray-matte.jpg" },
      { id: 3, name: "Setting Spray Dewy", link: "https://s.shopee.co.id/3qKC6lRevx", used: true, price: "Rp45.000", rating: 4.9, sold: "3.5rb", img: "/products/setting-spray-dewy.jpg" },
      { id: 4, name: "Setting Spray Long", link: "https://s.shopee.co.id/3LNvVrUOcl", used: false, price: "Rp48.000", rating: 4.6, sold: "2.8rb", img: "/products/setting-spray-long.jpg" },
      { id: 5, name: "Setting Spray Primer", link: "https://s.shopee.co.id/9zupS8CAtp", used: false, price: "Rp52.000", rating: 4.7, sold: "1.9rb", img: "/products/setting-spray-primer.jpg" },
    ],
  },
  parfum: {
    unisex: [
      { id: 1, name: "Parfum Unisex Tahan Lama", link: "https://s.shopee.co.id/2VooWV5Xsd", used: true, price: "Rp89.000", rating: 4.8, sold: "3.2rb", img: "/products/parfum.jpg" },
      { id: 2, name: "Parfum Cologne Spray", link: "https://s.shopee.co.id/7pqKsJuFwG", used: false, price: "Rp75.000", rating: 4.7, sold: "2.8rb", img: "/products/parfum-cologne.jpg" },
      { id: 3, name: "Parfum Woody Amber", link: "https://s.shopee.co.id/9Kf8f6BW0R", used: false, price: "Rp95.000", rating: 4.9, sold: "1.5rb", img: "/products/parfum-woody.jpg" },
      { id: 4, name: "Parfum Fresh Citrus", link: "https://s.shopee.co.id/1100jnfWtj", used: false, price: "Rp68.000", rating: 4.6, sold: "2.1rb", img: "/products/parfum-citrus.jpg" },
      { id: 5, name: "Parfum Musk Soft", link: "https://s.shopee.co.id/4Ax2VdfvSD", used: false, price: "Rp82.000", rating: 4.8, sold: "1.8rb", img: "/products/parfum-musk.jpg" },
    ],
    bodymist: [
      { id: 1, name: "Body Mist Floral Wangi", link: "https://s.shopee.co.id/1VwHKnSFzI", used: true, price: "Rp35.000", rating: 4.7, sold: "4.5rb", img: "/products/bodymist.jpg" },
      { id: 2, name: "Body Mist Fruity Fresh", link: "https://s.shopee.co.id/AAEFek5Rk0", used: false, price: "Rp32.000", rating: 4.8, sold: "3.8rb", img: "/products/bodymist-fruity.jpg" },
      { id: 3, name: "Body Mist Ocean Breeze", link: "https://s.shopee.co.id/6feNUKrZ3e", used: false, price: "Rp38.000", rating: 4.6, sold: "2.9rb", img: "/products/bodymist-ocean.jpg" },
      { id: 4, name: "Body Mist Vanilla Sweet", link: "https://s.shopee.co.id/5q5GUp224j", used: false, price: "Rp28.000", rating: 4.9, sold: "5.2rb", img: "/products/bodymist-vanilla.jpg" },
      { id: 5, name: "Body Mist Peach Soft", link: "https://s.shopee.co.id/2LVOKPIjYN", used: false, price: "Rp30.000", rating: 4.7, sold: "4.1rb", img: "/products/bodymist-peach.jpg" },
    ],
  },
  haircare: {
    haircare: [
      { id: 1, name: "Hair Oil Anti Rontok", link: "https://s.shopee.co.id/5Apb3Oulkd", used: false, price: "Rp45.000", rating: 4.8, sold: "3.5rb", img: "/products/hair-oil.jpg" },
      { id: 2, name: "Hair Mask Creambath", link: "https://s.shopee.co.id/3qKDT3tARx", used: false, price: "Rp38.000", rating: 4.7, sold: "2.8rb", img: "/products/hair-mask.jpg" },
      { id: 3, name: "Shampoo Grow Us", link: "https://s.shopee.co.id/W3lV0zA9x", used: false, price: "Rp52.000", rating: 4.9, sold: "4.2rb", img: "/products/shampoo.jpg" },
      { id: 4, name: "Hair Tonic Serum", link: "https://s.shopee.co.id/4LGU48mbd6", used: false, price: "Rp65.000", rating: 4.8, sold: "2.1rb", img: "/products/hair-tonic.jpg" },
      { id: 5, name: "Hair Treatment Spray", link: "https://s.shopee.co.id/6feOqTv4Yr", used: false, price: "Rp48.000", rating: 4.7, sold: "3.2rb", img: "/products/hair-spray.jpg" },
    ],
  },
}

// Product Card Component with nice design
function ProductCard({ product, category }) {
  const discountPercent = Math.floor(Math.random() * 20) + 10
  
  // Category color schemes
  const categoryColors = {
    skincare: { bg: 'from-blue-50 to-green-50', accent: 'bg-green-500', text: 'text-green-600' },
    makeup: { bg: 'from-pink-50 to-purple-50', accent: 'bg-pink-500', text: 'text-pink-600' },
    parfum: { bg: 'from-amber-50 to-orange-50', accent: 'bg-amber-500', text: 'text-amber-600' },
    haircare: { bg: 'from-cyan-50 to-teal-50', accent: 'bg-cyan-500', text: 'text-cyan-600' },
  }
  const colors = categoryColors[category] || categoryColors.skincare

  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="product-card bg-white rounded-lg overflow-hidden block border border-gray-100"
    >
      {/* Product Image Area */}
      <div className={`relative h-40 bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        {product.used && (
          <span className="absolute top-2 left-2 bg-shopee-orange text-white text-xs px-2 py-1 rounded font-bold">
            {discountPercent}% OFF
          </span>
        )}
        <span className={`absolute top-2 right-2 ${colors.accent} text-white text-[10px] px-2 py-1 rounded-full`}>
          {category.toUpperCase()}
        </span>
      </div>
      
      {/* Product Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-shopee-orange font-bold text-lg">{product.price}</span>
        </div>
        
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            ⭐ <span className="text-orange-500 font-medium">{product.rating}</span>
          </span>
          <span>|</span>
          <span>Terjual {product.sold}</span>
        </div>
        
        <div className="mt-3">
          <button className="w-full bg-shopee-orange hover:bg-shopee-darkOrange text-white text-sm font-medium py-2 rounded-lg transition-colors">
            🛒 Beli Sekarang
          </button>
        </div>
      </div>
    </a>
  )
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Flatten all products
  const allProducts = []
  Object.entries(products).forEach(([mainCat, subcats]) => {
    Object.entries(subcats).forEach(([subCat, items]) => {
      items.forEach((item) => {
        allProducts.push({
          ...item,
          mainCategory: mainCat,
          subCategory: subCat,
        })
      })
    })
  })
  
  const filteredProducts = activeCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.mainCategory === activeCategory)
  
  const searchedProducts = searchQuery
    ? filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header - Shopee Style */}
      <header className="bg-shopee-orange sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img 
                src="/jagonya-shopee-logo.png" 
                alt="Jagonya Shopee" 
                className="h-10 md:h-12 rounded" style={{mixBlendMode: "screen"}}
              />
            </a>
            <div className="hidden sm:block text-white">
              <p className="text-[11px] text-orange-200">Rekomendasi Produk Terbaik • Gratis Ongkir</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari skincare, makeup, parfum favoritmu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-shopee-darkOrange hover:bg-red-600 px-6 rounded-full text-white font-medium transition-colors">
                  🔍 Cari
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Banner without Logo image */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-3xl md:text-4xl font-black text-white tracking-wider mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
            JAGONYA SHOPEE, JAGONYA BELANJA! 🧡
          </p>
          <p className="text-sm text-white/90">Diskon s/d 80% • Gratis Ongkir • COD Tersedia • Bayar di Tempat</p>
        </div>
      </div>
      
      {/* Slogan Marquee */}
      <div className="bg-shopee-orange text-white py-2 overflow-hidden border-t border-orange-400">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-lg font-bold tracking-widest mx-8">🧡 JAGONYA SHOPEE, JAGONYA BELANJA! 🧡 JAGONYA SHOPEE, JAGONYA BELANJA! 🧡 JAGONYA SHOPEE, JAGONYA BELANJA! 🧡 JAGONYA SHOPEE, JAGONYA BELANJA! 🧡 JAGONYA SHOPEE, JAGONYA BELANJA! 🧡</span>
          <span className="text-lg font-bold tracking-widest mx-8">🧡 JAGONYA SHOPEE, JAGONYA BELANJA! 🧡 JAGONYA SHOPEE, JAGONYA BELANJA! 🧡 JAGONYA SHOPEE, JAGONYA BELANJA! 🧡 JAGONYA SHOPEE, JAGONYA BELANJA! 🧡 JAGONYA SHOPEE, JAGONYA BELANJA! 🧡</span>
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="bg-white shadow-sm sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 py-4 overflow-x-auto">
            <span className="text-gray-500 text-sm font-medium">Kategori:</span>
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-shopee-orange text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🛍️ Semua (50)
            </button>
            <button
              onClick={() => setActiveCategory('skincare')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'skincare'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🧴 Skincare (20)
            </button>
            <button
              onClick={() => setActiveCategory('makeup')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'makeup'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💄 Makeup (15)
            </button>
            <button
              onClick={() => setActiveCategory('parfum')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'parfum'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🌸 Parfum (10)
            </button>
            <button
              onClick={() => setActiveCategory('haircare')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'haircare'
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💇 Haircare (5)
            </button>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {searchedProducts.map((product) => (
            <ProductCard 
              key={`${product.subCategory}-${product.id}`} 
              product={product}
              category={product.mainCategory}
            />
          ))}
        </div>
        
        {searchedProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="text-8xl">🔍</span>
            <p className="text-xl text-gray-500 mt-4">Produk tidak ditemukan</p>
            <p className="text-sm text-gray-400">Coba kata kunci lain</p>
          </div>
        )}
      </div>
      
      {/* Stats Section */}
      <div className="bg-white py-8 mt-6 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <p className="text-3xl font-bold text-shopee-orange">50</p>
              <p className="text-sm text-gray-600 mt-1">Total Produk</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-3xl font-bold text-green-600">20</p>
              <p className="text-sm text-gray-600 mt-1">Skincare</p>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-xl">
              <p className="text-3xl font-bold text-pink-600">15</p>
              <p className="text-sm text-gray-600 mt-1">Makeup</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-xl">
              <p className="text-3xl font-bold text-amber-600">10</p>
              <p className="text-sm text-gray-600 mt-1">Parfum</p>
            </div>
            <div className="text-center p-4 bg-cyan-50 rounded-xl">
              <p className="text-3xl font-bold text-cyan-600">5</p>
              <p className="text-sm text-gray-600 mt-1">Haircare</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Shop Here */}
      <div className="bg-gradient-to-b from-orange-50 to-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Kenapa Belanja di Jagonya Shopee?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <span className="text-4xl">🚚</span>
              <h3 className="font-bold mt-3 text-gray-800">Gratis Ongkir</h3>
              <p className="text-sm text-gray-500">Promo ongkir setiap hari</p>
            </div>
            <div className="text-center p-4">
              <span className="text-4xl">✅</span>
              <h3 className="font-bold mt-3 text-gray-800">Produk Original</h3>
              <p className="text-sm text-gray-500">100% produk asli</p>
            </div>
            <div className="text-center p-4">
              <span className="text-4xl">💰</span>
              <h3 className="font-bold mt-3 text-gray-800">Harga Terbaik</h3>
              <p className="text-sm text-gray-500">Harga termurah dijamin</p>
            </div>
            <div className="text-center p-4">
              <span className="text-4xl">🔄</span>
              <h3 className="font-bold mt-3 text-gray-800">Mudah Dikembalikan</h3>
              <p className="text-sm text-gray-500">Garansi 7 hari</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-shopee-orange text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-4">
            <img 
              src="/jagonya-shopee-logo.png" 
              alt="Jagonya Shopee" 
              className="h-16 mx-auto rounded-lg shadow-lg border-2 border-white/20" style={{mixBlendMode: "screen"}}
            />
          </div>
          <p className="text-2xl font-black text-white tracking-wider mb-4" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
            JAGONYA SHOPEE, JAGONYA BELANJA! 🧡
          </p>
          <p className="text-orange-200 mb-4">
            Rekomendasi produk terbaik pilihan admin • Follow kami untuk update!
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              📱 Threads: @jagonya_shopee
            </span>
          </div>
          <p className="text-orange-300 text-sm">
            © 2026 Jagonya Shopee. Semua hak dilindungi.
          </p>
        </div>
      </footer>
    </main>
  )
}
