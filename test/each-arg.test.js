// @ts-check

const eachArg = require("..");

test("should throw on not enough arguments", () => {

  expect(() => {
    // @ts-ignore
    eachArg([1, 2, 3], 0);
  }).toThrow(TypeError);

});

test("should throw on invalid array-like param", () => {

  /** @type { any } */
  const invalidArrayLike = {};

  expect(() => {
    eachArg(invalidArrayLike, 0, () => { });
  }).toThrow(TypeError);

});

test("should throw on invalid start param", () => {

  /** @type { any } */
  const invalidStart = {};

  expect(() => {
    eachArg([1, 2, 3], invalidStart, () => { });
  }).toThrow(TypeError);

});

test("should throw on invalid callback param", () => {

  /** @type { any } */
  const invalidCallback = {};

  expect(() => {
    eachArg([1, 2, 3], 0, invalidCallback);
  }).toThrow(TypeError);

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

test("should work with more than 1 extra arguments", () => {

  const array = [1, 2, 3, 4];
  const callback = jest.fn();
  const extra1 = {};
  const extra2 = [];

  eachArg(array, 0, callback, extra1, extra2);

  array.forEach((value, index) => {
    expect(callback).toHaveBeenNthCalledWith(index + 1, value, index, extra1, extra2);
  });

});

test("should start from given start point", () => {

  const args = [1, 2, 3];
  const start = 1;
  const callback = jest.fn();

  eachArg(args, start, callback);

  expect(callback).toHaveBeenCalledTimes(args.length - start);

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
