# envvv

Yet another extendable env parser, comfortably typed.

## Install

```sh
npm install envvv
```

## Usage

```ts
import { combine, str, int, float, bool, json, array, line } from 'envvv'

type Auth = {
  id: string
  password: string
}

type User = {
  name: string
}

const parse = combine([
  str('HOST')('0.0.0.0'),
  int('PORT')(8000),
  int('N_PROCESS')(),
  float('FRACTION')(0.5),
  bool('USE_MOCK')(false),
  array(str('CORS')('*')),
  array(int('SCHEDULED_HOURS')()),
  array(int('SCHEDULED_MINUTES')()),
  json('AUTH')<Auth>(),
  line(json('USER')<User>()),
])

/*
type parse = (obj: Record<string, string | undefined>) => {
  HOST: string
  PORT: number
  N_PROCESS?: number
  FRACTION: number
  USE_MOCK: boolean
  CORS: string[]
  SCHEDULED_HOURS: number[]
  SCHEDULED_MINUTES: number[]
  AUTH?: Auth
  USER: USER[]
}
*/

// const res = parse(process.env)

const processEnv = {
  PORT: '8080',
  USE_MOCK: 'true',
  SCHEDULED_MINUTES: '10,20 30\n40,,50 , \n60',
  AUTH: '{"id": "abc", "password": "123"}',
  USER: '{"name": "Bob"}\n{"name": "Alice"}',
}

const res = parse(processEnv)

/*
res = {
  HOST: '0.0.0.0',
  PORT: 8080,
  N_PROCESS: undefined,
  FRACTION: 0.5,
  USE_MOCK: true,
  CORS: ['*'],
  SCHEDULED_HOURS: [],
  SCHEDULED_MINUTES: [10, 20, 30, 40, 50, 60],
  AUTH: {id: 'abc', password: '123'},
  USER: [
    {name: 'Bob'},
    {name: 'Alice'}
  ]
}
*/
```

## Custom resolver

```ts
import { resolve, combine, int } from 'envvv'
import type { Parser } from 'envvv'

const asOnOff: Parser<'ON' | 'OFF'> = (v) => {
  if (/^on$/i.test(v)) return 'ON'
  if (/^off$/i.test(v)) return 'OFF'
  throw new Error('failed to parse value as "ON" and "OFF"')
}

const onoff = resolve(asOnOff)

const parse = combine([
  int('PORT')(8080),
  onoff('SWITCH')('OFF'),
])

parse({ PORT: 8000 })
/*
{
  PORT: 8000,
  SWITCH: 'OFF'
}
*/

parse({ SWITCH: 'on' })
/*
{
  PORT: 8080,
  SWITCH: 'ON'
}
*/

parse({ SWITCH: 'true' })
/*
throws Error('failed to parse value as "ON" and "OFF"')
*/
```
