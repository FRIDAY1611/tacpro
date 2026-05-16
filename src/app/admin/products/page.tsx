import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">产品管理</h1>
        <Link
          href="/admin/products/new"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          新增产品
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-600">产品名称</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">分类</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">SKU</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">起订量</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">状态</th>
              <th className="text-right p-4 text-sm font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium">{product.nameEn}</div>
                  <div className="text-sm text-gray-500">{product.nameZh}</div>
                </td>
                <td className="p-4 text-sm">
                  {product.category?.nameZh || product.category?.nameEn || '未分类'}
                </td>
                <td className="p-4 text-sm">{product.sku || '-'}</td>
                <td className="p-4 text-sm">{product.moq || '-'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.isActive ? '已上架' : '已下架'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-primary hover:underline text-sm"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="p-8 text-center text-gray-500">暂无产品</div>
        )}
      </div>
    </div>
  )
}
