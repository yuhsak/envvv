import { asJson } from '../../src/parser/json'

describe('asJson', () => {
  test('returns number when it gives a numerical string', () => {
    expect(asJson('1')).toBe(1)
    expect(asJson('0')).toBe(0)
    expect(asJson('10')).toBe(10)
    expect(asJson('0.1')).toBeCloseTo(0.1)
  })
  test('returns string when it gives a quotated string', () => {
    expect(asJson('"string"')).toBe('string')
    expect(asJson('"1"')).toBe('1')
  })
  test('returns null when it gives "null"', () => {
    expect(asJson('null')).toBe(null)
  })
  test('returns boolean when it gives "true" or "false"', () => {
    expect(asJson('true')).toBe(true)
    expect(asJson('false')).toBe(false)
  })
  test('returns object when it gives a valid JSON string', () => {
    expect(asJson('{"test1": true}')).toStrictEqual({ test1: true })
  })
  test('throws error when it gives invalid JSON string', () => {
    const message = 'failed to parse value as JSON'
    expect(() => asJson('')).toThrowError(message)
    expect(() => asJson('a')).toThrowError(message)
    expect(() => asJson('True')).toThrowError(message)
    expect(() => asJson('.1')).toThrowError(message)
    expect(() => asJson('1.1.1')).toThrowError(message)
    expect(() => asJson('0xff')).toThrowError(message)
    expect(() => asJson('{test1: true}')).toThrowError(message)
  })
})
