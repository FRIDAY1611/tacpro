import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Siren, Cross, TreePine } from 'lucide-react'
import { ScrollReveal, StaggerContainer } from '@/components/ui/scroll-reveal'

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const casesMessages = t.raw('cases') as {
    title: string
    subtitle: string
    scenes: {
      military: string
      police: string
      rescue: string
      outdoor: string
    }
  }

  const cases = [
    {
      key: 'military',
      icon: Shield,
      title: casesMessages.scenes.military,
      desc:
        locale === 'zh'
          ? '为多国军队提供战术背心、作战服及防护头盔，产品通过严苛的战场环境测试。'
          : 'Supplied tactical vests, combat uniforms, and protective helmets to multiple armed forces, passing rigorous battlefield environment tests.',
      tags:
        locale === 'zh'
          ? ['防弹背心', '迷彩作战服', '战术头盔']
          : ['Ballistic Vests', 'Camo Uniforms', 'Tactical Helmets'],
    },
    {
      key: 'police',
      icon: Siren,
      title: casesMessages.scenes.police,
      desc:
        locale === 'zh'
          ? '为特警及防暴部队提供防刺背心、防暴手套及快拆战术装备。'
          : 'Provided stab-resistant vests, riot gloves, and quick-release tactical gear for SWAT and riot control units.',
      tags:
        locale === 'zh'
          ? ['防刺背心', '防暴手套', '快拆系统']
          : ['Stab-resistant Vests', 'Riot Gloves', 'Quick-release Systems'],
    },
    {
      key: 'rescue',
      icon: Cross,
      title: casesMessages.scenes.rescue,
      desc:
        locale === 'zh'
          ? '为消防及搜救队提供阻燃救援服、高可见度背心及防护手套。'
          : 'Supplied flame-resistant rescue suits, high-visibility vests, and protective gloves for fire and search & rescue teams.',
      tags:
        locale === 'zh'
          ? ['阻燃救援服', '高可见背心', '耐热手套']
          : ['Flame-resistant Suits', 'Hi-vis Vests', 'Heat-resistant Gloves'],
    },
    {
      key: 'outdoor',
      icon: TreePine,
      title: casesMessages.scenes.outdoor,
      desc:
        locale === 'zh'
          ? '为户外训练机构及安保公司提供多功能战术背包、防水外套及登山装备。'
          : 'Provided multi-function tactical backpacks, waterproof jackets, and mountaineering gear for outdoor training institutions and security companies.',
      tags:
        locale === 'zh'
          ? ['战术背包', '防水外套', '登山装备']
          : ['Tactical Backpacks', 'Waterproof Jackets', 'Mountaineering Gear'],
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {casesMessages.title}
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">
            {casesMessages.subtitle}
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cases.map((item) => (
              <Card key={item.key} className="border-0 shadow-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <item.icon className="w-20 h-20 text-gray-300" />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '40+', label: locale === 'zh' ? '服务国家' : 'Countries Served' },
                { value: '200+', label: locale === 'zh' ? '合作客户' : 'Partner Clients' },
                { value: '500K+', label: locale === 'zh' ? '年产件数' : 'Annual Output' },
                { value: '15+', label: locale === 'zh' ? '年行业经验' : 'Years Experience' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
