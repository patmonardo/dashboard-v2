import { Decimal } from '@prisma/client/runtime/library'

export const formatCurrency = (amount: number | Decimal) => {
  const numericAmount = amount instanceof Decimal ? amount.toNumber() : amount
  return (numericAmount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export const formatDateToLocal = (
  date: Date | string,
  locale: string = 'en-US',
) => {
  const dateObj = date instanceof Date ? date : new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(dateObj)
}
