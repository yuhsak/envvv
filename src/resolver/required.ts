import type { Dict } from '../types'

export const required = <K extends string, V>(fn: (obj: Dict) => { key: K; value?: V }) => {
  return (obj: Dict): { key: K; value: V } => {
    const { key, value } = fn(obj)
    if (value === void 0) {
      throw new Error(`${key} is required`)
    }
    return { key, value }
  }
}
