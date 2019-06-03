import toArray from "args-to-arr";
import isArrayLike from "is-array-like";
import isFunction from "is-function";

type EachArgCallback<V, E extends any[], TH = any> = (
  this: TH,
  value: V,
  index: number,
  ...extra: E
) => any;

function error(message: string) {
  return new TypeError(message);
}

function wrapCallback<V, E extends any[], TH = any>(callback: EachArgCallback<V, E, TH>, args: IArguments) {

  const extraLen = args.length - 3;

  return (extraLen === 0)
    ? (thisArg: TH, arr: ArrayLike<V>, index: number) => callback.call<TH, any, any>(
      thisArg,
      arr[index],
      index,
    )
    : (extraLen === 1)
      ? (thisArg: TH, arr: ArrayLike<V>, index: number) => callback.call<TH, any, any>(
        thisArg,
        arr[index],
        index,
        args[3],
      )
      : (thisArg: TH, arr: ArrayLike<V>, index: number) => callback.call<TH, any, any>(
        thisArg,
        arr[index],
        index,
        ...toArray(args, 3) as E,
      );

}

function eachArg<V, E extends any[], TH = any>(
  this: TH,
  arr: ArrayLike<V>,
  start: number,
  callback: EachArgCallback<V, E, TH>,
  ...extra: E
): void;
function eachArg<V, E extends any[], TH = any>(
  this: TH,
  arr: ArrayLike<V>,
  start: number,
  callback: EachArgCallback<V, E, TH>,
): void {

  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 3) {
    throw error(`expected 3 arguments, got ${argsLen}`);
  }

  if (!isArrayLike(arr)) {
    throw error(`${arr} can't be converted to array.`);
  }

  if (typeof start !== "number") {
    throw error(`${start} is not a number.`);
  }

  if (!isFunction(callback)) {
    throw error(`${callback} is not a function.`);
  }

  const cb = wrapCallback(callback, arguments);

  for (let i = start, len = arr.length; i < len; i++) {
    if (cb(this, arr, i)) {
      return;
    }
  }

}

export default eachArg;
