import type { Parser } from '../types'

export const asInt: Parser<number> = (v: string) => {
  const value = parseInt(v)
  if (isNaN(value)) {
    throw new Error('failed to parse value as integer')
  }
  return value
}
