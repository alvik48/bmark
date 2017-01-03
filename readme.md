# Bmark

`Bmark` is a micro library for time measurement in JS applications. It uses some ES2015 features (such as `constants` and `classes`) so you can use this library in `node.js` from version **4.0.0** and in browsers that supports ES2015. For usage in other browsers and platforms you may transpile this module via [Babel](https://babeljs.io/).

## Usage

First install module via `npm`:

```bash
npm install --save-dev bmark
```

Include `bmark` module to your project. For `node.js` and other systems that uses Commonjs modules:
    
```js
const Bmark = require('bmark');
```

Then you can create one or more `bmark` instances to measure the time in different parts of your program. Example:

```js
const bmark = new Bmark();
bmark.start();

// ...

console.info('Elapsed time in ms: ' + bmark.stop().getElapsed());
```

## API

Go to: [Bmark.start](#bmarkstart), [Bmark.stop](#bmarkstop), [Bmark.reset](#bmarkreset), [Bmark.getElapsed](#bmarkgetelapsedformat).

`Bmark` class constructor accepts input object. You can pass next options:
  - `options.throwErrors<Boolean>`: if set to false, `Bmark` instance will not throw any errors. Default: `true`.

All methods except `bmark.getElapsed()` returns current instance so you can chain method calls if you want. For example:

```js
const bmark = new Bmark();
bmark.start();

// ...

bmark.stop().reset().start();

// ...

console.log(bmark.stop().getElapsed());
```

### Bmark.start()

Starts time measurement from current time. You can call this method not only after creating new instance of `bmark` but in any time you want when current instance is not started.

```js
const bmark = new Bmark();
bmark.start(); // OK

// ...

bmark.stop();
bmark.start(); // OK

// ...

bmark.start(); // Error: Can't start current instance: it is already started
```

### Bmark.stop()

Stops time incrementing from current moment. It doesn't reset elapsed time so you can use this method as pause.

```js
const bmark = new Bmark();
bmark.start();

// ...

bmark.stop(); // OK

// ...

bmark.stop(); // Error: Can't stop current instance: it is already stopped
```

### Bmark.reset()

Sets 0 as current elapsed time. You can call this method when `bmark` instance is not working.

```js
const bmark = new Bmark();
bmark.start();

// ...

bmark.stop();
bmark.reset(); // OK

bmark.start();

// ...

bmark.reset(); // Error: Can't reset current instance: you must stop it before
```

### Bmark.getElapsed(format)

Returns elapsed time from first start to last stop (if no resets were called). Returns time in ms by default or as object of `format = 'object'`, in this case the returned object will contain `hours`, `minutes`, `seconds` and `ms` fields.

```js
const bmark = new Bmark();
bmark.start();

// ...

bmark.stop();

console.info('Result in ms: ' + bmark.getElapsed()); 
// Result in ms: 1900

console.info('Result as object: ' + JSON.stringify(bmark.getElapsed('object'))); 
// Result as object: {"hours":0,"minutes":0,"seconds":1,"ms":900}
```
