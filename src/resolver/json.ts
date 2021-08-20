import { resolve } from '../resolve'
import { asJson } from '../parser/json'

export const json = resolve<Record<string, any> | Array<any> | string | number | boolean | null>(asJson)
