function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    const context = this;

    clearTimeout(timeout);

    //// 如果需要立即执行，那就立即执行即可
    if (immediate) {
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      func.apply(context, arguments);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, arguments);
      }, wait);
    }
  };
}

const now = Date.now()
const a = debounce(() => {
console.log(Date.now() - now);
  console.log(1);
}, 2000, true);

setInterval(() => {
    a()
}, 3000);
