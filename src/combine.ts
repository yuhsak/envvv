import type { Ret, Dict, UnionToIntersection } from './types'

export const combine =
  <T extends { key: string; fallback?: any; fn: (arg: Dict) => { key: string; value?: unknown } }[]>(
    resolvers: T,
    { fallbackError = false }: { fallbackError?: boolean } = {},
  ) =>
  (arg: Dict): UnionToIntersection<Ret<T[number]['fn']>> => {
    return resolvers.reduce((acc, resolve) => {
      try {
        const { key, value } = resolve.fn(arg)
        return { ...acc, [key]: value }
      } catch (e) {
        if (fallbackError) {
          return { ...acc, [resolve.key]: resolve.fallback }
        }
        throw e
      }
    }, {} as any)
  }
