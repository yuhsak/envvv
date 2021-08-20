import type { Ret, Dict, UnionToIntersection } from './types'

export const combine =
  <T extends ((arg: Dict) => { key: string; value?: unknown })[]>(resolvers: T) =>
  (arg: Dict): UnionToIntersection<Ret<T[number]>> => {
    return resolvers.reduce((acc, resolve) => {
      const { key, value } = resolve(arg)
      return { ...acc, [key]: value }
    }, {} as any)
  }
