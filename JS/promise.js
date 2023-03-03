/**
 *  Promise学习，内容参考：
 *      红宝书
 *      Promise/A+规范：https://promisesaplus.com/
 */

/**
 *  Promise/A+规范规定：
 *      > A promise must be in one of three states: pending, fulfilled, or rejected.
 *      > state is stabled， but “must not change” means immutable identity, but does not imply deep immutability.
 *      then 方法 -> implement thenable 接口 具备then的能力
 *          A promise’s then method accepts two arguments:
 *              promise.then(onFulfilled, onRejected) both of onFulfilled or onRejected are function，if not a function，it must be ignored
 *          onFulfilled：
 *              不能在fulfill之前调用，会接收一个参数作为value，不能调用多次（这一点指代的是引擎的实现而不是用户的操作）
 *          onRejected：
 *              不能在rejected之前调用，会接受一个参数作为reason，不能调用多次（这一点指代的是引擎的实现而不是用户的操作）
 *      then方法可以调用多次，需按顺序依次执行
 *      then方法会返回一个promise
 *          如果then的onFulfilled或onRejected不是一个函数那么返回的就是一个与原promise的res或error一致
 *      如果调用then方法的时候throw一个 exception
 *          1. 如果resolvePromise或者rejectPromise已经被调用了，那就忽略
 *          2. 否则throw的这个exception将作为这个reject的原因
 *
 *      Promise Procedure:
 *          resolve: (value: T | PromiseLike<T>)
 *          reject: any
 *          > If/when x is fulfilled, fulfill promise with the same value.
 *          > If/when x is rejected, reject promise with the same reason.
 *
 */

/** RESULT：
 *      已解决
 *      2 res
 *  then方法会返回一个promise
 *          如果then的onFulfilled或onRejected不是一个函数那么返回的就是一个与原promise的res或error一致
 *  是一个函数 - 返回一个新的promise
 */
// const p2 = new Promise((resolve, reject) => reject(1)).then('2112',(e) => {
//     console.log('已解决');
//     return 2
// })
// p2.then(res => {
//     console.log(res,'res');
// }).catch(e => {
//     console.log(e,'e');
// })

/** RESULT：
 *      1 e
 *  不是一个函数，then的返回值与原promise一致
 */
// const p2 = new Promise((resolve, reject) => reject(1)).then('2112','222')
// p2.then(res => {
//     console.log(res,'res');
// }).catch(e => {
//     console.log(e,'e');
// })

// const p1 = new Promise((resolve) => {
//     resolve(1)
// })

// const then1 = p1.then(res => res)
// const catch1 = p1.catch(e => e)
// const finally1 = p1.finally(() => null)

/**
 *  RESULT:
 *      Promise，Promise，false
 *      Promise, false, false
 *  说明then && catch 依然会返回新的Promise
 *
 *  finally 依然会返回一个新的Promise实例，但是与前两者不同的是，它与状态无关，他只负责状态的传递
 */
// console.log(p1, then1, p1 === then1);
// console.log(catch1, catch1 === p1, catch1 === then1)
// console.log(finally1 === p1);

/**
 *  Promise.all()
 *      这个例子实际上是一个resolve，因为在p2实例中自定义了catch捕捉错误，在前面的学习中
 *      已经了解到catch会返回一个resolve的Promise实例，因此all返回的自然是一个resolve
 */
// const p1 = new Promise((resolve, reject) => {
//   resolve("hello");
// })
//   .then((result) => result)
//   .catch((e) => e);

// const p2 = new Promise((resolve, reject) => {
//   throw new Error("报错了");
// })
//   .then((result) => result)
//   .catch((e) => e);

// Promise.all([p1, p2])
//   .then((result) => console.log(result))
//   .catch((e) => console.log(e));

/**
 *  race：组合函数返回最先状态落定的实例无论是resolve还是reject
 */
// const p1 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve('ok！the first')
//     }, 2000);
// })

// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('ok the second！')
//     }, 200);
// })

// const pipe = Promise.race([
//     p1,
//     p2
// ]).then((res) => {
//     console.log('res ---> ', res);
// }).catch((err) => {
//     console.log('err ---> ', err);
// })

/**
 *  构建生命式数据消费流
 */
const addNum = (x) => x + 10;
const subtractionNum = (x) => x - 10;
const multiplicationNum = (x) => x * 10;
const divisionNum = (x) => x / 10;

// function compose_demo(x) {
//     return Promise.resolve(x)
//             .then(addNum)
//             .then(subtractionNum)
//             .then(multiplicationNum)
//             .then(divisionNum)
// }

// compose_demo(10).then(res => {
//     console.log(res);
// })

/**
 *  借助reduce方法构建声明式数据流
 */
// const compose =
//   (...fns) =>
//   (x) => {
//     return fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x));
//   };

// const base = compose(addNum, subtractionNum, multiplicationNum, divisionNum);

// base(10).then((res) => {
//   console.log(res);
// });

/**
 *  promise取消 & promise进度通知
 */
// promise取消

// class CancelToken {
//     constructor(cancelFn) {
//         this.promise = new Promise((resolve) => {
//             这个cb就是用来传递给new出来的实例，调用的cb
//             cancelFn(() => {
//                 setTimeout(console.log, 0,'delay');
//                 resolve()
//             })

//             // 业务代码写在这里,
//             // 超时就可以结束此次promise
//             setTimeout(() => {
//                 resolve('ok')
//             }, 5000);
//         })
//     }
// }

// function cancelableDelay(delay) {
//     setTimeout(console.log, 0, 'set delay');
//     return new Promise((resolve, reject) => {
//         const id = setTimeout(() => {
//             resolve()
//         }, delay);

//         const ins = new CancelToken((cb) => {
//             setTimeout(() => {
//                 cb()

//             }, 2000);
//         })

//         ins.promise.then((res) => {
//             console.log(res);
//             clearTimeout(id)
//         })

//     })
// }

// cancelableDelay(3000)

// 通知过程：
// 继承Promise类
class TrackablePromise extends Promise {
  constructor(executor) {
    const notification = [];
    super((resolve, reject) => {

      //// 观察者模式 ---> 状态变更，由业务逻辑自行调用，TrackablePromise负责触发依赖数组
      return executor(resolve, reject, (status) => {
        notification.map((handle) => handle(status));
      });
    });
    this.notification = notification;
  }

  notify(notification) {
    this.notification.push(notification);
    return this;
  }
}

const p = new TrackablePromise((resolve, reject, notify) => {
  // 用于给实例添加notify
  function notifyFunc(x) {
    notify(`${20 * x} % remaining`);
  }

  // 业务代码写在这里
  (() => {
    let counter = 0;
    return () => {
      const id = setInterval(() => {
        counter++ < 5
          ? notifyFunc(counter)
          : resolve("success") & clearInterval(id);
      }, 1000);
    };
  })()();
});

// p.notify((x) => console.log(`progress: ${x}`));
// p.then(() => console.log("completed!"));

/**
 *  async await
 */
///////////////async//////////////////////////

/**
 *  如果返回的是一个没有实现的thenable的对象
 *  会默认被Promise.resolve包裹后返回
 */
// const func = async () => {
//   return 1
// }
// func().then(res => {
//   console.log(res);
// })

/**
 *  RESULT: e ---> 1
 *  抛出错误会被捕捉到，但是reject不会
 */
// const func = async () => {
//   throw 1
// }
// func().then(res => {
//   console.log('res ---> ', res);
// }).catch(e => {
//   console.log('e ---> ', e);
// })

// ------------------------------------

/**
 *  不能被捕捉到
 */
// const func = async () => {
//   Promise.reject(3)
// }
// func().then(res => {
//   console.log('res ---> ', res);
// }).catch(e => {
//   console.log('e ---> ', e);
// })

/**
 *  如果返回的是一个实现了thenable的对象
 *  那么promise的处理会以返回的这个then方法为准
 */
// const func = async () => {
//   return {
//     then() {
//       console.log('foo');
//       return 'bar'
//     }
//   }
// }
// func().then(res => {
//   console.log(res, 'res');
// })

/////////////await/////////////////

/**
 *  throw 和 reject都可以被捕获
 */
// const func = async () => {
// return await (() => {throw 1})()
// return await Promise.reject(1)

// 有效的
// await (() => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(1)
//     }, 2000);
//   })
// })()
// }
// func().catch(e => {
//   console.log('e ---> ', e);
// })

// async function foo() {
//   console.log(2);
//   console.log(await Promise.resolve(8))
//   console.log(9)
// }

// async function bar() {
//   console.log(4)
//   console.log(await 6)
//   console.log(7)
// }

// console.log(1)
// foo()
// console.log(3)
// bar()
// console.log(5)

// 1，2，3，4，5，6，7，8，9

//////////////应用////////////////
/**
 *  不仅可以应用于业务的查询开发
 *  还可以制作一个类似于Thread.sleep()的函数
 */
// const sleep = async (delay) =>
//   new Promise((resolve) => setTimeout(resolve, delay));

// (async () => {
//   await sleep(2000)
//   console.log(1);
// })()


/**
 *  并行执行
 */

//// 在红宝书中作者是以模拟网络请求的形式进行的定时器创建
//// 因此对于每个定时器来说时间并不确定
//// 因此书中的结果才会出现异常和不确定
const delayPromise = ( id ) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${ id } finished`);
      resolve(id)
    }, 1000);
  })
}
// (async () => {
//   const now = Date.now()
//   // const promises = Array(5).fill(null).map((_, i) => delayPromise(i))
//   // for (const p of promises) {
//   //   console.log(await p);
//   // }

//   // await delayPromise(0)
//   // await delayPromise(1)
//   // await delayPromise(2)
//   // await delayPromise(3)
//   // await delayPromise(4)


//   console.log(Date.now() - now);
// })()



/** 同样的并行思想也体现在Promise.all()中 */
/** 我认为依靠这种方式创建出一个并行栈还是可以尝试的 */
// (async () => {
//   const promises = Array(5)
//                     .fill(null)
//                     .map((_, i) => delayPromise(i))
//   const res = await Promise.all(promises)
//   console.log(res); //// [0,1,2,3,4]
// })()

//// 需要实现的内容
/**
 *  错误重试
 *  中断错误
 *  错误通知
 *  其他队列内容不受到影响
 */
// class PromiseQueue {
//   //// list: Promise<any>[]
//   constructor(list) {
//     this.requestPool = list
//   }
//   put(item) {
//     this.requestPool.push(item)
//   }
//   clear() {
//     this.requestPool = []
//   }
//   async executor() {
//     Promise.all([...this.requestPool])
//     .then(res => {
//       console.log(res);
//     }).catch(e => {
//       console.log(`ERROR：the queue have ERROR --> `, e);
//     })
//   }
// }

// const p1 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 2000);
// })

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(2)
//   }, 1000);
// })
// const scherzo = new PromiseQueue([
//   p1,
//   p2
// ]).executor()


/** 例题 */
/** RESULT：
 *    按顺序输出
 */
Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})




























