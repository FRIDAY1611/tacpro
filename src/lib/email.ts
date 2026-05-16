import nodemailer from 'nodemailer'

interface InquiryEmailData {
  inquiryNo: string
  companyName: string
  contactName: string
  email: string
  phone?: string | null
  country?: string | null
  address?: string | null
  message?: string | null
  targetDate?: string | null
  productName?: string | null
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
})

export async function sendInquiryEmail(data: InquiryEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL || 'wang@weartac.com'
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'WearTac'

  const productInfo = data.productName
    ? `\nInterested Product: ${data.productName}`
    : ''

  const text = `
New Inquiry Received - ${siteName}
====================================

Inquiry No: ${data.inquiryNo}
Date: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })}

Contact Information:
-------------------
Company: ${data.companyName}
Contact: ${data.contactName}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Country: ${data.country || 'N/A'}
Address: ${data.address || 'N/A'}
Target Delivery: ${data.targetDate || 'N/A'}
${productInfo}

Requirements:
-------------
${data.message || 'No specific requirements provided.'}

------------------------------------------
Please log into the admin panel to respond.
  `

  try {
    const info = await transporter.sendMail({
      from: `"${siteName} System" <${process.env.SMTP_FROM || adminEmail}>`,
      to: adminEmail,
      replyTo: data.email,
      subject: `[${siteName}] New Inquiry ${data.inquiryNo} from ${data.companyName}`,
      text,
    })
    console.log('Inquiry email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Failed to send inquiry email:', error)
    return false
  }
}