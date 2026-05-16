import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import BlogForm from '../../_components/BlogForm'

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id } })

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">编辑文章</h1>
      <BlogForm
        initial={{
          ...post,
          publishedAt: post.publishedAt
            ? new Date(post.publishedAt).toISOString().split('T')[0]
            : '',
          coverImage: post.coverImage || '',
          category: post.category || '',
          titleEn: post.titleEn || '',
          titleZh: post.titleZh || '',
          titleEs: post.titleEs || '',
          titleFr: post.titleFr || '',
          titleAr: post.titleAr || '',
          titleRu: post.titleRu || '',
          excerptEn: post.excerptEn || '',
          excerptZh: post.excerptZh || '',
          excerptEs: post.excerptEs || '',
          excerptFr: post.excerptFr || '',
          excerptAr: post.excerptAr || '',
          excerptRu: post.excerptRu || '',
          contentEn: post.contentEn || '',
          contentZh: post.contentZh || '',
          contentEs: post.contentEs || '',
          contentFr: post.contentFr || '',
          contentAr: post.contentAr || '',
          contentRu: post.contentRu || '',
        }}
      />
    </div>
  )
}
