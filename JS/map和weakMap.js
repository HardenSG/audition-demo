/**
 *  Map和WeakMap学习，内容参考从红宝书 P163
 */

/**
 * Map 基础API
 * set、get、has、delete、clear、size
 */

const map = new Map()

/** MARK：初始化构造
 * const map1 = new Map([
 *     [{sort: 1},'第一个'],
 *     [{sort: 2},'第二个'],
 *     [{sort: 3},'第三个'],
 *     [4,'第四个']
 * ])
 */

// NOTE：SET 会返回 map实例
map.set({sort: 1},'第一个')
    .set({sort: 2},'第二个')
    .set({sort: 3},'第三个')
    .set(4,'第四个')

// NOTE: GET 获取执行的 key -> get: (key: any): any
// 存在该 key 则返回指定的 value
// 不存在则返回 undefined

// 第四个
// console.log(map.get(4)); 
// undefined
// console.log(map.get(5));

// NOTE：HAS: boolean
// console.log(map.has(4));
// console.log(map.has(5));

// NOTE：DELETE: boolean
// console.log(map.delete(4),map);

// NOTE：CLEAR: void
// console.log(map.clear(),map);

// NOTE：SIZE：number
// console.log(map.size);

/** NOTE：
 *  Map 迭代
 *  entries、keys、values、forEach
 */

// NOTE：Map 可以提供一个 iterator
/**
 * [ { sort: 1 }, '第一个' ]
 * [ { sort: 2 }, '第二个' ]
 * [ { sort: 3 }, '第三个' ]
 * [ 4, '第四个' ]
 */
// for (const iterator of map) {
//     console.log(iterator);
// }

/**
 * { sort: 1 } 第一个
 * { sort: 2 } 第二个
 * { sort: 3 } 第三个
 * 4 第四个
 */
// for (const [k, v] of map) {
//     console.log(k,v);
// }

// MARK：Map.entries函数会返回一个迭代器
//       Map[Symbol.iterator]也会返回一个迭代器

// for (const iterator of map.entries()) {
//     console.log(iterator);
// }

// for (const iterator of map[Symbol.iterator]()) {
//     console.log(iterator);
// }


// MARK：、keys、values

// KEYS
// for (const iterator of map.keys()) {
//     console.log(iterator);
// }

// VALUES
// for (const iterator of map.values()) {
//     console.log(iterator);
// }

// MARK：forEach是迭代的回调方式
// map.forEach((val, key, ins) => {
//     key = 'SG'
//     console.log(val, key, ins);
// })



// -------------------------WEAKMAP--------------------------------------------

// NOTE：WeakMap 的API是Map的子集
// 具备的方法：
// set、get、has、delete
const weakMap = new WeakMap()

const sg1 = {
    name: 'SG'
}

weakMap
    .set(sg1,1)

// console.log(weakMap.get(sg1));

