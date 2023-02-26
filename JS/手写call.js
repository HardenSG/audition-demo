/**
 * 借用Symbol防止污染到全局属性
 */
Function.prototype.demoCall = function (context) {
    if(typeof this !== 'function') {
        return undefined
    }
    context = context || globalThis
    const fn = Symbol()

    // this 指向调用者
    context[fn] = this
    const args = [...arguments].slice(1)
    const result = context[fn](...args)
    delete context[fn]
    return result 
}

function fn(a, b)  {
    return a + b
}

const res = fn.demoCall(undefined,1,2)
console.log(res);