import toArray from "args-to-arr";
import isArrayLike from "is-array-like";

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

  if (!isArrayLike(arr)) {
    throw new TypeError(`${arr} can't be converted to array.`);
  }

  if (typeof start !== "number") {
    throw new TypeError(`${start} is not a number.`);
  }

  const len = arr.length;
  const extra = toArray(arguments, 3) as E;

  for (let i = start; i < len; i++) {
    if (callback.call<TH, any, any>(this, arr[i], i, ...extra)) {
      return;
    }
  }

}

export default eachArg;
