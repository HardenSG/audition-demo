const MyPromise = require("./手写Promise");

const isObj = (v) => typeof v === "object";

/** 不要直接return 一个新的promise，这样会导致需要重新then才可以打印出内容 */
// MyPromise.resolve = function(v) {
//     return new MyPromise((resolve, reject) => {
//         if(v instanceof MyPromise) {
//             return v
//         }
//         if(isObj(v) && 'then' in v) {
//             return new MyPromise((resolve, reject) => {
//                 v.then(resolve, reject)
//             })
//         }

//         return new MyPromise((resolve, reject) => {
//             reject(v)
//         })
//     })
// }

MyPromise.resolve = function (v) {
  if (v instanceof MyPromise) {
    return v;
  } else if (isObj(v) && "then" in v) {
    return new MyPromise((resolve, reject) => {
      v.then(resolve, reject);
    });
  }

  return new MyPromise((resolve) => {
    resolve(v);
  });
};

MyPromise.reject = function (v) {
  return new MyPromise((resolve, reject) => {
    reject(v);
  });
};

MyPromise.all = function (iterator) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(iterator)) {
      const result = [];
      let count = 0;
      if (iterator.length === 0) return resolve([]);
      iterator.forEach((item, i) => {
        if (item instanceof MyPromise || (isObj(item) && "then" in item)) {
          MyPromise.resolve(item).then(
            (y) => {
              count++;
              result[i] = y;
              count === iterator.length && resolve(result);
            },
            (e) => {
              reject(e);
            }
          );
        } else {
          count++;
          result[i] = item;
          count === iterator.length && resolve(result);
        }
      });
    } else {
      reject("not a [[iterable]]'s object");
    }
  });
};

MyPromise.race = function (iterator) {
  return new MyPromise((resolve, reject) => {
    if (Array.isArray(iterator)) {
      iterator.forEach((item) => {
        MyPromise.resolve(item).then(resolve, reject);
      });
    } else {
      return reject("cannot read property Symbol(Symbol.iterator)");
    }
  });
};

module.exports = MyPromise;
