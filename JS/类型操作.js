/**
 *  类型判断：
 *  1. typeof
 *  2. instanceof
 *  3. toString
 */
// NOTE: typeof
// const str = typeof 'str'
// const tr = typeof true
// const one = typeof 1
// const symbol = Symbol()

// console.log(str,tr,one,symbol);

// NOTE: instanceof
// class People {
//     constructor(name, age){
//         this.name = name
//         this.age = age
//     }
//     sayMyInfo() {
//         const info = `
//             my name is ${this.name}
//             and ${this.age} years old
//         `
//         return info
//     }
// }

// class Student extends People {
//     constructor(name, age, grade) {
//         super(name, age)
//         this.grade = grade
//     }
//     sayMyInfo() {
//         const baseInfo = super.sayMyInfo()
//         const info = `
//             ${baseInfo}
//             last：my grade is ${this.grade}
//         `
//         return info
//     }
// }

// const people = new People('SG',20)
// const student = new Student('SG',20,'大学二年级')

// print somethings
// console.log(people.sayMyInfo(),student.sayMyInfo());

// RESULT: true \ false \ true \ true
// MARK: Find out exactly which type it belongs to
// console.log(
//     people instanceof People,
//     people instanceof Student,
//     student instanceof Student,
//     student instanceof People
// );

// NOTE: toString()

const obj = {
    a: 1,
    b: 2
}
const arr = [1,2,3]

// [object Object], [object Array] 
console.log(Object.prototype.toString.call(obj),Object.prototype.toString.call(arr));