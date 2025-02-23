import { InvoiceModel } from './invoice'
import { prisma } from '../data/client' // Import your Prisma client
import { CreateInvoice } from '../data/schema/invoice'
import crypto from 'crypto'

// Mock the Prisma client
jest.mock('../data/client', () => ({
  prisma: {
    invoice: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}))

describe('InvoiceModel', () => {
  let mockCreate: jest.Mock
  let mockUpdate: jest.Mock
  let mockFindUnique: jest.Mock
  let mockFindMany: jest.Mock
  let mockCount: jest.Mock

  beforeEach(() => {
    mockCreate = prisma.invoice.create as jest.Mock
    mockUpdate = prisma.invoice.update as jest.Mock
    mockFindUnique = prisma.invoice.findUnique as jest.Mock
    mockFindMany = prisma.invoice.findMany as jest.Mock
    mockCount = prisma.invoice.count as jest.Mock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new invoice', async () => {
      // Arrange
      const createInvoiceData: CreateInvoice = {
        customerId: 'customer-id',
        amount: 100,
        status: 'pending',
        date: new Date(),
      }
      const invoiceId = crypto.randomUUID()
      const createdInvoice = {
        id: invoiceId,
        ...createInvoiceData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockCreate.mockResolvedValue(createdInvoice)

      // Act
      const result = await InvoiceModel.create(createInvoiceData)

      // Assert
      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          customerId: 'customer-id',
          amount: 100,
          status: 'pending',
          date: createInvoiceData.date,
        },
      })
      expect(result).toEqual({
        data: createdInvoice,
        status: 'success',
        message: 'Invoice created',
      })
    })

    it('should handle create invoice error', async () => {
      // Arrange
      const createInvoiceData: CreateInvoice = {
        customerId: 'customer-id',
        amount: 100,
        status: 'pending',
        date: new Date(),
      }
      mockCreate.mockRejectedValue(new Error('Failed to create invoice'))

      // Act
      const result = await InvoiceModel.create(createInvoiceData)

      // Assert
      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          customerId: 'customer-id',
          amount: 100,
          status: 'pending',
          date: createInvoiceData.date,
        },
      })
      expect(result).toEqual({
        data: null,
        status: 'error',
        message: 'Failed to create invoice',
      })
    })
  })

  // Add tests for other methods (update, findById, findMany, count)
})
