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





