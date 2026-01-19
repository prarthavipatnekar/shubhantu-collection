import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient({})

async function main() {
  console.log('Starting seed...')

  // Clear existing data
  await prisma.inquiry.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.product.deleteMany()

  // Create demo products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Crystal clear sound quality and comfortable design for all-day wear.',
        price: 199.99,
        costPrice: 120.00,
        category: 'Electronics',
        stock: 25,
        sku: 'WH-001',
        supplier: 'TechSupply Inc',
        featured: true,
        published: true,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
        ]
      },
      {
        name: 'Smart Watch Pro',
        description: 'Advanced fitness tracking, heart rate monitoring, and smartphone notifications. Water-resistant with 7-day battery life.',
        price: 299.99,
        costPrice: 180.00,
        category: 'Electronics',
        stock: 15,
        sku: 'SW-002',
        supplier: 'TechSupply Inc',
        featured: true,
        published: true,
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
          'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80'
        ]
      },
      {
        name: 'Minimalist Backpack',
        description: 'Sleek and functional backpack with laptop compartment. Perfect for work, travel, or daily commute. Made from durable water-resistant fabric.',
        price: 79.99,
        costPrice: 45.00,
        category: 'Accessories',
        stock: 40,
        sku: 'BP-003',
        supplier: 'FashionWorks',
        featured: false,
        published: true,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80'
        ]
      },
      {
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable and sustainable t-shirt made from 100% organic cotton. Available in multiple colors. Perfect fit and breathable fabric.',
        price: 29.99,
        costPrice: 12.00,
        category: 'Clothing',
        stock: 100,
        sku: 'TS-004',
        supplier: 'EcoApparel',
        featured: false,
        published: true,
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
        ]
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Keep your drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof design. Perfect for gym, office, or outdoor activities.',
        price: 34.99,
        costPrice: 18.00,
        category: 'Accessories',
        stock: 60,
        sku: 'WB-005',
        supplier: 'LifeStyle Goods',
        featured: false,
        published: true,
        images: [
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
          'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80'
        ]
      },
      {
        name: 'Bluetooth Speaker',
        description: '360-degree sound with deep bass. Waterproof and portable design. 12-hour battery life perfect for parties and outdoor adventures.',
        price: 89.99,
        costPrice: 52.00,
        category: 'Electronics',
        stock: 30,
        sku: 'BS-006',
        supplier: 'TechSupply Inc',
        featured: true,
        published: true,
        images: [
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
          'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80'
        ]
      },
      {
        name: 'Yoga Mat Premium',
        description: 'Extra thick and comfortable yoga mat with non-slip surface. Eco-friendly material, includes carrying strap. Perfect for yoga and fitness.',
        price: 49.99,
        costPrice: 25.00,
        category: 'Fitness',
        stock: 45,
        sku: 'YM-007',
        supplier: 'FitLife',
        featured: false,
        published: true,
        images: [
          'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
          'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=800&q=80'
        ]
      },
      {
        name: 'Desk Lamp LED',
        description: 'Adjustable LED desk lamp with touch control and USB charging port. Multiple brightness levels and color temperatures. Eye-friendly design.',
        price: 59.99,
        costPrice: 32.00,
        category: 'Home',
        stock: 35,
        sku: 'DL-008',
        supplier: 'HomeGoods Plus',
        featured: false,
        published: true,
        images: [
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'
        ]
      },
      {
        name: 'Sunglasses Classic',
        description: 'UV400 protection polarized sunglasses. Stylish design with durable frame. Comes with protective case and cleaning cloth.',
        price: 119.99,
        costPrice: 65.00,
        category: 'Accessories',
        stock: 50,
        sku: 'SG-009',
        supplier: 'FashionWorks',
        featured: true,
        published: true,
        images: [
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'
        ]
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical gaming keyboard with customizable keys. Tactile switches for ultimate typing experience. Durable aluminum frame.',
        price: 149.99,
        costPrice: 90.00,
        category: 'Electronics',
        stock: 20,
        sku: 'KB-010',
        supplier: 'TechSupply Inc',
        featured: false,
        published: true,
        images: [
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
          'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'
        ]
      }
    ]
  })

  console.log(`Created ${products.count} products`)
  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
