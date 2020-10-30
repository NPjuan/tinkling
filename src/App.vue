<template>
  <div id="app">
    <curtain></curtain>
    <div>
      <t-btn normal round color="#409EFF">
        我是按钮
      </t-btn>
      <t-btn ghost round color="rgb(0, 150, 136">
        <t-icon name="info" v-slot:icon left></t-icon>
        我是按钮
      </t-btn>
      <t-btn ghost round circle color="#409EFF">
        我是按钮
        <t-icon name="info" v-slot:icon left></t-icon>
      </t-btn>
      <t-btn color="#409EFF" circle ghost>
        <t-icon name="info" v-slot:icon></t-icon>
      </t-btn>
    </div>
    <div>
      <t-img
        cover
        hover
        lazy
        aspect-ratio="16/9"
        width="30%"
        :src="require('./assets/image/ycy.jpg')"
      >
      </t-img>
      <t-img
        cover
        hover
        lazy
        :src="require('./assets/image/ycy.jpg')"
      >
      </t-img>
    </div>
    <div style="height: 3000px"></div>
  </div>
</template>

<script>

import curtain from "@/components/curtain/curtain";
 export default {
	 name: 'app',
   components: {
	   curtain
   },
	 data() {
		 return {

		 }
	 },
	 methods: {

	 },
	 mounted() {

	 },
 }
</script>


<style lang="scss" scoped>
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  overflow: auto;
  min-height: 100vh;
}
</style>
