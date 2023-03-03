/**
 *  手写bind
 */

const isFunc = v => typeof v === 'function'
Function.prototype.demoBind = function(context) {
    if(!isFunc(this)) {
        return  undefined
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

globalThis.demoValue = 'PG'
const obj = {
    demoValue: 111
}

const foo = function(a) {
    console.log(this.demoValue, a);
}

// foo('SG')
const fooBind = foo.demoBind(obj)
fooBind('SG_PG')