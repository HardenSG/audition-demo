/**
 *  手写apply、bind函数
 */


/**
 *  apply(this: any, args: any[])
 */
// Function.prototype.demoApply = function(context) {
//     if(typeof this !== 'function'){
//         return undefined
//     }

//     context = context || globalThis
//     const fn = Symbol()
//     const args = [...arguments].slice(1)[0]
//     context[fn] = this
//     const res = context[fn](...args)
//     delete context[fn]
//     return res
// }


/**
 *  bind(this: any, args: any)
 *  bind与 call 或者 apply 并不相同，它会返回一个函数，并且这个函数仍然可以继续传参
 *  使用形式和思想和柯里化相关
 */
Function.prototype.demoBind = function(context) {
    if(typeof this !== 'function') {
        return undefined
    }

    const fn = this
    const args = [...arguments].slice(1)

    return function Fn() {
        return fn.apply(
            this instanceof Fn ? this : context, 
            args.concat(...arguments)
        )
    }
}


function fn(a, b)  {
    return a + b
}
const Father = fn.demoBind(undefined,1)
const ins = new Father(2)

// console.log(fn.demoBind(undefined,1,2)());
console.log(ins);

// console.log(fn.demoApply(undefined,[1,2]));
