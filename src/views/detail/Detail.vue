<template>
  <div class='detail'>
    <detail-nav-bar class="detail-nav"  @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <better-scroll class="content" ref="scroll" :probe-type="3"  @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </better-scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childcomps/DetailNavBar'
  import DetailSwiper from './childcomps/DetailSwiper'
  import DetailBaseInfo from './childcomps/DetailBaseInfo'
  import DetailShopInfo from './childcomps/DetailShopInfo'
  import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
  import DetailParamInfo from './childcomps/DetailParamInfo'
  import DetailCommentInfo from './childcomps/DetailCommentInfo'

  import BetterScroll from 'components/common/scroll/BetterScroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {debounce} from 'common/utils.js'
  import {itemListenerMixin} from 'common/mixin.js'
 
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      BetterScroll,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        // refresh: function(){},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    // mixins: [itemListenerMixin],
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid;

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        //1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo);

        //4.获取商品详细信息
        this.detailInfo = data.detailInfo;

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6.取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        };

        // this.$nextTick(() => {  //对应的DOM渲染完成，但是图片没有渲染完
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs);
        // })
        /**
         * 在哪里才能获取到正确的offsetTop
         *  1.created肯定不行，压根不能获取元素
         *  2.mounted也不行，数据还没有获取到
         *  3.获取到数据的回调中也不行，DOM还没有渲染完
         *  4.$nextTick也不行，因为图片的高度没有计算在内
         *  5.在图片加载完成之后，获取到的图片才是正确
         */

        //4.给gatThemeTopY赋值
        this.getThemeTopY = debounce(() => {
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE);
          // console.log(this.themeTopYs);
        }, 1000);
      }),

      //3.请求推荐页数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommend = res.data.list;
      })
    },
    // mounted() {
    //   this.refresh = debounce(this.$refs.scroll.refresh, 200);
    // },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      this.$bus.$on('detailItemImgLoad', () => {
        refresh();
      });
      
    },
    methods: {
      imgLoad() {
        // this.refresh();
        this.$refs.scroll.refresh();
        this.getThemeTopY();
      },
      titleClick(index) {
        // console.log(index);
        const posY = -(this.themeTopYs[index]-44);
        this.$refs.scroll.scrollTo(0, posY, 200);
      },
      contentScroll(position) {
        //1.获取y值
        const positionY = -(position.y-44);

        //2.positionY和主题中的值进行对比
        let length = this.themeTopYs.length;
        for(let i = 0; i <length-1; i++) {
          // if(this.currentIndex != i &&
          //    (
          //      (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || 
          //      (i === length - 1 && positionY >= this.themeTopYs[i])
          //    )
          //   ) {
          //     this.currentIndex = i;
          //     this.$refs.nav.currentIndex = this.currentIndex;
          //     // console.log(this.currentIndex);
          //   }
             if(this.currentIndex != i && 
                (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
                  this.currentIndex = i;
                  this.$refs.nav.currentIndex = this.currentIndex;
               }
        }
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    width: 96%;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>