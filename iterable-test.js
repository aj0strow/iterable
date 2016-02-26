var iterable = require("./iterable")
var assert = require("assert")

function toArray (iterable) {
  var values = []
  for (var x of iterable) {
    values.push(x)
  }
  return values
}

function test (name, f) {
  f()
}

function eq(a, b) {
  assert.deepEqual(a, b)
}



test("reduce", function () {
  var input = [ 1, 2, 3 ]
  var sum = iterable.reduce((x, y) => x + y, 0)
  var output = sum(input)
  eq(output, 6)
})



test("thread", function () {
  var input = 1
  var transform = iterable.thread([
    (x) => x + 1,
    (y) => y * 2,
  ])
  var output = transform(input)
  eq(output, 4)
})



test("append", function () {
  var input = [ 1, 2 ]
  var append = iterable.append([ 3 ])
  var output = toArray(append(input))
  eq(output, [ 1, 2, 3 ])
})



test("prepend", function () {
  var input = [ 2, 3 ]
  var prepend = iterable.prepend([ 1 ])
  var output = toArray(prepend(input))
  eq(output, [ 1, 2, 3 ])
})



test("take", function () {
  var input = [ 1, 2, 3, 4, 5 ]
  var take = iterable.take(2)
  var output = toArray(take(input))
  eq(output, [ 1, 2 ])
})



test("skip", function () {
  var input = [ 1, 2, 3, 4 ]
  var skip = iterable.skip(2)
  var output = toArray(skip(input))
  eq(output, [ 3, 4 ])
})



test("map", function () {
  var input = [ 1, 2, 3 ]
  var increment = iterable.map(x => x + 1)
  var output = toArray(increment(input))
  eq(output, [ 2, 3, 4 ])
})



test("filter", function () {
  var input = [ 1, 2, 3 ]
  var even = iterable.filter(x => x % 2 == 0)
  var output = toArray(even(input))
  eq(output, [ 2 ])
})



test("chunk", function () {
  var input = [ 1, 2, 3, 4, 5 ]
  var index = 0
  var pairs = iterable.chunk(x => Math.floor(index++ / 2))
  var output = toArray(pairs(input))
  eq(output, [ [1, 2], [3, 4], [5] ])
})



test("flatten", function () {
  var input = [ [1, 2], 3, [[4]] ]
  var flatten = iterable.flatten(1)
  var output = toArray(flatten(input))
  eq(output, [ 1, 2, 3, [4] ])
})


