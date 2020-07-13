<template>
	<div id="home" class="wrapper">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<better-scroll class="content" 
									 ref="scroll" 
									 :probe-type="3" 
									 :pull-up-load="true" 
									 @scroll="contentScroll"
									 @pullingUp="loadMore">
			<home-swiper :banner='banner' class="swiper"></home-swiper>
			<recommend-view :recommend="recommend"></recommend-view>
			<feature-view></feature-view>
			<tab-control :titles="['流行','新款','精选']" 
									 class="tab-control" 
									 @tabClick="tabClick"></tab-control>
			<goods-list :goods="showGoods"></goods-list>	
		</better-scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'

	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import BetterScroll from 'components/common/scroll/BetterScroll'
	import BackTop from 'components/content/backTop/BackTop'

	import {getHomeData, getHomeGoods} from 'network/home'

	export default {
		name: 'Home',
		components: {
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabControl,
			GoodsList,
			BetterScroll,
			BackTop
		},
		data() {
			return {
				banner: [],
				recommend: [],
				goods: {
					'pop': {page: 0, list: []},
					'new':{page: 0, list: []},
					'sell': {page: 0, list: []}
				},
				currentType: 'pop',
				isShowBackTop: false
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list;
			}
		},
		created() {
			//1.请求多个数据
			this.getHomeData(),
			//2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new'),
			this.getHomeGoods('sell')
		},			
		methods: {
			/**
			 * 下面是事件监听相关的方法
			 */
			tabClick(index) {
				switch(index){
					case 0:
						this.currentType = 'pop';
						break;
					case 1:
						this.currentType = 'new';
						break;
					case 2:
						this.currentType = 'sell';
						break;
				}
			},
			backClick() {
				this.$refs.scroll.scrollTo(0, 0, 500);
			},
			contentScroll(position) {
				this.isShowBackTop = -position.y > 1000
			},
			loadMore() {
				this.getHomeGoods(this.currentType);
				this.$refs.scroll.finishPullUp();
				// this.$refs.scroll.scroll.refresh();
			},

			/**
			 * 下面是网络情求相关的代码
			 */
			getHomeData() {
				getHomeData().then(res => {
					// console.log(res);
					this.banner = res.data.banner.list;
					this.recommend = res.data.recommend.list;
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					// console.log(res);
					this.goods[type].list.push(...res.data.list); //对res.data.list这个数组进行解析，将里面的元素依次放入其中
					this.goods[type].page += 1;
				})
			}
		}
	}
</script>

<style scoped>
	#home{
		padding-top: 44px;
		height: 100vh;
		position: relative;
	}
	.home-nav{
		background-color: #f58a9e;
		color: #fff;
		text-align: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 3;
	}

	.tab-control {
		position: sticky;
		top: 44px;
	}

	.content{
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0px;
		right: 0px;
	}

	/* .content {
		height: calc(100% - 93px);
		overflow: hidden;
		margin-top: 44px;
	} */
</style>