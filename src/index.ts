import toArray from "args-to-arr";
import isArrayLike from "is-array-like";
import isFunction from "is-function";

type EachArgCallback<V, E extends any[], TH = any> = (
  this: TH,
  value: V,
  index: number,
  ...extra: E
) => any;

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
  const extraLength = argsLen - 3;

  if (extraLength < 0) {
    throw new TypeError(`expected 3 arguments, got ${argsLen}`);
  }

  if (!isArrayLike(arr)) {
    throw new TypeError(`${arr} can't be converted to array.`);
  }

  if (typeof start !== "number") {
    throw new TypeError(`${start} is not a number.`);
  }

  if (!isFunction(callback)) {
    throw new TypeError(`${callback} is not a function.`);
  }

  if (extraLength === 0) {

    for (let i0 = start, len = arr.length; i0 < len; i0++) {
      if (callback.call<TH, any, any>(this, arr[i0], i0)) {
        return;
      }
    }

  } else if (extraLength === 1) {

    for (let i1 = start, len = arr.length; i1 < len; i1++) {
      if (callback.call<TH, any, any>(this, arr[i1], i1, args[3])) {
        return;
      }
    }

  } else {

    const extra = toArray(args, 3) as E;

    for (let i = start, len = arr.length; i < len; i++) {
      if (callback.call<TH, any, any>(this, arr[i], i, ...extra)) {
        return;
      }
    }

  }

}

export default eachArg;
