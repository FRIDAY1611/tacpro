import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const inquiryUpdateSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'QUOTED', 'CLOSED', 'SPAM']).optional(),
  internalNotes: z.string().optional().nullable(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = inquiryUpdateSchema.parse(body)

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        ...(data.status && { status: data.status }),
        ...(data.internalNotes !== undefined && { internalNotes: data.internalNotes }),
      },
    })

    return NextResponse.json({ success: true, inquiry })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Update inquiry error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}
