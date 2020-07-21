<template>
  <div class='check-button' :class="{checked:isChecked}">
    <img src="~assets/img/cart/selected.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    components: {
      
    },
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  img {
    width: 14px;
    height: 14px;
  }

  .check-button {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #666;
  }

  .checked {
    border: none;
    background-color: var(--color-high-text);
  }
</style>