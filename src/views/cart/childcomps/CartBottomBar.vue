<template>
  <div class='bottom-bar'>
    <div class="checked-all">
      <check-button :is-checked="isAllChecked" @click.native="allChecked"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{ totalPrice }}
    </div>
    <div class="calculate" @click="calculateClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.isChecked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2);
      },
      checkLength() {
        return this.cartList.filter(item => item.isChecked).length;
      },
      isAllChecked() {
        return this.cartList.length != 0 && this.cartList.length === this.checkLength;
      }
    },
    methods: {
      allChecked() {
        if(this.isAllChecked) {
          this.$store.commit('noChecked');
        } else {
          this.$store.commit('enChecked');
        }
        
      },
      calculateClick() {
        if(!this.isAllChecked) {
          this.$toast.show('请选择商品', 1500);
        }    
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 35px;
    background-color: #eee;
    display: flex;
    padding-left: 10px;
    font-size: 13px;
    align-items: center;
  }

  .checked-all {
    display: flex;
  }

  .checked-all span {
    margin-left: 5px;
    margin-right: 30px;
  }

  .calculate {
    margin-left: auto;
    background-color: rgb(224, 56, 56);
    height: 100%;
    width: 90px;
    line-height: 35px;
    text-align: center;
    color: #fff;
  }
</style>