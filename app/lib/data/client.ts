//@/lib/data/client.ts
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL || "postgresql://dashboard_user:dashboard_pass@localhost:5432/dashboard_v3?schema=public",
  })
})

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export { prisma }
