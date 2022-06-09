import type { Parser } from '../types'
import { asStr, asInt, asFloat, asBool } from '../parser'
import { resolve } from '../resolve'

export const literal = <T extends Readonly<any[]>>(values: T) => {
  const parser: Parser<T[number]> = (v: string) => {
    const hit = values.find((value) => {
      if (typeof value === 'string') {
        return asStr(v) === value
      } else if (typeof value === 'number') {
        if (Number.isInteger(value)) {
          try {
            return asInt(v) === value
          } catch (e) {
            return
          }
        } else {
          try {
            return asFloat(v) === value
          } catch (e) {
            return
          }
        }
      } else if (typeof value === 'boolean') {
        try {
          return asBool(v) === value
        } catch (e) {}
        return
      }
      return
    })

    if (hit === void 0) {
      throw new Error(
        `failed to parse value as literal. input: ${v}, expect: [${values.map((value) => `${value}`).join(', ')}]`,
      )
    }

    return hit
  }
  return resolve(parser)
}
