import { resolve } from '../src/resolve'
import { asInt } from '../src/parser'

const int = resolve(asInt)
const port = int('PORT')()
const fallbackPort = int('PORT')(8080)

describe('resolve', () => {
  test("returns undefined when the object doesn't have a value for corresponding key and fallback value isn't specified", () => {
    expect(port.fn({}).value).toBe(void 0)
  })
  test("returns fallback value when the object doesn't have a value for corresponding key and fallback value is specified", () => {
    expect(fallbackPort.fn({}).value).toBe(8080)
  })
  test('returns parsed value when the object has a value for corresponding key', () => {
    expect(port.fn({ PORT: '8000' }).value).toBe(8000)
  })
})
