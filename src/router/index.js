import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index/index'
import GoodsDetail from 'components/goods-detail/goodsDetail'
import Cart from 'components/cart/cart'
import Settlement from 'components/settlement/settlement'
import Pay from 'components/pay/pay'
import SearchResult from 'components/search-result/searchResult'
import Login from 'components/login/login'
import Register from 'components/register/register'
import axios from 'axios'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
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
      path: '/searchResult/:id',
      name: 'searchResult',
      component: SearchResult
    },
    {
      path: '/goodsDetail/:goodsId',
      name: 'goodsDetail',
      component: GoodsDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/settlement',
      name: 'settlement',
      component: Settlement
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },

  ]
})

router.beforeEach((to, from, next) => {
  axios.get('http://localhost:8080/TTMall/checkLoginStatus',{withCredentials: true})
    .then((res) => {
      console.log(res)
      if (res.data.status === true) {
        store.commit('userLogin',res.data.data)
      }else{
        store.commit('userLogout')
      }
    })
    .catch((err) => {
      console.log('网络异常，请检查网络！！！')
    })
  next()
})
export default router


