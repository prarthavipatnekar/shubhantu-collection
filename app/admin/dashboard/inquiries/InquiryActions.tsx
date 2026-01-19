'use client'

import { useRouter } from 'next/navigation'
import { updateInquiryStatus } from '@/app/actions/admin'
import { useState } from 'react'

export default function InquiryActions({ inquiry }: { inquiry: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (status: string) => {
    setLoading(true)
    const result = await updateInquiryStatus(inquiry.id, status)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.message || 'Failed to update status')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <select
        value={inquiry.status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={loading}
        className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm disabled:opacity-50"
      >
        <option value="pending">Pending</option>
        <option value="responded">Responded</option>
        <option value="closed">Closed</option>
      </select>
    </div>
  )
}
