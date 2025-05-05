// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Anything = any

export type Extra = Anything[]

export type EachArgCallback<V, E extends Extra, TH = Anything> = (
  this: TH,
  value: V,
  index: number,
  ...extra: E
) => Anything

export type WrappedEachArgCallback<R> = (index: number) => R
