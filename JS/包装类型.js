/**
 *  基本类型的包装类型
 *  Number String Boolean 这实际是包装类型
 */

// NOTE: 字面量形式声明一个变量
const str = 'i am a string snippets'

// 调用包装类型的方法
// 包装类型在调用方法的时候被调用
const splitStr = str.substring(0)
// 可以尝试向其插入属性，虽然不会报错，但是执行结束该包装对象就会被销毁
str.demo = 'str'

// RESULT: 'i am a string snippets' undefined
// console.log(splitStr,str.demo);

// MARK: 上面的包装类型实际上是这样的操作
// const str = 'i am a string snippets'
// const wrapper = new string(str)
// const splitStr = wrapper.substring(0)
// wrapper = null
// 上述的操作可以称之为装箱

// 那必然还有拆箱：将引用类型转换为基本的原始类型的过程
// 拆箱举例
const originNum = new Number(1)
const equal = 1 + originNum
// console.log(equal);

// originNum是一个对象那么这个原始类型和对象的相加是一定涉及到了拆箱的

// 对象的拆箱一般是默认调用valueOf或toString或者重写[Symbol.toPrimitive]方法
const obj1 = {
    valueOf: () => 123,
    toString: () => '123'
}

// RESULT: 122: number \ 123 -> string
console.log(obj1 - 1); 
console.log(`${obj1} -> string`);

// 重写[Symbol.toPrimitive]方法
const obj2 = {
    [Symbol.toPrimitive]: () => 123
}

console.log(obj2 - 1); 