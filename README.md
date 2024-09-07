# each-arg

[![CircleCI](https://circleci.com/gh/manferlo81/each-arg.svg?style=svg)](https://circleci.com/gh/manferlo81/each-arg) [![npm](https://badgen.net/npm/v/each-arg)](https://www.npmjs.com/package/each-arg) [![codecov](https://codecov.io/gh/manferlo81/each-arg/branch/main/graph/badge.svg)](https://codecov.io/gh/manferlo81/each-arg) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/each-arg/badge?style=rounded)](https://www.jsdelivr.com/package/npm/each-arg) [![dependencies](https://badgen.net/david/dep/manferlo81/each-arg)](https://david-dm.org/manferlo81/each-arg) [![dev dependencies](https://badgen.net/david/dev/manferlo81/each-arg)](https://david-dm.org/manferlo81/each-arg?type=dev) [![packagephobia](https://badgen.net/packagephobia/install/each-arg)](https://packagephobia.now.sh/result?p=each-arg) [![bundlephobia](https://badgen.net/bundlephobia/min/each-arg)](https://bundlephobia.com/result?p=each-arg) [![types](https://img.shields.io/npm/types/each-arg.svg)](https://github.com/microsoft/typescript) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/each-arg/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/each-arg?targetFile=package.json) [![license](https://badgen.net/github/license/manferlo81/each-arg)](LICENSE)

Iterates through arguments or any other array-like object starting from a specific index.

## Install

```bach
npm i each-arg
```

## CDN

### jsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/each-arg@latest/dist/each-arg.umd.js">
```

*for production...*

```html
<script src="https://cdn.jsdelivr.net/npm/each-arg@latest/dist/each-arg.umd.min.js">
```

[more options...](https://www.jsdelivr.com/package/npm/each-arg?version=latest)

### unpkg

```html
<script src="https://unpkg.com/each-arg@latest/dist/each-arg.umd.js">
```

*for production...*

```html
<script src="https://unpkg.com/each-arg@latest/dist/each-arg.umd.min.js">
```

[more options...](https://unpkg.com/each-arg@latest/)

## Reference

***syntax***

```typescript
eachArg(arr, start, callback(value, index, ...extra): any, ...extra): void;
```

*Iterates over the* `array`*,* `string` *or* `array-like` `arr` *starting from the* `start` *index. The* `callback` *function will be called for every* `value` *in the array, with the* `value` *itself, the* `index` *of the current item and any* `extra` *argument passed to* `eachArg` *function.*

*If a negative* `start` *index is provided the iteration will start from* `X` *number of items counting from the last item in the input array-like.*

*If the* `callback` *returns a truthy value the iteration will stop.*

*Any* `extra` *argument passed to* `eachArg` *function will be passed down to the* `callback` *function.*

*The* `callback` *function inherits the* `this` *value form the* `eachArg` *function call. If you need a specific value inside the* `callback`, *call* `eachArg` *using it's* `call` *method.*

```typescript
eachArg.call(thisArg, arr, start, callback, ..extra);
```

***example***

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

## Usage

### Node.js

```javascript
const eachArg = require("each-arg");
eachArg(args, start, callback);
```

### Browser

*After adding the* `script` *tag,* `eachArg` *function will be available globally through* `eachArg` *or* `window.eachArg`*.*

```javascript
eachArg(args, start, callback);
```

## License

[MIT](LICENSE) &copy; [Manuel Fernández](https://github.com/manferlo81)
