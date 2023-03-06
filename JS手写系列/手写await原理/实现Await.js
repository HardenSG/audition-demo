/**
 *  手写Await借助Promise、generator
 */

//// 实现await原理
function *getResult() {
    yield new Promise((resolve) => {
        setTimeout(() => {
            console.log(100);
            resolve(100)
        }, 2000);
    })

    yield new Promise((resolve) => {
        setTimeout(() => {
            console.log(200);
            resolve(200)
        }, 1000);
    })

    yield new Promise((resolve) => {
        setTimeout(() => {
            console.log(300);
            resolve(300)
        }, 200);
    })
}

const g = getResult()

function co(g) {
    const nextObj = g.next()
    if(nextObj.done) return 
    nextObj.value.then(() => {
        co(g)
    })
}

co(g)
