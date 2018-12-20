import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: null,
    userInfo: null,
    cart: null,
    order: null,
    address: null,
    settlement:null,
    pay:null
  },
  mutations: {
    userLogin(state, data) {
      state.isLogin = true
      state.userInfo = data.user
      state.address = data.addressList
      state.cart = data.cartGoods
      state.order = data.orderGoods
    },
    userLogout(state){
      state.isLogin = false
      state.userInfo = null
      state.address = null
      state.cart = null
      state.order = null
    },
    setIsLogin(state, status) {
      state.isLogin = status
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setUserAddress(state, address) {
      state.address = address
    },
    setCart(state, cart) {
      state.cart = cart
    },
    setOrder(state,order){
      state.order = order
    },
    setQrCodeBase64(state, base64) {
      state.pay.qrCodeBase64 = base64
    },
    addGoods(state) {
    },
    deleteGoods(state) {
    },
    updateGoods(state) {
    },
    setSettlement(state, settlement) {
      state.settlement = settlement
    }
  },
  getters: {
    // userInfo(state) {
    //   let info = null
    //   if(state.userInfo === null){
    //     if(state.isLogin){
    //       info = JSON.parse(sessionStorage.getItem("userInfo"))
    //     }
    //   }else{
    //     info = state.userInfo
    //   }
    //   return info
    // },
    // isLogin(state){
    //   let status = null;
    //   if(state.isLogin === null){
    //     status = JSON.parse(sessionStorage.getItem("isLogin"))
    //   }else{
    //     status = state.isLogin
    //   }
    //   return status
    // }
    cartGoodsAmount(state,getters) {
      let result = 0
      if(state.cart){
        const cartGoods = getters.cartGoodsList
        result = cartGoods.length
      }
      return result
    },
    cartGoodsTotalAmount(state,getters){
      let result = 0
      if(state.cart){
        const cartGoods = getters.cartGoodsList
        for(let i=0;i<cartGoods.length;i++){
          result += cartGoods[i].amount
        }
      }
      return result
    },
    cartGoodsTotalPrice(state,getters){
      if(state.cart){
        const cartGoods = getters.cartGoodsList
        let total = 0
        for(let i=0,j=cartGoods.length;i<j;i++){
          total += (cartGoods[i].goodsPrice/100)* cartGoods[i].amount
        }
        return total
      }else{
        return 0
      }
    },
    cartGoodsList(state){
      let result = []
      if(state.cart && state.cart.length > 0){
        const cart = state.cart
        for(let i=0;i<cart.length;i++){
          result = result.concat(cart[i].goodsList)
        }
      }
      return result
    },
    settlementGoodsAmount(state,getters){
      let result = 0
      if(state.settlement){
        const settlementGoods = getters.settlementGoodsList
        for(let i=0;i<settlementGoods.length;i++){
          result += settlementGoods[i].amount
        }
      }
      return result
    },
    settlementGoodsTotalPrice(state,getters){
      if(state.settlement){
        const settlementGoods = getters.settlementGoodsList
        let total = 0
        for(let i=0,j=settlementGoods.length;i<j;i++){
          total += (settlementGoods[i].goodsPrice/100)* settlementGoods[i].amount
        }
        return total
      }else{
        return 0
      }
    },
    settlementGoodsList(state){
      let result = []
      if(state.settlement && state.settlement){
        const settlement = state.settlement
        for(let i=0;i<settlement.length;i++){
          result = result.concat(settlement[i].goodsList)
        }
      }
      return result
    }
  }
})
