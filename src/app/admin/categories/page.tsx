import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">分类管理</h1>
        <Link
          href="/admin/categories/new"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          新增分类
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-600">排序</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">名称（英文）</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">名称（中文）</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">URL标识</th>
              <th className="text-right p-4 text-sm font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="p-4 text-sm">{cat.sortOrder}</td>
                <td className="p-4 font-medium">{cat.nameEn}</td>
                <td className="p-4 text-sm">{cat.nameZh}</td>
                <td className="p-4 text-sm font-mono">{cat.slug}</td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/categories/${cat.id}/edit`}
                    className="text-primary hover:underline text-sm"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <div className="p-8 text-center text-gray-500">暂无分类</div>
        )}
      </div>
    </div>
  )
}
