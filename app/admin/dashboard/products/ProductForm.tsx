'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/app/actions/admin'

type ProductFormData = {
  name: string
  description: string
  price: string
  costPrice: string
  category: string
  material: string
  size: string
  additionalInfo: string[]
  images: string[]
  sku: string
  stock: number
  supplier: string
  featured: boolean
  published: boolean
  internalNotes: string
}

export default function ProductForm({ product }: { product?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    costPrice: product?.costPrice?.toString() || '',
    category: product?.category || '',
    material: product?.material || '',
    size: product?.size || '',
    additionalInfo: product?.additionalInfo || [],
    images: product?.images || [''],
    sku: product?.sku || '',
    stock: product?.stock || 0,
    supplier: product?.supplier || '',
    featured: product?.featured || false,
    published: product?.published ?? true,
    internalNotes: product?.internalNotes || '',
  })

  const [additionalInfoText, setAdditionalInfoText] = useState(
    product?.additionalInfo?.join('\n') || ''
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData((prev) => ({ ...prev, images: newImages }))
  }

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }))
  }

  const removeImageField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Process additional info
      const additionalInfo = additionalInfoText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)

      // Filter out empty images
      const images = formData.images.filter((img) => img.trim().length > 0)

      if (images.length === 0) {
        setError('At least one image URL is required')
        setLoading(false)
        return
      }

      const submitData = {
        ...formData,
        images,
        additionalInfo,
      }

      const result = product
        ? await updateProduct(product.id, submitData)
        : await createProduct(submitData)

      if (result.success) {
        router.push('/admin/dashboard/products')
        router.refresh()
      } else {
        setError(result.message || 'Failed to save product')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-primary mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-primary mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Selling Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Cost Price (₹)</label>
            <input
              type="number"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Material</label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="e.g., Cotton, Silk, Wood"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="e.g., M, L, 10x15 cm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-primary mb-2">
              Additional Information (one per line)
            </label>
            <textarea
              value={additionalInfoText}
              onChange={(e) => setAdditionalInfoText(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Enter additional details, one per line"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Product Images *</h2>
        <div className="space-y-3">
          {formData.images.map((image, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required={index === 0}
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-accent"
          >
            Add Another Image
          </button>
        </div>
        <p className="text-sm text-foreground/60 mt-2">
          Enter image URLs. First image will be the primary image.
        </p>
      </div>

      {/* Inventory */}
      <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-primary mb-2">Internal Notes</label>
            <textarea
              name="internalNotes"
              value={formData.internalNotes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Private notes for internal use only"
            />
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white rounded-lg shadow-md border-2 border-accent/20 p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Display Settings</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-foreground">
              Publish (show on website)
            </span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-foreground">
              Featured (show on homepage)
            </span>
          </label>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
        <a
          href="/admin/dashboard/products"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
