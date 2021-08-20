import { asBool } from '../../src/parser/bool'

describe('asBool', () => {
  test('returns true when it gives "true" regardless of the case sensitivity', () => {
    expect(asBool('true')).toBe(true)
    expect(asBool('True')).toBe(true)
    expect(asBool('tRue')).toBe(true)
    expect(asBool('trUe')).toBe(true)
    expect(asBool('truE')).toBe(true)
    expect(asBool('TRUE')).toBe(true)
  })
  test('returns true when it gives "1"', () => {
    expect(asBool('1')).toBe(true)
  })
  test('returns false when it gives "false" regardless of the case sensitivity', () => {
    expect(asBool('false')).toBe(false)
    expect(asBool('False')).toBe(false)
    expect(asBool('fAlse')).toBe(false)
    expect(asBool('faLse')).toBe(false)
    expect(asBool('falSe')).toBe(false)
    expect(asBool('falsE')).toBe(false)
    expect(asBool('FALSE')).toBe(false)
  })
  test('returns false when it gives "0"', () => {
    expect(asBool('0')).toBe(false)
  })
  test('throws error when it gives any other string value', () => {
    const message = 'failed to parse value as boolean'
    expect(() => asBool('')).toThrowError(message)
    expect(() => asBool('a')).toThrowError(message)
    expect(() => asBool('abc')).toThrowError(message)
    expect(() => asBool('123')).toThrowError(message)
    expect(() => asBool('01')).toThrowError(message)
    expect(() => asBool(' true')).toThrowError(message)
    expect(() => asBool('false ')).toThrowError(message)
  })
})
