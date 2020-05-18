declare module 'is-array-like' {
  function isArrayLike<T = unknown>(param: unknown): param is ArrayLike<T>;
  export default isArrayLike;
}
