import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { CustomerModel, InvoiceModel, RevenueModel } from '@/lib/model'; // Adjust import paths as needed
import { PrismaClient, InvoiceStatus } from '@prisma/client'; // Import PrismaClient
import { CreateInvoice } from '@/lib/data/schema/invoice'; // Import CreateInvoice type

const prisma = new PrismaClient(); // Instantiate PrismaClient

import  { users, customers, invoices, revenue } from './placeholder-data.ts';

function getMonthNumber(month: string): number {
  const monthMap: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
  };
  return monthMap[month];
}

describe('Seed Data Test with Data Models', () => {
beforeAll(async () => {
    // Clear existing data (more reliable than dropping/recreating for testing)
    await prisma.invoice.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.revenue.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect(); // Disconnect Prisma client after tests
  });

  it('should seed customers correctly using CustomerModel', async () => {
    for (let i = 0; i < customers.length; i++) {
      try {
        const result = await CustomerModel.create(customers[i]);
        if (result.data?.id) {
          // Update the ID in the original array to match what's in the database
          customers[i].id = result.data.id;
        }
      } catch (e) {
        console.error("Error creating customer:", e);
        throw e;
      }
    }

    const insertedCustomers = await prisma.customer.findMany();
    expect(insertedCustomers.length).toBe(customers.length);
  });

  it('should seed invoices correctly using InvoiceModel', async () => {
    for (const invoiceData of invoices) {
      try {
        // invoiceData.customerId is already an index into the customers array
        const customerIndex = invoiceData.customerId;

        // Get the actual customer ID from the customers array using the index
        const actualCustomerId = customers[customerIndex].id;

        const invoice: CreateInvoice = {
          customerId: actualCustomerId, // Use the actual customer ID
          amount: invoiceData.amount,
          status: invoiceData.status as InvoiceStatus,
          date: new Date(invoiceData.date),
        };

        await InvoiceModel.create(invoice);
      } catch (e) {
        console.error("Error creating invoice:", e);
        console.error("Problem invoice data:", invoiceData);
        throw e;
      }
    }

    const insertedInvoices = await prisma.invoice.findMany();
    expect(insertedInvoices.length).toBe(invoices.length);
  });

  it('should seed revenue correctly using RevenueModel', async () => {
    for (const revData of revenue) {
      try {
        const rev = {
          ...revData,
          month: new Date(new Date().getFullYear(), getMonthNumber(revData.month), 1), // Convert month string to Date object
        };
        await RevenueModel.create(rev); // Use RevenueModel.create
      } catch (e) {
        console.error("Error creating revenue:", e);
        throw e;
      }
    }

    const insertedRevenue = await prisma.revenue.findMany();
    expect(insertedRevenue.length).toBe(revenue.length);
  });
});
