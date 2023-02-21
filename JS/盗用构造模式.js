/**
 *  js继承模式 - 盗用构造模式学习，内容参考：红宝书 P243
 */

/**
 *  盗用构造函数模式可以解决原型对象引用值共享的问题，
 *  基本的思路就是在子类的构造函数中调用父类的构造函数
 *  使用call的方式传入当前子类的上下文
 *  解决了原型链的不能向父类的构造函数传值初始化的问题
 */

function Father(name, age, hobby) {
    this.name = name
    this.age = age
    this.hobby = hobby
}

Father.prototype.sayHello = () => `Hello My Name Is ${this.name}`

function Son(name, age, hobby) {
    Father.call(this, name, age, hobby)
}
const ins1 = new Son('SG', 21, ['code', 'basketball', 'football'])
const ins2 = new Son('SG1', 21, ['code1', 'basketball1', 'football1'])

/**
 *  由于创建对象的时候Son构造函数的this并不相同，所以ins1和ins2并不是一个对象
 *  因此他们之间并没有什么关联，也不会有共享引用类型的问题
 */
// ins1.hobby.push('play Computer')
// console.log(ins1,ins2);


/**
 *  盗用构造模式的弊端：
 *      由于并非像原型链的方式进行继承，
 *      因此在prototype上挂载的方法并不会被子类所继承，
 *      因此并不能对方法进行复用，只能又回归到了构造函数模式
 *      
 */
// console.log(ins1.sayHello());





























