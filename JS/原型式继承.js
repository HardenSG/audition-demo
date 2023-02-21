/**
 *  原型式继承学习，内容参考 红宝书 P245
 */

/**
 *  原型式继承有别于原型链的继承方式，但是目的也是为了实现对象间的属性共享 
 */

/**
 *  继承方式：
 *      提前定义好需要在对象间进行共享的对象
 *      传入原型式继承的函数进行原型的指定
 */

function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
const basicData = {
    name: 'SG',
    age: 21,
    job: 'Software Engineer',
    hobby: ['code']
}
const o1 = object(basicData)
const o2 = object(basicData)

/** RESULT：
 *      ['code', 'basketball']
 *  属性在多对象之间是共享的
 */
o1.hobby.push('basketball')
console.log(o2.hobby);

// ES5推出的方法将原型式继承的概念规范化
const o3 = Object.create(basicData)

// Object.create(params1: object | null, addAttr?: object)
const o4 = Object.create(basicData, {
    salary: {
        value: 3000
    },
    name: {
        value: 'SG1111'
    }
})

// create的第二个参数创建的属性与basic的重复则会覆盖，其实就是属性查找机制
console.log(o4.name); // SG1111