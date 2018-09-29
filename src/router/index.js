import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index/index'
import GoodsDetail from 'components/goods-detail/goodsDetail'
import Cart from 'components/cart/cart'
import Pay from 'components/pay/pay'
import SearchResult from 'components/search-result/searchResult'
import Login from 'components/login/login'
import Register from 'components/register/register'

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
      path: '/searchResult',
      name:'searchResult',
      component: SearchResult
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
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path:'/login',
      name:'login',
      component: Login
    },,
    {
      path:'/register',
      name:'register',
      component: Register
    },

  ]
})
