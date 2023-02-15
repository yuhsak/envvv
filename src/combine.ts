import type { Ret, UnionToIntersection, Resolver } from './types'

export type CombineOption = { fallbackError?: boolean }

type Refine<T extends (...args: any[]) => any> = UnionToIntersection<Ret<T>>

export const combine = <T extends Resolver[]>(resolvers: T, { fallbackError = false }: CombineOption = {}) => {
  type R = Refine<T[number]['fn']>
  return (arg: Record<string, string | undefined>): { [K in keyof R]: R[K] } => {
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
}
