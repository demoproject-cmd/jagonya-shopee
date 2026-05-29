export const dynamic = 'force-static'

export const metadata = {
  title: 'Blog - Tips Skincare, Makeup & Kecantikan | Jagonya My ID',
  description: 'Artikel tips skincare, makeup, parfum, dan kecantikan. Panduan lengkap, rekomendasi produk, dan tips perawatan kulit.',
  alternates: {
    canonical: 'https://www.jagonya.my.id/blog'
  }
}

const posts = [
  {
    slug: 'skincare-routine-untuk-pemula',
    title: 'Skincare Routine untuk Pemula: Panduan Lengkap Step by Step',
    description: 'Panduan lengkap skincare routine untuk pemula. Kenali tipe kulit, urutan skincare yang benar, dan rekomendasi produk terbaik.',
    category: 'Skincare',
    date: '2026-05-29',
    readTime: '8 menit',
    image: '/products/batch3/skincare_01.jpg'
  },
  {
    slug: 'sunscreen-terbaik-untuk-kulit-berminyak',
    title: '10 Sunscreen Terbaik untuk Kulit Berminyak 2026 (Harga Terjangkau)',
    description: 'Rekomendasi sunscreen terbaik untuk kulit berminyak dan berjerawat. Formula ringan, tidak lengket, dan harga terjangkau.',
    category: 'Skincare',
    date: '2026-05-28',
    readTime: '6 menit',
    image: '/products/sunscreen.jpg'
  },
  {
    slug: 'rekomendasi-lip-tint-terlaris',
    title: '12 Rekomendasi Lip Tint Terlaris 2026 (Harga Under 50rb)',
    description: 'Rekomendasi lip tint terbaik dan terlaris 2026. Tahan lama, tidak crack, warna cantik, harga terjangkau.',
    category: 'Makeup',
    date: '2026-05-27',
    readTime: '7 menit',
    image: '/products/liptint.jpg'
  },
  {
    slug: 'parfum-wanita-tahan-lama',
    title: '10 Parfum Wanita Tahan Lama 2026 (Harga Under 100rb)',
    description: 'Rekomendasi parfum wanita yang tahan lama sehari penuh. Aroma manis, floral, dan fresh.',
    category: 'Parfum',
    date: '2026-05-26',
    readTime: '6 menit',
    image: '/products/parfum.jpg'
  },
  {
    slug: 'cara-mengatasi-jerawat',
    title: 'Cara Mengatasi Jerawat: Panduan Lengkap dari Penyebab sampai Obat',
    description: 'Panduan lengkap mengatasi jerawat. Kenali penyebab, skincare routine anti-jerawat, dan rekomendasi produk.',
    category: 'Skincare',
    date: '2026-05-25',
    readTime: '10 menit',
    image: '/products/acne-serum.jpg'
  }
]

export default function BlogPage() {
  const categories = ['Semua', 'Skincare', 'Makeup', 'Parfum', 'Haircare']
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Jagonya Shopee",
    "description": "Artikel tips skincare, makeup, parfum, dan kecantikan",
    "url": "https://www.jagonya.my.id/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Jagonya Shopee"
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
            <nav className="flex gap-4 text-white text-sm">
              <a href="/" className="hover:underline">Home</a>
              <a href="/blog" className="hover:underline font-bold">Blog</a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* HERO */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-wider mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
            📝 Blog Jagonya Shopee
          </h1>
          <p className="text-sm text-white/80">Tips, panduan, dan rekomendasi produk terbaik</p>
        </div>
      </div>
      
      {/* CATEGORY FILTER */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${
                  idx === 0 
                    ? 'bg-shopee-orange text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* POSTS GRID */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Featured Post */}
        <div className="mb-8">
          <a href={`/blog/${posts[0].slug}`} className="block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="aspect-video md:aspect-auto md:h-full bg-gray-100">
                  <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="md:w-1/2 p-6">
                <span className="bg-shopee-orange text-white px-2 py-1 rounded text-xs">{posts[0].category}</span>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-3">
                  <span>📅 {posts[0].date}</span>
                  <span>⏱️ {posts[0].readTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-3 leading-tight">{posts[0].title}</h2>
                <p className="text-gray-500 mt-3 text-sm">{posts[0].description}</p>
                <span className="text-shopee-orange text-sm mt-4 inline-block hover:underline">Baca Selengkapnya →</span>
              </div>
            </div>
          </a>
        </div>
        
        {/* Other Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-orange-100 text-shopee-orange px-2 py-0.5 rounded text-xs">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-gray-800 line-clamp-2 leading-tight">{post.title}</h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{post.description}</p>
                <span className="text-shopee-orange text-sm mt-3 inline-block hover:underline">Baca →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <section className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Mau Belanja Produk yang Dibahas?</h2>
          <p className="text-gray-500 text-sm mb-4">Temukan semua produk skincare, makeup, parfum, dan haircare terbaik</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/skincare" className="bg-shopee-orange text-white px-4 py-2 rounded text-sm hover:bg-orange-600">🧴 Skincare</a>
            <a href="/makeup" className="bg-shopee-orange text-white px-4 py-2 rounded text-sm hover:bg-orange-600">💄 Makeup</a>
            <a href="/parfum" className="bg-shopee-orange text-white px-4 py-2 rounded text-sm hover:bg-orange-600">🌸 Parfum</a>
            <a href="/haircare" className="bg-shopee-orange text-white px-4 py-2 rounded text-sm hover:bg-orange-600">💇 Haircare</a>
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
              <h4 className="font-bold text-sm mb-3">Kategori</h4>
              <ul className="space-y-2 text-xs text-orange-200">
                <li><a href="/skincare" className="hover:text-white">Skincare</a></li>
                <li><a href="/makeup" className="hover:text-white">Makeup</a></li>
                <li><a href="/parfum" className="hover:text-white">Parfum</a></li>
                <li><a href="/haircare" className="hover:text-white">Haircare</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Blog</h4>
              <ul className="space-y-2 text-xs text-orange-200">
                <li><a href="/blog" className="hover:text-white">Semua Artikel</a></li>
                <li><a href="/blog/skincare-routine-untuk-pemula" className="hover:text-white">Skincare Pemula</a></li>
                <li><a href="/blog/sunscreen-terbaik-untuk-kulit-berminyak" className="hover:text-white">Sunscreen Terbaik</a></li>
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
      
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
