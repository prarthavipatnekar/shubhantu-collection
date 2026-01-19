import Link from 'next/link'
import Image from 'next/image'

type Product = {
  id: string
  name: string
  description: string
  price: number | { toString: () => string }
  images: string[]
  category: string
  featured?: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  const priceValue = typeof product.price === 'number'
    ? product.price
    : parseFloat(product.price.toString())

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-accent group">
        {/* Product Image */}
        <div className="relative h-64 bg-gray-100">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {product.featured && (
            <span className="absolute top-2 right-2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ₹{priceValue.toLocaleString('en-IN')}
            </span>
            <span className="text-xs bg-accent/20 text-primary px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
