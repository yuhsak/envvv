export * from './resolver'
export * from './resolve'
export * from './combine'
export * from './types'

import { resolve } from './resolve'
import type { Parser } from './types'

const asOnOff: Parser<'ON' | 'OFF'> = (v) => {
  return v === 'ON' ? 'ON' : 'OFF'
}

const onoff = resolve(asOnOff)

const p = onoff('S')('OFF')
