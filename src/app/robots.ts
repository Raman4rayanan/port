import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Keep admin dashboard out of search results
    },
    sitemap: 'https://ramanarayanan.vercel.app/sitemap.xml',
  }
}
