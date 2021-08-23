export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type Ret<T extends (...args: any[]) => any> = T extends infer U
  ? U extends (...args: any[]) => any
    ? ReturnType<U> extends { key: any; value: any }
      ? { [K in ReturnType<U>['key']]: ReturnType<U>['value'] }
      : { [K in ReturnType<U>['key']]?: ReturnType<U>['value'] | undefined }
    : never
  : never

export type Dict = Record<string, string | undefined>

export type Parser<T> = (v: string) => T

export type Resolver<K, V> = { key: K; fn: (obj: Dict) => { key: K; value?: V } }
