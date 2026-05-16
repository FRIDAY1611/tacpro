import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, Locale, isRTL } from '@/i18n/config'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/Footer'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()
  const commonMessages = messages.common as {
    nav: { home: string; products: string; cases: string; blog: string; about: string; contact: string; inquiry: string }
    buttons: { inquireNow: string }
  }
  const footerMessages = messages.footer as {
    description: string
    quickLinks: string
    products: string
    contact: string
    privacy: string
    terms: string
    copyright: string
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex flex-col min-h-screen" dir={isRTL(locale as Locale) ? 'rtl' : 'ltr'}>
        <Header locale={locale as Locale} messages={commonMessages} />
        <main className="flex-1">{children}</main>
        <Footer
          locale={locale as Locale}
          messages={footerMessages}
          navMessages={commonMessages.nav}
        />
      </div>
    </NextIntlClientProvider>
  )
}
