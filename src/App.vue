<template>
  <div id="app">
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
    <div style="width: 30%">
      <t-img
        cover
        hover
        lazy
        :src="require('./assets/image/ycy.jpg')"
      >
      </t-img>
    </div>
  </div>
</template>

<script>

 export default {
	 name: 'app',
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
}
</style>
