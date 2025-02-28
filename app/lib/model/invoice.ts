import { prisma } from "@/lib/data/client";
import type { OperationResult } from "@/lib/data/schema/base";
import type { Customer } from "@/lib/data/schema/customer";
import {
  InvoiceShapeSchema,
  CreateInvoiceSchema,
  UpdateInvoiceSchema,
} from "@/lib/data/schema/invoice";
import type {
  Invoice,
  InvoiceShape,
  CreateInvoice,
  UpdateInvoice,
} from "@/lib/data/schema/invoice";
import { BaseModel } from "./base";

export class InvoiceModel extends BaseModel<InvoiceShape> {
  constructor(invoice?: Invoice) {
    const shape: InvoiceShape = {
      base: invoice || ({} as Invoice),
      state: {
        status: "active",
        validation: {},
        message: undefined,
      },
    };

    super(InvoiceShapeSchema, shape);
  }

  static async create(data: CreateInvoice): Promise<OperationResult<Invoice>> {
    try {
      const validated = CreateInvoiceSchema.safeParse(data);
      if (!validated.success) {
        return {
          data: null,
          status: "error",
          message: "Missing Fields. Failed to Create Invoice.",
        };
      }
      const invoice = await prisma.invoice.create({
        data: {
          id: crypto.randomUUID(),
          ...validated.data,
          date: data.date ?? new Date(), // Use provided date or current date
          createdAt: new Date(), // Always set to current time
          updatedAt: new Date(), // Always set to current time
        },
        include: {
          customer: true,
        },
      });

      return {
        data: invoice as Invoice & { customer: Customer },
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
      const validated = UpdateInvoiceSchema.safeParse(data);
      if (!validated.success) {
        return {
          data: null,
          status: "error",
          message: "Missing Fields. Failed to Update Invoice.",
        };
      }
      const invoice = await prisma.invoice.update({
        where: { id },
        data: {
          ...validated.data,
          updatedAt: new Date(),
        },
        include: {
          customer: true,
        },
      });

      return {
        data: invoice as Invoice & { customer: Customer },
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

  static async findById(
    id: string
  ): Promise<OperationResult<Invoice & { customer: Customer }>> {
    try {
      const invoice = await prisma.invoice.findUnique({
        where: { id },
        include: {
          customer: true,
        },
      });

      if (!invoice) {
        return {
          data: null,
          status: "error",
          message: "Invoice not found",
        };
      }

      return {
        data: invoice as Invoice & { customer: Customer },
        status: "success",
        message: "Invoice found",
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: "Failed to find invoice",
      };
    }
  }
  static async findAll(options: {
    query?: string;
    page?: number;
    pageSize?: number;
  }): Promise<OperationResult<(Invoice & { customer: Pick<Customer, 'name' | 'email' | 'imageUrl'> })[]>> {
    try {
      const { page = 1, pageSize = 10, query = '' } = options;
      const offset = (page - 1) * pageSize;

      const invoices = await prisma.invoice.findMany({
        skip: offset,
        take: pageSize,
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

      return {
        status: "success",
        data: invoices,
        message: "Invoices retrieved successfully", // Fixed: was "Customers"
      };
    } catch (error) {
      console.error("Error fetching invoices:", error); // Fixed: was "customers"
      return {
        status: "error",
        data: null,
        message: "Failed to retrieve invoices", // Fixed: was "customers"
      };
    }
  }

  static async count() {
    return await prisma.invoice.count();
  }

  static async aggregatePaidAmount() {
    const result = await prisma.invoice.aggregate({
      where: {
        status: "PAID",
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
