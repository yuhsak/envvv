import { asInt } from '../../src/parser/int'

describe('asInt', () => {
  test('returns corresponding number value when it gives a string value represents integer', () => {
    expect(asInt('1')).toBe(1)
    expect(asInt('0')).toBe(0)
    expect(asInt('10')).toBe(10)
    expect(asInt('300')).toBe(300)
  })
  test('works with hex representation', () => {
    expect(asInt('0xff')).toBe(255)
  })
  test('ignores zero padding', () => {
    expect(asInt('00001')).toBe(1)
  })
  test('ignores trailing characters', () => {
    expect(asInt('9,abcd')).toBe(9)
    expect(asInt('00009_123')).toBe(9)
  })
  test('ignores fraction', () => {
    expect(asInt('2.1')).toBe(2)
    expect(asInt('2.9')).toBe(2)
    expect(asInt('1.1.1')).toBe(1)
  })
  test('throws error when it gives any other string value which cannot be parsed as an integer', () => {
    const message = 'failed to parse value as integer'
    expect(() => asInt('')).toThrowError(message)
    expect(() => asInt('a')).toThrowError(message)
    expect(() => asInt('true')).toThrowError(message)
    expect(() => asInt('.1')).toThrowError(message)
  })
})
