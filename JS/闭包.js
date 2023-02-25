/**
 *  闭包特性， 内容参考：
 *                  https://github.com/rccoder/blog/issues/3
 *                  
 */


// for (var i = 0; i < 10; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 1000);
// }

/**
 *  上面的方式，settimeout持续保持着对i的引用
 *  下面的方式，立即执行函数体保持着当前形参的引用
 */
// for (var i = 0; i < 10; i++) {
//     ((e) => {
//         setTimeout(() => {
//             console.log(e);    
//         }, 1000);
//     })(i)
// }


// 闭包实践
// const scope = 'outside scope'
// function outsideFunc() {
//     let scope = 'inside scope'
//     return () => {
//         return scope
//     }
// }

// const foo = outsideFunc()
// console.log(foo());


/**
 *  必刷题：
 */

/**
 *  i来自于全局执行上下文
 */
// const data = []
// for (let i = 0; i < 3; i++) {
//     data[i] = () => {
//         console.log(i);
//     }
// }
// data[0]()
// data[1]()
// data[2]()



/**
 *  作用域链添加匿名函数AO
 */
// const data = []
// for (var i = 0; i < 3; i++) {
//     data[i] = ((i) => {
//         return () => {
//             console.log(i);
//         }
//     })(i)
// }

// data[0]()
// data[1]()
// data[2]()


// 或者使用let，let会添加一个 Block Context