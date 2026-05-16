import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  })

  if (!inquiry) {
    notFound()
  }

  const statusMap: Record<string, string> = {
    PENDING: '待处理',
    PROCESSING: '处理中',
    QUOTED: '已报价',
    CLOSED: '已关闭',
    SPAM: '垃圾询盘',
  }

  const statusColor: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    QUOTED: 'bg-purple-100 text-purple-800',
    CLOSED: 'bg-green-100 text-green-800',
    SPAM: 'bg-gray-100 text-gray-800',
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/inquiries" className="text-primary hover:underline text-sm">
          ← 返回询盘列表
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">询盘详情</h1>
        <span className={`px-3 py-1 text-sm rounded-full ${statusColor[inquiry.status]}`}>
          {statusMap[inquiry.status] || inquiry.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">公司信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">公司名称</div>
                <div className="font-medium">{inquiry.companyName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">联系人</div>
                <div className="font-medium">{inquiry.contactName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">邮箱</div>
                <div className="font-medium">{inquiry.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">电话</div>
                <div className="font-medium">{inquiry.phone || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">国家/地区</div>
                <div className="font-medium">{inquiry.country || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">地址</div>
                <div className="font-medium">{inquiry.address || '-'}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">需求详情</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">期望交期</div>
                <div>{inquiry.targetDate || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">需求描述</div>
                <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md mt-1">{inquiry.message || '-'}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">产品清单 ({inquiry.items.length})</h2>
            {inquiry.items.length === 0 ? (
              <div className="text-gray-500">无产品</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {inquiry.items.map((item) => (
                  <div key={item.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{item.productNameEn}</div>
                      {item.product && (
                        <Link href={`/admin/products/${item.product.id}/edit`} className="text-primary hover:underline text-sm">
                          查看产品
                        </Link>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      SKU: {item.productSku || '-'} · 数量: {item.quantity || '-'} {item.unit || ''}
                    </div>
                    {item.requirements && (
                      <div className="text-sm text-gray-600 mt-2">{item.requirements}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">询盘信息</h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">询盘编号</div>
                <div className="font-mono">{inquiry.inquiryNo}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">提交时间</div>
                <div>{new Date(inquiry.createdAt).toLocaleString('zh-CN')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">来源</div>
                <div>{inquiry.source || '网站'}</div>
              </div>
            </div>
          </div>

          {inquiry.internalNotes && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">内部备注</h2>
              <div className="whitespace-pre-wrap text-sm">{inquiry.internalNotes}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
