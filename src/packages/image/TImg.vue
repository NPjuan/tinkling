<template>
  <div class="t-img__wrapper" :style="{
    display: block ? 'flex' : 'inline-flex',
   }">
    <div :class="imgClasses" :style="{
       backgroundImage: `url(${lazy ? loadingSrc : src})`,
       width: width || naturalWidth || 'auto',
       height: height || 'auto'
     }">
      <div class="t-img__sizer" :style="{
        paddingBottom: userAspectRatio || naturalAspectRatio || 'auto'
       }">
      </div>
    </div>
    <div class="t-img__placeholder" v-if="lazy">
      <slot>
      </slot>
      <img v-if="!$slots.default" src="../../assets/image/loading.gif" width="50" alt="loading">
    </div>
  </div>
</template>

<script>

export default {
  name: "TImg",
  props: {
    width: String,
    height: String,
    block: Boolean,
    contain: Boolean,
    aspectRatio: String,
    hover: Boolean,
    notAnimation: Boolean,
    lazy: Boolean,
    loadingSrc: {
      type: String,
      default: require('../../assets/image/loading.jpg')
    },
    src: {
      type: String,
      require: true
    },
    alt: {
      type: String | Number,
      default: 'image'
    },
    cover: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      naturalWidth: null,
      naturalAspectRatio: null
    }
  },
  computed: {
    userAspectRatio() {
      if (!this.aspectRatio) return null
      const ratio = this.aspectRatio.split('/')
      const width = Number(ratio[0]),
            height = Number(ratio[1])
      return ((height / width) * 100).toFixed(4) + '%'
    },
    imgClasses() {
      const result = ['t-img']
      if (this.contain) {
        result.push('t-img__cover')
      } else if(this.cover) {
        result.push('t-img__cover')
      }
      this.lazy && result.push('t-img__lazy')
      this.hover && result.push('t-img__hover')
      !this.notAnimation && this.hover && result.push('t-img__hover-animation')
      return result
    }
  },
  created() {
    this.setAspectRatio()
  },
  mounted() {
    this.lazy && this.handleLazyLoad()
  },
  methods: {
    setAspectRatio() {
      const img = document.createElement('img')
      img.addEventListener('load', () => {
        const { naturalHeight, naturalWidth } = img
        this.naturalWidth = naturalWidth + 'px'
        this.naturalAspectRatio = ((naturalHeight / naturalWidth) * 100).toFixed(4) + '%'
      })
      img.setAttribute('src', this.src)
    },
    handleLazyLoad() {
      const img = this.$el.firstChild
      img.setAttribute('data-src', this.src)
      img.setAttribute('lazy', '')
    }
  },
}
</script>

<style lang="scss" scoped>
.t-img__wrapper{
  position: relative;
  overflow: hidden;
  max-width: 100%;
  .t-img {
    position: relative;
    display: flex;
    max-width: 100%;
    overflow: hidden;
    filter: blur(0);
    background-position: center center;
    background-repeat: no-repeat;
    transition: all .2s cubic-bezier(.25,.8,.5,1);
    .t-img__sizer{
      transition: padding-bottom .2s cubic-bezier(.25,.8,.5,1);
      max-width: 100%;
      width: 100%;
    }
  }
  .t-img__contain{
    background-size: contain;
  }
  .t-img__cover{
    background-size: cover;
  }
  .t-img__hover{
    cursor: pointer;
  }
  .t-img__hover-animation{
    transform: scale(1);
    &:hover{
      transform: scale(1.2);
    }
  }
  .t-img__lazy{
     filter: blur(2px);
   }
  .t-img__placeholder{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    transition: all .2s cubic-bezier(.25,.8,.5,1);
  }
}
</style>