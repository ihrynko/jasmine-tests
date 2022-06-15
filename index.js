//1
function sequence(start, step) {
  start = start || 0;
  step = step || 1;
  var callNumber = start;
  return function () {
    var returnValue = callNumber;
    callNumber += step;
    return returnValue;
  };
}

//2
function take(fn, count) {
  var array = [];
  for (var i = 0; i < count; i++) {
    array[i] = fn();
  }
  return array;
}

//3
function map(fn, array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result[i] = fn(array[i]);
  }
  return result;
}

//4
function fmap(a, gen) {
  var x = 0;
  var y = 0;
  var generation = function () {
    var array = [];
    for (var i = 0; i < arguments.length; i++) {
      array[i] = arguments[i];
    }
    x = gen.apply(null, array);
    y = a(x);
    return y;
  };
  return generation;
}

//5
function partial(fn, ...partialArgs) {
  return function (...args) {
    return fn.apply(this, partialArgs.concat(args));
  };
}

//6
function partialAny(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  var array = [];
  for (var i = 0; i < args.length; i++) {
    if (args[i] === undefined) array.push(i);
  }
  return function () {
    var j = 0;
    var args1 = Array.prototype.slice.call(arguments, 0);
    if (array.length > 0) {
      for (var i = 0; i < array.length; i++) {
        args[array[i]] = args1[j];
        j++;
      }
    }
    for (var i = 0; i < args1.length - array.length; i++) {
      args.push(args1[j]);
      j++;
    }
    return fn.apply(null, args);
  };
}

//7
function bind(fn, context) {
  return function () {
    return fn.apply(context, Array.prototype.slice.call(arguments));
  };
}

//8
function pluck(objects, fieldName) {
  var result = [];
  for (var i = 0; i < objects.length; i++) {
    result.push(objects[i][fieldName]);
  }
  return result;
}

//9
function filter(arr, fn) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

//10
function count(obj) {
  return Object.keys(obj).length;
}
