import { redirect } from 'next/navigation'
import { checkAdminAuth, logoutAdmin } from '@/app/actions/admin'
import Link from 'next/link'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAdmin = await checkAdminAuth()

  if (!isAdmin) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin/dashboard" className="text-xl font-bold">
                Admin Dashboard
              </Link>
              <Link
                href="/admin/dashboard/products"
                className="hover:text-secondary transition-colors"
              >
                Products
              </Link>
              <Link
                href="/admin/dashboard/inquiries"
                className="hover:text-secondary transition-colors"
              >
                Inquiries
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="hover:text-secondary transition-colors text-sm"
              >
                View Website →
              </Link>
              <form action={logoutAdmin}>
                <button
                  type="submit"
                  className="bg-secondary hover:bg-accent text-secondary-foreground px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
