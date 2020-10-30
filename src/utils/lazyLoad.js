import { throttle } from './throttle'

window.addEventListener('load', () => {
  window.addEventListener('scroll', dispatchLazyLoad)
  dispatchLazyLoad()
})

const dispatchLazyLoad = throttle(() => {
  const images = Array.from(document.querySelectorAll('[lazy]'))
  if (!images.length) return
  //获取距离页面顶部的高度
  const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
  //可视区域高度
  const clientTop = window.innerHeight
  for (let img of images) {
    if(img.parentElement.offsetTop < top + clientTop - 500){
      img.style.backgroundImage = `url(${img.getAttribute("data-src")})`
      img.classList.remove('t-img__lazy')
      img.removeAttribute("lazy")
      // 删除 placeholder
      const placeholder = img.nextSibling
      placeholder && placeholder.remove()
    }
  }
},500)