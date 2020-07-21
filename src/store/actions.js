export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      //1.查找之前的数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid);

      //2.判断oldProduct是否有值
      if(oldProduct) {
        // oldProduct.count += 1;
        context.commit('addCounter', oldProduct);
        resolve('当前商品数量+1');
      } else {
        payLoad.count = 1;
        // state.cartList.push(payLoad);
        context.commit('addToCart', payLoad);
        resolve('添加商品成功');
      }
    })
    
  }
}