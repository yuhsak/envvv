import type { Dict, Resolver } from '../types'

export const required = <K extends string, V>(resolver: Resolver<K, V>) => {
  return {
    key: resolver.key,
    fn: (obj: Dict): { key: K; value: V } => {
      const { key, value } = resolver.fn(obj)
      if (value === void 0) {
        throw new Error(`"${key}" is required but not specified`)
      }
      return { key, value }
    },
  }
}
