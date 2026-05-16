import { setRequestLocale, getTranslations } from 'next-intl/server'
import { InquiryForm } from './InquiryForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const msg = t.raw('inquiry') as { title: string; subtitle: string }
  return {
    title: `${msg.title} | WearTac`,
    description: msg.subtitle,
    openGraph: { title: msg.title, description: msg.subtitle },
  }
}

export default async function InquiryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const inquiryMessages = t.raw('inquiry') as {
    title: string
    subtitle: string
    form: {
      companyName: string
      contactName: string
      email: string
      phone: string
      country: string
      address: string
      message: string
      messagePlaceholder: string
      targetDate: string
      submit: string
    }
    success: {
      title: string
      message: string
      inquiryNo: string
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {inquiryMessages.title}
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">
            {inquiryMessages.subtitle}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <InquiryForm locale={locale} messages={inquiryMessages} />
          </div>
        </div>
      </section>
    </div>
  )
}
