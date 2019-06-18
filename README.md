# each-arg

[![CircleCI](https://circleci.com/gh/manferlo81/each-arg.svg?style=svg)](https://circleci.com/gh/manferlo81/each-arg) [![Greenkeeper badge](https://badges.greenkeeper.io/manferlo81/each-arg.svg)](https://greenkeeper.io/) [![npm](https://img.shields.io/npm/v/each-arg.svg)](https://www.npmjs.com/package/each-arg) [![jsdelivr](https://data.jsdelivr.com/v1/package/npm/each-arg/badge?style=rounded)](https://www.jsdelivr.com/package/npm/each-arg) [![dependencies Status](https://david-dm.org/manferlo81/each-arg/status.svg)](https://david-dm.org/manferlo81/each-arg) [![devDependencies Status](https://david-dm.org/manferlo81/each-arg/dev-status.svg)](https://david-dm.org/manferlo81/each-arg?type=dev) [![install size](https://packagephobia.now.sh/badge?p=each-arg)](https://packagephobia.now.sh/result?p=each-arg) [![npm bundle size](https://img.shields.io/bundlephobia/min/each-arg.svg)](https://bundlephobia.com/result?p=each-arg) [![npm type definitions](https://img.shields.io/npm/types/each-arg.svg)](https://github.com/microsoft/TypeScript) [![codecov](https://codecov.io/gh/manferlo81/each-arg/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/each-arg) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/each-arg/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/each-arg?targetFile=package.json) [![license](https://img.shields.io/npm/l/each-arg.svg)](LICENSE)

Iterates through arguments or any other array-like object starting from specific index.

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

###### syntax

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

###### example

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
