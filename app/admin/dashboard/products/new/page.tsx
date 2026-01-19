import ProductForm from '../ProductForm'

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Add New Product</h1>
        <p className="text-foreground/70">Create a new product for your catalog</p>
      </div>

      <ProductForm />
    </div>
  )
}
