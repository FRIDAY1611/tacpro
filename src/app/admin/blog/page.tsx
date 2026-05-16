import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">博客管理</h1>
        <Link
          href="/admin/blog/new"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          新增文章
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-600">标题</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">分类</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">状态</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">发布日期</th>
              <th className="text-right p-4 text-sm font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium">{post.titleEn}</div>
                  <div className="text-sm text-gray-500">{post.slug}</div>
                </td>
                <td className="p-4 text-sm">{post.category || '-'}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      post.isPublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {post.isPublished ? '已发布' : '草稿'}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('zh-CN')
                    : '-'}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-primary hover:underline text-sm"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="p-8 text-center text-gray-500">暂无文章</div>
        )}
      </div>
    </div>
  )
}
