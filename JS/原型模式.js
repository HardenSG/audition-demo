/**
 *  原型模式学习，内容参考：
 *      1. 红宝书：P224 - P242
 *      2. https://github.com/mqyqingfeng/blog/issues/2
 *      3. https://juejin.cn/post/6844903989088092174
 */


function Person() {}
Person.prototype.name = 'SG'

const p = new Person()

/** RESULT: true
 *  调用构造函数创建的实例，那么它的[[prototype]]
 *  就会被赋值指向构造函数的原型对象
 */
// console.log(p.__proto__ === Person.prototype);



/** RESULT: true
 *  所有的原型对象都会获得一个constructor属性
 *  这个属性会指回与之关联的构造函数
 */
// console.log(Person.prototype.constructor === Person);



/** RESULT:
 *      [Object: null prototype] {}
 *      true
 *      true
 *      null
 *  所有对象的原型链都会终止于Object的原型对象
 *  Object原型对象的原型是null
 *  对于原型查找机制来讲，一个实例对象的属性访问会一直持续到找到或者为null为止
 */
// console.log(Person.prototype.__proto__);
// console.log(Person.prototype.__proto__ === Object.prototype);
// console.log(Person.prototype.__proto__.constructor === Object);
// console.log(Person.prototype.__proto__.__proto__);



/** RESULT：
 *      true
 *      true
 *  instanceof前言了解到是对实例的归属类做出判断，
 *  如：[] instanceof Array === true ，
 *  但是实际上instanceof做出的是原型链的判断，
 *  也就是说判断的是该实例是否位于你所检查的原型链上，
 *  所以显然 [] instanceof Object也是对的
 */
// console.log([] instanceof Array);
// console.log([] instanceof Object);



/** RESULT：true
 *  检查对象的关系
 *  会检测传入参数的[[prototype]] 是否指向构造函数的原型对象
 */
// console.log(Person.prototype.isPrototypeOf(p));


/** RESULT: SG
 *  Object.getPrototypeOf() 获取原型对象上的属性
 *  即使实例覆盖也仍然会采用原型对象的属性
 */
// p.name = 'SG!'
// console.log(Object.getPrototypeOf(p));


/**
 *  IN 操作符会有两个实际应用： 
 *  1. forin 会遍历出所有的属性和原型属性
 *  2. IN 操作符会在该属性存在于实例或原型的时候返回true
 */

/** RESULT: 
 *      true 21
 *      false SG
 * 1. forIn 可以使用Object.hasOwnProperty判断是否是当前实例所拥有的属性
 */
// p.age = 21
// for (const k in p) {
//     console.log(Object.hasOwnProperty.call(p,k),p[k]);
// }


/** RESULT：
 *      true
 *      true
 *  2. IN 操作符判断属性是否在实例或者原型上
 */
// p.age = 21
// console.log('age' in p, 'name' in p);


/** RESULT: 
 *      true
 *      false
 *  NOTE: 如何判断一个属性是位于原型而不是实例上的呢
 *        借助 in 操作符 和 hasOwnProperty
 */
// const hasPrototypeProperty = (o, k) => !Object.hasOwnProperty.call(o, k) && (k in o)

// p.age = 21
// console.log(hasPrototypeProperty(p, 'name'));
// console.log(hasPrototypeProperty(p, 'age'));


/** RESULT：
 *      [] ['name'] ['name']
 *      [] ['constructor', 'name'] ['constructor', 'name']
 *      [ Symbol(symbol) ]
 *  1. Object.keys() 可枚举
 *  2. Object.getOwnPropertyNames() 所有属性无论是否可枚举
 *  3. Object.getOwnPropertySymbols() 返回Symbol属性
 */
// console.log(Object.keys(p), Object.keys(p.__proto__), Object.keys(Person.prototype));
// console.log(Object.getOwnPropertyNames(p), Object.getOwnPropertyNames(p.__proto__), Object.getOwnPropertyNames(Person.prototype));
// const symbols = Symbol('symbol')
// p[symbols] = 1
// console.log(Object.getOwnPropertySymbols(p));



// ---

/** RESULT:
 *      [ 1, 2, 3, { e: 4, f: 5 } ]
 *      [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ], [ 'd', { e: 4, f: 5 } ] ]
 *  对象的迭代：
 *  1. Object.values()
 *  2. Object.entries()
 */
// const obj = {
//     a: 1,
//     b: 2,
//     c: 3,
//     d: {
//         e: 4,
//         f: 5
//     }
// }
// console.log(Object.values(obj));
// console.log(Object.entries(obj));


/**
 *  原型对象的简便写法
 */
// Person.prototype = {
//     name: 'SG',
//     age: 21,
//     job: 'Software Engineer'
// }

// Object.defineProperty(Person.prototype, 'constructor', {
//     enumerable: false,
//     value: Person
// })


/** RESULT:     
 *      [ 'SG', 'SG1', 'SG2' ]
 *  原型模式的问题
 *  对于相同行为函数的代码共享来说，原型模式带来的便利无可厚非
 *  但是对于原型的属性来说，除非属性是在全局中代码共享的
 *  不然修改原型的属性就会触发全局的更改
 */
// Person.prototype.childrens = [ 'SG', 'SG1' ]
// const p2 = new Person()

// p.childrens.push('SG2')
// console.log(p2.childrens);
