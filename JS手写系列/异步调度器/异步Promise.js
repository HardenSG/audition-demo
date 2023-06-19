/**
 *  实现一个异步的Promise并发执行器
 *
 */

// const urls = [
  "https://upyun.hokori.online/2021-12-07/1638920676-9302-qr-code.png", // QQ群二维码
  "https://upyun.hokori.online/2021-11-26/1637931840-638128-littlef-alpha.gif", // 啃键盘动态图
  "https://upyun.hokori.online/2021-10-23/1634958891-996314-00fwfwhite-alphabg.png", // Logo白字透明底
  "https://upyun.hokori.online/2021-11-29/1638159552-936408-aare.png", // LogoPage背景图
  "https://upyun.hokori.online/2021-11-29/1638159719-557355-5c0080fe9e397d3325abcf93-hero-1.svg", // Introduce背景1
  "https://upyun.hokori.online/2021-11-29/1638159797-898696-5c001deda8e61a2c3ad905e5-hero-4.svg", // Introduce背景2
  "https://upyun.hokori.online/2021-11-29/1638159793-141341-5c00fa3ad82b40e853c9952f-hero-3.svg", // Introduce背景3
  "https://upyun.hokori.online/2021-11-29/1638159785-89032-5c00fa0eb8b0816e1a10dfe6-hero-2.svg", // Introduce背景4
  "https://upyun.hokori.online/2021-11-29/1638160006-70194-linth2.png", // Project背景图
// ];

const urls = [
  'http://127.0.0.1:8000?num=1',
  'http://127.0.0.1:8000?num=2',
  'http://127.0.0.1:8000?num=3',
  'http://127.0.0.1:8000?num=4',
  'http://127.0.0.1:8000?num=5',
  'http://127.0.0.1:8000?num=6',
  'http://127.0.0.1:8000?num=7',
  'http://127.0.0.1:8000?num=8',
  'http://127.0.0.1:8000?num=9',
  'http://127.0.0.1:8000?num=10',
  'http://127.0.0.1:8000?num=11',
  'http://127.0.0.1:8000?num=12',
  'http://127.0.0.1:8000?num=13',
  'http://127.0.0.1:8000?num=14',
  'http://127.0.0.1:8000?num=15',
  'http://127.0.0.1:8000?num=16',
  'http://127.0.0.1:8000?num=17',
  'http://127.0.0.1:8000?num=18',
  'http://127.0.0.1:8000?num=19',
  'http://127.0.0.1:8000?num=20',
  'http://127.0.0.1:8000?num=21',
  'http://127.0.0.1:8000?num=22',
  'http://127.0.0.1:8000?num=23',
  'http://127.0.0.1:8000?num=24',
  'http://127.0.0.1:8000?num=25',
  'http://127.0.0.1:8000?num=26',
  'http://127.0.0.1:8000?num=27',
  'http://127.0.0.1:8000?num=28',
  'http://127.0.0.1:8000?num=29',
];


function generatorPromise(urls) {
  console.log(urls);
  return urls.map((v) => handleCB.bind(null, v));
}

// function handleCB(url) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => {
//       resolve(img);
//     };

//     img.onerror = (e) => {
//       reject(e);
//     };

//     img.src = url;
//   });
// }

function handleCB(url) {
  console.log(url);
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url
    }).then((res) => {
      resolve(res.data)
    })
  });
}

const requestPool = generatorPromise(urls);

/**
 *  需要有limit限制
 *  需要整体请求
 *  对于错误请求选择是否整体抛出还是遇见即抛出
 */
const isPromise = (v) => v !== null && typeof v === "object" && v instanceof Promise;
class PromiseScheduler {
  limit = 5; // number
  requestPool = []; // return: Promise
  isFullThrow = false; // boolean
  resPool = []; // any[]
  errorPool = []; // error[]
  constructor(pool, limit, isFull) {
    this.requestPool = pool;
    this.limit = limit;
    this.isFullThrow = isFull;
    this.resPool = Array(pool.length);
  }

  runPool() {
    const container = this.requestPool.slice(0, this.limit).map((v, i) =>
      v()
        .then((res) => {
          this.resPool[i] = res;
          return i;
        })
        .catch((e) => {
          this.errorPool.push({
            e,
            eReq: v,
          });
          !this.isFullThrow &&
            (() => {
              throw Error(this.errorPool);
            })();
        })
    );

    return new Promise((resolve) => {
      this.requestPool
      .slice(this.limit, this.requestPool.length)
      .reduce((c, r, index) => {
        return c
          .then(() => {
            return Promise.race(container);
          })
          .then((i) => {
            container[i] = r().then((res) => {
              // console.log(index);
              this.resPool[index + this.limit] = res;
              return i;
            });
          })
          .catch((e) => {
            this.errorPool.push({
              e,
              eReq: v,
            });
            !this.isFullThrow &&
              (() => {
                throw Error(this.errorPool);
              })();
          });
      }, Promise.resolve())
      .then(() => {
        Promise.all(container).then(() => {
          resolve(this.resPool)
        });
      });
    })
  }
}
