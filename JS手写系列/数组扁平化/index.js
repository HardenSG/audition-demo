/**
 *  数组扁平化
 */

const arr = [1, [2, 3, [4, 5, [6, 7, 8, [9, 10, 11, [12, [13, [14, [16]]]]]]]]];

//// ES6 数组扁平化
// console.log(arr.flat(Infinity));

//// toString -> 会将所有元素平铺成一个元素字符串
// const flatten = (arr) => {
//   return arr
//     .toString()
//     .split(",")
//     .map((i) => parseFloat(i));
// };
// console.log(flatten(arr));


//// 递归
// const flatten = (arr) => {
//     const res = []
//     for (let i = 0; i < arr.length; i++) {
//         const e = arr[i]
//         if(e instanceof Array) {
//             res.push(...flatten(e))
//         }else {
//             res.push(e)
//         }
//     }
//     return res
// }
// console.log(flatten(arr));


//// 递归 加 层级控制
// const flatten = (arr, depth = 1) => {
//     const res = []
//     for (let i = 0; i < arr.length; i++) {
//         const e = arr[i];
//         if(e instanceof Array && depth > 0) {
//             res.push(...flatten(e, depth - 1))
//         } else {
//             res.push(e)
//         }
//     }
//     return res
// }

// console.log(flatten(arr, Infinity));


//// reduce
// const flatten = (arr, depth = 1) => {
//     function cb(pre, cur) {
//         if(cur instanceof Array && depth > 0) {
//             return pre.concat(flatten(cur, depth - 1))
//         }else {
//             return pre.concat(cur)
//         }
//     }
//     return arr.reduce(cb, [])
// }
// console.log(flatten(arr, 5));


//// 栈操作
// const flatten = (arr, depth = 1) => {
//     const stack = [...arr]
//     const res = []
//     while(stack.length) {
//         const v = stack.pop()
//         if(v instanceof Array && depth > 0) {
//             stack.push(...v)
//             depth--
//         }else{
//             res.push(v)
//         }
//     }
//     return res.reverse()
// }
// console.log(flatten(arr, 2));