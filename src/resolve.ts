import { isString } from './util'
import type { Dict, Parser } from './types'

export const resolve =
  <T>(parser: Parser<T>) =>
  <K extends string>(key: K) => {
    function withOption(): { key: K; fn: (obj: Dict) => { key: K; value?: T | undefined } }
    function withOption<R extends T>(): { key: K; fn: (obj: Dict) => { key: K; value?: R | undefined } }
    function withOption(fallback: T): {
      key: K
      fn: (obj: Dict) => {
        key: K
        value: T
      }
    }
    function withOption<R extends T>(
      fallback: R,
    ): {
      key: K
      fn: (obj: Dict) => {
        key: K
        value: R
      }
    }
    function withOption<R extends T>(fallback?: R) {
      return {
        key,
        fn: (
          obj: Dict,
        ):
          | { key: K; value?: R | undefined }
          | {
              key: K
              value: R
            } => {
          const v = obj[key]
          if (isString(v)) {
            try {
              const value = parser(v) as R
              return { key, value }
            } catch (e) {
              throw new Error(`an error occured while parsing value for key "${key}": ${e.message}`)
            }
          }
          if (fallback !== void 0) {
            return { key, value: fallback }
          }
          return { key, value: void 0 }
        },
      }
    }
    return withOption
  }
