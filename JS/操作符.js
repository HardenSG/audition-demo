// NOTE：按位非 -> 对num1取反后减一
// const num1 = 200
// const num2 = ~num1
// console.log(num2);

// NOTE: 按位与 -> 将两个数字的位对齐，只有都是1的时候才是1否则为0
// const num3 = 20 & 5
// console.log(num3);

// NOTE： 按位或 -> 有一个1就为1否则为0
// const num4 = 20 | 5
// console.log(num4);

// NOTE: 按位异或 -> 只有一个1是1，若都为1或者0为是0
// const num5 = 20 ^ 5
// console.log(num5);

// NOTE： 左移 -> << 所有位向左移动
// const num6 = 2 << 1
// console.log(num6);

// NOTE: 无符号右移 -> >> 和有符号右移 -> >>>
// MARK： 主要的区别就是面对负数的情况下存在区别

/**
 * for(;;){}
 * for(;i < count;){} ≈ while
 */

/** for in -> 枚举对象中的非symbol属性
 *  for(const o in obj){
 *      const e = obj[o]
 * }
 *  const obj = {
 *      a: 1,
 *      b: 2,
 *      c: 3,
 *      d: 4
 *  }
 *  for (const o in obj) {
 *      if (Object.hasOwnProperty.call(obj, o)) {
 *          const e = obj[o];
 *          console.log(e,o);
 *      }
 *  }
*/

/** for of -> 用于遍历可迭代对象的元素
 *  在ES2018（ES9）增加for-await-of生成promise异步可迭代对象
 *  for (const iterator of [1,2,3,4,5,6,7]) {
 *      console.log(iterator);
 *  }
 */
