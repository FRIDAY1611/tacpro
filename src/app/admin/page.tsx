import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [productCount, inquiryCount, pendingInquiryCount] = await Promise.all([
    prisma.product.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'PENDING' } }),
  ])

  const recentInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-primary">{productCount}</div>
          <div className="text-gray-600">Total Products</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-primary">{inquiryCount}</div>
          <div className="text-gray-600">Total Inquiries</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-orange-500">{pendingInquiryCount}</div>
          <div className="text-gray-600">Pending Inquiries</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-primary hover:underline text-sm">
            View All
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {recentInquiries.map((inquiry) => (
            <div key={inquiry.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">{inquiry.companyName}</div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  inquiry.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : inquiry.status === 'PROCESSING'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {inquiry.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {inquiry.contactName} · {inquiry.email} · {inquiry.items.length} items
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {inquiry.inquiryNo} · {new Date(inquiry.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          {recentInquiries.length === 0 && (
            <div className="p-6 text-gray-500 text-center">No inquiries yet</div>
          )}
        </div>
      </div>
    </div>
  )
}
