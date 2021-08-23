import { str } from '../../src/resolver/str'
import { int } from '../../src/resolver/int'
import { array } from '../../src/decorator/array'
import { required } from '../../src/decorator/required'

const host = str('HOST')('0.0.0.0')
const port = int('PORT')()
const requiredPort = required(int('PORT')())
const hosts = array(host)
const ports = array(port)
const requiredPorts = array(requiredPort)

describe('required', () => {
  test("throws error when it gives an object which doesn't have corresponding key", () => {
    expect(() => required(port).fn({})).toThrowError()
  })
  test('returns parsed value when it gives an object which has corresponding key even if fallback value is not specified', () => {
    expect(required(port).fn({ PORT: '8080' }).value).toBe(8080)
  })
  test("returns fallback value when it gives an object which doesn't have corresponding key and fallback value is specified", () => {
    expect(required(host).fn({}).value).toBe('0.0.0.0')
  })
  test('returns empty array when it gives an array resolver with no fallback value', () => {
    expect(required(ports).fn({}).value).toStrictEqual([])
  })
  test('returns array contains fallback value when it gives an array resolver and fallback value is specified', () => {
    expect(required(hosts).fn({}).value).toStrictEqual(['0.0.0.0'])
  })
  test('returns array contains parsed value when it gives a required resolver wrapped by array resolver and corresponding key is specified even if fallback value is not specified', () => {
    expect(requiredPorts.fn({ PORT: '80' }).value).toStrictEqual([80])
  })
  test('throws error when it gives a required resolver wrapped by array resolver and corresponding key is not specified', () => {
    expect(() => requiredPorts.fn({}).value).toThrowError()
  })
})
