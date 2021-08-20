import type { Dict } from '../types'
import { isString } from '../util'

export const arrayBy =
  (delimiter: RegExp | string = /[,\s]/) =>
  <K extends string, V>(fn: (obj: Dict) => { key: K; value?: V }) => {
    return (obj: Dict): { key: K; value: V[] } => {
      const { key, value: fallback } = fn({})
      const v = obj[key]
      if (isString(v)) {
        const items = v.split(delimiter).filter((v) => v !== '')
        const value = items
          .map((value) => fn({ [key]: value }))
          .map(({ value }) => value)
          .filter((value): value is V => value !== void 0)
        return {
          key,
          value: value.length === 0 && fallback !== void 0 ? [fallback] : value,
        }
      }
      return { key, value: fallback !== void 0 ? [fallback] : [] }
    }
  }

export const array = arrayBy(/[,\s]/)

export const line = arrayBy(/\r?\n/)
