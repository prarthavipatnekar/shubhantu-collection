import { getProductByIdAdmin } from '@/app/actions/admin'
import ProductForm from '../../ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getProductByIdAdmin(id)

  if (!result.success || !result.product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Edit Product</h1>
        <p className="text-foreground/70">Update product information</p>
      </div>

      <ProductForm product={result.product} />
    </div>
  )
}
