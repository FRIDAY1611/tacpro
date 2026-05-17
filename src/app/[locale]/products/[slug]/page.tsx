export const dynamic = 'force-dynamic'

import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { prisma } from '@/lib/prisma'
import { getLocalizedField } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/config'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Shield, Ruler } from 'lucide-react'

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  let product = null
  try {
    product = await prisma.product.findUnique({
      where: { slug },
    })
  } catch {
    return {}
  }

  if (!product) return {}

  const loc = locale as Locale
  const title = getLocalizedField(product, loc, 'metaTitle') || getLocalizedField(product, loc, 'name') || ''
  const description = getLocalizedField(product, loc, 'metaDesc') || ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.mainImage ? [product.mainImage] : [],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const loc = locale as Locale

  const t = await getTranslations({ locale })
  const productsMessages = t.raw('products') as {
    detail: {
      specifications: string
      description: string
      customization: string
      related: string
      inquire: string
      drawing: string
    }
    card: { inquire: string }
  }

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!product || !product.isActive) {
    notFound()
  }

  // Parse specifications
  let specifications: Array<{ label: string; value: string }> = []
  if (product.specifications) {
    try {
      const specObj = JSON.parse(product.specifications)
      specifications = Object.entries(specObj).map(([key, value]) => ({
        label: key,
        value: String(value),
      }))
    } catch {
      // Invalid JSON
    }
  }

  // Parse images
  let images: string[] = []
  if (product.images) {
    try {
      images = JSON.parse(product.images)
    } catch {
      // Invalid JSON
    }
  }

  // Get related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      isActive: true,
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
  })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://weartac.com'

  return (
    <div className="min-h-screen pt-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: getLocalizedField(product, loc, 'name'),
            description: getLocalizedField(product, loc, 'shortDesc'),
            image: product.mainImage || undefined,
            sku: product.sku || undefined,
            brand: { '@type': 'Brand', name: 'WearTac' },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'USD',
              price: '0',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: locale === 'zh' ? '产品中心' : 'Products', item: `${siteUrl}/${locale}/products` },
              { '@type': 'ListItem', position: 2, name: getLocalizedField(product, loc, 'name') },
            ],
          }),
        }}
      />
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <Link href="/products" className="hover:text-primary">
              {locale === 'zh' ? '产品中心' : 'Products'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">
              {getLocalizedField(product, loc, 'name')}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                {product.mainImage ? (
                  <img loading="lazy"
                    src={product.mainImage}
                    alt={getLocalizedField(product, loc, 'name') || ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Shield className="w-32 h-32" />
                  </div>
                )}
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.slice(0, 4).map((img, i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                      <img loading="lazy" src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {product.category && (
                  <Badge variant="secondary">
                    {getLocalizedField(product.category, loc, 'name')}
                  </Badge>
                )}
                {product.isCustomizable && (
                  <Badge variant="outline">{productsMessages.detail.customization}</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {getLocalizedField(product, loc, 'name')}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {getLocalizedField(product, loc, 'shortDesc')}
              </p>

              {product.moq && (
                <p className="text-sm text-gray-500 mb-6">
                  MOQ: {product.moq} {locale === 'zh' ? '件' : 'pcs'}
                </p>
              )}

              <Separator className="my-6" />

              {/* Specifications */}
              {specifications.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {productsMessages.detail.specifications}
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                          <span className="text-gray-500">{spec.label}</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Drawing */}
              {product.drawing && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Ruler className="w-5 h-5" />
                    {productsMessages.detail.drawing}
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-4 overflow-hidden">
                    <img loading="lazy"
                      src={product.drawing}
                      alt={getLocalizedField(product, loc, 'name') || 'Technical Drawing'}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link href={`/inquiry?product=${product.slug}`}>
                <Button size="lg" className="w-full md:w-auto">
                  {productsMessages.detail.inquire}
                </Button>
              </Link>
            </div>
          </div>

          {/* Description */}
          {getLocalizedField(product, loc, 'description') && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-6">
                {productsMessages.detail.description}
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {getLocalizedField(product, loc, 'description')}
                </p>
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-6">
                {productsMessages.detail.related}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                  <Link key={related.id} href={`/products/${related.slug}`}>
                    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        {related.mainImage ? (
                          <img loading="lazy"
                            src={related.mainImage}
                            alt={getLocalizedField(related, loc, 'name') || ''}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Shield className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-1">
                          {getLocalizedField(related, loc, 'name')}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
