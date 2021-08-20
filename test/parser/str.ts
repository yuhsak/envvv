import { asStr } from '../../src/parser/str'

describe('asStr', () => {
  test('returns an identical value', () => {
    expect(asStr('string')).toBe('string')
    expect(asStr('')).toBe('')
  })
})
