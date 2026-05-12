import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const productSchema = z.object({
  slug: z.string().min(1),
  sku: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().default(0),
  categoryId: z.string().optional().nullable(),
  moq: z.number().optional().nullable(),
  isCustomizable: z.boolean().default(true),
  mainImage: z.string().optional().nullable(),
  images: z.string().optional().nullable(),
  drawing: z.string().optional().nullable(),
  specifications: z.string().optional().nullable(),
  nameEn: z.string().min(1),
  nameZh: z.string().optional().nullable(),
  nameEs: z.string().optional().nullable(),
  nameFr: z.string().optional().nullable(),
  nameAr: z.string().optional().nullable(),
  nameRu: z.string().optional().nullable(),
  descriptionEn: z.string().optional().nullable(),
  descriptionZh: z.string().optional().nullable(),
  descriptionEs: z.string().optional().nullable(),
  descriptionFr: z.string().optional().nullable(),
  descriptionAr: z.string().optional().nullable(),
  descriptionRu: z.string().optional().nullable(),
  shortDescEn: z.string().optional().nullable(),
  shortDescZh: z.string().optional().nullable(),
  shortDescEs: z.string().optional().nullable(),
  shortDescFr: z.string().optional().nullable(),
  shortDescAr: z.string().optional().nullable(),
  shortDescRu: z.string().optional().nullable(),
  metaTitleEn: z.string().optional().nullable(),
  metaTitleZh: z.string().optional().nullable(),
  metaTitleEs: z.string().optional().nullable(),
  metaTitleFr: z.string().optional().nullable(),
  metaTitleAr: z.string().optional().nullable(),
  metaTitleRu: z.string().optional().nullable(),
  metaDescEn: z.string().optional().nullable(),
  metaDescZh: z.string().optional().nullable(),
  metaDescEs: z.string().optional().nullable(),
  metaDescFr: z.string().optional().nullable(),
  metaDescAr: z.string().optional().nullable(),
  metaDescRu: z.string().optional().nullable(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = productSchema.parse(body)

    const clean = (v: string | null | undefined) => (v === null ? undefined : v)

    const product = await prisma.product.update({
      where: { id },
      data: {
        slug: data.slug,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        sortOrder: data.sortOrder,
        isCustomizable: data.isCustomizable,
        sku: clean(data.sku),
        categoryId: clean(data.categoryId),
        moq: data.moq ?? undefined,
        mainImage: clean(data.mainImage),
        images: clean(data.images),
        drawing: clean(data.drawing),
        specifications: clean(data.specifications),
        nameEn: data.nameEn,
        nameZh: clean(data.nameZh),
        nameEs: clean(data.nameEs),
        nameFr: clean(data.nameFr),
        nameAr: clean(data.nameAr),
        nameRu: clean(data.nameRu),
        descriptionEn: clean(data.descriptionEn),
        descriptionZh: clean(data.descriptionZh),
        descriptionEs: clean(data.descriptionEs),
        descriptionFr: clean(data.descriptionFr),
        descriptionAr: clean(data.descriptionAr),
        descriptionRu: clean(data.descriptionRu),
        shortDescEn: clean(data.shortDescEn),
        shortDescZh: clean(data.shortDescZh),
        shortDescEs: clean(data.shortDescEs),
        shortDescFr: clean(data.shortDescFr),
        shortDescAr: clean(data.shortDescAr),
        shortDescRu: clean(data.shortDescRu),
        metaTitleEn: clean(data.metaTitleEn),
        metaTitleZh: clean(data.metaTitleZh),
        metaTitleEs: clean(data.metaTitleEs),
        metaTitleFr: clean(data.metaTitleFr),
        metaTitleAr: clean(data.metaTitleAr),
        metaTitleRu: clean(data.metaTitleRu),
        metaDescEn: clean(data.metaDescEn),
        metaDescZh: clean(data.metaDescZh),
        metaDescEs: clean(data.metaDescEs),
        metaDescFr: clean(data.metaDescFr),
        metaDescAr: clean(data.metaDescAr),
        metaDescRu: clean(data.metaDescRu),
      },
    })

    return NextResponse.json({ success: true, product })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Update product error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
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
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
