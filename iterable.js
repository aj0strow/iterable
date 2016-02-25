function reduce (f, x) {
  return function (input) {
    var value = x
    for (var y of input) {
      value = f(value, y)
    }
    return value
  }
}

exports.reduce = reduce



function thread (transforms) {
  return function (input) {
    var apply = reduce((x, f) => f(x), input)
    return apply(transforms)
  }
}

exports.thread = thread



function append (iterable) {
  return function * (input) {
    for (var x of input) {
      yield x
    }
    for (var x of iterable) {
      yield x
    }
  }
}

exports.append = append



function prepend (iterable) {
  return function * (input) {
    for (var x of iterable) {
      yield x
    }
    for (var x of input) {
      yield x
    }
  }
}

exports.prepend = prepend



function take (n) {
  return function * (input) {
    var count = 0
    for (var x of input) {
      yield x
      count += 1
      if (count == n) {
        break
      }
    }
  }
}

exports.take = take



function skip (n) {
  return function * (input) {
    var count = 0
    for (var x of input) {
      if (count >= n) {
        yield x
      }
      count += 1
    }
  }
}

exports.skip = skip



function map (f) {
  return function * (input) {
    for (var x of input) {
      yield f(x)
    }
  }
}

exports.map = map



function filter (f) {
  return function * (input) {
    for (var x of input) {
      if (f(x)) {
        yield x
      }
    }
  }
}

exports.filter = filter



function chunk (f) {
  return function * (input) {
    var chunk = [], prev, next
    for (var x of input) {
      next = f(x)
      if (chunk.length && next == prev) {
        yield chunk
        chunk = []
      }
      prev = next
      chunk.push(x)
    }
    if (chunk.length) {
      yield chunk
    }
  }
}

exports.chunk = chunk



function flatten (max) {
  var flatten = function * (input, depth) {    
    if (max && depth > max) {
      yield input
    }
    else if (!input|| !input[Symbol.iterator]) {
      yield input
    }
    else {
      for (var x of input) {
        var iterable = flatten(x, depth + 1)
        for (var y of iterable) {
          yield y
        }
      }
    }
  }
  return function (input) {
    return flatten(input, 0)
  }
}

exports.flatten = flatten


