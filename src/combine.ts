import type { Ret, Dict, UnionToIntersection } from './types'

export const combine =
  <T extends { key: string; fn: (arg: Dict) => { key: string; value?: unknown } }[]>(resolvers: T) =>
  (arg: Dict): UnionToIntersection<Ret<T[number]['fn']>> => {
    return resolvers.reduce((acc, resolve) => {
      const { key, value } = resolve.fn(arg)
      return { ...acc, [key]: value }
    }, {} as any)
  }
