import eachArg from '../src'
import type { Anything } from '../src/types'

test('should throw on not enough arguments', () => {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  expect(() => eachArg([1, 2, 3])).toThrow(TypeError)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  expect(() => eachArg([1, 2, 3], 0)).toThrow(TypeError)

})

test('should throw on invalid array-like param', () => {

  const invalidArrayLike = [
    {},
    function invalid() {
      return null
    },
    () => null,
    0,
    1,
    true,
    false,
  ]

  invalidArrayLike.forEach((array) => {
    const exec = () => {
      eachArg(array as never, 0, () => null)
    }
    expect(exec).toThrow(TypeError)
  })

})

test('should throw on invalid start param', () => {

  const invalidStart = [
    {},
    [],
    function invalid() {
      return null
    },
    () => null,
    true,
    false,
    1 / 0,
    -1 / 0,
    Infinity,
    -Infinity,
    1 / +'NaN',
    NaN,
    '',
    'string',
  ]

  invalidStart.forEach((start) => {
    const exec = () => {
      eachArg([1, 2, 3], start as never, () => null)
    }
    expect(exec).toThrow(TypeError)
  })

})

test('should throw on invalid callback param', () => {

  const invalidCallback = [
    {},
    [],
    0,
    1,
    true,
    false,
    '',
    'string',
  ]

  invalidCallback.forEach((callback) => {
    const exec = () => {
      eachArg([1, 2, 3], 0, callback as never)
    }
    expect(exec).toThrow(TypeError)
  })

})

test('should return undefined', () => {

  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const result = eachArg([1, 2, 3], 0, () => null)

  expect(result).toBeUndefined()

})

test('should inherit this value', () => {

  const thisValue = {}
  const arr = [1, 2, 3]

  const callback = jest.fn(function cb(this: Anything) {
    expect(this).toBe(thisValue)
  })

  eachArg.call(thisValue, arr, 0, callback)

  expect(callback).toHaveBeenCalledTimes(arr.length)

})

test('should work with no extra arguments', () => {

  const array = [1, 2, 3, 4]
  const callback = jest.fn()

  eachArg(array, 0, callback)

  array.forEach((value, index) => {
    expect(callback).toHaveBeenNthCalledWith(index + 1, value, index)
  })

})

test('should work with 1 extra arguments', () => {

  const array = [1, 2, 3, 4]
  const callback = jest.fn()
  const extra1 = {}

  eachArg(array, 0, callback, extra1)

  array.forEach((value, index) => {
    expect(callback).toHaveBeenNthCalledWith(index + 1, value, index, extra1)
  })

})

test('should work with multiple extra arguments', () => {

  const array = [1, 2, 3, 4]
  const callback = jest.fn()
  const extra1 = {}
  const extra2: Anything[] = []

  eachArg(array, 0, callback, extra1, extra2)

  array.forEach((value, index) => {
    expect(callback).toHaveBeenNthCalledWith(index + 1, value, index, extra1, extra2)
  })

})

test('should work with arguments object', () => {

  const args = [1, 2, 3]
  const callback = jest.fn()

  function func(...args: Anything[]): void
  function func() {
    // eslint-disable-next-line prefer-rest-params
    eachArg(arguments, 0, callback)
  }

  func(...args)

  expect(callback).toHaveBeenCalledTimes(args.length)

})

test('should work with empty string', () => {

  const callback = jest.fn()
  const exec = () => {
    eachArg('', 0, callback)
  }

  expect(exec).not.toThrow()
  expect(callback).toHaveBeenCalledTimes(0)

})

test('should work with string', () => {

  const str = 'string'
  const callback = jest.fn()

  eachArg(str, 0, callback)

  expect(callback).toHaveBeenCalledTimes(str.length)

})

test('should start from given start index', () => {

  const values = [2, 3]
  const args = [1, ...values]
  const start = args.length - values.length
  const callback = jest.fn()

  eachArg(args, start, callback)

  values.forEach((value, index) => {

    expect(callback).toHaveBeenNthCalledWith(
      index + 1,
      value,
      index + start,
    )

  })

})

test('should start from negative start index', () => {

  const values = [2, 3]
  const args = [1, ...values]
  const start = -values.length
  const callback = jest.fn()

  eachArg(args, start, callback)

  values.forEach((value, index) => {

    expect(callback).toHaveBeenNthCalledWith(
      index + 1,
      value,
      index + args.length + start,
    )

  })

})

test('should skip non-existent values', () => {

  // eslint-disable-next-line no-sparse-arrays
  const args = [1, , 2, 3]
  const start = 0
  const callback = jest.fn()

  eachArg(args, start, callback)

  expect(callback).toHaveBeenCalledTimes(args.length - start - 1)

})

test('should stop if truthy value returned', () => {

  const args = [1, 2, 3, 4]
  const start = 1
  const stopIndex = 2
  const callback = jest.fn((_, index) => index === stopIndex)

  eachArg(args, start, callback)

  expect(callback).toHaveBeenCalledTimes(stopIndex - start + 1)

})
