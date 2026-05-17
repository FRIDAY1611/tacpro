'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Loader2 } from 'lucide-react'
import { ToastContainer } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

const inquirySchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  message: z.string().max(2000).optional(),
  targetDate: z.string().optional(),
  _hp: z.string().max(0).optional(),
})

type InquiryFormData = z.infer<typeof inquirySchema>

interface InquiryFormProps {
  locale: string
  messages: {
    title: string
    subtitle: string
    form: {
      companyName: string
      contactName: string
      email: string
      phone: string
      country: string
      address: string
      message: string
      messagePlaceholder: string
      targetDate: string
      submit: string
    }
    success: {
      title: string
      message: string
      inquiryNo: string
    }
  }
}

export function InquiryForm({ locale, messages }: InquiryFormProps) {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('product')
  const { toasts, addToast, removeToast } = useToast()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [inquiryNo, setInquiryNo] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  })

  const onSubmit = async (data: InquiryFormData) => {
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, productSlug, locale }),
      })

      if (!response.ok) {
        const error = await response.json()
        const msg = error.errors
          ? error.errors.map((e: any) => e.path?.join('.') + ': ' + e.message).join('; ')
          : error.error || 'Submission failed'
        addToast(msg, 'error')
        console.error('Inquiry 400 details:', error)
        return
      }

      const result = await response.json()
      setInquiryNo(result.inquiryNo)
      setIsSubmitted(true)
      addToast(
        locale === 'zh' ? '询盘提交成功！' : 'Inquiry submitted successfully!',
        'success'
      )
    } catch {
      addToast(
        locale === 'zh' ? '提交失败，请重试' : 'Submission failed, please try again',
        'error'
      )
    }
  }

  if (isSubmitted) {
    return (
      <Card className="text-center p-12 border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{messages.success.title}</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">{messages.success.message}</p>
          {inquiryNo && (
            <div className="bg-gray-50 rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-500 mb-1">{messages.success.inquiryNo}</p>
              <p className="text-xl font-mono font-bold text-primary">{inquiryNo}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl">{messages.title}</CardTitle>
          <p className="text-gray-600 mt-2">{messages.subtitle}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot - invisible to users, traps bots */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <Label htmlFor="_hp">Website</Label>
              <Input id="_hp" tabIndex={-1} autoComplete="off" {...register('_hp')} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">{messages.form.companyName} *</Label>
                <Input
                  id="companyName"
                  {...register('companyName')}
                  className={errors.companyName ? 'border-red-500' : ''}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">{errors.companyName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName">{messages.form.contactName} *</Label>
                <Input
                  id="contactName"
                  {...register('contactName')}
                  className={errors.contactName ? 'border-red-500' : ''}
                />
                {errors.contactName && (
                  <p className="text-sm text-red-500">{errors.contactName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{messages.form.email} *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{messages.form.phone}</Label>
                <Input id="phone" {...register('phone')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">{messages.form.country}</Label>
                <Input id="country" {...register('country')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">{messages.form.targetDate}</Label>
                <Input id="targetDate" type="date" {...register('targetDate')} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{messages.form.address}</Label>
              <Input id="address" {...register('address')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{messages.form.message}</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder={messages.form.messagePlaceholder}
                {...register('message')}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full md:w-auto h-12 px-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {locale === 'zh' ? '提交中...' : 'Submitting...'}
                </>
              ) : (
                messages.form.submit
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}