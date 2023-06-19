/**
 *  Object.is相比 === 做了如下的优化
 *  +0 -0 NaN和NaN
 */

function is(x: any, y: any) {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
}
