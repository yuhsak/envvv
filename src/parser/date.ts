import type { Parser } from '../types'
import { isValidDate } from '../util'

export const asDate: Parser<Date> = (v: string) => {
  const date = new Date(v)
  if (isValidDate(date)) return date
  throw new Error('failed to parse value as Date')
}
