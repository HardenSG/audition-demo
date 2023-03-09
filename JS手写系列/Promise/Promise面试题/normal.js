/**
 *  then error....
 *  return了新的值会被包裹成一个Promise 
 */
// Promise.resolve()
//   .then(() => {
//     return new Error("error!!!");
//   })
//   .then((res) => {
//     console.log("then: ", res);
//   })
//   .catch((err) => {
//     console.log("catch: ", err);
//   });


/**
 *  RESULT: 
 *    test start
 *    执行testSomething
 *    promise start
 *    test end
 *    testSomething
 *    执行testAsync
 *    promise 
 *    hello async
 *    testSomethings hello async
 */

// async function testSomething() {
//   console.log("执行testSomething");
//   return "testSomething";
// }

// async function testAsync() {
//   console.log("执行testAsync");
//   return Promise.resolve("hello async");
// }

// async function test() {
//   console.log("test start...");
//   const v1 = await testSomething();
//   console.log(v1);
//   const v2 = await testAsync();
//   console.log(v2);
//   console.log(v1, v2);
// }

// test();

// var promise = new Promise(resolve => {
//   console.log("promise start...");
//   resolve("promise");
// });
// promise.then(val => console.log(val));

// console.log("test end...");



/**
 *  RESULT:
 *    script start
 *    error!!!
 *    async1
 *    async1 success
 */
// async function async1 () {
//   try {
//     await Promise.reject('error!!!')
//   } catch(e) {
//     console.log(e)
//   }
//   console.log('async1');
//   return Promise.resolve('async1 success')
// }
// async1().then(res => console.log(res))
// console.log('script start')


/**
 *  RESULT: 
 *    3
 *    7
 *    4
 *    1
 *    2
 *    5
 *    Promise<fulfilled>: 1
 */
// const first = () => (new Promise((resolve, reject) => {
//   console.log(3);
//   let p = new Promise((resolve, reject) => {
//       console.log(7);
//       setTimeout(() => {
//           console.log(5);
//           resolve(6);
//           console.log(p)
//       }, 0)
//       resolve(1);
//   });
//   resolve(2);
//   p.then((arg) => {
//       console.log(arg);
//   });
// }));
// first().then((arg) => {
//   console.log(arg);
// });
// console.log(4);


/**
 *  RESULT:
 *    script start
 *    async1
 *    promise1 ++
 *    script end
 *    1
 *    timer2
 *    timer1
 */
// const async1 = async () => {
//   console.log('async1');
//   setTimeout(() => {
//     console.log('timer1')
//   }, 2000)
//   await new Promise(resolve => {
//     console.log('promise1')
//   })
//   console.log('async1 end')
//   return 'async1 success'
// } 
// console.log('script start');
// async1().then(res => console.log(res));
// console.log('script end');
// Promise.resolve(1)
//   .then(2)
//   .then(Promise.resolve(3))
//   .catch(4)
//   .then(res => console.log(res))
// setTimeout(() => {
//   console.log('timer2')
// }, 1000)


/**
 * RESULT:
 *    resolve1
 *    finally undefined
 *    timer1
 *    Promise<fulfilled> resolve1
 */

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resolve1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})