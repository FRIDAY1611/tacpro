import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { ScrollReveal, StaggerContainer } from '@/components/ui/scroll-reveal'

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const blogMessages = t.raw('blog') as {
    title: string
    subtitle: string
    readMore: string
  }

  const articles = [
    {
      slug: 'tactical-vest-material-guide',
      title:
        locale === 'zh'
          ? '战术背心面料选择指南：Cordura vs 尼龙 vs 涤纶'
          : 'Tactical Vest Fabric Guide: Cordura vs Nylon vs Polyester',
      excerpt:
        locale === 'zh'
          ? '深入解析三种主流战术背心面料的耐磨性、重量、成本差异，帮助采购人员做出最优选择。'
          : 'An in-depth comparison of abrasion resistance, weight, and cost across three mainstream tactical vest fabrics to help buyers make the best choice.',
      date: '2026-04-15',
      category: locale === 'zh' ? '材料技术' : 'Material Tech',
    },
    {
      slug: 'ballistic-helmet-standards',
      title:
        locale === 'zh'
          ? '防护头盔的NIJ与EN标准解读'
          : 'Understanding NIJ and EN Standards for Protective Helmets',
      excerpt:
        locale === 'zh'
          ? '详解NIJ IIIA与EN 397标准的技术差异，以及出口欧洲与北美市场需要注意的认证要求。'
          : 'Explaining the technical differences between NIJ IIIA and EN 397 standards, and certification requirements for exporting to European and North American markets.',
      date: '2026-03-28',
      category: locale === 'zh' ? '行业标准' : 'Industry Standards',
    },
    {
      slug: 'oem-vs-odm-tactical-apparel',
      title:
        locale === 'zh'
          ? '战术服装OEM与ODM模式：工厂合作完全指南'
          : 'OEM vs ODM for Tactical Apparel: A Complete Factory Partnership Guide',
      excerpt:
        locale === 'zh'
          ? '从打样、面料开发到批量生产，解析与战术服装工厂合作的全流程及避坑指南。'
          : 'From sampling and fabric development to mass production, a complete guide to partnering with tactical apparel factories and avoiding common pitfalls.',
      date: '2026-03-10',
      category: locale === 'zh' ? '采购指南' : 'Procurement Guide',
    },
    {
      slug: 'flame-resistant-fabrics-101',
      title:
        locale === 'zh'
          ? '阻燃面料101：芳纶、阻燃棉与混纺技术'
          : 'Flame-Resistant Fabrics 101: Aramid, FR Cotton, and Blends',
      excerpt:
        locale === 'zh'
          ? '介绍救援服装和消防服装中常用的阻燃面料技术，以及洗涤保养对阻燃性能的影响。'
          : 'Introducing flame-resistant fabric technologies used in rescue and firefighter gear, and how washing and maintenance affect FR performance.',
      date: '2026-02-22',
      category: locale === 'zh' ? '材料技术' : 'Material Tech',
    },
    {
      slug: 'tactical-glove-sizing',
      title:
        locale === 'zh'
          ? '战术手套尺码系统：ANSI与欧标尺寸对照'
          : 'Tactical Glove Sizing Systems: ANSI vs European Standards',
      excerpt:
        locale === 'zh'
          ? '帮助品牌商建立准确的战术手套尺码表，减少退换货率并提升终端用户体验。'
          : 'Helping brands establish accurate tactical glove size charts to reduce return rates and improve end-user experience.',
      date: '2026-02-05',
      category: locale === 'zh' ? '产品知识' : 'Product Knowledge',
    },
    {
      slug: 'supply-chain-resilience',
      title:
        locale === 'zh'
          ? '2026战术服装供应链韧性：如何应对原材料波动'
          : '2026 Tactical Apparel Supply Chain Resilience: Managing Raw Material Volatility',
      excerpt:
        locale === 'zh'
          ? '分析全球纤维市场价格走势，为品牌商提供库存管理和多供应商策略建议。'
          : 'Analyzing global fiber market price trends and providing inventory management and multi-sourcing strategy recommendations for brands.',
      date: '2026-01-18',
      category: locale === 'zh' ? '行业洞察' : 'Industry Insights',
    },
  ]

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
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {article.excerpt}
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
        </div>
      </section>
    </div>
  )
}
