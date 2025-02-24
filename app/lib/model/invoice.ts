import { prisma } from "@/lib/data/client";
import type { OperationResult } from "@/lib/data/schema/base";
import {
  InvoiceSchema,
  CreateInvoiceSchema,
  UpdateInvoiceSchema,
} from "@/lib/data/schema/invoice";
import type {
  Invoice,
  CreateInvoice,
  UpdateInvoice,
} from "@/lib/data/schema/invoice";
import { BaseModel } from "./base";

export class InvoiceModel extends BaseModel<Invoice> {
  constructor() {
    super(InvoiceSchema, {} as Invoice);
  }
  static async create(data: CreateInvoice): Promise<OperationResult<Invoice>> {
    try {
      const validated = CreateInvoiceSchema.parse(data);
      if (!validated) {
        return {
          data: null,
          status: "error",
          message: "Missing Fields. Failed to Create Invoice.",
        };
      }
      const invoice = await prisma.invoice.create({
        data: {
          id: crypto.randomUUID(),
          customerId: data.customerId,
          amount: data.amount,
          status: data.status,
          date: data.date ?? new Date(), // Use provided date or current date
          createdAt: new Date(), // Always set to current time
          updatedAt: new Date(), // Always set to current time
        },
        include: {
          customer: true,
        },
      });

      return {
        data: invoice,
        status: "success",
        message: "Invoice created",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: "error",
        message: "Failed to create invoice",
      };
    }
  }

  static async update(
    id: string,
    data: UpdateInvoice
  ): Promise<OperationResult<Invoice>> {
    try {
      const validated = UpdateInvoiceSchema.parse(data);
      if (!validated) {
        return {
          data: null,
          status: "error",
          message: "Missing Fields. Failed to Update Invoice.",
        };
      }
      const invoice = await prisma.invoice.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
        include: {
          customer: true,
        },
      });

      return {
        data: invoice,
        status: "success",
        message: "Invoice updated successfully",
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: "Failed to update invoice",
      };
    }
  }

  // Pure queries, for example:
  static async findById(id: string): Promise<Invoice | null> {
    return await prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
      },
    });
  }

  static async findMany(options: {
    page?: number;
    query?: string;
    itemsPerPage?: number;
  }) {
    const { page = 1, itemsPerPage = 6 } = options;
    const offset = (page - 1) * itemsPerPage;

    return await prisma.invoice.findMany({
      skip: offset,
      take: itemsPerPage,
      where: options.query
        ? {
            OR: [
              {
                customer: {
                  name: { contains: options.query, mode: "insensitive" },
                },
              },
              { status: options.query },
              {
                amount: options.query
                  ? parseInt(options.query) || undefined
                  : undefined,
              },
            ],
          }
        : undefined,
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });
  }

  static async count() {
    return await prisma.invoice.count();
  }

  static async aggregatePaidAmount() {
    const result = await prisma.invoice.aggregate({
      where: {
        status: "paid",
      },
      _sum: {
        amount: true,
      },
    });
    return result._sum.amount ?? 0;
  }

  static async delete(id: string): Promise<OperationResult<Invoice>> {
    try {
      const invoice = await prisma.invoice.delete({
        where: { id },
      });

      return {
        data: invoice as Invoice,
        status: "success",
        message: "Customer deleted successfully",
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: "Failed to delete Customer",
      };
    }
  }
}
