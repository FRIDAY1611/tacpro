import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Inquiries</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-600">Inquiry No</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">Company</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">Contact</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">Items</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
              <th className="text-right p-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="hover:bg-gray-50">
                <td className="p-4 text-sm font-mono">{inquiry.inquiryNo}</td>
                <td className="p-4">
                  <div className="font-medium">{inquiry.companyName}</div>
                  <div className="text-sm text-gray-500">{inquiry.country || '-'}</div>
                </td>
                <td className="p-4 text-sm">
                  <div>{inquiry.contactName}</div>
                  <div className="text-gray-500">{inquiry.email}</div>
                </td>
                <td className="p-4 text-sm">{inquiry.items.length}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    inquiry.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : inquiry.status === 'PROCESSING'
                      ? 'bg-blue-100 text-blue-800'
                      : inquiry.status === 'QUOTED'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {inquiry.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/inquiries/${inquiry.id}`}
                    className="text-primary hover:underline text-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 && (
          <div className="p-8 text-center text-gray-500">No inquiries found</div>
        )}
      </div>
    </div>
  )
}
