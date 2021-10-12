import type { Ret, Dict, UnionToIntersection, Resolver } from './types'

export type CombineOption = { fallbackError?: boolean }

export const combine =
  <T extends Resolver[]>(resolvers: T, { fallbackError = false }: CombineOption = {}) =>
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
