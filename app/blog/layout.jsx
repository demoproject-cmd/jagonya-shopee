export async function generateMetadata() {
  return {
    title: 'Blog | Jagonya My ID',
    description: 'Artikel tips skincare, makeup, parfum, dan kecantikan',
    alternates: {
      canonical: 'https://www.jagonya.my.id/blog'
    }
  }
}

export default function BlogLayout({ children }) {
  return <>{children}</>
}
