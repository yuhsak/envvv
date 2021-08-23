import type { Dict, Resolver } from '../types'
import { isString } from '../util'

export const arrayBy =
  (delimiter: RegExp | string = /[,\s]/) =>
  <K extends string, V>(resolver: Resolver<K, V>) => {
    return {
      key: resolver.key,
      fn: (obj: Dict): { key: K; value: V[] } => {
        const { key, fn } = resolver
        const v = obj[key]
        if (isString(v)) {
          const items = v.split(delimiter).filter((v) => v !== '')
          const value = items
            .map((value) => fn({ [key]: value }))
            .map(({ value }) => value)
            .filter((value): value is V => value !== void 0)
          if (value.length) {
            return {
              key,
              value,
            }
          }
        }
        const { value } = fn({})
        return { key, value: value !== void 0 ? [value] : [] }
      },
    }
  }

export const array = arrayBy(/[,\s]/)

export const line = arrayBy(/\r?\n/)
