import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import CertificateForm from '../../_components/CertificateForm'

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cert = await prisma.certificate.findUnique({ where: { id } })

  if (!cert) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">编辑证书</h1>
      <CertificateForm
        initial={{
          ...cert,
          issuer: cert.issuer || '',
          issueDate: cert.issueDate || '',
          expiryDate: cert.expiryDate || '',
          image: cert.image || '',
          descriptionEn: cert.descriptionEn || '',
          descriptionZh: cert.descriptionZh || '',
        }}
      />
    </div>
  )
}
