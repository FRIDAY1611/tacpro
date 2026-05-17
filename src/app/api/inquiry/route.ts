import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import { sendInquiryEmail } from '@/lib/email'

const inquirySchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  message: z.string().max(2000).optional(),
  targetDate: z.string().optional(),
  productSlug: z.string().nullable().optional(),
  locale: z.enum(['en', 'zh', 'es', 'fr', 'ar', 'ru']),
  _hp: z.string().max(0).optional(), // honeypot - must be empty
})

// Simple in-memory rate limiter (IP-based)
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3 // max submissions
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Honeypot check: if the hidden field is filled, it's a bot
    if (body._hp) {
      // Return success to not tip off bots, but don't save
      return NextResponse.json({ success: true, inquiryNo: 'INQ-VERIFIED' })
    }

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

    // Send email notification
    let emailSent = false
    let emailError: string | null = null
    try {
      emailSent = await sendInquiryEmail({
        inquiryNo: inquiry.inquiryNo,
        companyName: inquiry.companyName,
        contactName: inquiry.contactName,
        email: inquiry.email,
        phone: inquiry.phone,
        country: inquiry.country,
        address: inquiry.address,
        message: inquiry.message,
        targetDate: inquiry.targetDate,
        productName: product ? `${product.nameEn} (${product.sku || ''})` : null,
      })
    } catch (err) {
      emailError = err instanceof Error ? err.message : String(err)
      console.error('Email send failed:', emailError)
    }

    return NextResponse.json({
      success: true,
      inquiryNo: inquiry.inquiryNo,
      emailSent,
      ...(emailError ? { emailError } : {}),
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