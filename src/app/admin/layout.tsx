import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')

  if (!adminSession && !process.env.ADMIN_BYPASS) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">WearTac Admin</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/admin/products" className="hover:text-gray-300">Products</a>
            <a href="/admin/blog" className="hover:text-gray-300">Blog</a>
            <a href="/admin/inquiries" className="hover:text-gray-300">Inquiries</a>
            <form action="/admin/api/logout" method="post">
              <button type="submit" className="hover:text-gray-300">Logout</button>
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
