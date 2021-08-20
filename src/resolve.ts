import { isString } from './util'
import type { Dict, Parser } from './types'

export const resolve =
  <T>(parser: Parser<T>) =>
  <K extends string>(key: K) => {
    function withOption<R extends T>(): (obj: Dict) => { key: K; value?: R | undefined }
    function withOption<R extends T>(
      fallback: R,
    ): (obj: Dict) => {
      key: K
      value: R extends T ? T : R
    }
    function withOption<R extends T>(fallback?: R) {
      return (
        obj: Dict,
      ):
        | { key: K; value?: R | undefined }
        | {
            key: K
            value: R extends T ? T : R
          } => {
        const v = obj[key]
        if (isString(v)) {
          const value = parser(v) as R
          return { key, value }
        }
        if (fallback !== void 0) {
          return { key, value: fallback }
        }
        return { key, value: void 0 }
      }
    }
    return withOption
  }
