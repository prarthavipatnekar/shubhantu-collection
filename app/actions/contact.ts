'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema for contact form
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.union([
    z.string().email({ message: 'Invalid email address' }),
    z.literal(''),
  ]).optional(),
  countryCode: z.string().min(1, 'Country code is required').max(5, 'Invalid country code'),
  phoneNumber: z.string().min(5, 'Phone number is too short').max(15, 'Phone number is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
})

export type ContactFormData = z.infer<typeof contactSchema>

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate the data
    const validatedData = contactSchema.parse(data)

    // Check if customer already exists by phone number (primary identifier)
    let customer = await prisma.customer.findFirst({
      where: {
        countryCode: validatedData.countryCode,
        phoneNumber: validatedData.phoneNumber,
      },
    })

    // If customer doesn't exist by phone, check by email (if provided)
    if (!customer && validatedData.email && validatedData.email !== '') {
      customer = await prisma.customer.findUnique({
        where: { email: validatedData.email },
      })
    }

    // If customer still doesn't exist, create one
    if (!customer) {
      const hasEmail = validatedData.email && validatedData.email !== ''
      const customerData: any = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        countryCode: validatedData.countryCode,
        phoneNumber: validatedData.phoneNumber,
      }
      if (hasEmail) {
        customerData.email = validatedData.email
      }
      customer = await prisma.customer.create({
        data: customerData,
      })
    }

    // Create the inquiry
    const inquiry = await prisma.inquiry.create({
      data: {
        customerId: customer.id,
        message: validatedData.message,
        status: 'pending',
      },
    })

    return {
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      inquiryId: inquiry.id,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please check your input and try again.',
        errors: error.errors,
      }
    }

    console.error('Contact form submission error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    }
  }
}
