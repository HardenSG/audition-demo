/**
 * 对象深拷贝学习。参考：https://juejin.cn/post/6844903929705136141#heading-0
 * 最基础：JSON
 * 1. 使用递归
 * 2. 考虑属性包含数组 -> 优化递归
 */

/**
 * 对于数组的深拷贝，可以使用如slice、splice、map、reduce等进行处理
 * 若对象数组，则可以配合对象深拷贝做出处理
 */

/** NOTE：1.
 * 适合拷贝简单对象
 * 不能拷贝函数以及无法应对循环引用多层级等
 */
// JSON.parse(JSON.stringify({
//     a: 1
// }))

/** NOTE：2.
 * 考虑对象可能涉及到多层级嵌套
 * 递归方式
 */
// const _recursionClone = ( target ) => {
//     const type = typeof target === 'object'
//     // 是个对象则对其进行拷贝
//     if(type){
//         const obj = {}
//         for (const o in target) {
//             const e = target[o];
//             obj[o] = _recursionClone(e)
//         }
//         return obj
//     } else{
//         return target
//     }
// }

/** NOTE: 3.
 * 未考虑是否存在属性为数组形式
 * 加入对数组的判断
 */
// const _recursionClone = ( target ) => {
//     const type = typeof target === 'object'
//     // 是个对象则对其进行拷贝
//     if(type){
//         // MARK: 较于上面进行一点点修改
//         const obj = Array.isArray(target) ? [] : {}
//         for (const o in target) {
//             const e = target[o];
//             obj[o] = _recursionClone(e)
//         }
//         return obj
//     } else{
//         return target
//     }
// }

/**
 *  NOTE: 4
 *  考虑循环引用问题
 *  循环引用会发生什么？
 *      需要深层级递归拷贝造成栈溢出
 *  如何解决？
 *      关键点在于如何让相同的循环目标被缓存下来不用被再次递归
 *      可以采用kv结构将递归过的对象进行缓存，则 map 是个不错的选择
 */
const demoObject = {
  a: 1,
  b: 2,
  c: {
    a: 4,
    d: 5,
  },
  d: [1, {}],
  e: new Map([["a", 1]]),
  f: () => {
    console.log(1);
  },
};
demoObject.target = demoObject;

// RESULT: RangeError: Maximum call stack size exceeded
// console.log(_recursionClone(demoObject));

// 使用 map 对递归过的对象进行缓存，再次递归的时候将map传至递归
// const _recursionClone = (target, map = new Map()) => {
//     const flag = typeof target === 'object'
//     if(flag){
//         const obj = Array.isArray(target) ? [] : {}

//         if(map.has(target)) return map.get(target)

//         map.set(target,obj)
//         for (const k in target) {
//             const o = target[k];
//             obj[k] = _recursionClone(o,map)
//         }

//         return obj
//     }else{
//         return target
//     }
// }

// console.log(_recursionClone(demoObject));

/**
 *  NOTE：5
 *  上面的方式可以拷贝的是对象和数组
 *  那么还有一些其他的数据类型是可以被考虑的：set、map
 *  format克隆函数
 */

// const TYPE_ENUM = {
//     '[object Map]': Map,
//     '[object Set]': Set,
//     '[object Object]': Object,
//     '[object Array]': Array
// }
// const isObject = (o) => o !== null && typeof o === 'object'
// const getType = (o) => Object.prototype.toString.call(o)
// const initCopied = (o) => Object.keys(TYPE_ENUM).find((val) => val === o) && TYPE_ENUM[o]

// const _recursionClone = (target, map = new WeakMap()) => !isObject(target) ? target : (() => {
//     const type = getType(target)
//     const copied = new (initCopied(type))

//     // 处理循环引用
//     if(map.has(target)){
//         return map.get(target)
//     }
//     map.set(target, copied)

//     // 是否为set
//     if(type === '[object Set]'){
//         target.forEach(o => {
//             copied.add(_recursionClone(o,map))
//         });
//         return copied
//     }

//     // 是否为Map
//     if(type === '[object Map]'){
//         target.forEach((o, k) => {
//             copied.set(k, _recursionClone(o, map))
//         })
//         return copied
//     }

//     for (const k in target) {
//         const o = target[k];
//         copied[k] = _recursionClone(o,map)
//     }

//     return copied
// })()

// console.log(_recursionClone(demoObject));

const TYPE_ENUM = {
  "[object Object]": Object,
  "[object Array]": Array,
  "[object Map]": Map,
  "[object Set]": Set,
};
const isObject = (v) => v !== null && typeof v === "object";
const getType = (v) => Object.prototype.toString.call(v);
const initCopied = (v) =>
  Object.keys(TYPE_ENUM).find((o) => v === o) && TYPE_ENUM[v];

const _recursionClone = (target, map = new Map()) =>
  !isObject(target)
    ? target
    : (() => {
        const T = getType(target);
        const copied = new (initCopied(T))();

        //// 循环引用
        if (map.has(target)) {
          return map.get(target);
        }
        map.set(target, copied);

        //// 处理Map & Set
        if (T === "[object Map]") {
          target.forEach((o, k) => {
            copied.set(k, _recursionClone(o, map));
          });
          return copied;
        }

        if (T === "[object Set]") {
          target.forEach((o) => {
            copied.add(_recursionClone(o, map));
          });
          return copied;
        }

        for (const k in target) {
          const o = target[k];
          copied[k] = _recursionClone(o, map);
        }
        return copied;
      })();

      console.log(_recursionClone(demoObject));