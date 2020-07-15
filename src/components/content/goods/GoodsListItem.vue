<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imgLoad()">  
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span><img src="~assets/img/common/collect.png" alt=""></span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    components: {
      
    },
    props: {
      goodsItem: {
        type: Object,
        default() {

        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img;
      }
    },
    methods: {
      imgLoad() {
        if(this.$route.path.indexOf('./home')) {
          this.$bus.$emit('homeItemImgLoad');
        } else if(this.$route.path.indexOf('./detail')){
          this.$bus.$emit('detailItemImgLoad');
        }
        
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid);
      }
    }
  }
</script>

<style>
  .goods-item{
    flex: 1;
    width: 37%; 
    padding: 3px;
    text-align: center;
  }

  .goods-item>img{
    border-radius: 5px;
    width: 100%;
    margin-top: 7px;
  }

  .goods-info{
    font-size: 12px;
  }

  p{
    margin: 7px 0 4px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .price{
    color: #ff5777;
    margin-right: 15px;
  }
  
  span>img{
    width:14px;
    height:14px;
    margin-right: 2px;
  }

  /* .goods-item {
    position: relative;
    padding: 5px;
    padding-bottom: 40px;
    width: 48%;
  }

  .goods-item>img {
    width: 100%;
    border-radius: 5px;
   border:3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  span>img{
    width:14px;
    height:14px;
    margin-right: 2px;
  } */ 
</style>