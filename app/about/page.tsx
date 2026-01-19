import Link from 'next/link'

export const metadata = {
  title: 'About Us - Shubhantu Collection',
  description: 'Learn more about Shubhantu Collection and our commitment to quality',
}

export default function AboutPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Shubhantu Collection'

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl text-primary-foreground/90">
            Discover the story behind {storeName}
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
            <span className="text-gray-600">About</span>
          </div>
        </div>
      </div>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {/* Our Story */}
            <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-8">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
              <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
                <p>
                  Welcome to {storeName}, where quality meets elegance. We are dedicated to bringing
                  you a carefully curated selection of premium products that reflect both style and
                  substance.
                </p>
                <p>
                  Founded with a passion for excellence, we strive to provide our customers with
                  products that not only meet but exceed their expectations. Each item in our
                  collection is selected with care, ensuring that it represents the highest standards
                  of craftsmanship and design.
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-8">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
              <div className="prose prose-lg max-w-none text-foreground/80">
                <p>
                  Our mission is to provide exceptional products and outstanding customer service. We
                  believe in building lasting relationships with our customers through trust,
                  quality, and reliability.
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-8">
              <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-lg mb-2">Quality Products</h3>
                    <p className="text-foreground/70">
                      We carefully select each product to ensure it meets our high standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-lg mb-2">Timely Service</h3>
                    <p className="text-foreground/70">
                      We value your time and ensure prompt responses to all inquiries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-lg mb-2">
                      Customer Satisfaction
                    </h3>
                    <p className="text-foreground/70">
                      Your satisfaction is our priority. We're here to help every step of the way.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-lg mb-2">
                      Personalized Experience
                    </h3>
                    <p className="text-foreground/70">
                      We provide personalized recommendations and assistance tailored to your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-primary text-primary-foreground rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="mb-6">
                Have questions or want to learn more? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-secondary hover:bg-accent text-secondary-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/location"
                  className="inline-block bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Visit Our Store
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
