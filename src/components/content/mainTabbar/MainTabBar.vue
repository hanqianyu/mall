<template>
	<tabbar>
			<tabbar-item path="/home">
				<img slot="item-icon" src="~assets/img/tabbar/home.png" />
				<img slot="item-icon-active" src="~assets/img/tabbar/home-active.png" />
				<div slot="item-text">首页</div>
			</tabbar-item>
			<tabbar-item  path="/class">
				<img slot="item-icon" src="~assets/img/tabbar/class.png" />
				<img slot="item-icon-active" src="~assets/img/tabbar/class-active.png" />
				<div slot="item-text">分类</div>
			</tabbar-item>
			<tabbar-item path="/shopcart">
				<img slot="item-icon" src="~assets/img/tabbar/cart.png" />
				<img slot="item-icon-active" src="~assets/img/tabbar/cart-active.png" />
				<div slot="item-text">购物车</div>
			</tabbar-item>
			<tabbar-item path="/profile">
				<img slot="item-icon" src="~assets/img/tabbar/profile.png" />
				<img slot="item-icon-active" src="~assets/img/tabbar/profile-active.png" />
				<div slot="item-text">我的</div>
			</tabbar-item>
		</tabbar>
</template>

<script>
	import tabbar from 'components/common/tabbar/tabbar.vue'
	import tabbarItem from 'components/common/tabbar/tabbar-item.vue'
	export default {
		name: 'MainTabBar',
		components: {
			tabbar,
			tabbarItem
		}
	}
</script>

<style>
</style>