/**
 * N 秒后只会执行一次 覆盖--
 * @param {*} fn 要防抖的函数
 * @param {*} time 延时
 * @param {*} immediate 立即执行
 * @returns
 */
function debounce(fn, time, immediate) {
  let timer;
  return function () {
    let context = this;
    var args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let excuted = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, time);
      if (excuted) fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, time);
    }
  };
}

function test(p) {
  console.log(p);
}

let fn = debounce(test, 3000, true);
fn(1);
setTimeout(() => {
  fn(2);
}, 4000);

// fn(3);
