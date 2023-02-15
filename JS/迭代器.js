/**
 *  迭代器学习，内容参考红宝书 P183
 *  
 *  包含内容：
 *  1. Iterable
 *  2. Iterator
 */

/**
 *  NOTE: Iterable 
 *  标记具备可迭代能力，需要实现这个接口 key -> [Symbol.iterator]其需要引用一个迭代器工厂函数
 */

// NOTE: 演示Map的迭代器
const map = new Map()

// RESULT: [Function: entries]
// console.log(map[Symbol.iterator]);

// MARK: 然后不需要我们显示调用该函数，我们所使用的JS API会自动接受这个可迭代对象
// 当然并不是所有的API，它包括以下内容
/**
 * 1. FOR OF
 * 2. 数组结构
 * 3. 扩展操作符
 * 4. Array.from
 * 5. 创建集合
 * 6. 创建映射
 * 7. Promise.all
 * 8. Promise.race
 * 9. yield* 操作符
 */

// MARK：已知string实现了Iterable接口
// S 、G
// for (const iterator of 'SG') {
//     console.log(iterator);
// }

// MARK: TypeError: 1 is not iterable
// for (const iterator of 1) {
//     console.log(iterator);
// }



/**
 *  NOTE：Iterator
 */

// 例子：
// const arr = ['Vue','React','Angular','Solid']

// for of
// for (const [...args] of arr) {
//     console.log(args);
// }

// 显示调用迭代器
// const iter = arr[Symbol.iterator]()
// let flag = true
// while(flag) {
//     const cur = iter.next()
//     console.log(cur);
//     flag = !cur.done
// }

// 特性：由于迭代器是游标机制他并不是对可迭代对象的快照
//      因此对可迭代对象的修改也自然会影响到迭代器
const arr = ['Vue','React','Angular','Solid']
const iter = arr[Symbol.iterator]()

// console.log(iter.next());

// add element
arr.splice(1,0,'SG')

// the iterator changed because the element push arr
// console.log(iter.next());

class Counter {
    constructor(limit){
        this.limit = limit
    }
    [Symbol.iterator](){
        let count = 1
        const limit = this.limit
        return {
            next(){
                if(count < limit){
                    return {
                        done: false,
                        value: count++
                    }
                }else{
                    return {
                        done: true,
                        value: undefined
                    }
                }
            },
            return(){
                console.log('iterator return！');
            }
        }
    }
}

const counter = new Counter(10)
const iterCounter = counter[Symbol.iterator]()
// console.log(iterCounter.next());
// console.log(iterCounter.next());

// for (const iterator of counter) {
//     console.log(iterator);
// }

// for (const iterator of counter) {
//     console.log(iterator);
// }


// 迭代可暂停，随后会继续上次的结尾
const a = [1, 2, 3, 4, 5, 6, 7, 8]
const aIterator = a[Symbol.iterator]()

// for (const iterator of counter) {
//     if(iterator > 5){
//         break;
//     }
//     console.log(iterator);
// }

// 自定义迭代的暂停，需要包含可选的return方法，返回一个标准的IteratorResult对象
// for (const iterator of aIterator) {
//     if(iterator > 5){
//         break
//     }
//     console.log(iterator);
// }

// for (const iterator of aIterator) {
//     console.log('iterator --> ',iterator);
// }



























