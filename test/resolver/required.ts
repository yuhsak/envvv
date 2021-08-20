import { str } from '../../src/resolver/str'
import { int } from '../../src/resolver/int'
import { array } from '../../src/resolver/array'
import { required } from '../../src/resolver/required'

const host = str('HOST')('0.0.0.0')
const port = int('PORT')()
const hosts = array(host)
const ports = array(port)

describe('required', () => {
  test("throwss error when it gives an object which doesn't have corresponding key", () => {
    expect(() => required(port)({})).toThrowError()
  })
  test('returns parsed value when it gives an object which has corresponding key even if fallback value is not specified', () => {
    expect(required(port)({ PORT: '8080' }).value).toBe(8080)
  })
  test("returns fallback value when it gives an object which doesn't have corresponding key and fallback value is specified", () => {
    expect(required(host)({}).value).toBe('0.0.0.0')
  })
  test('returns empty array when it gives an array resolver with no fallback value', () => {
    expect(required(ports)({}).value).toStrictEqual([])
  })
  test('returns array contains fallback value when it gives an array resolver and fallback value is specified', () => {
    expect(required(hosts)({}).value).toStrictEqual(['0.0.0.0'])
  })
})
