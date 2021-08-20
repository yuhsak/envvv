import type { Parser } from '../types'

export const asJson: Parser<any> = (v: string) => {
  try {
    return JSON.parse(v)
  } catch (e) {
    throw new Error('failed to parse value as JSON')
  }
}
