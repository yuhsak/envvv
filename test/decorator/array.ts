import { str } from '../../src/resolver/str'
import { int } from '../../src/resolver/int'
import { json } from '../../src/resolver/json'
import { array, line } from '../../src/decorator/array'

const host = str('HOST')('0.0.0.0')
const port = int('PORT')()
const hosts = array(host)
const ports = array(port)
const user = json('USER')<{ name: string }>()
const users = line(user)

describe('array', () => {
  test("returns empty array when it gives an object which doesn't have corresponding key", () => {
    expect(ports.fn({}).value).toStrictEqual([])
  })
  test("returns array contains fallback value when it gives an object which doesn't have corresponding key and fallback value is specified", () => {
    expect(hosts.fn({}).value).toStrictEqual(['0.0.0.0'])
  })
  test('returns empty array when it gives empty string', () => {
    expect(ports.fn({ PORT: '' }).value).toStrictEqual([])
  })
  test('returns array contains fallback value when it gives empty string and fallback value is specified', () => {
    expect(hosts.fn({ HOST: '' }).value).toStrictEqual(['0.0.0.0'])
  })
  test("splits value by ','", () => {
    expect(hosts.fn({ HOST: 'localhost,0.0.0.0' }).value).toStrictEqual(['localhost', '0.0.0.0'])
    expect(ports.fn({ PORT: '8080,8000' }).value).toStrictEqual([8080, 8000])
  })
  test("splits value by ' '", () => {
    expect(hosts.fn({ HOST: 'localhost 0.0.0.0' }).value).toStrictEqual(['localhost', '0.0.0.0'])
    expect(ports.fn({ PORT: '8080 8000' }).value).toStrictEqual([8080, 8000])
  })
  test("splits value by '\\n'", () => {
    expect(hosts.fn({ HOST: 'localhost\n0.0.0.0' }).value).toStrictEqual(['localhost', '0.0.0.0'])
    expect(ports.fn({ PORT: '8080\n8000' }).value).toStrictEqual([8080, 8000])
  })
  test("splits value by ',', ' ' and '\\n'", () => {
    expect(hosts.fn({ HOST: 'localhost,0.0.0.0 127.0.0.1 \n192.168.0.1' }).value).toStrictEqual([
      'localhost',
      '0.0.0.0',
      '127.0.0.1',
      '192.168.0.1',
    ])
    expect(ports.fn({ PORT: '8080,8000 8001\n8002' }).value).toStrictEqual([8080, 8000, 8001, 8002])
  })
  test('ignores multiple delimiters', () => {
    expect(hosts.fn({ HOST: ',,localhost,,\n,  0.0.0.0  ,,, \n127.0.0.1   ,,,\n' }).value).toStrictEqual([
      'localhost',
      '0.0.0.0',
      '127.0.0.1',
    ])
  })
})

describe('line', () => {
  test("returns empty array when it gives an object which doesn't have corresponding key", () => {
    expect(users.fn({}).value).toStrictEqual([])
  })
  test('returns empty array when it gives empty string', () => {
    expect(users.fn({ USER: '' }).value).toStrictEqual([])
  })
  test("splits value by '\\n'", () => {
    expect(users.fn({ USER: '{"name": "a"}\n{"name": "b"}' }).value).toStrictEqual([{ name: 'a' }, { name: 'b' }])
  })
  test("doesn't splits value by ',' and ' '", () => {
    expect(() => users.fn({ USER: '{"name": "a"},{"name": "b"}' })).toThrowError()
    expect(() => users.fn({ USER: '{"name": "a"} {"name": "b"}' })).toThrowError()
  })
  test('ignores multiple delimiters', () => {
    expect(users.fn({ USER: '\n{"name": "a"}\n\n{"name": "b"}\n' }).value).toStrictEqual([{ name: 'a' }, { name: 'b' }])
  })
})
