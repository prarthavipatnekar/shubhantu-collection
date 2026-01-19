import { getAllInquiries } from '@/app/actions/admin'
import InquiryActions from './InquiryActions'

export default async function AdminInquiriesPage() {
  const result = await getAllInquiries()

  if (!result.success || !result.inquiries) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600">Failed to load inquiries</p>
      </div>
    )
  }

  const inquiries = result.inquiries

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Customer Inquiries</h1>
        <p className="text-foreground/70">Manage customer messages and requests</p>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-12 text-center">
          <p className="text-foreground/70">No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-primary">
                      {inquiry.customer.firstName} {inquiry.customer.lastName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        inquiry.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : inquiry.status === 'responded'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-foreground/70">
                    {inquiry.customer.email && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <a
                          href={`mailto:${inquiry.customer.email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {inquiry.customer.email}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <a
                        href={`tel:${inquiry.customer.countryCode}${inquiry.customer.phoneNumber}`}
                        className="hover:text-primary transition-colors"
                      >
                        {inquiry.customer.countryCode} {inquiry.customer.phoneNumber}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>{new Date(inquiry.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <InquiryActions inquiry={inquiry} />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <p className="text-sm font-medium text-primary mb-2">Message:</p>
                <p className="text-foreground/80 whitespace-pre-wrap">{inquiry.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
