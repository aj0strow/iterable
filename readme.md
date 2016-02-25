# `iterable`

This is a concept inspired by [clojure transducers](http://clojure.org/reference/transducers). Write transforms for any `Symbol.iterator` iterable data structure.

```js
var increment = iterable.map(x => x + 1)
var even = iterable.filter(x => x % 2 == 0)

var transform = iterable.thread([
  increment,
  even,
])

transform([ 1, 2, 3 ])

transform(new Set([ 1, 2, 3 ]))
```

See `iterable-test.js` for more example code.

**MIT License**
