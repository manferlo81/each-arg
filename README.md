# each-arg

Iterates through arguments or any other array-like object starting from specific index.

## Install

```bach
npm i each-arg
```

## Usage

##### syntax

```typescript
eachArg(arr, start, callback(value, index, ...extra): any, ...extra): void;
```

Iterates over the `array` or `array-like` `arr` starting from the `start` index. The `callback` function will be called for every `value` in the array, with the `value` itself, the `index` of the current item and any `extra` argument passed to `eachArg` function.

Any `extra` argument passed to `eachArg` function will be passed down to the `callback` function.

The `callback` function inherits the `this` value form the `eachArg` function call. If you need a specific value inside the `callback`, call `eachArg` using it's `call` method.

```typescript
eachArg.call(thisArg, arr, start, callback, ..extra);
```

##### example

```javascript
import eachArg from "each-arg";

eachArg([1, 2, 3, 4, 5], 1, (value, index, num) => {
  console.log(value + " >> " + (index + num));
  return index === 3;
}, 100);
```

```console
2 >> 101
3 >> 102
4 >> 103
```

## License

[MIT](LICENSE) &copy; [Manuel Fernández](https://github.com/manferlo81)
