import { asDate } from '../../src/parser/date'

describe('asDate', () => {
  test('returns date object when it gives ISO date string', () => {
    expect(asDate('2023-01-01T00:00:00.000Z').getTime()).toBe(1672531200000)
  })
  test('throws error when it gives wrong date string', () => {
    expect(() => asDate('ABC')).toThrowError()
  })
})
