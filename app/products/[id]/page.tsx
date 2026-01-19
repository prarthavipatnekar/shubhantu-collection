import { getProductById, getProducts } from '@/app/actions/products'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} - Shubhantu Collection`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:text-secondary transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-primary hover:text-secondary transition-colors">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-accent/20">
                <Image
                  src={product.images[0] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-lg border-2 border-accent/20 cursor-pointer hover:border-secondary transition-colors"
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div>
                <span className="inline-block px-3 py-1 bg-accent/20 text-primary rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="inline-block ml-2 px-3 py-1 bg-secondary/20 text-primary rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                {product.name}
              </h1>

              {/* Price */}
              <div className="text-3xl font-bold text-secondary">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Contact CTA */}
              <div className="space-y-4">
                <p className="text-foreground/70">
                  Interested in this product? Get in touch with us!
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-colors text-center"
                >
                  Contact Us
                </Link>
              </div>

              {/* Specifications */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-primary text-lg">Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-foreground/60">Category:</span>
                    <span className="font-medium text-foreground">{product.category}</span>
                  </div>
                  {product.material && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-foreground/60">Material:</span>
                      <span className="font-medium text-foreground">{product.material}</span>
                    </div>
                  )}
                  {product.size && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-foreground/60">Size:</span>
                      <span className="font-medium text-foreground">{product.size}</span>
                    </div>
                  )}
                  {product.additionalInfo && product.additionalInfo.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-foreground/60 mb-2">Additional Information:</h4>
                      <ul className="space-y-1">
                        {product.additionalInfo.map((info, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-secondary mt-1">•</span>
                            <span className="text-foreground">{info}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/products"
            className="inline-block text-primary hover:text-secondary font-medium transition-colors"
          >
            ← Back to All Products
          </Link>
        </div>
      </section>
    </div>
  )
}
