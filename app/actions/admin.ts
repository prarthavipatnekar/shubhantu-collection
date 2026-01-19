'use server'

import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { z } from 'zod'

// Session management
const ADMIN_SESSION_COOKIE = 'admin_session'

export async function verifyAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return { success: false, message: 'Admin password not configured' }
  }

  if (password === adminPassword) {
    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return { success: true }
  }

  return { success: false, message: 'Invalid password' }
}

export async function checkAdminAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  return !!session
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
  return { success: true }
}

// Product Management
const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(0, 'Price must be positive'),
  costPrice: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  material: z.string().optional(),
  size: z.string().optional(),
  additionalInfo: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  sku: z.string().optional(),
  stock: z.number().int().min(0).default(0),
  supplier: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  internalNotes: z.string().optional(),
})

export async function getAllProductsAdmin() {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { success: true, products }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { success: false, message: 'Failed to fetch products' }
  }
}

export async function getProductByIdAdmin(id: string) {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return { success: false, message: 'Product not found' }
    }

    return { success: true, product }
  } catch (error) {
    console.error('Error fetching product:', error)
    return { success: false, message: 'Failed to fetch product' }
  }
}

export async function createProduct(data: z.infer<typeof productSchema>) {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    const validatedData = productSchema.parse(data)

    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        costPrice: validatedData.costPrice || null,
        category: validatedData.category,
        material: validatedData.material || null,
        size: validatedData.size || null,
        additionalInfo: validatedData.additionalInfo || [],
        images: validatedData.images,
        sku: validatedData.sku || null,
        stock: validatedData.stock,
        supplier: validatedData.supplier || null,
        featured: validatedData.featured,
        published: validatedData.published,
        internalNotes: validatedData.internalNotes || null,
      },
    })

    return { success: true, product }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Validation error', errors: error.errors }
    }
    console.error('Error creating product:', error)
    return { success: false, message: 'Failed to create product' }
  }
}

export async function updateProduct(id: string, data: z.infer<typeof productSchema>) {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    const validatedData = productSchema.parse(data)

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        costPrice: validatedData.costPrice || null,
        category: validatedData.category,
        material: validatedData.material || null,
        size: validatedData.size || null,
        additionalInfo: validatedData.additionalInfo || [],
        images: validatedData.images,
        sku: validatedData.sku || null,
        stock: validatedData.stock,
        supplier: validatedData.supplier || null,
        featured: validatedData.featured,
        published: validatedData.published,
        internalNotes: validatedData.internalNotes || null,
      },
    })

    return { success: true, product }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Validation error', errors: error.errors }
    }
    console.error('Error updating product:', error)
    return { success: false, message: 'Failed to update product' }
  }
}

export async function deleteProduct(id: string) {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    await prisma.product.delete({
      where: { id },
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, message: 'Failed to delete product' }
  }
}

export async function toggleProductPublished(id: string) {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { published: true },
    })

    if (!product) {
      return { success: false, message: 'Product not found' }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { published: !product.published },
    })

    return { success: true, product: updated }
  } catch (error) {
    console.error('Error toggling product visibility:', error)
    return { success: false, message: 'Failed to toggle product visibility' }
  }
}

export async function toggleProductFeatured(id: string) {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { featured: true },
    })

    if (!product) {
      return { success: false, message: 'Product not found' }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { featured: !product.featured },
    })

    return { success: true, product: updated }
  } catch (error) {
    console.error('Error toggling product featured:', error)
    return { success: false, message: 'Failed to toggle product featured' }
  }
}

// Inquiry Management
export async function getAllInquiries() {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    const inquiries = await prisma.inquiry.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { success: true, inquiries }
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return { success: false, message: 'Failed to fetch inquiries' }
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status },
      include: {
        customer: true,
      },
    })

    return { success: true, inquiry }
  } catch (error) {
    console.error('Error updating inquiry status:', error)
    return { success: false, message: 'Failed to update inquiry status' }
  }
}
