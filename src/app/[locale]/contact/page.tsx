import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const msg = t.raw('contact') as { title: string; subtitle: string }
  return {
    title: `${msg.title} | WearTac`,
    description: msg.subtitle,
    openGraph: { title: msg.title, description: msg.subtitle },
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const contactMessages = t.raw('contact') as {
    title: string
    subtitle: string
    info: {
      address: string
      phone: string
      email: string
      whatsapp: string
    }
    hours: {
      title: string
      weekday: string
      weekend: string
    }
  }

  const contactItems = [
    { icon: Mail, label: contactMessages.info.email, value: 'wang@weartac.com', href: 'mailto:wang@weartac.com' },
    { icon: MessageCircle, label: contactMessages.info.whatsapp, value: '+86 136 8999 3888', href: 'https://wa.me/8613689993888' },
    { icon: Phone, label: contactMessages.info.phone, value: '+86 136 8999 3888', href: 'tel:+8613689993888' },
    { icon: MapPin, label: contactMessages.info.address, value: 'Industrial Zone, City, Province, China', href: null },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {contactMessages.title}
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">
            {contactMessages.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info Cards */}
            <div className="space-y-6">
              <ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactItems.map((item, i) => (
                    <Card key={i} className="p-6 border-0 shadow-sm">
                      <CardContent className="p-0 flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold mb-1 text-sm text-gray-500">{item.label}</h3>
                          {item.href ? (
                            <a href={item.href} className="text-gray-900 font-medium hover:text-primary transition-colors break-all">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-gray-900 font-medium">{item.value}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Card className="p-6 border-0 shadow-sm">
                  <CardContent className="p-0 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{contactMessages.hours.title}</h3>
                      <p className="text-gray-600">{contactMessages.hours.weekday}: 9:00 - 18:00</p>
                      <p className="text-gray-600">{contactMessages.hours.weekend}: {locale === 'zh' ? '休息' : 'Closed'}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold mb-2">
                    {locale === 'zh' ? '需要产品目录或样衣？' : 'Need a catalog or sample?'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {locale === 'zh'
                      ? '填写询盘表单，我们将在24小时内回复您。'
                      : 'Fill out the inquiry form and we will get back to you within 24 hours.'}
                  </p>
                  <Link href="/inquiry">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      {locale === 'zh' ? '立即询盘' : 'Send Inquiry'}
                      <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-square lg:aspect-auto lg:min-h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p>{locale === 'zh' ? '地图加载中...' : 'Map loading...'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}