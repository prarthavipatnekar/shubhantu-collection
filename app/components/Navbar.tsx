import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-white text-primary shadow-md fixed top-0 left-0 right-0 z-50 border-b-2 border-accent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/sc-logo.svg"
              alt="Shubhantu Collection"
              width={50}
              height={50}
              className="object-contain"
            />
          </Link>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="text-primary hover:text-secondary transition-colors font-medium"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-primary hover:text-secondary transition-colors font-medium"
            >
              Products
            </Link>

            <Link
              href="/contact"
              className="text-primary hover:text-secondary transition-colors font-medium"
            >
              Contact
            </Link>

            <Link
              href="/location"
              className="text-primary hover:text-secondary transition-colors"
              title="Find Us"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-primary">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
