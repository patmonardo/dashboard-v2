//@/lib/data/formatting.ts
import { Prisma } from '@prisma/client'

export const formatCurrency = (amount: number | Prisma.Decimal) => {
  const numericAmount = amount instanceof Prisma.Decimal ? amount.toNumber() : amount
  return (numericAmount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

// Update your formatDateToLocal function
export const formatDateToLocal = (date: Date | string): string => {
  // Convert to Date if it's a string
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
