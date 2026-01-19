import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Product Not Found
        </h2>
        <p className="text-foreground/70 mb-8">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/products"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse All Products
          </Link>
          <Link
            href="/"
            className="bg-secondary hover:bg-accent text-secondary-foreground font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
