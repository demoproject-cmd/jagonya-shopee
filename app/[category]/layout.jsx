import { categoryInfo } from '../data/products'

export async function generateMetadata({ params }) {
  const { category } = params
  const info = categoryInfo[category]
  
  if (!info) {
    return {
      title: 'Kategori Tidak Ditemukan',
      description: 'Halaman yang Anda cari tidak ditemukan'
    }
  }
  
  return {
    title: `Rekomendasi ${info.name} Terbaik`,
    description: info.description,
    openGraph: {
      title: `${info.name} - Rekomendasi Produk Terbaik | Jagonya My ID`,
      description: info.description,
      url: `https://jagonya.my.id/${category}`,
      siteName: 'Jagonya Shopee',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${info.name} - Rekomendasi Produk Terbaik`,
      description: info.description
    },
    alternates: {
      canonical: `https://jagonya.my.id/${category}`
    }
  }
}

export default function CategoryLayout({ children }) {
  return <>{children}</>
}
