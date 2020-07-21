export default {
  addCounter(state, payLoad) {
    payLoad.count++;
  },
  addToCart(state, payLoad) {
    payLoad.isChecked = true;
    state.cartList.push(payLoad);
  },
  enChecked(state) {
    // for(var item of state.cartList) {
    //   item.isChecked = true;
    // }
    state.cartList.forEach(item => item.isChecked = true);
  },
  noChecked(state) {
    // for(var item of state.cartList) {
    //   item.isChecked = false;
    // }
    state.cartList.forEach(item => item.isChecked = false);
  }

}