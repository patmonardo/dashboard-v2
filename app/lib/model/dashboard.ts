import { prisma } from '@/lib/data/client'
import { formatCurrency } from '@/lib/data/formatting'
import type { Invoice } from '@/lib/data/schema/invoice'
import type { Customer } from '@/lib/data/schema/customer'
import type { Revenue } from '@/lib/data/schema/revenue'
import { InvoiceModel } from './invoice'
import { CustomerModel } from './customer'

type DashboardCard = {
  numberOfCustomers: number
  numberOfInvoices: number
  totalPaidInvoices: string
  totalPendingInvoices: string
}

type InvoiceWithCustomer = Invoice & {
  customer: Pick<Customer, 'name' | 'imageUrl' | 'email'>
}

// Prisma return type for invoice with customer
type PrismaInvoiceWithCustomer = {
  id: string
  customerId: string
  amount: number // Changed Decimal to number
  status: string
  date: Date
  created_at: Date
  updated_at: Date
  customer: {
    name: string
    email: string
    imageUrl: string | null
  }
}

export class DashboardModel {
  static async getCardData(): Promise<DashboardCard> {
    const [
      invoiceCount,
      customerCount,
      paidTotal,
      pendingTotal
    ] = await Promise.all([
      InvoiceModel.count(),
      CustomerModel.count(),
      prisma.invoice.aggregate({
        where: { status: 'PAID' },
        _sum: { amount: true }
      }),
      prisma.invoice.aggregate({
        where: { status: 'PENDING' },
        _sum: { amount: true }
      })
    ])

    return {
      numberOfCustomers: customerCount,
      numberOfInvoices: invoiceCount,
      totalPaidInvoices: formatCurrency((paidTotal._sum.amount || 0)), // Removed Decimal
      totalPendingInvoices: formatCurrency((pendingTotal._sum.amount || 0)) // Removed Decimal
    }
  }

  static async getLatestInvoices(): Promise<PrismaInvoiceWithCustomer[]> {
    return []
  }

  /*
  static async getLatestInvoices(): Promise<PrismaInvoiceWithCustomer[]> {
      return await prisma.invoice.findMany({
        take: 5,
        orderBy: { date: 'desc' },
        include: {
          customer: {
            select: {
              name: true,
              email: true,
              imageUrl: true  // Using snake_case to match schema
            }
          }
        }
      })
    }
    */

  static async getRevenueTrend(): Promise<Revenue[]> {
    return await prisma.revenue.findMany({
      orderBy: {
        month: 'asc'
      },
      select: {
        id: true,
        month: true,
        revenue: true,
        expenses: true
      }
    })
  }
}
