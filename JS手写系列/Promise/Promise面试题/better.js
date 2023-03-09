/**
 *  题目地址：https://juejin.cn/post/6844904077537574919#heading-50
 */

/**
 *  Promise每隔一秒打印123
 */
// const arr = [1, 2, 3]
// arr.reduce(
//     (p, v) =>
//     p.then(
//         () => new Promise((r) =>
//             setTimeout(() => {
//                 r(console.log(v))
//             }, 1000)
//         )
//     ),
//     Promise.resolve()
// )

/**
 *  红绿灯交替亮
 */
// function red() {
//     console.log('red');
// }
// function green() {
//     console.log('green');
// }
// function yellow() {
//     console.log('yellow');
// }

// const light = (cb, delay) => {
//     return new Promise(
//     resolve =>
//         setTimeout(() => {
//             cb()
//             resolve()
//         }, delay)
// )
// }

// (() => {
//     Promise.resolve(1).then(() => {
//         return light(red, 3000)
//     }).then(() => {
//         return light(yellow, 2000)
//     }).then(() => {
//         return light(green, 1000)
//     })
// })()

const time = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
};
const ajax1 = () =>
  time(2000).then(() => {
    console.log(1);
    return 1;
  });
const ajax2 = () =>
  time(1000).then(() => {
    console.log(2);
    return 2;
  });
const ajax3 = () =>
  time(1000).then(() => {
    console.log(3);
    return 3;
  });

function mergePromise(iterator) {
  // 在这里写代码
  if (Array.isArray(iterator)) {
    if (iterator.length === 0) return resolve([]);

    const result = [];
    let p = Promise.resolve();
    iterator.forEach((item) => {
      p = p.then(item).then((res) => {
        result.push(res);
        return result; // 给这个Promise做值的
      });
    });
    return p;
  } else{
    throw new TypeError('not a iterable\'s object')
  }
}

// mergePromise([ajax1, ajax2, ajax3]).then((data) => {
//   console.log("done");
//   console.log(data); // data 为 [1, 2, 3]
// });


/**
 *  构造一个并发队列
 */