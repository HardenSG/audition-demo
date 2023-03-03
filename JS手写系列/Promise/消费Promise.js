const MyPromise = require('./Promise静态')

// const instance = new MyPromise((resolve, reject) => {
//     resolve(1)
// })


// instance.then((res) => {
//     console.log(res);
// }).then((res) => {
//     console.log(res);
// })


////////////静态方法//////////


const iterator = [
    MyPromise.resolve(1),
    // MyPromise.reject(8),
    2,
    3,
    new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(4);
      }, 2000);
    }),
    {
      then(resolve) {
        //// 需要有resolve
        resolve("demo");
      },
    },
  ];
const pipe = MyPromise.all(iterator)
pipe.then((result) => {
  console.log(result);  
}).catch(e => {
    console.log('error --->', e);
})
