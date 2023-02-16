/**
 *  生成器学习：内容参考红宝书 P192
 */

/**
 *  外观： function *generator(){}
 */

// function *generator() {
    
// }

// 生成器对象
// 这个生成器对象起初是暂停执行（suspend）的与迭代器类似也实现了Iterator接口自然具有next方法
// const g = generator()

// { value: undefined, done: true }
// console.log(g.next());

// NOTE: 这个IteratorResult对象的value值是生成器函数的返回值
//       这意味着next.value可以通过生成器函数的返回值进行指定
// MARK: 生成器函数的函数体并不会在调用该函数的时候进行调用
//       初次调用会在调用next的时候调用**一次**
// function *generator() {
//     console.log('初始执行');
//     return 'foo'
// }
// const gen = generator()

// { value: 'foo', done: true }
// console.log(gen.next());

// console.log(gen === gen[Symbol.iterator]());



/**
 *  NOTE：通过 yield 中断执行
 *        yield只能直接应用在生成器函数中
 */

// function *generator() {
//     yield 'foo1'
//     yield 'foo2'
//     return 'foo finial'
// }

// const gen = generator()

// 相似于迭代器，生成器之间是互相独立互不影响的
/** RESULT:
 *  { value: 'foo1', done: false }
 * { value: 'foo2', done: false }
 * { value: 'foo finial', done: true }
 */
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

// MARK：生成器对象作为可迭代对象
// MARK：虽然yield会使函数停止执行，但是函数作用域的状态会被保留
//       因此 n 的数值在生成器函数作用域内的数值状态被保存下来了
// function *generator(n) {
//     while(n--){
//         yield n;
//     }
// }

// const g = generator

// RESULT: 4、3、2、1、0
// for (const iterator of g(5)) {
//     console.log(iterator);
// }


/**
 *  NOTE：使用yield实现输入和输出
 *  可以向next函数中传入参数，而yield也会接收到next传递来的第一个参数
 */
// function *generator(initial) {
//     console.log(initial);
//     console.log(yield);
//     console.log(yield);
// } 

// const g = generator('初始化')


/**
 * RESULT：
 * 初始化
 * 第二个
 * 第三个
 */
// g.next('第一个')
// g.next('第二个')
// g.next('第三个')


/** NOTE：
 *  return需要对内容进行求值，在遇到yield之后暂停执行
 *  将bar作为next函数输出，下一次next，yield则作为了输入
 */
function *generator() {
    return yield 'bar'
} 
const g = generator()

/** RESULT：
 * { value: 'bar', done: false }
 * { value: '传值', done: true }
 */
// console.log(g.next());
// console.log(g.next('传值'));
























































































