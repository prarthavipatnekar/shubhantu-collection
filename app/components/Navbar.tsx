import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-white text-primary shadow-md sticky top-0 z-50 border-b-2 border-accent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Shubhantu Collection Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-primary">Shubhantu Collection</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
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
