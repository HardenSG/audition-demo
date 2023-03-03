
/**
 *  手写apply练习
 *      与call不同的是传参需要以数组的形式传递
 */

Function.prototype.auditionApply = function(context) {
    if(typeof this !== 'function') {
        return undefined
    }

    context = context || globalThis
    const fn = Symbol()
    const args = [...arguments].splice(1)[0]

    context[fn] = this 
    const res = context[fn](...args)
    delete context[fn]
    return  res
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

foo.auditionApply(obj, ['PG'])
