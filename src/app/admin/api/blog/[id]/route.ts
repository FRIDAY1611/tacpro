import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const blogPostSchema = z.object({
  slug: z.string().min(1),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  titleEn: z.string().min(1),
  titleZh: z.string().optional().nullable(),
  titleEs: z.string().optional().nullable(),
  titleFr: z.string().optional().nullable(),
  titleAr: z.string().optional().nullable(),
  titleRu: z.string().optional().nullable(),
  excerptEn: z.string().optional().nullable(),
  excerptZh: z.string().optional().nullable(),
  excerptEs: z.string().optional().nullable(),
  excerptFr: z.string().optional().nullable(),
  excerptAr: z.string().optional().nullable(),
  excerptRu: z.string().optional().nullable(),
  contentEn: z.string().optional().nullable(),
  contentZh: z.string().optional().nullable(),
  contentEs: z.string().optional().nullable(),
  contentFr: z.string().optional().nullable(),
  contentAr: z.string().optional().nullable(),
  contentRu: z.string().optional().nullable(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = blogPostSchema.parse(body)

    const clean = (v: string | null | undefined) => (v === null ? undefined : v)

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        slug: data.slug,
        isPublished: data.isPublished,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        coverImage: clean(data.coverImage),
        category: clean(data.category),
        titleEn: data.titleEn,
        titleZh: clean(data.titleZh),
        titleEs: clean(data.titleEs),
        titleFr: clean(data.titleFr),
        titleAr: clean(data.titleAr),
        titleRu: clean(data.titleRu),
        excerptEn: clean(data.excerptEn),
        excerptZh: clean(data.excerptZh),
        excerptEs: clean(data.excerptEs),
        excerptFr: clean(data.excerptFr),
        excerptAr: clean(data.excerptAr),
        excerptRu: clean(data.excerptRu),
        contentEn: clean(data.contentEn),
        contentZh: clean(data.contentZh),
        contentEs: clean(data.contentEs),
        contentFr: clean(data.contentFr),
        contentAr: clean(data.contentAr),
        contentRu: clean(data.contentRu),
      },
    })

    return NextResponse.json({ success: true, post })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Update blog post error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.blogPost.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete blog post error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
