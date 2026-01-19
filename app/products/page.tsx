import { getProducts, getCategories } from '@/app/actions/products'
import ProductCard from '@/app/components/ProductCard'
import Link from 'next/link'

export const metadata = {
  title: 'All Products - Shubhantu Collection',
  description: 'Browse our complete collection of premium products',
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg md:text-xl text-primary-foreground/90">
            Explore our curated collection of premium products
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:text-secondary transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Products</span>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold text-primary mb-4">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90"
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="px-4 py-2 bg-accent/20 text-primary rounded-lg font-medium transition-colors hover:bg-accent/30"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-foreground/70">
              Showing <span className="font-semibold text-primary">{products.length}</span> products
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-foreground/70 mb-4">
                No products found
              </p>
              <Link
                href="/"
                className="inline-block text-primary hover:text-secondary font-medium transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Contact us for custom orders or inquiries about specific products. We're here to help!
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
