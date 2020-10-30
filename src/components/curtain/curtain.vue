<template>
  <div class="t-curtain__wrapper" :style="{
    backgroundImage: `url(${src})`
  }">
    <div class="t-curtain" :style="{
        filter: `blur(${curtainBlur}px)`,
        backgroundImage: `url(${src})`
      }">
    </div>
  </div>
</template>

<script>

import {throttle} from "@/utils/throttle";

export default {
  name: "curtain",
  props: {
    src: {
      type: String,
      default: require('../../assets/image/loading.jpg')
    }
  },
  data() {
    return {
      curtainBlur: 0
    }
  },
  methods: {
    handleScroll() {
      //获取距离页面顶部的高度
      const scroll = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      const scrolled = (scroll / (document.documentElement.scrollHeight - document.documentElement.clientHeight)).toFixed(2)
      const start = 0.2
      const maxBlur = 4
      const temp = maxBlur / start
      //可视区域高度
      if (scrolled <= start) {
        this.curtainBlur = temp * scrolled
      } else if (scrolled <= 1 - start) {
        this.curtainBlur = maxBlur
      } else {
        this.curtainBlur = temp - temp * scrolled
      }
    }
  },
  created() {
    window.addEventListener('scroll', throttle(this.handleScroll, 100))
  }
}
</script>

<style lang="scss" scoped>
.t-curtain__wrapper{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-image: url("../../assets/image/loading.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
  overflow: hidden;
  .t-curtain{
    background-image: url("../../assets/image/loading.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    transition: all ease-in-out .25s;
  }
}

</style>