/**
 *  节流行为可以分为三种：
 *      头执行： 执行第一个行为后，后续等待timeout
 *      尾执行： 执行最后一个
 *      都执行： 前后两个都执行
 */

/**
 *  首执行
 */
function throttle1(func, wait) {
    let last = 0
    return function() {
        const context = this 

        const now = Date.now()
        if(now - last > wait) {
            func.apply(context, arguments)
            last = now
        }
    }
}

/**
 *  尾节流
 */
function throttle2(func, wait) {
    let timer = null 
    return function() {
        const context = this 

        if(!timer) {
            timer = setTimeout(() => {
                func.apply(context, arguments)
                timer = null
            }, wait);
        }
    }
}


/**
 *  都执行
 */

function throttle3(func, wait) {
    let last = 0
    let timer = null 

    return function() {
        const context = this 
        const now = Date.now()

        clearTimeout(timer)
        if(now - last > wait) {
            fn.apply(context, arguments)
            last = now
        } else {
            timer = setTimeout(() => {
                func.apply(context, arguments)
            }, wait);
        }
    }
}