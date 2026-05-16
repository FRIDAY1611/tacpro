import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Factory, Shield, Settings, Globe, Award, CheckCircle } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getLocalizedField } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/config'
import { ScrollReveal, StaggerContainer } from '@/components/ui/scroll-reveal'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const homeMessages = t.raw('home') as { hero: { description: string } }
  return {
    title: 'WearTac - Professional Tactical Equipment Manufacturer',
    description: homeMessages.hero.description,
    openGraph: {
      title: 'WearTac - Professional Tactical Equipment Manufacturer',
      description: homeMessages.hero.description,
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const loc = locale as Locale

  const t = await getTranslations({ locale })
  const homeMessages = t.raw('home') as {
    hero: { title: string; subtitle: string; description: string }
    featured: { title: string; subtitle: string }
    about: {
      title: string
      subtitle: string
      features: {
        factory: { title: string; desc: string }
        quality: { title: string; desc: string }
        custom: { title: string; desc: string }
        export: { title: string; desc: string }
      }
    }
    trust: { title: string; subtitle: string }
    cta: { title: string; desc: string; button: string }
  }
  const commonMessages = t.raw('common') as {
    buttons: { learnMore: string; inquireNow: string; viewAll: string }
  }

  const products = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    take: 4,
    orderBy: { sortOrder: 'asc' },
  })

  const features = [
    { key: 'factory', icon: Factory, ...homeMessages.about.features.factory },
    { key: 'quality', icon: Shield, ...homeMessages.about.features.quality },
    { key: 'custom', icon: Settings, ...homeMessages.about.features.custom },
    { key: 'export', icon: Globe, ...homeMessages.about.features.export },
  ]

  const certs = ['ISO 9001', 'ISO 14001', 'CE Certification', 'BSCI Audit']

  return (
    <div>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'WearTac',
            description: homeMessages.hero.description,
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://weartac.com',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'wang@weartac.com',
              contactType: 'sales',
              availableLanguage: ['English', 'Chinese'],
            },
            sameAs: [
              'https://facebook.com/weartac',
              'https://instagram.com/weartac',
              'https://linkedin.com/company/weartac',
            ],
          }),
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-white/30 text-white/80 px-4 py-1">
              {homeMessages.hero.subtitle}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
              {homeMessages.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {homeMessages.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 h-12">
                  {commonMessages.buttons.viewAll}
                  <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
              <Link href="/inquiry">
                <Button size="lg" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-8 h-12">
                  {commonMessages.buttons.inquireNow}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{homeMessages.featured.title}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {homeMessages.featured.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      {product.mainImage ? (
                        <img loading="lazy"
                          src={product.mainImage}
                          alt={getLocalizedField(product, loc, 'name') || ''}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Shield className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                        {getLocalizedField(product, loc, 'name')}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {getLocalizedField(product, loc, 'shortDesc')}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              [1, 2, 3, 4].map((i) => (
                <Card key={i} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Shield className="w-16 h-16 text-gray-400" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {locale === 'zh' ? `战术服装 ${i}` : `Tactical Apparel ${i}`}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {locale === 'zh' ? '专业级战术服装与装备' : 'Professional tactical apparel and gear'}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </StaggerContainer>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  {commonMessages.buttons.viewAll}
                  <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{homeMessages.about.title}</h2>
              <p className="text-gray-600 text-lg">{homeMessages.about.subtitle}</p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.key}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust / Certifications */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{homeMessages.trust.title}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {homeMessages.trust.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {certs.map((cert) => (
              <div key={cert} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Award className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{cert}</h3>
              </div>
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              {[
                locale === 'zh' ? '自有工厂 50000㎡' : 'Own Factory 50,000㎡',
                locale === 'zh' ? '500+ 技术工人' : '500+ Skilled Workers',
                locale === 'zh' ? '月产 10万+ 件' : '100K+ pcs Monthly',
                locale === 'zh' ? '出口 40+ 国家' : 'Export to 40+ Countries',
              ].map((tag) => (
                <div key={tag} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{tag}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                {homeMessages.cta.title}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {homeMessages.cta.desc}
              </p>
              <Link href="/inquiry">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 h-12">
                  {homeMessages.cta.button}
                  <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
