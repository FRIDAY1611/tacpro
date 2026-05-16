import { setRequestLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const msg = t.raw('footer') as { terms: string }
  return {
    title: `${msg.terms} | WearTac`,
    openGraph: { title: `${msg.terms} | WearTac` },
  }
}

export default async function TermsPage({
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
            {isZh ? '服务条款' : 'Terms of Service'}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            {isZh ? (
              <>
                <h2>总则</h2>
                <p>使用本网站即表示您同意以下条款和条件。如果您不同意这些条款，请勿使用本网站。</p>

                <h2>产品信息</h2>
                <p>我们尽力确保产品描述的准确性，但不保证所有信息完全无误。实际产品可能与图片略有差异。</p>

                <h2>报价与订单</h2>
                <p>所有报价均为意向性报价，最终价格以确认订单为准。MOQ（最小起订量）因产品而异。</p>

                <h2>知识产权</h2>
                <p>本网站所有内容，包括文字、图片、徽标等，均为 WearTac 或其关联公司所有，未经书面许可不得转载。</p>

                <h2>责任限制</h2>
                <p>在法律允许的最大范围内，WearTac 不对因使用本网站而产生的任何间接损失承担责任。</p>

                <h2>联系我们</h2>
                <p>如有任何问题，请联系：wang@weartac.com</p>
              </>
            ) : (
              <>
                <h2>General</h2>
                <p>By using this website, you agree to the following terms and conditions. If you do not agree with these terms, please do not use this site.</p>

                <h2>Product Information</h2>
                <p>We strive to ensure product descriptions are accurate but do not guarantee that all information is error-free. Actual products may differ slightly from images.</p>

                <h2>Quotes &amp; Orders</h2>
                <p>All quotes are indicative. Final pricing is subject to confirmed order. MOQ varies by product.</p>

                <h2>Intellectual Property</h2>
                <p>All content on this website, including text, images, and logos, is owned by WearTac or its affiliates and may not be reproduced without written permission.</p>

                <h2>Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, WearTac shall not be liable for any indirect damages arising from the use of this website.</p>

                <h2>Contact</h2>
                <p>For any questions, please contact: wang@weartac.com</p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}