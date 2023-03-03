/**
 *  手写call
 *      函数判断
 *      保存在上下文的变量对象上，调用后再删除
 *      返回调用后的结果
 */

Function.prototype.auditionCall = function(context) {
    if(typeof this !== 'function') {
        return undefined
    }

    const fn = Symbol()
    context = context || globalThis

    context[fn] = this 
    const args = [...arguments].slice(1)
    const res = context[fn](...args)
    delete context[fn]
    return res
}

const obj = {
    fooValue: 'SG'
}

globalThis.fooValue = 1
function foo(other) {
    console.log(this.fooValue, other);
}

//// 1
// foo('PG')

// foo.auditionCall(obj, 'PG')
