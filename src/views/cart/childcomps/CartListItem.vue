<template>
  <div class='cart-item'>
    <div class="item-selector">
      <check-button :is-checked="itemInfo.isChecked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
       <img :src="itemInfo.image" alt="">
    </div>
    <div class="item-text">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="item-bottom">
        <div class="item-price">￥{{ itemInfo.price }}</div>
        <div class="item-count">×{{ itemInfo.count }}</div>
      </div>   
    </div>   
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartListItem',
    components: {
      CheckButton
    },
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}  
        }
      }
    },
    methods: {
      checkClick() {
        this.itemInfo.isChecked = !this.itemInfo.isChecked;
      } 
    }
  }
</script>

<style scoped>
  .cart-item {
    display: flex;
    padding: 7px 7px 7px 3px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
  }

  .item-img img{
    width: 80px;
    height: 100px;
    border-radius: 5px;
    float: left;
  }

  .item-text {
    position: relative;
    width: 100%;
    margin-left: 10px;
  }

  .item-title, .item-desc {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-title {
    color: #000;
    font-size: 17px;
    margin-top: 3px;
  }

  .item-desc {
    margin-top: 14px;
    font-size: 14px;
  }

  .item-bottom {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 2px;
  }

  .item-price {
    color: var(--color-high-text);
  }
</style>