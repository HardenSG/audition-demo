const isObj = v => typeof v === "object"
const isFunc = (v) => typeof v === "function";
const executor = (list) => (v) => list.map((cb) => cb(v));

const resolvePromise = (p, v, resolve, reject) => {
    if(p === v) throw new Error('Chain Error')
    if(v instanceof MyPromise) {
        v.then(y => {
            resolvePromise(
                p,
                y,
                resolve,
                reject
            )
        })
    }

    if(v !== null && (isObj(v) || isFunc(v))) {
        try {
            var then = v.then
        } catch (error) {
            reject(error)            
        }

        if(isFunc(then)) {
            let called = false
            try {
                then.call(
                    v,
                    y => {
                        if(called) return 
                        called = true 
                        resolvePromise(
                            p,
                            y,
                            resolve,
                            reject
                        )
                    },
                    e => {
                        if(called) return 
                        called = true 
                        reject(e)
                    }
                )                
            } catch (error) {
                if(called) return 
                called = true 
                reject(error)
            }
        } else{ 
            resolve(v)
        }

    }else{ 
        resolve(v)
    }
};

class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(executor) {
    this.PromiseState = MyPromise.PENDING;
    this.PromiseResult = null;

    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    if (this.PromiseState === MyPromise.PENDING) {
      this.PromiseState = MyPromise.FULFILLED;
      this.PromiseResult = value;
      this.fulfilledCallbacks.length &&
        executor(this.fulfilledCallbacks)(this.PromiseResult);
    }
  }

  reject(reason) {
    if (this.PromiseState === MyPromise.PENDING) {
      this.PromiseState = MyPromise.REJECTED;
      this.PromiseResult = reason;
      this.rejectedCallbacks.length &&
        executor(this.rejectedCallbacks)(this.PromiseResult);
    }
  }

  then(onFulfilled, onRejected) {
    const p = new MyPromise((resolve, reject) => {
      if (this.PromiseState === MyPromise.PENDING) {
        this.fulfilledCallbacks.push((v) => {
          queueMicrotask(() => {
            try {
              if (!isFunc(onFulfilled)) {
                return resolve(this.PromiseResult);
              } else {
                resolvePromise(p, onFulfilled(v), resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          });
        });

        this.rejectedCallbacks.push((v) => {
          queueMicrotask(() => {
            try {
              if (!isFunc(onRejected)) {
                reject(this.PromiseResult);
              } else {
                resolvePromise(p, onRejected(v), resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          });
        });
      }

      if (this.PromiseState === MyPromise.FULFILLED) {
        queueMicrotask(() => {
          try {
            if (!isFunc(onFulfilled)) {
              return resolve(this.PromiseResult);
            } else {
              resolvePromise(
                p,
                onFulfilled(this.PromiseResult), // 用来执行回调
                resolve,
                reject
              );
            }
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.PromiseState === MyPromise.REJECTED) {
        queueMicrotask(() => {
          try {
            if (!isFunc(onRejected)) {
              return resolve(this.PromiseResult);
            } else {
              resolvePromise(
                p,
                onRejected(this.PromiseResult),
                resolve,
                reject
              );
            }
          } catch (error) {
            reject(error);
          }
        });
      }
    });

    return p;
  }


  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(cb) {
    this.then(cb, cb)
  }
}

module.exports = MyPromise;
