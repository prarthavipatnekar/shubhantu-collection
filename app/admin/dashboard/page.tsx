import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboardPage() {
  // Get statistics
  const [totalProducts, publishedProducts, featuredProducts, totalInquiries, pendingInquiries] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { published: true } }),
      prisma.product.count({ where: { featured: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'pending' } }),
    ])

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      href: '/admin/dashboard/products',
      color: 'bg-blue-500',
    },
    {
      label: 'Published Products',
      value: publishedProducts,
      href: '/admin/dashboard/products',
      color: 'bg-green-500',
    },
    {
      label: 'Featured Products',
      value: featuredProducts,
      href: '/admin/dashboard/products',
      color: 'bg-purple-500',
    },
    {
      label: 'Total Inquiries',
      value: totalInquiries,
      href: '/admin/dashboard/inquiries',
      color: 'bg-orange-500',
    },
    {
      label: 'Pending Inquiries',
      value: pendingInquiries,
      href: '/admin/dashboard/inquiries',
      color: 'bg-red-500',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
        <p className="text-foreground/70">Welcome to the admin dashboard</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg`}></div>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
            <div className="text-sm text-foreground/70">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/dashboard/products/new"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-colors text-center"
          >
            Add New Product
          </Link>
          <Link
            href="/admin/dashboard/products"
            className="bg-secondary hover:bg-accent text-secondary-foreground font-semibold px-6 py-3 rounded-lg transition-colors text-center"
          >
            Manage Products
          </Link>
          <Link
            href="/admin/dashboard/inquiries"
            className="bg-accent hover:bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-lg transition-colors text-center"
          >
            View Inquiries
          </Link>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-primary">Recent Inquiries</h2>
          <Link
            href="/admin/dashboard/inquiries"
            className="text-sm text-primary hover:text-secondary transition-colors"
          >
            View All →
          </Link>
        </div>

        {pendingInquiries > 0 ? (
          <div className="text-foreground/70">
            You have {pendingInquiries} pending inquir{pendingInquiries === 1 ? 'y' : 'ies'} to
            review.
          </div>
        ) : (
          <div className="text-foreground/70">No pending inquiries.</div>
        )}
      </div>
    </div>
  )
}
