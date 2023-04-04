/**
 *  寄生式继承学习 内容参考红宝书 P246
 */


/**
 *  寄生式继承与原型式继承相似，思路是源于工厂函数和寄生构造函数
 *  寄生式继承适用于关注对象而不在乎类型和构造函数的场景
 *  痛点：  
 *      使用寄生式继承像构造函数或经典模式那样导致方法的重用困难
 */

function CreateNewObject(o) {
    const origin = Object.create(o)
    origin.sayHello = () => 'Hello EveryBody！'
    return origin
}

const basicData = {
    name: 'SG',
    age: 21,
    job: 'Software Engineer',
    guess: {
        a: '1'
    }
}

const o1 = CreateNewObject(basicData)
const o2 = CreateNewObject(basicData)

// False
// console.log(o1.sayHello === o2.sayHello)
// console.log(o1.guess === o2.guess);































