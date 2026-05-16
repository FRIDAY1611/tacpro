import { setRequestLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const msg = t.raw('footer') as { privacy: string }
  return {
    title: `${msg.privacy} | WearTac`,
    openGraph: { title: `${msg.privacy} | WearTac` },
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const isZh = locale === 'zh'

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {isZh ? '隐私政策' : 'Privacy Policy'}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            {isZh ? (
              <>
                <h2>信息收集</h2>
                <p>当您通过我们的网站提交询盘或联系我们时，我们收集您提供的个人信息，包括但不限于：公司名称、联系人姓名、电子邮箱、电话号码、国家和地址。这些信息仅用于处理您的询盘和提供客户服务。</p>

                <h2>信息使用</h2>
                <p>我们收集的信息用于：回复您的询盘和报价请求；提供产品目录和技术资料；发送订单状态更新；改善我们的产品和服务。</p>

                <h2>信息保护</h2>
                <p>我们采取合理的物理、电子和管理措施来保护您的个人信息。我们不会将您的个人信息出售给第三方。</p>

                <h2>Cookie 使用</h2>
                <p>本网站使用必要的 Cookie 以确保网站正常运作。通过继续使用本网站，您同意使用这些 Cookie。</p>

                <h2>第三方披露</h2>
                <p>未经您的明确同意，我们不会将您的个人信息披露给第三方，除非法律要求。</p>

                <h2>联系我们</h2>
                <p>如对本隐私政策有任何疑问，请联系我们：wang@weartac.com</p>
              </>
            ) : (
              <>
                <h2>Information We Collect</h2>
                <p>When you submit an inquiry or contact us through our website, we collect personal information you provide, including but not limited to: company name, contact name, email address, phone number, country, and address. This information is used solely to process your inquiry and provide customer service.</p>

                <h2>How We Use Your Information</h2>
                <p>The information we collect is used to: respond to your inquiries and quote requests; provide product catalogs and technical documentation; send order status updates; improve our products and services.</p>

                <h2>Data Protection</h2>
                <p>We implement reasonable physical, electronic, and administrative measures to protect your personal information. We do not sell your personal information to third parties.</p>

                <h2>Cookie Usage</h2>
                <p>This website uses necessary cookies to ensure proper functionality. By continuing to use this site, you consent to the use of these cookies.</p>

                <h2>Third-Party Disclosure</h2>
                <p>We do not disclose your personal information to third parties without your explicit consent, unless required by law.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at: wang@weartac.com</p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}