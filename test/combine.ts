import { combine } from '../src/combine'
import { int, float, str, json, bool, array, line } from '../src/resolver'

type Auth = {
  id: string
  password: string
}

type User = {
  name: string
}

const host = str('HOST')('0.0.0.0')
const port = int('PORT')()
const hosts = array(host)
const ports = array(port)
const auth = json('AUTH')<{ id: string }>()
const user = json('USER')<{ name: string }>()
const users = line(user)

describe('combine', () => {
  test('works', () => {
    const parse = combine([host, port, auth])
    expect(parse({})).toStrictEqual({ HOST: '0.0.0.0', PORT: void 0, AUTH: void 0 })
  })
  test('works with array', () => {
    const parse = combine([hosts, ports, users])
    expect(parse({ PORT: '8001,8002' })).toStrictEqual({ HOST: ['0.0.0.0'], PORT: [8001, 8002], USER: [] })
  })
  test('example', () => {
    const parse = combine([
      str('HOST')('0.0.0.0'),
      int('PORT')(8000),
      int('N_PROCESS')(),
      float('FRACTION')(0.5),
      bool('USE_MOCK')(false),
      array(str('CORS')('*')),
      array(int('SCHEDULED_HOUR')()),
      array(int('SCHEDULED_MINUTES')()),
      json('AUTH')<Auth>(),
      line(json('USER')<User>()),
    ])

    const env = {
      PORT: '8080',
      USE_MOCK: 'true',
      SCHEDULED_MINUTES: '10,20 30\n40,,50 , \n60',
      AUTH: '{"id": "abc", "password": "123"}',
      USER: '{"name": "Bob"}\n{"name": "Alice"}',
    }

    const res = parse(env)

    expect(res).toStrictEqual({
      HOST: '0.0.0.0',
      PORT: 8080,
      N_PROCESS: undefined,
      FRACTION: 0.5,
      USE_MOCK: true,
      CORS: ['*'],
      SCHEDULED_HOUR: [],
      SCHEDULED_MINUTES: [10, 20, 30, 40, 50, 60],
      AUTH: { id: 'abc', password: '123' },
      USER: [{ name: 'Bob' }, { name: 'Alice' }],
    })
  })
})
