const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: {
        e: 12,
        f: 13,
        g: {
            aa: 1
        }
    },
    h: 'SG'
}
// Object.entries(obj)
//     .forEach(([k, v]) => {
//         console.log(k, v);
//     })

// Object.values(obj)
//     .forEach(v => {
//         console.log(v);
//     })

// Object.keys(obj)
//     .forEach(v => { 
//         console.log(obj[v]);
//     })

// for (const k in obj) {
//     console.log(obj[k]);
// }

// for (const iterator of Object.entries(obj)) {
//     console.log(iterator);
// }


////////////////////////////////////////////////

const arr = [ 6, 7, 3, 4, 8, 1, 2, 5]

// Object.values(arr)
//     .forEach(v => {
//         console.log(v);
//     })

// Object.entries(arr)
//     .forEach(([_, v]) => {
//         console.log(v);
//     })

// arr.map(v => {
//     console.log(v);
// })

// const iterator = arr.entries()
// const iterator = arr.keys()
// const iterator = arr.values()
// let flag = true
// while(flag) {
//     const v = iterator.next()
//     if(v.done) {
//         flag = false
//     } else {
//         console.log(v);
//     }
// }


// arr.forEach(v => {
//     console.log(v);
// })

// for (const iterator of arr) {
//     console.log(iterator);
// }

// for (const k in arr) {
//     console.log(arr[k]);
// }


////////////////////////////////////////////////
// console.log(arr.sort((a, b) => a - b));


