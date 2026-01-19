import Link from 'next/link'

export const metadata = {
  title: 'Find Us - Shubhantu Collection',
  description: 'Visit our store location and get in touch with us',
}

export default function LocationPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Shubhantu Collection'
  const proprietor = process.env.NEXT_PUBLIC_STORE_PROPRIETOR
  const addressLine1 = process.env.NEXT_PUBLIC_STORE_ADDRESS_LINE1 || '[Your Store Address]'
  const addressLine2 = process.env.NEXT_PUBLIC_STORE_ADDRESS_LINE2 || '[City, State]'
  const addressLine3 = process.env.NEXT_PUBLIC_STORE_ADDRESS_LINE3 || '[PIN Code, India]'
  const phone = process.env.NEXT_PUBLIC_STORE_PHONE || '+91 [Your Phone Number]'
  const email = process.env.NEXT_PUBLIC_STORE_EMAIL
  const hoursWeekday = process.env.NEXT_PUBLIC_STORE_HOURS_WEEKDAY || 'Monday - Saturday: 10:00 AM - 8:00 PM'
  const hoursWeekend = process.env.NEXT_PUBLIC_STORE_HOURS_WEEKEND || 'Sunday: 11:00 AM - 6:00 PM'
  const mapsEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Us</h1>
          <p className="text-lg md:text-xl text-primary-foreground/90">
            Visit our store or reach out to us
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
            <span className="text-gray-600">Location</span>
          </div>
        </div>
      </div>

      {/* Map and Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map - Left Side */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden border-2 border-accent/20">
                {mapsEmbedUrl ? (
                  <iframe
                    src={mapsEmbedUrl}
                    width="100%"
                    height="600"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${storeName} Location`}
                  ></iframe>
                ) : (
                  <div className="aspect-square w-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center p-8">
                      <svg
                        className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
                      <p className="text-gray-500 text-sm mb-2 font-medium">
                        Map Not Configured
                      </p>
                      <p className="text-gray-400 text-xs">
                        Add NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL to .env
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-foreground/60 text-center">
                Get directions to our store
              </p>
            </div>

            {/* Store Details - Right Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Visit Our Store</h2>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  We'd love to see you at our store. Come visit us to explore our complete collection
                  and get personalized assistance from our team.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {proprietor && (
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
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary text-lg mb-2">Proprietor</h3>
                      <p className="text-foreground/70">{proprietor}</p>
                    </div>
                  </div>
                )}

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
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-lg mb-2">Address</h3>
                    <p className="text-foreground/70">
                      {addressLine1}<br />
                      {addressLine2}<br />
                      {addressLine3}
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
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-lg mb-2">Phone</h3>
                    <p className="text-foreground/70">
                      <a href={`tel:${phone}`} className="hover:text-secondary transition-colors">
                        {phone}
                      </a>
                    </p>
                  </div>
                </div>

                {email && (
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
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary text-lg mb-2">Email</h3>
                      <p className="text-foreground/70">
                        <a href={`mailto:${email}`} className="hover:text-secondary transition-colors">
                          {email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

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
                    <h3 className="font-semibold text-primary text-lg mb-2">Business Hours</h3>
                    <p className="text-foreground/70">
                      {hoursWeekday}<br />
                      {hoursWeekend}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
