import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const certSchema = z.object({
  slug: z.string().min(1),
  sortOrder: z.number().default(0),
  nameEn: z.string().min(1),
  nameZh: z.string().min(1),
  issuer: z.string().optional().nullable(),
  issueDate: z.string().optional().nullable(),
  expiryDate: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  descriptionEn: z.string().optional().nullable(),
  descriptionZh: z.string().optional().nullable(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = certSchema.parse(body)

    const cert = await prisma.certificate.create({
      data: {
        slug: data.slug,
        sortOrder: data.sortOrder,
        nameEn: data.nameEn,
        nameZh: data.nameZh,
        issuer: data.issuer || undefined,
        issueDate: data.issueDate || undefined,
        expiryDate: data.expiryDate || undefined,
        image: data.image || undefined,
        descriptionEn: data.descriptionEn || undefined,
        descriptionZh: data.descriptionZh || undefined,
      },
    })

    return NextResponse.json({ success: true, certificate: cert })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Create certificate error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create certificate' },
      { status: 500 }
    )
  }
}
