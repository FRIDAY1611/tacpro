import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { prisma } from '@/lib/prisma'
import { getLocalizedField } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/config'
import { ScrollReveal, StaggerContainer } from '@/components/ui/scroll-reveal'

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const loc = locale as Locale

  const t = await getTranslations({ locale })
  const blogMessages = t.raw('blog') as {
    title: string
    subtitle: string
    readMore: string
  }

  const articles = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {blogMessages.title}
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">
            {blogMessages.subtitle}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card
                key={article.slug}
                className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt={getLocalizedField(article, loc, 'title') || ''}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                      {article.category || 'Blog'}
                    </span>
                  )}
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString()
                        : ''}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {getLocalizedField(article, loc, 'title')}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {getLocalizedField(article, loc, 'excerpt')}
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-auto"
                  >
                    {blogMessages.readMore}
                    <ArrowRight className="ms-1 h-4 w-4 rtl:rotate-180" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
          {articles.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              {locale === 'zh' ? '暂无博客文章' : 'No blog posts yet'}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
