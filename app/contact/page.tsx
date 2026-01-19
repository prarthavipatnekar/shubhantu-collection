import ContactForm from '@/app/components/ContactForm'
import Link from 'next/link'

export const metadata = {
  title: 'Contact Us - Shubhantu Collection',
  description: 'Get in touch with us for inquiries about our products',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-primary-foreground/90">
            We'd love to hear from you. Send us a message!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Get In Touch
              </h2>
              <p className="text-foreground/80 mb-8">
                Have questions about our products? Want to place a custom order?
                Fill out the form and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Business Hours
                  </h3>
                  <p className="text-foreground/70">
                    Monday - Saturday: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-foreground/70">Sunday: Closed</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      Premium quality products
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      Fast response time
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      Custom orders available
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      Competitive pricing
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-accent/20">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/"
            className="inline-block text-primary hover:text-secondary font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
