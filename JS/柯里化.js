/**
 *  柯里化的概念性东西在飞书中已经解释过了，
 *  这个文件来做一个自动套娃的柯里化工厂
 */

const postEssay = (id, author, type, essay) => 
    console.log(`用户ID：${id} 昵称：${author} 保存了一篇 ${type}  这次修改的内容为：${essay}`);

/**
 *  思路是这样的，首先将fn接收到，然后对参数开始做记忆
 *  什么叫做记忆？
 *      柯里化实际上是闭包的应用，层层的函数嵌套那就需要函数去记忆住之前的参数
 *      那么只需要判断已经记忆的参数和函数的预定参数的数量相比，如果相等或大于则调用函数
 *      如果小于则需要继续调用函数生成嵌套的函数
 * 
 *  这个 generateCurried 函数是干什么用的？
 *      用于记忆上次记忆的参数，每次递归都会将先前记忆的参数传递给函数作用域内
 *  那么 curried 函数干什么用的
 *      给柯里化添加层级的，获取到闭包中的先前记忆的参数再加上这次接受的参数统一进行处理
 *  
 *  这个函数是如何执行的？
 *      第一次将fn传入会返回这个第一个curried函数，我们调用id=1，实际上是调用的第一个curried
 *      调用完成后会返回第二个curried函数，第二次调用传入了SG
 *  所以你能看出来每次的函数调用实际上调用的都是curried函数
 */
const curryFactor = ( fn, arity = fn.length ) => {
    // 用于递归的函数
    function generateCurried( prevArgs ) {
        return function curried( nextArgs ) {
            const args = [...prevArgs, nextArgs]
            if(args.length >= arity) {
                return fn(...args)
            }else{
                return generateCurried(args)
            }
        }
    }

    return generateCurried([])
}

const post = curryFactor(postEssay)(1)('SG')('DRAFT')

post('这是我的第一篇草稿')
// post('这是我的第一篇草稿 -- 我对我的文章做出了修改')




