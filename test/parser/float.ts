import { asFloat } from '../../src/parser/float'

describe('asFloat', () => {
  test('returns corresponding number value when it gives a string value represents float', () => {
    expect(asFloat('1')).toBe(1)
    expect(asFloat('0')).toBe(0)
    expect(asFloat('10')).toBe(10)
    expect(asFloat('300')).toBe(300)
    expect(asFloat('.1')).toBeCloseTo(0.1)
    expect(asFloat('0.1')).toBeCloseTo(0.1)
    expect(asFloat('1.1')).toBeCloseTo(1.1)
    expect(asFloat('10.2')).toBeCloseTo(10.2)
    expect(asFloat('300.5')).toBeCloseTo(300.5)
  })
  test('returns zero when it gives a hex representation', () => {
    expect(asFloat('0xff')).toBe(0)
  })
  test('ignores zero padding', () => {
    expect(asFloat('00001.1')).toBeCloseTo(1.1)
  })
  test('ignores trailing characters', () => {
    expect(asFloat('0.9.9.9')).toBeCloseTo(0.9)
    expect(asFloat('0.9,abcd')).toBeCloseTo(0.9)
    expect(asFloat('0000.9_123')).toBeCloseTo(0.9)
  })
  test('throws error when it gives any other string value which cannot be parsed as a float', () => {
    const message = 'failed to parse value as float'
    expect(() => asFloat('')).toThrowError(message)
    expect(() => asFloat('a')).toThrowError(message)
    expect(() => asFloat('true')).toThrowError(message)
  })
})
