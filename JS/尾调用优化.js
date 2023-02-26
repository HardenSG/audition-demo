/**
 *  尾调用优化学习，内容参考 红宝书 P304
 */

// function factorial(n) {
//     if(n < 2){
//         return n
//     }
//     return factorial(n - 1) + factorial(n - 2)
// }

// console.log(factorial(100));

// function fib(n) {
//     return factorial(0, 1, n)
// }
// function factorial(a, b, n) {
//     if(n === 0) {
//         return a
//     }
//     return factorial(b, a + b, n - 1)
// }
// console.log(fib(4));