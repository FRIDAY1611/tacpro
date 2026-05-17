export const dynamic = 'force-dynamic'

import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { prisma } from '@/lib/prisma'
import { getLocalizedField } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/config'
import { ArrowLeft, Calendar } from 'lucide-react'

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post || !post.isPublished) return {}

  const loc = locale as Locale
  const title = getLocalizedField(post, loc, 'title') || ''
  const description = getLocalizedField(post, loc, 'excerpt') || ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const loc = locale as Locale

  const t = await getTranslations({ locale })
  const blogMessages = t.raw('blog') as {
    readMore: string
  }

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  })

  if (!post || !post.isPublished) {
    notFound()
  }

  const title = getLocalizedField(post, loc, 'title')
  const excerpt = getLocalizedField(post, loc, 'excerpt')
  const content = getLocalizedField(post, loc, 'content')

  return (
    <div className="min-h-screen pt-20">
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1 rtl:rotate-180" />
          {locale === 'zh' ? '返回博客' : 'Back to Blog'}
        </Link>

        {post.category && (
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full mb-4">
            {post.category}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Calendar className="w-4 h-4" />
          <span>
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : ''}
          </span>
        </div>

        {post.coverImage && (
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-8">
            <img loading="lazy"
              src={post.coverImage}
              alt={title || ''}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {excerpt && (
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{excerpt}</p>
        )}

        {content && (
          <div className="prose prose-gray max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {content}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
