export const dynamic = 'force-static'

export default function sitemap() {
  const baseUrl = 'https://jagonya.my.id'

  const categories = [
    'skincare', 'makeup', 'parfum', 'haircare'
  ]

  const subcategories = {
    skincare: ['moisturizer', 'retinol', 'sunscreen', 'acne'],
    makeup: ['liptint', 'cushion', 'settingspray'],
    parfum: ['unisex', 'bodymist'],
    haircare: ['haircare']
  }

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

  return entries
}
