<template>
	<svg class="icon" aria-hidden="true">
		<use :xlink:href=iconName></use>
	</svg>
</template>

<script>
export default {
	name: "TIcon",
	props: {
		name: {
			type: String,
			require: true
		}
	},
	computed: {
		iconName() {
			return `#icon-${this.name}`
		},
		classes() {
		
		}
	}
}
</script>

<style lang="scss" scoped>
.icon {
	width: 1.2em;
	height: 1.2em;
	vertical-align: -0.2em;
  color: inherit;
	fill: currentColor;
}

</style>