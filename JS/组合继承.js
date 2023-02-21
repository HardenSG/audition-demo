/**
 *  组合继承学习，参考红宝书 P244
 */


/**
 *  组合继承吸收了原型链和经典模式的优点
 *  成为常见的使用最多的继承模式
 */
function Father(name, age) {
    this.name = name
    this.age = age
}
Father.prototype.sayFatherName = function(){ return `My Name Is ${this.name} And My Age Is ${this.age}` }

function Son(name, age) {
    Father.call(this, name, age)
}

Son.prototype = new Father()
Son.prototype.saySonName = function(){ return `I Am Is A Son And My Name IS ${this.name} And My Age Is ${this.age}` }
Object.defineProperty(Son.prototype, 'constructor', {
    enumerable: false,
    value: Son
})

const s1 = new Son('SG1', 21)
const s2 = new Son('SG2', 21)

/** RESULT:
 *      Son { name: 'SG1', age: 21 } Son { name: 'SG2', age: 21 }
 *      I Am Is A Son And My Name IS SG1 And My Age Is 21
 *      My Name Is SG1 And My Age Is 21
 */
// console.log(s1, s2);
// console.log(s1.saySonName());
// console.log(s1.sayFatherName());


/** RESULT：
 *      true
 *      true
 *      true
 *  采用组合继承模式的对象同样具备instanceOf和isPrototypeOf的方法用来鉴别对象
 */
// console.log(s1 instanceof Father);

// Son的 prototype 是指向Father实例的，isPrototypeOf检测传入参数的prototype是否指向调用者：Father、Son
// console.log(Father.prototype.isPrototypeOf(s1));
// console.log(Son.prototype.isPrototypeOf(s1));
