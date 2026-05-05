import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  // Static routes
  const staticRoutes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/inquiry',
  ]

  const routes: MetadataRoute.Sitemap = []

  // Add routes for both languages
  for (const locale of ['en', 'zh']) {
    for (const route of staticRoutes) {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    }
  }

  // Dynamic product routes
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  })

  for (const product of products) {
    for (const locale of ['en', 'zh']) {
      routes.push({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return routes
}
