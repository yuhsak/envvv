export const isString = (v?: string | undefined): v is string => typeof v === 'string'

export const isValidDate = <T extends Date>(v: T) => !Number.isNaN(v.getTime())
