import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index/index'
import GoodsDetail from 'components/goods-detail/goodsDetail'
import Cart from 'components/cart/cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: GoodsDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})
