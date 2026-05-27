import './globals.css'

export const metadata = {
  title: 'Jagonya Shopee - Rekomendasi Produk Terbaik',
  description: 'Temukan produk rekomendasi terbaik dari Jagonya Shopee',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
