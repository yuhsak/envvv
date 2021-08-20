import type { Parser } from '../types'

export const asFloat: Parser<number> = (v: string) => {
  const value = parseFloat(v)
  if (isNaN(value)) {
    throw new Error('failed to parse value as float')
  }
  return value
}
