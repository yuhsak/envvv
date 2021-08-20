import { isString } from '../src/util'

describe('isString', () => {
  test('returns true when it gives a string value', () => {
    expect(isString('string')).toBe(true)
  })
  test('returns false when it gives undefined', () => {
    expect(isString(void 0)).toBe(false)
  })
})
