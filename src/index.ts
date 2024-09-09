import toArray from 'args-to-arr';
import isArrayLike from 'is-array-like';
import isFunction from 'is-function';
import type { Anything, EachArgCallback, Extra, WrappedEachArgCallback } from './types';

function error(message: string): TypeError {
  return new TypeError(message);
}

function wrapCallback<V, E extends Extra, TH, R>(
  callback: EachArgCallback<V, E, TH>,
  thisArg: TH,
  arr: ArrayLike<V>,
  args: IArguments,
  argsLen: number,
): WrappedEachArgCallback<R> {

  if (argsLen === 3) {
    return (i: number) => callback.call<TH, Anything, R>(
      thisArg,
      arr[i],
      i,
    );
  }

  if (argsLen === 4) {
    const extra = args[3] as never;
    return (i: number) => callback.call<TH, Anything, R>(
      thisArg,
      arr[i],
      i,
      extra,
    );
  }

  const extra = toArray(args, 3) as E;

  return (i: number): Anything => callback.call<TH, Anything, R>(
    thisArg,
    arr[i],
    i,
    ...extra,
  );

}

function eachArg<V, E extends Extra, TH = Anything>(
  this: TH,
  arr: IArguments | V[] | string | ArrayLike<V>,
  start: number,
  callback: EachArgCallback<V, E, TH>,
  ...extra: E
): void;

function eachArg<V, TH = Anything>(
  this: TH,
  arr: IArguments | V[] | string | ArrayLike<V>,
  start: number,
  callback: EachArgCallback<V, Extra, TH>,
  ...extra: Extra
): void;

function eachArg<V, E extends Extra, TH = Anything>(
  this: TH,
  arr: IArguments | V[] | string | ArrayLike<V>,
  start: number,
  callback: EachArgCallback<V, E, TH>,
): void {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const { length: argsLen } = args;

  if (argsLen < 3) {
    throw error(`expected 3 arguments, got ${argsLen}`);
  }

  if (!isArrayLike(arr) && arr !== '') {
    throw error(`${arr} can't be converted to array.`);
  }

  if (typeof start !== 'number' || !Number.isFinite(start)) {
    throw error(`${start} is not a valid start point.`);
  }

  if (!isFunction(callback)) {
    throw error(`${callback} is not a function.`);
  }

  const arrObj = Object(arr) as ArrayLike<V>;
  const { length: len } = arrObj;

  if (start < 0) {
    start += len;
  }

  const cb = wrapCallback(
    callback,
    this,
    arrObj,
    args,
    argsLen,
  );

  for (let i = start; i < len; i++) {
    if (i in arrObj && cb(i)) {
      return;
    }
  }

}

export default eachArg;
