import { prisma } from "@/lib/data/client";
import type { OperationResult } from "@/lib/data/schema/base";
import {
  CustomerSchema,
  CreateCustomerSchema,
  UpdateCustomerSchema,
} from "@/lib/data/schema/customer";
import type {
  Customer,
  CreateCustomer,
  UpdateCustomer,
} from "@/lib/data/schema/customer";
import { BaseModel } from "./base";

export class CustomerModel extends BaseModel<Customer> {
  constructor() {
    super(CustomerSchema, {} as Customer);
  }
  static async create(
    data: CreateCustomer
  ): Promise<OperationResult<Customer>> {
    try {
      const validated = CreateCustomerSchema.parse(data);
      if (!validated) {
        return {
          data: null,
          status: "error",
          message: "Missing Fields. Failed to Create Customer.",
        };
      }
      const customer = await prisma.customer.create({
        data: {
          name: validated.name,
          email: validated.email,
          imageUrl: validated.imageUrl,
        },
      });

      return {
        data: customer,
        status: "success",
        message: "Customer created",
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: "Failed to create Customer",
      };
    }
  }

  static async update(
    id: string,
    data: UpdateCustomer
  ): Promise<OperationResult<Customer>> {
    try {
      const validated = UpdateCustomerSchema.parse(data);

      const customer = await prisma.customer.update({
        where: { id },
        data: {
          ...validated,
        },
      });

      return {
        data: customer,
        status: "success",
        message: "Customer updated successfully",
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: "Failed to update Customer",
      };
    }
  }

  static async findById(id: string): Promise<OperationResult<Customer>> {
    try {
      const customer = await prisma.customer.findUnique({
        where: { id },
      });

      if (!customer) {
        return {
          data: null,
          status: "error",
          message: "Customer not found",
        };
      }

      return {
        data: customer,
        status: "success",
        message: "Customer found",
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: "Failed to find Customer",
      };
    }
  }

  static async count() {
    return await prisma.customer.count();
  }

  static async delete(id: string): Promise<OperationResult<Customer>> {
    try {
      const customer = await prisma.customer.delete({
        where: { id },
      });

      return {
        data: customer as Customer,
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
