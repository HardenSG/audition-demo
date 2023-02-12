// NOTE: Symbol做属性不可被遍历
// const d1 = {
//     a: 1,
//     [Symbol('a')]: 2,
// }
// console.log(Object.keys(d1)); -> ['a']

// NOTE: Symbol.for() -> 全局注册表 P45
// const symbolKey = 'foo'
// const foo1 = Symbol(symbolKey)
// const foo2 = Symbol.for(symbolKey)
// const foo3 = Symbol.for(symbolKey) // Symbol 全局注册表
// console.log(foo1,foo2 === foo3);

// NOTE：Symbol.keyFor(Symbol): string(symbolKey)

// NOTE: Reflect.ownKeys(object)

// const o = {
//     a: 1,
//     ['b']: 2,
//     [Symbol('c')]: 3
// }

// console.log(Reflect.ownKeys(o));