import './globals.css'

export const metadata = {
  title: {
    default: 'Jagonya Shopee - Rekomendasi Produk Skincare, Makeup & Parfum Terbaik',
    template: '%s | Jagonya My ID'
  },
  description: 'Temukan rekomendasi produk skincare, makeup, parfum & haircare terlaris di Shopee. Diskon s/d 80%, gratis ongkir, COD tersedia. Harga terjamin termurah!',
  keywords: ['shopee', 'skincare', 'makeup', 'parfum', 'haircare', 'rekomendasi produk', 'belanja online', 'diskon shopee'],
  openGraph: {
    title: 'Jagonya Shopee - Rekomendasi Produk Terbaik',
    description: 'Temukan produk skincare, makeup, parfum & haircare pilihan terbaik dengan diskon s/d 80%',
    url: 'https://jagonya.my.id',
    siteName: 'Jagonya Shopee',
    locale: 'id_ID',
    type: 'website',
    images: ['/og-image.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jagonya Shopee - Rekomendasi Produk Terbaik',
    description: 'Temukan produk skincare, makeup, parfum & haircare pilihan terbaik'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://jagonya.my.id'
  },
  metadataBase: new URL('https://jagonya.my.id')
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/icon.png" sizes="512x512" />
      </head>
      <body>{children}</body>
    </html>
  )
}
