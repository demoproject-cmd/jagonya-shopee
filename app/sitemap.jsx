export const dynamic = 'force-static'

export default function sitemap() {
  const baseUrl = 'https://www.jagonya.my.id'

  const categories = [
    'skincare', 'makeup', 'parfum', 'haircare'
  ]

  const subcategories = {
    skincare: ['moisturizer', 'retinol', 'sunscreen', 'acne'],
    makeup: ['liptint', 'cushion', 'settingspray'],
    parfum: ['unisex', 'bodymist'],
    haircare: ['haircare']
  }

  const blogPosts = [
    'skincare-routine-untuk-pemula',
    'sunscreen-terbaik-untuk-kulit-berminyak',
    'rekomendasi-lip-tint-terlaris',
    'parfum-wanita-tahan-lama',
    'cara-mengatasi-jerawat'
  ]

  const entries = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    }
  ]

  // Add category pages
  categories.forEach(cat => {
    entries.push({
      url: `${baseUrl}/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    })
  })

  // Add subcategory pages
  Object.entries(subcategories).forEach(([cat, subs]) => {
    subs.forEach(sub => {
      entries.push({
        url: `${baseUrl}/${cat}/${sub}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6
      })
    })
  })

  // Add blog pages
  entries.push({
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  })

  blogPosts.forEach(slug => {
    entries.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    })
  })

  return entries
}
