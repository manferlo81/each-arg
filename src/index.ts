import toArray from "args-to-arr";
import isArrayLike from "is-array-like";
import isFunction from "is-function";

type Extra = any[];

type EachArgCallback<V, E extends Extra, TH = any> = (
  this: TH,
  value: V,
  index: number,
  ...extra: E
) => any;

function error(message: string) {
  return new TypeError(message);
}

function wrapCallback<V, E extends Extra, TH = any>(
  callback: EachArgCallback<V, E, TH>,
  thisArg: TH,
  arr: IArguments | V[] | string | ArrayLike<V>,
  args: IArguments,
  argsLen: number,
) {

  const extraLen = argsLen - 3;

  return (extraLen === 0)
    ? (i: number) => callback.call<TH, any, any>(
      thisArg,
      arr[i],
      i,
    )
    : (extraLen === 1)
      ? (i: number) => callback.call<TH, any, any>(
        thisArg,
        arr[i],
        i,
        args[3],
      )
      : (i: number) => callback.call<TH, any, any>(
        thisArg,
        arr[i],
        i,
        ...toArray(args, 3) as E,
      );

}

function eachArg<V, E extends Extra, TH = any>(
  this: TH,
  arr: IArguments | V[] | string | ArrayLike<V>,
  start: number,
  callback: EachArgCallback<V, E, TH>,
  ...extra: E
): void;

function eachArg<V, TH = any>(
  this: TH,
  arr: IArguments | V[] | string | ArrayLike<V>,
  start: number,
  callback: EachArgCallback<V, Extra, TH>,
  ...extra: Extra
): void;

function eachArg<V, E extends Extra, TH = any>(
  this: TH,
  arr: IArguments | V[] | string | ArrayLike<V>,
  start: number,
  callback: EachArgCallback<V, E, TH>,
): void {

  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 3) {
    throw error(`expected 3 arguments, got ${argsLen}`);
  }

  if (!isArrayLike(arr) && arr !== "") {
    throw error(`${arr} can't be converted to array.`);
  }

  if (typeof start !== "number" || !isFinite(start)) {
    throw error(`${start} is not a valid start point.`);
  }

  if (!isFunction(callback)) {
    throw error(`${callback} is not a function.`);
  }

  const arrObj = Object(arr);
  const cb = wrapCallback(callback, this, arrObj, args, argsLen);

  for (let i = start, len = arrObj.length; i < len; i++) {
    if (i in arrObj && cb(i)) {
      return;
    }
  }

}

export default eachArg;
