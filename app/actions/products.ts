'use server'

import { prisma } from '@/lib/prisma'

// Get all published products (public)
export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        category: true,
        featured: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Get featured products only (public)
export async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        published: true,
        featured: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        category: true,
        featured: true,
      },
      take: 4, // Limit to 4 featured products
    })

    return products
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// Get products by category (public)
export async function getProductsByCategory(category: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        published: true,
        category: category,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        category: true,
        featured: true,
      },
    })

    return products
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// Get single product by ID (public)
export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
        published: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        category: true,
        featured: true,
        createdAt: true,
      },
    })

    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Get all unique categories
export async function getCategories() {
  try {
    const products = await prisma.product.findMany({
      where: {
        published: true,
      },
      select: {
        category: true,
      },
      distinct: ['category'],
    })

    return products.map((p) => p.category)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
