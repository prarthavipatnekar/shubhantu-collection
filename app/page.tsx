import { getProducts, getFeaturedProducts, getCategories } from './actions/products'
import ProductCard from './components/ProductCard'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default async function Home() {
  const [featuredProducts, allProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getProducts(),
    getCategories(),
  ])

  return (
    <div className="bg-background">
      {/* Hero Section - Full Screen */}
      <section className="h-screen bg-primary text-primary-foreground flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to Shubhantu Collection
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Discover our curated selection of premium products
          </p>
          <Link
            href="/products"
            className="inline-block bg-secondary hover:bg-accent text-secondary-foreground font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
              Featured Products
            </h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-7xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
              Shop by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="bg-white hover:bg-accent/10 border-2 border-accent text-primary font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            All Products
          </h2>
          {allProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">
              No products available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-4">Shubhantu Collection</p>
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/contact" className="hover:text-secondary transition-colors">
              Contact
            </Link>
            <Link href="/about" className="hover:text-secondary transition-colors">
              About
            </Link>
          </div>
          <p className="text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} Shubhantu Collection. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
