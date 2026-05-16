import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const categorySchema = z.object({
  slug: z.string().min(1),
  sortOrder: z.number().default(0),
  nameEn: z.string().min(1),
  nameZh: z.string().min(1),
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
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = categorySchema.parse(body)

    const category = await prisma.category.create({
      data: {
        slug: data.slug,
        sortOrder: data.sortOrder,
        nameEn: data.nameEn,
        nameZh: data.nameZh,
        nameEs: data.nameEs || undefined,
        nameFr: data.nameFr || undefined,
        nameAr: data.nameAr || undefined,
        nameRu: data.nameRu || undefined,
        descriptionEn: data.descriptionEn || undefined,
        descriptionZh: data.descriptionZh || undefined,
        descriptionEs: data.descriptionEs || undefined,
        descriptionFr: data.descriptionFr || undefined,
        descriptionAr: data.descriptionAr || undefined,
        descriptionRu: data.descriptionRu || undefined,
      },
    })

    return NextResponse.json({ success: true, category })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Create category error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
