/**
 *  原型链的学习 参考红宝书 P238
 *  其余资料：  
 *      https://github.com/mqyqingfeng/blog/issues/2
 *      https://juejin.cn/post/6844903989088092174
 */



/**
 *  模拟ES6前的继承方式
 */
function SuperClass() {}
function SubClass() {}
SubClass.prototype = new SuperClass()
Object.defineProperty(SubClass.prototype, 'constructor', {
    enumerable: false,
    value: SubClass
})
const ins = new SubClass()


/**
 *  RESULT：SubClass {}
 */
// console.log(ins);

/** RESULT：
 *      true
 *      true
 *  任何函数的默认原型都是一个Object的实例
 *  只需要验证这个函数 a.__proto__ === Object.__proto__ || a.__proto__ === Function.prototype
 *  两种方式都可以，这是因为Function.__proto__访问的是Function.prototype 所以都可以
 *  为什么验证是Function的原型对象就行了？
 *      这是因为Function本身就是Object类型的一个实例对象
 *      鉴于这点你可以验证 Function.prototype.__proto__ === Object.prototype
 */
// function a () {} 
// console.log(a.__proto__ === Function.prototype);
// console.log(Function.prototype.__proto__ === Object.prototype);


/**
 *  原型链增强
 */

eval('console.log(this)')


