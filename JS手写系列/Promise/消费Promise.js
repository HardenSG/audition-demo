const MyPromise = require('./Promise静态')

// const instance = new MyPromise((resolve, reject) => {
//     resolve(1)
// })


// instance.then((res) => {
//     console.log(res);
// }).then((res) => {
//     console.log(res);
// })


////////////静态方法//////////


// const iterator = [
//     MyPromise.resolve(1),
//     // MyPromise.reject(8),
//     2,
//     3,
//     new MyPromise((resolve) => {
//       setTimeout(() => {
//         resolve(4);
//       }, 2000);
//     }),
//     {
//       then(resolve) {
//         //// 需要有resolve
//         resolve("demo");
//       },
//     },
//   ];
// const pipe = MyPromise.all(iterator)
// pipe.then((result) => {
//   console.log(result);  
// }).catch(e => {
//     console.log('error --->', e);
// })

// test.js


// Promise.resolve().then(() => {
//   console.log(0);
//   return Promise.resolve(4);
// }).then((res) => {
//   console.log(res)
// })

// Promise.resolve().then(() => {
//   console.log(1);
// }).then(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// }).then(() => {
//   console.log(5);
// }).then(() =>{
//   console.log(6);
// })

console.log(Object.getOwnPropertyNames(Promise));
