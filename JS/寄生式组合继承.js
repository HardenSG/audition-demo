/**
 *  寄生式组合继承学习，内容参考红宝书 P247
 */



/**
 *  组合继承：盗用构造模式 + 原型链模式 
 *      会导致一定的效率问题，父类构造函数会被初始化执行两次无论任何时候
 *      父类中的属性会存在于父类的原型对象上
 *      子类构造函数初始化父类的时候，会在实例上再次初始化属性
 *  寄生式组合继承：采用寄生式继承 + 原型链继承 + 盗用构造函数
 *      对父类的原型对象建立副本，拷贝该对象（寄生式继承方法）
 *      对拷贝回的对象的constructor进行重指回
 *      将该副本赋给子类的原型
 * 
 *      在子类的构造函数中调用父类的构造函数
 */

function Father() {}
function Child() {
    Father.call(this)
}

/**
 *  寄生组合继承构造
 */
function inherit(child, father) {
    const copied = Object.create(father.prototype)
    copied.constructor = child
    child.prototype = copied
}
inherit(Child, Father)

// 防止被覆盖后方法丢失，将原型方法写在这里面
Father.prototype.sayFatherHello = () => 'Hello My Name Is Father And Welcome To You Come Here'
Child.prototype.sayChildHello = () => 'Hello My Name Is Child And Welcome To You Come Here'


const son = new Child()
// console.log(son.sayChildHello());

/**
 *  RESULT：
 *      true
 */
// console.log(son.__proto__.__proto__ === Father.prototype);


/** RESULT: 
 *      true
 *      true
 *      true
 *      true
 *  由于保留了正常的原型键，instanceof和isPrototypeOf的功能得以保留
 */
// console.log(son instanceof Child);
// console.log(son instanceof Father);
// console.log(Child.prototype.isPrototypeOf(son));
// console.log(Father.prototype.isPrototypeOf(son));











