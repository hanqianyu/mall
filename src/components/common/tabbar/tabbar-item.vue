<template>
	<div class="tabbar-item" @click="itemClick">

		<div v-if="!isActive">
			<slot name="item-icon"></slot>
		</div>

		<div v-else>
			<slot name="item-icon-active"></slot>
		</div>

		<div :style="activeStyle">
			<slot name="item-text"></slot>
		</div>

	</div>

</template>

<script>
	export default {
		name: 'tabbar-item',
		computed: {
			isActive() {
				return this.$route.path.indexOf(this.path) !== -1;
			},
			activeStyle() {
				return this.isActive ? {color: this.activeColor} : {};
			}
		},
		props: {
			path: String,
			activeColor: {
				type: String,
				default: '#ff5777'
			}
		},
		methods: {
			itemClick() {
				this.$router.replace(this.path);
			}
		}
	}
</script>

<style>
	.tabbar-item {
		flex: 1;
		/*平均分配*/
		text-align: center;
		height: 49px;
		font-size: 14px;
	}
	
	.tabbar-item img {
		width: 24px;
		height: 24px;
		vertical-align: middle;
		margin-top: 3px;
	}

</style>