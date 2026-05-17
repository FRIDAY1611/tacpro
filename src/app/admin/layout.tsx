export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">WearTac 后台管理</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/admin" className="hover:text-gray-300">仪表盘</a>
            <a href="/admin/products" className="hover:text-gray-300">产品</a>
            <a href="/admin/categories" className="hover:text-gray-300">分类</a>
            <a href="/admin/certificates" className="hover:text-gray-300">资质</a>
            <a href="/admin/blog" className="hover:text-gray-300">博客</a>
            <a href="/admin/inquiries" className="hover:text-gray-300">询盘</a>
            <form action="/admin/api/logout" method="post">
              <button type="submit" className="hover:text-gray-300">退出</button>
            </form>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
