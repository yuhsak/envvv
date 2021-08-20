import type { Parser } from '../types'

export const asBool: Parser<boolean> = (v: string) => {
  if (/^true$/i.test(v) || v === '1') {
    return true
  }
  if (/^false$/i.test(v) || v === '0') {
    return false
  }
  throw new Error('failed to parse value as boolean')
}
