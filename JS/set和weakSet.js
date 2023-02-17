/**
 *  Set和WeakSet学习，内容参考自红宝书：P173
 */

/** 初始化
 *  
 *  // default
 *  const set = new Set([1,2,3,4])
 *  
 *  // iterator ways
 *  const set = new Set({
 *     [Symbol.iterator]: function* () {
 *         yield 1
 *         yield 2
 *         yield 3
 *         yield 4
 *     }
 *  })
 */

const set = new Set({
    [Symbol.iterator]: function* () {
        yield 12
        yield 23
        yield 34
        yield 45
    }
})
/**
 *  基础API实践
 *  add、has、delete、clear、size
 */

// ADD
// set.add(5)

// SIZE
// console.log(set.size);

// HAS
// console.log(set.has(1));

// DELETE
// console.log(set.delete(1));

// CLEAR
// set.clear()
// console.log(set);

/**
 *  迭代API
 *  entries、keys、values、forEach
 */

// console.log(set.entries());
// console.log(set.keys());
// console.log(set.values());
// console.log(set[Symbol.iterator]());

// ENTRIES
// for (const iterator of set.entries()) {
//    console.log(iterator);
// }

// SELF
// for (const iterator of set) {
//    console.log(iterator);
// }

// KEYS
// for (const iterator of set.keys()) {
//    console.log(iterator);
// }

// VALUES
// for (const iterator of set.values()) {
//     console.log(iterator);
// }

// ITERABLE
// for (const iterator of set[Symbol.iterator]()) {
//     console.log(iterator);
// }


// FOREACH
// set.forEach((val1, val2, set) => {
//     console.log(val1, val2, set);
// })


// FIXME：高阶操作是封装自定义Set函数类，见红宝书P176



// ----------------------------------------------------------------------

/**
 *  WeakSet 
 */

/** default
 *  const weakSet = new WeakSet([
 *    {
 *       name: 'SG'
 *    }
 *  ])
 * 
 *  iterator
 *  const weakSet = new WeakSet({
 *      [Symbol.iterator]: function *() {
 *          yield { name: 'SG1' }
 *          yield { name: 'SG2' }
 *          yield { name: 'SG3' }
 *      }
 *  })
 */
const SG1 = { name: 'SG1' }
const SG2 = { name: 'SG2' }
const SG3 = { name: 'SG3' }
const weakSet = new WeakSet({
    [Symbol.iterator]: function *() {
        yield SG1
        yield SG2
        yield SG3
    }
})

/**
 *  基础API
 *  ADD、DELETE、HAS
 */
