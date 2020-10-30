export function throttle(fn, delay, thisArg) {
  let timer = null
  // 记录上一次执行的时间
  let lastExec = Number(new Date())
  return function wrapper(...rest) {
    // 这两步老生常谈
    let self = this
    // 记录距离上一次执行已过了多长时间
    let elapsed = Number(new Date()) - lastExec
    timer && clearTimeout(timer)
    if (elapsed >= delay) {
      // 如果到了规定执行时间，直接执行
      exec()
    } else {
      // 放入回调函数中
      timer = setTimeout(exec, delay - elapsed) // 注意这里并非 delay 而是 delay - elapsed
    }

    function exec() {
      // 执行时记得更改 lastExec
      lastExec = Number(new Date())
      fn.apply(thisArg || self, rest)
    }
  }
}