<template>
  <div class='bottom-bar'>
    <div class="left">
      <div class="serve">
        <img class="icon" src="~assets/img/detail/bar-serve.png" alt="">
        <p class="bar-text">客服</p>
      </div>
      <div class="shop">
        <img class="icon" src="~assets/img/detail/bar-shop.png" alt="">
        <p class="bar-text">店铺</p>
      </div>
      <div class="collect">
        <img class="icon" src="~assets/img/detail/bar-collect.png" alt="">
        <p class="bar-text">收藏</p>
      </div>
    </div>
    <div class="right">
      <div class="add-cart"  @click="addToCart">
        <p class="add-cart-text">加入购物车</p>
      </div>
      <div class="buy">
        <p class="buy-text">购买</p>
      </div>
    </div>
  </div>
    
</template>

<script>
  export default {
    name: 'DetailBottomBar',
    components: {
      
    },
    methods: {
      addToCart() {
        this.$emit('addCart');
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 49px;
    background-color:#fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0
    
  }

  .left {
    flex: 1;
    display: flex;
    justify-content: space-around;
  }

  .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
  }

  .bar-text {
    font-size: 13px;
  }

  .right {
    flex: 1;
    display: flex;
  }

  .add-cart {
    flex: 1;
    text-align: center;
    background-color:yellow;
  }

  .add-cart-text {
    font-size: 13px;
    color: #000;
    margin-top: 19px;
  }

  .buy {
    flex: 1;
    text-align: center;
    background-color: var(--color-high-text);
  }

  .buy-text {
    font-size: 13px;
    color: #fff;
    margin-top : 18px;
  }
</style>