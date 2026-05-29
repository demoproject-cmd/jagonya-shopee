export const dynamic = 'force-static'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      }
    ],
    sitemap: 'https://jagonya.my.id/sitemap.xml'
  }
}
