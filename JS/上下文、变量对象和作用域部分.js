/**
 *  上下文、变量对象和作用域部分，内容参考 红宝书 P87 起
 */


/**
 *  首先一个知识点：ES中函数的传参都是按照值传递的
 *  不论是基础类型还是引用类型，
 *  传递的参数按照值传递的方式赋给了变量对象（活动对象）
 *  比如传递参数如：
 *      (a: number(1)) => ...
 *      那么就会相当于
 *      let ao.a = a
 *  如果是引用类型，我们知道引用类型的变量实际上保存的是堆内存空间上的内存地址
 *  那么按照值传递的话传递的是对堆内存空间的一个引用的地址
 *      (obj: { name }) => ....
 *      实际上 (obj: &0101010)
 *      let ao.obj = obj
 *      再按照地址的引用去寻找对应的对象
 */



/** RESULT:
 *      SG
 *  为了证明这是按照值传递的形式，举栗子
 *  
 *  obj起初手里面拿着obj的地址，然后操作添加了name属性
 *  后面对obj进行重新地址赋值并操作name=PG
 *  如果是引用传递则全局作用域下的obj.name 应为PG
 *  
 *  下面的过程可以理解为这样
 *      function proof(obj) {
 *          let ao.obj = obj
 *          ao.obj.name = 'SG'
 *          ao.obj = new Object()
 *          ao.obj.name = 'PG'
 *      }
 */
// function proof(obj) {
//     obj.name = 'SG'
//     obj = new Object()
//     obj.name = 'PG'
// }

// const obj = {}
// proof(obj)
// console.log(obj.name);


/** RESULT：
 *      1
 *  这个例子验证ES采用的是静态的词法作用域
 *  函数作用域在函数创建的时候就已经确定了
 *  在当前的foo作用域中找不到value，则会查找当前函数编写位置的作用域
 * 
 * 
 *  动态作用域的话会查找函数的调用位置的外层作用域
 */
// const value = 1
// function foo() {
//     console.log(value);
// }

// function fooCall(){
//     const value = 2
//     foo()
// }
// fooCall()



/** RESULT:
 *      local scope
 *      local scope
 *  静态作用域实操 - 始终记得函数在定义的时候就已经创建好了作用域链
 *                  并据作用域链进行变量的查找
 *  所以很明显对于这两个函数无论是在函数中调用还是在全局上下文中调用
 *  作用域链都已经提前确定了
 */
// var scope = "global scope";
// function checkscope(){
//     var scope = "local scope";
//     function f(){
//         return scope;
//     }
//     return f();
// }
// console.log(checkscope());

// var scope = "global scope";
// function checkscope(){
//     var scope = "local scope";
//     function f(){
//         return scope;
//     }
//     return f;
// }
// console.log(checkscope()());


// name = 'SG'
// console.log(globalThis.name);

/** RESULT：
 *      [Function: foo]
 *   进入执行上下文的时候，首先会对函数的声明进行处理，其次会处理变量的声明
 *   如果两者都存在则不会对函数的声明造成影响
 */
// console.log(foo);
// function foo() {
//     console.log('1');
// }
// var foo = 1

































































