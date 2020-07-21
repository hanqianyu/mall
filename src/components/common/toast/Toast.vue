<template>
  <div class='toast' v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    components: {
      
    },
    // props: {
    //   message: {
    //     type: String,
    //     default: ''
    //   },
    //   show: {
    //     type: Boolean,
    //     default: false
    //   }
    // }
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='默认文字', duration=1000) {
        this.isShow = true;
        this.message = message;
        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, duration)
      }
    },
   
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    padding: 6px 8px;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    font-size: 13px;
    border-radius: 5px;
  }
</style>