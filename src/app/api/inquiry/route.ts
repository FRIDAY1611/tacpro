import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'
import { z } from 'zod'

const inquirySchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  message: z.string().max(2000).optional(),
  targetDate: z.string().optional(),
  productSlug: z.string().optional(),
  locale: z.enum(['en', 'zh']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = inquirySchema.parse(body)

    // Generate inquiry number
    const inquiryNo = `INQ-${Date.now()}-${nanoid(6).toUpperCase()}`

    // Get product info if provided
    let product = null
    if (validated.productSlug) {
      product = await prisma.product.findUnique({
        where: { slug: validated.productSlug },
      })
    }

    // Create inquiry
    const inquiry = await prisma.inquiry.create({
      data: {
        inquiryNo,
        companyName: validated.companyName,
        contactName: validated.contactName,
        email: validated.email,
        phone: validated.phone,
        country: validated.country,
        address: validated.address,
        message: validated.message,
        targetDate: validated.targetDate,
        items: product
          ? {
              create: {
                productId: product.id,
                productNameEn: product.nameEn,
                productNameZh: product.nameZh || undefined,
                productSku: product.sku || undefined,
              },
            }
          : undefined,
      },
      include: { items: true },
    })

    // TODO: Send email notification
    // await sendInquiryEmail(inquiry)

    return NextResponse.json({
      success: true,
      inquiryNo: inquiry.inquiryNo,
    })
  } catch (error) {
    console.error('Inquiry submission error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Submission failed' },
      { status: 500 }
    )
  }
}
