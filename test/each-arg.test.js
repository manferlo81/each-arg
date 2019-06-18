// @ts-check

const eachArg = require("..");

test("should throw on not enough arguments", () => {

  // @ts-ignore
  expect(() => eachArg([1, 2, 3], 0)).toThrow(TypeError);

});

test("should throw on invalid array-like param", () => {

  const invalidArrayLike = [
    {},
    function () { },
    () => { },
    0,
    1,
    true,
    false,
  ];

  invalidArrayLike.forEach((array) => {
    // @ts-ignore
    expect(() => eachArg(array, 0, () => { })).toThrow(TypeError);
  });

});

test("should throw on invalid start param", () => {

  const invalidStart = [
    {},
    [],
    function () { },
    () => { },
    true,
    false,
    1 / 0,
    -1 / 0,
    Infinity,
    -Infinity,
    1 / +"NaN",
    NaN,
    "",
    "string",
  ];

  invalidStart.forEach((start) => {
    // @ts-ignore
    expect(() => eachArg([1, 2, 3], start, () => { })).toThrow(TypeError);
  });

});

test("should throw on invalid callback param", () => {

  const invalidCallback = [
    {},
    [],
    0,
    1,
    true,
    false,
    "",
    "string",
  ];

  invalidCallback.forEach((callback) => {

    // @ts-ignore
    expect(() => eachArg([1, 2, 3], 0, callback)).toThrow(TypeError);

  });

});

test("should return undefined", () => {

  const result = eachArg([1, 2, 3], 0, () => { });

  expect(result).toBeUndefined();

});

test("should inherit this value", () => {

  const thisValue = {};
  const arr = [1, 2, 3];

  const callback = jest.fn(function () {
    expect(this).toBe(thisValue);
  });

  eachArg.call(thisValue, arr, 0, callback);

  expect(callback).toHaveBeenCalledTimes(arr.length);

});

test("should work with no extra arguments", () => {

  const array = [1, 2, 3, 4];
  const callback = jest.fn();

  eachArg(array, 0, callback);

  array.forEach((value, index) => {
    expect(callback).toHaveBeenNthCalledWith(index + 1, value, index);
  });

});

test("should work with 1 extra arguments", () => {

  const array = [1, 2, 3, 4];
  const callback = jest.fn();
  const extra1 = {};

  eachArg(array, 0, callback, extra1);

  array.forEach((value, index) => {
    expect(callback).toHaveBeenNthCalledWith(index + 1, value, index, extra1);
  });

});

test("should work with multiple extra arguments", () => {

  const array = [1, 2, 3, 4];
  const callback = jest.fn();
  const extra1 = {};
  const extra2 = [];

  eachArg(array, 0, callback, extra1, extra2);

  array.forEach((value, index) => {
    expect(callback).toHaveBeenNthCalledWith(index + 1, value, index, extra1, extra2);
  });

});

test("should work with arguments object", () => {

  const args = [1, 2, 3];
  const callback = jest.fn();

  const func = function () {
    eachArg(arguments, 0, callback);
  };

  func(...args);

  expect(callback).toHaveBeenCalledTimes(args.length);

});

test("should work with empty string", () => {

  const callback = jest.fn();

  expect(() => eachArg("", 0, callback)).not.toThrow();
  expect(callback).toHaveBeenCalledTimes(0);

});

test("should work with string", () => {

  const str = "string";
  const callback = jest.fn();

  eachArg(str, 0, callback);

  expect(callback).toHaveBeenCalledTimes(str.length);

});

test("should start from given start index", () => {

  const values = [2, 3];
  const args = [1, ...values];
  const start = args.length - values.length;
  const callback = jest.fn();

  eachArg(args, start, callback);

  values.forEach((value, index) => {

    expect(callback).toHaveBeenNthCalledWith(
      index + 1,
      value,
      index + start,
    );

  });

});

test("should start from negative start index", () => {

  const values = [2, 3];
  const args = [1, ...values];
  const start = -values.length;
  const callback = jest.fn();

  eachArg(args, start, callback);

  values.forEach((value, index) => {

    expect(callback).toHaveBeenNthCalledWith(
      index + 1,
      value,
      index + args.length + start,
    );

  });

});

test("should skip non-existent values", () => {

  // eslint-disable-next-line no-sparse-arrays
  const args = [1, , 2, 3];
  const start = 0;
  const callback = jest.fn();

  eachArg(args, start, callback);

  expect(callback).toHaveBeenCalledTimes(args.length - start - 1);

});

test("should stop if truthy value returned", () => {

  const args = [1, 2, 3, 4];
  const start = 1;
  const stopIndex = 2;
  const callback = jest.fn((_, index) => index === stopIndex);

  eachArg(args, start, callback);

  expect(callback).toHaveBeenCalledTimes(stopIndex - start + 1);

});

