'use client'

import { useRouter } from 'next/navigation'
import { deleteProduct, toggleProductPublished, toggleProductFeatured } from '@/app/actions/admin'
import { useState } from 'react'

export default function ProductActions({ product }: { product: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      return
    }

    setLoading(true)
    const result = await deleteProduct(product.id)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.message || 'Failed to delete product')
      setLoading(false)
    }
  }

  const handleTogglePublished = async () => {
    setLoading(true)
    const result = await toggleProductPublished(product.id)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.message || 'Failed to update product')
      setLoading(false)
    }
  }

  const handleToggleFeatured = async () => {
    setLoading(true)
    const result = await toggleProductFeatured(product.id)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.message || 'Failed to update product')
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={`/admin/dashboard/products/${product.id}/edit`}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        Edit
      </a>

      <button
        onClick={handleTogglePublished}
        disabled={loading}
        className="text-green-600 hover:text-green-800 font-medium disabled:opacity-50"
      >
        {product.published ? 'Unpublish' : 'Publish'}
      </button>

      <button
        onClick={handleToggleFeatured}
        disabled={loading}
        className="text-purple-600 hover:text-purple-800 font-medium disabled:opacity-50"
      >
        {product.featured ? 'Unfeature' : 'Feature'}
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  )
}
