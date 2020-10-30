<template>
  <button
    :class="btnClasses"
    :style="btnStyles"
    @click.self="handleClick($event)">
    <span class="text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import Color from '@utils/color'
export default {
	name: "TBtn",
  props: {
	  color: {
	    type: String,
      default: '#606266'
    },
    size: {
	    type: String,
      default: 'normal'
    },
    plain: Boolean,
    ghost: Boolean,
    round: Boolean,
    circle: Boolean,
    disabled: Boolean
  },
  methods: {
	  handleClick(event) {
	    console.log(event)
	    const { offsetX, offsetY, target } = event
      const ripple = document.createElement('span')
      const className = (this.plain || this.ghost) ? 't-ripple' : 't-ripple-white'
      ripple.setAttribute('class', className)
      ripple.setAttribute('style', `left: ${offsetX}px; top: ${offsetY}px`)
      target.appendChild(ripple)
      setTimeout(() => {
        ripple.remove()
      }, 500)
	    // 动画效果
    },
    hasTextNode(VNodes) {
      for (let VNode of VNodes) {
        if (VNode.text) {
          return true
        }
      }
      return false
    }
  },
  computed: {
	  btnStyles() {
	    const result = {}
	    if (this.color) result['color'] = this.color
      return result
    },
	  btnClasses() {
	    const classes = ['plain', 'ghost', 'round', 'circle', 'disabled']
      const result = ['t-btn', this.size]
      for (let item of classes) {
        if (item === 'circle' && !this.hasTextNode(this.$slots.default)) {
          result.push('circle-icon')
          continue
        }
        this[item] && result.push(item)
      }
      return result
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
$hover-opacity: .05;
$active-opacity: .1;

@mixin ripple{
  position: absolute;
  z-index: 1;
  content: "";
  top: 50%;
  left: 50%;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  transform-origin: center;
  animation: pipple cubic-bezier(0.4, 0, 0.2, 1) .6s forwards;
  transform: translate3d(-50%, -50%, 0) scale(1.5, 1.5);
  transition: transform 0.45s ease-in-out;
  pointer-events: none;
}

.t-btn{
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 6px 14px;
  outline: none;
  border: none;
  vertical-align: middle;
  cursor: pointer;
  text-decoration: none;
  transition-duration: .28s;
  transition-property: box-shadow, transform, opacity, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: currentColor;
  overflow: hidden;
  user-select: none;
  white-space: nowrap;
  .text{
    position: relative;
    padding: 0 5px;
    color: whitesmoke;
    z-index: 2;
    pointer-events: none;
  }
  .padding-none{
    padding: 0;
  }
  svg{
    position: relative;
    z-index: 2;
    pointer-events: none;
  }
  /deep/ .t-ripple{
    @include ripple;
    background-color: currentColor;

  }
  /deep/ .t-ripple-white{
    @include ripple;
    background-color: white;
  }
  &:before{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: 0;
    content: "";
    z-index: 1;
    border-radius: inherit;
    pointer-events: none;
    color: inherit;
    transition: opacity .2s cubic-bezier(.4,0,.6,1);
    background-color: currentColor;
  }
  &:hover{
    &:before{
      opacity: $hover-opacity;
    }
  }
  &:active{
    &:before{
      filter: brightness(160%);
      opacity: $active-opacity;
    }
  }
}
.small{
  font-size: 12px;
  padding: 4px 6px;
}
.normal{
  font-size: 14px;
  padding: 6px 14px;
}
.large{
  font-size: 16px;
  padding: 8px 18px;
}
.block{
  display: flex;
  width: 100%;
  font-size: 18px;
  padding: 10px 0;
  margin: auto;
  justify-content: center;
  align-items: center;
}


.plain{
  .text{
    padding: 0 5px;
    color: currentColor;
  }
  background-color: transparent;
  &:active{
    &:before{
      filter: brightness(95%);
      opacity: $active-opacity;
    }
  }

}
.ghost{
  .text{
    padding: 0 5px;
    color: currentColor;
  }
  border: 1px solid currentColor;
  background-color: transparent;
  &:active{
    &:before{
      filter: brightness(95%);
      opacity: $active-opacity;
    }
  }
}
.round{
  border-radius: 4px;
}
.circle{
  width: auto;
  height: auto;
  justify-content: center;
  border-radius: 99999px;
}
.circle-icon{
  width: auto;
  height: auto;
  justify-content: center;
  border-radius: 99999px;
  padding: 10px;
  .text{
    padding: 0;
  }
}
.disabled{
  pointer-events: none;
  cursor: not-allowed;
  opacity: .3;
}

</style>