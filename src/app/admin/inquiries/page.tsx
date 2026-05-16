import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  })

  const statusMap: Record<string, string> = {
    PENDING: '待处理',
    PROCESSING: '处理中',
    QUOTED: '已报价',
    CLOSED: '已关闭',
    SPAM: '垃圾询盘',
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">询盘管理</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-600">询盘编号</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">公司</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">联系人</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">产品数</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">状态</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">日期</th>
              <th className="text-right p-4 text-sm font-medium text-gray-600">操作</th>
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
                    {statusMap[inquiry.status] || inquiry.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(inquiry.createdAt).toLocaleDateString('zh-CN')}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/inquiries/${inquiry.id}`}
                    className="text-primary hover:underline text-sm"
                  >
                    查看
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 && (
          <div className="p-8 text-center text-gray-500">暂无询盘</div>
        )}
      </div>
    </div>
  )
}
