import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">资质证书</h1>
        <Link
          href="/admin/certificates/new"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          新增证书
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-600">排序</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">名称</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">颁发机构</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">有效期</th>
              <th className="text-right p-4 text-sm font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-gray-50">
                <td className="p-4 text-sm">{cert.sortOrder}</td>
                <td className="p-4">
                  <div className="font-medium">{cert.nameEn}</div>
                  <div className="text-sm text-gray-500">{cert.nameZh}</div>
                </td>
                <td className="p-4 text-sm">{cert.issuer || '-'}</td>
                <td className="p-4 text-sm">
                  {cert.issueDate || '-'} ~ {cert.expiryDate || '-'}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/certificates/${cert.id}/edit`}
                    className="text-primary hover:underline text-sm"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {certificates.length === 0 && (
          <div className="p-8 text-center text-gray-500">暂无证书</div>
        )}
      </div>
    </div>
  )
}
