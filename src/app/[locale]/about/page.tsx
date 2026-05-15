import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Factory, Users, Package, Globe, Award, Shield, Scissors, ClipboardCheck, Shirt, SearchCheck } from 'lucide-react'
import { ScrollReveal, StaggerContainer } from '@/components/ui/scroll-reveal'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const aboutMessages = t.raw('about') as {
    title: string
    subtitle: string
    story: {
      title: string
      p1: string
      p2: string
      p3: string
    }
    factory: {
      title: string
      subtitle: string
      stats: {
        area: string
        workers: string
        capacity: string
        countries: string
      }
    }
    quality: {
      title: string
      subtitle: string
      steps: {
        fabric: string
        cutting: string
        sewing: string
        inspection: string
      }
    }
    certificates: {
      title: string
      subtitle: string
    }
  }

  const certificates = await prisma.certificate.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  const stats = [
    { key: 'area', icon: Factory, value: '50,000㎡' },
    { key: 'workers', icon: Users, value: '500+' },
    { key: 'capacity', icon: Package, value: '100,000+' },
    { key: 'countries', icon: Globe, value: '40+' },
  ]

  const qualitySteps = [
    { key: 'fabric', icon: SearchCheck },
    { key: 'cutting', icon: Scissors },
    { key: 'sewing', icon: Shirt },
    { key: 'inspection', icon: ClipboardCheck },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {aboutMessages.title}
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">
            {aboutMessages.subtitle}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-bold mb-8 text-center">
                {aboutMessages.story.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>{aboutMessages.story.p1}</p>
                <p>{aboutMessages.story.p2}</p>
                <p>{aboutMessages.story.p3}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Factory Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{aboutMessages.factory.title}</h2>
              <p className="text-gray-600">{aboutMessages.factory.subtitle}</p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <Card key={stat.key} className="text-center p-6 border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-500">
                    {aboutMessages.factory.stats[stat.key as keyof typeof aboutMessages.factory.stats]}
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Quality Management */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{aboutMessages.quality.title}</h2>
              <p className="text-gray-600">{aboutMessages.quality.subtitle}</p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualitySteps.map((step, idx) => (
              <div key={step.key} className="relative bg-white p-6 rounded-2xl shadow-sm">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mt-2">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {aboutMessages.quality.steps[step.key as keyof typeof aboutMessages.quality.steps]}
                </h3>
                <p className="text-sm text-gray-500">
                  {locale === 'zh'
                    ? '严格遵循国际标准执行每一道工序，确保成品品质稳定可靠。'
                    : 'Strict adherence to international standards at every stage to ensure consistent, reliable finished product quality.'}
                </p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Factory Images */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {locale === 'zh' ? '工厂实景' : 'Factory Gallery'}
              </h2>
              <p className="text-gray-600">
                {locale === 'zh' ? '现代化生产线与专业设备' : 'Modern production lines and professional equipment'}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Factory className="w-12 h-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{aboutMessages.certificates.title}</h2>
              <p className="text-gray-600">{aboutMessages.certificates.subtitle}</p>
            </div>
          </ScrollReveal>

          {certificates.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certificates.map((cert) => (
                <Card key={cert.id} className="p-6 text-center border-0 shadow-sm">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    {cert.image ? (
                      <img src={cert.image} alt={locale === 'zh' ? cert.nameZh : cert.nameEn} className="w-full h-full object-contain" />
                    ) : (
                      <Award className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-semibold">
                    {locale === 'zh' ? cert.nameZh : cert.nameEn}
                  </h3>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['ISO 9001', 'ISO 14001', 'CE', 'BSCI'].map((name) => (
                <Card key={name} className="p-6 text-center border-0 shadow-sm">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Award className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="font-semibold">{name}</h3>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
