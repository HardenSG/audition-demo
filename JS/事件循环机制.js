/**
 *  事件循环机制学习：内容参考：https://juejin.cn/post/6969028296893792286
 */

// /* RESULT: 1, 7 ,6,,8,2,4,9,11,3,5,10,12*/
// /** REAL RESULT: 1，7，6，8，2，4，3，5，9，11，10，12 */
// console.log("1");

// setTimeout(function () {
//   console.log("2");
//   process.nextTick(function () {
//     console.log("3");
//   });
//   new Promise(function (resolve) {
//     console.log("4");
//     resolve();
//   }).then(function () {
//     console.log("5");
//   });
// });

// process.nextTick(function () {
//   console.log("6");
// });

// new Promise(function (resolve) {
//   console.log("7");
//   resolve();
// }).then(function () {
//   console.log("8");
// });

// setTimeout(function () {
//   console.log("9");
//   process.nextTick(function () {
//     console.log("10");
//   });
//   new Promise(function (resolve) {
//     console.log("11");
//     resolve();
//   }).then(function () {
//     console.log("12");
//   });
// });


// async function async1() {
//   console.log("a");
//   // await会阻塞执行，等待promise的返回，在此期间其他代码可以执行
//   const res = await async2();
//   console.log("b");
// }

// async function async2() {
//   console.log("c");
//   return 2;
// }

// console.log("d");

// setTimeout(() => {
//   console.log("e");
// }, 0);

// async1().then(res => {
//   console.log("f")
// })

// new Promise((resolve) => {
//   console.log("g");
//   resolve();
// }).then(() => {
//   console.log("h");
// });

// console.log("i");

// /**
// * 输出结果：d a c g i b h f e 
// */



/**
 *  RESULT：存在2000s
 *    兜底宏任务
 *    nextTick
 *    第一个定时器
 *    顶部
 *    立即执行第一个
 *    立即执行第二个
 *    data get
 *    解决问题
 *    ok get it
 *    单纯就返回一个promise
 *    最后一个then了
 *    成功了
 * 
 *  RESULT：不存在时间
 *    兜底宏任务
 *    nextTick
 *    第一个定时器
 *    解决问题
 *    ok get it
 *    单纯就返回一个promise
 *    最后一个then了
 *    顶部
 *    立即执行第一个
 *    立即执行第二个
 *    成功了
 *    data get
 */
// setImmediate(() => {
//   console.log('顶部');
// })

// process.nextTick(() => {
//   console.log('nextTick');
// })

// setTimeout(() => {
//   console.log('第一个定时器');
// }, 0);

// setImmediate(() => {
//   console.log('立即执行第一个');
// })

// new Promise((resolve) => {
//   setTimeout(() => {
//     console.log('解决问题');
//     resolve()
//     setTimeout(() => {
//       console.log('成功了');
//     }, 0);
//   }, 0);
// }).then(res => {
//   console.log('ok get it');
//   return new Promise((resolve) => {
//     console.log('单纯就返回一个promise');
//     resolve()
//   })
// }).then(() => {
//   console.log('最后一个then了');
// })

// require('fs').readFile('./生成器.js',(err, data) => {
//   if(err) console.log('error');
//   console.log('data get');
// })

// setImmediate(() => {
//   console.log('立即执行第二个');
// })
// console.log('兜底宏任务');



/** RESULT：
    script start
    async1 start
    async2
    promise1
    script end
    async1 end
    promise2
    setTimeout
 */
// async function async1() {
//   console.log('async1 start');
//   await async2();//易错点
//   console.log('async1 end');
// }
// async function async2(params) {
//   console.log('async2');
// }

// console.log('script start');

// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);

// async1();

// new Promise((resolve) => {
//   console.log('promise1');
//   resolve();
// }).then(() => {
//   console.log('promise2');
// })

// console.log('script end');


/**
 *  RESULT：
 *    start
 *    children4
 *    children2
 *    children5 XXX children3
 *    children3 XXX children5
 *    children7
 *    children6
 *    
 */
// console.log('start');
// setTimeout(() => {
//     console.log('children2');
//     Promise.resolve().then(() => {
//         console.log('children3');
//     })
// }, 0);

// new Promise((resolve,reject) => {
//     console.log('children4');
//     setTimeout(() => {
//         console.log('children5');
//         resolve('children6');
//     }, 0);
// }).then((res) => {//易错点
//     console.log('children7');
//     setTimeout(() => {
//         console.log(res);
//     }, 0);
// })

/**
 *  RESULT:
 *    3
 *    end
 *    2
 *    4
 */
// const p = function (params) {
//   return new Promise((resolve,reject) => {
//       const p1 = new Promise((resolve,reject) => {
//           setTimeout(() => {
//               resolve(1);
//           }, 0);
//           resolve(2);//易错点
//       })

//       p1.then((res) => {
//           console.log(res);
//       })

//       console.log(3);

//       resolve(4);
//   })
// }

// p().then((res) => {
//   console.log(res)
// })

// console.log('end');


/**
 *  RESULT:
 *    start
 *    end
 *    promise3
 *    timer1
 *    promise1
 *    timer2
 *    promise2
 */
// console.log('start')
// setTimeout(() => {
//   console.log('timer1')
//   Promise.resolve().then(function() {
//     console.log('promise1')
//   })
// }, 0)
// setTimeout(() => {
//   console.log('timer2')
//   Promise.resolve().then(function() {
//     console.log('promise2')
//   })
// }, 0)
// Promise.resolve().then(function() {
//   console.log('promise3')
// })
// console.log('end')




