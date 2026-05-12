import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { prisma } from '@/lib/prisma'
import { getLocalizedField } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/config'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield } from 'lucide-react'

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const { locale } = await params
  const { category, page } = await searchParams
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const productsMessages = t.raw('products') as {
    title: string
    subtitle: string
    categories: Record<string, string>
    card: { inquire: string; details: string; moq: string }
  }

  const currentPage = parseInt(page || '1')
  const pageSize = 12

  const where = {
    isActive: true,
    ...(category && { category: { slug: category } }),
  }

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { sortOrder: 'asc' },
      include: { category: true },
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
    }),
  ])

  const totalPages = Math.ceil(total / pageSize)
  const loc = locale as Locale

  // Helper to get translated category name, fallback to DB name, then slug
  const getCatName = (cat: { slug: string; nameZh: string; nameEn: string; nameEs: string | null; nameFr: string | null; nameAr: string | null; nameRu: string | null }) => {
    return productsMessages.categories[cat.slug] || getLocalizedField(cat, loc, 'name') || cat.slug
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {productsMessages.title}
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">
            {productsMessages.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">
                  {locale === 'zh' ? '产品分类' : 'Categories'}
                </h3>
                <nav className="space-y-2">
                  <Link href="/products">
                    <Button
                      variant={!category ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                    >
                      {productsMessages.categories.all}
                    </Button>
                  </Link>
                  {categories.map((cat) => (
                    <Link key={cat.id} href={`/products?category=${cat.slug}`}>
                      <Button
                        variant={category === cat.slug ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                      >
                        {getCatName(cat)}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Link key={product.id} href={`/products/${product.slug}`}>
                        <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                          <div className="aspect-square bg-gray-100 overflow-hidden relative">
                            {product.mainImage ? (
                              <img
                                src={product.mainImage}
                                alt={getLocalizedField(product, loc, 'name') || ''}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Shield className="w-20 h-20" />
                              </div>
                            )}
                            {product.isCustomizable && (
                              <Badge className="absolute top-3 right-3" variant="secondary">
                                {locale === 'zh' ? '可定制' : 'Customizable'}
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-5">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                              {getLocalizedField(product, loc, 'name')}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                              {getLocalizedField(product, loc, 'shortDesc')}
                            </p>
                            <div className="flex items-center justify-between">
                              {product.moq && (
                                <span className="text-xs text-gray-400">
                                  {productsMessages.card.moq}: {product.moq}
                                </span>
                              )}
                              <span className="text-sm text-primary font-medium group-hover:underline">
                                {productsMessages.card.details} →
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link
                          key={p}
                          href={`/products${category ? `?category=${category}&` : '?'}page=${p}`}
                        >
                          <Button variant={p === currentPage ? 'default' : 'outline'} size="sm">
                            {p}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {locale === 'zh' ? '暂无产品' : 'No products found'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
