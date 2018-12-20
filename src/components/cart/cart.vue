<template>
  <div class="cart">
    <div class="wrapper" v-if="cartGoodsAmount > 0">
      <h2>购物车</h2>
      <div class="tab-info">
        <ul class="clear-fix">
          <li :style="{width: tabWidth[0]}">商品</li>
          <li :style="{width: tabWidth[1]}">价格</li>
          <li :style="{width: tabWidth[2]}">数量</li>
          <li :style="{width: tabWidth[3]}">小计</li>
          <li :style="{width: tabWidth[4]}">操作</li>
        </ul>
      </div>
      <div class="cart-list">
        <ul>
          <li v-for="item in goodsList" class="clear-fix" @click="goodsClick(item.goodsId)" :key="item.id">
            <div :style="{width: tabWidth[0]}" class="goods-block goods-img-and-name clear-fix">
              <img :src="item.goodsImageUrl" alt="">
              <p ref="goodsName" :title="item.goodsTitle">{{item.goodsTitle}}</p>
            </div>
            <div class="goods-block goods-price" :style="{width: tabWidth[1]}">
              <span>￥{{item.goodsPrice/100}}</span>
            </div>
            <div :style="{width: tabWidth[2]}" class="goods-block goods-count" @click.stop="">
              <goods-count :initCount="item.amount" @countChange="updateCount(item.id,$event)"></goods-count>
            </div>
            <div :style="{width: tabWidth[3]}" class="goods-block goods-subtotal">
              <span>￥{{(item.goodsPrice/100)*item.amount}}</span>
            </div>
            <div :style="{width: tabWidth[4]}" class="goods-block goods-operate">
              <i class="iconfont icon-empty" @click.stop="deleteCartGoods(item.id)"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="cart-statistic clear-fix">
        <div class="stat-wrapper">
          <div class="stat-item stat-count">
            <span class="item-key">商品数量</span><span class="item-value">x&nbsp;<em>{{cartGoodsAmount}}</em></span>
          </div>
          <div class="stat-item stat-price">
            <span class="item-key">商品总价</span><span class="item-value">￥&nbsp;<em>{{cartGoodsTotalPrice}}</em></span>
          </div>
          <div class="btn-next-operate">
            <span class="btn-shopping-continue" @click="shoppingContinue">继续购物</span><span class="btn-buy-now" @click="buyNow">去结算</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-no-goods" v-if="cartGoodsAmount <= 0">
      <div class="cart-no-goods-wrapper clear-fix">
        <div class="icon">
          <i class="iconfont icon-gouwuchekong"></i>
        </div>
        <div class="cart-no-goods-info">
          <h3>QwQ，您的购物车还没有商品哟！</h3>
          <p>赶紧去商城看看，添加喜欢的商品吧。</p>
          <div class="goUserCenter"><i class="iconfont icon-dianpu"></i>去商城逛逛</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoodsCount from 'common/components/goods-count/goodsCount'
  import store from '@/store/index'
  import axios from 'axios'
  import Vue from 'vue'

  export default {
    beforeRouteEnter(to, from, next) {
      axios.get('http://localhost:8080/TTMall/checkLoginStatus', {withCredentials: true})
        .then((res) => {
          console.log("用户的登录状态：" + res.data.status)
          // 将登录状态设置到session中
          if (!res.data.status) {
            store.commit('setUserInfo', null)
            store.commit('setIsLogin', null)
            // 终端当前导航，提示登录
            Vue.prototype.$confirm('当前未登录，登录后才能访问，是否去登录？', '确认信息', {
              distinguishCancelAndClose: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            })
              .then(() => {
                next('/login')
              })
              .catch(action => {
                next(false)
              });
          } else {
            axios.get('http://localhost:8080/TTMall/userCartGoods?userId=' + store.state.userInfo.id)
              .then((res) => {
                console.log(res)
                if (res.data.status === true) {
                  store.commit('setCart', res.data.data)
                  console.log("获取购物车商品成功！")
                } else {
                  console.log("购物车中没有商品！")
                }
              })
              .catch((err) => {
                console.log("网络故障，请检查网络后重试！")
              })
            next()
          }
          sessionStorage.setItem("isLogin", JSON.stringify(res.data.status))
        })
        .catch((err) => {
          store.commit('setUserInfo', null)
          store.commit('setIsLogin', null)
          console.log("请求异常！！！，请检查网络！")
          // 终端当前导航，提示登录
          Vue.prototype.$confirm('登录后才能访问，是否去登录？', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
              next('/login')
            })
            .catch(action => {
              next(false)
            });
        })
    },
    components: {
      GoodsCount
    },
    data() {
      return {
        tabWidth: ['560px', '150px', '150px', '150px', '108px'],
      }
    },
    methods: {
      goodsClick(goodId) {
        this.$router.push('/goodsDetail/'+goodId)
      },
      stop(e) {
        alert(2)
        e.stopPropagation()
      },
      shoppingContinue() {
        // this.$router.push('/index')
        console.log(this.$store.state.userInfo.id)
        axios.get('http://localhost:8080/TTMall/userCartGoods?userId=' + this.$store.state.userInfo.id)
          .then((res) => {
            console.log(res)
            if (res.data.status === true) {
              console.log("获取购物车商品成功！")
            } else {
              console.log("购物车中没有商品！")
            }
          })
          .catch((err) => {
            console.log("网络故障，请检查网络后重试！")
          })
        // axios.post('http://localhost:8080/TTMall/cartGoods')
      },
      deleteCartGoods(cartGoodsId) {
        console.log("cartGoodsId:" + cartGoodsId)
        axios.delete('http://localhost:8080/TTMall/cartGoods', {
          data: {
            id: cartGoodsId
          }
        })
          .then((res) => {
            if (res.data.status === true) {
              this.$message({
                type: 'success',
                message: '删除成功！',
                showClose: true,
                duration: 2000
              })
              // 获取新的购物车信息
              axios.get('http://localhost:8080/TTMall/userCartGoods?userId=' + store.state.userInfo.id)
                .then((res) => {
                  console.log(res)
                  if (res.data.status === true) {
                    store.commit('setCart', res.data.data)
                    console.log("获取购物车商品成功！")
                  } else {
                    console.log("购物车中没有商品！")
                  }
                })
                .catch((err) => {
                  console.log("网络故障，请检查网络后重试！")
                })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败！',
                showClose: true,
                duration: 2000
              })
            }
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: '连接异常，请检查网路之后重试！',
              showClose: true,
              duration: 2000
            })
            console.log(err)
          })
      },
      updateCount(id, count) {
        axios.put('http://localhost:8080/TTMall/cartGoods', {
          id: id,
          amount: count
        })
          .then((res) => {
            console.log(res)
            if(res.data.status === true){
              axios.get('http://localhost:8080/TTMall/userCartGoods?userId=' + store.state.userInfo.id)
                .then((res) => {
                  console.log(res)
                  if (res.data.status === true) {
                    store.commit('setCart', res.data.data)
                    console.log("获取购物车商品成功！")
                  } else {
                    console.log("购物车中没有商品！")
                  }
                })
                .catch((err) => {
                  console.log("网络故障，请检查网络后重试！")
                })
            }else{
              this.$message({
                type: 'error',
                message: '修改失败！'
              })
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message({
              type: 'error',
              message: '网络故障，请检查网络后重试！'
            })
          })
      },
      buyNow() {
        if(this.$store.getters.cartGoodsAmount > 0){
          this.$store.commit('setSettlement', this.$store.state.cart)
          this.$router.push('/settlement')
        }
      }
    },
    computed: {
      goodsList() {
        return this.$store.getters.cartGoodsList
      },
      cartGoodsAmount() {
        return this.$store.getters.cartGoodsTotalAmount
      },
      cartGoodsTotalPrice() {
        return this.$store.getters.cartGoodsTotalPrice
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  itemHeight = 140px
  statWidth = 260px
  nextOperateBtnMargin = 20px
  .cart
    padding: 40px 0
    font-family: 'LATO-REGULAR'
    font-size: 16px
    .wrapper
      width: $wrapper_width
      margin: 0 auto
      background-color: #fff
      padding: 0 40px
      padding-bottom: 40px
      box-shadow: 0 0 20px 0 #ddd
      h2
        padding-top: 30px
        font-size: 20px
        color: #333
      .tab-info
        margin-top: 20px
        background-color: #fafafa
        padding: 16px 0
        color: #666
        ul
          li
            float: left
            text-align: center
            font-size: 14px
          li:first-child
            text-align: left
            padding-left: 20px
      .cart-list
        ul
          padding-top: 10px
          padding-bottom: 20px
          border-bottom: 1px dashed #cccccc
          background-color: #fff
          li
            cursor: pointer
            transition: top .2s
            position: relative
            background-color: #fff
            top: 0
            left: 0
            border: 1px solid transparent
            .goods-block
              height: itemHeight
              text-align: center
              float: left
              color: #666
            .goods-img-and-name
              padding: 20px
              position: relative
              top: 0
              left: 0
              padding-left: 140px
              img
                display: block
                width: 100px
                height: h = 100px
                position: absolute
                top: tp = ((itemHeight - h) / 2)
                left: tp
              p
                width: 100%
                display: -webkit-box
                text-align: left
                margin-top: 20px
                font-family: 'lato'
                line-height: 24px
                padding-left: 40px
                overflow: hidden
                text-overflow: ellipsis
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2
            .goods-price, .goods-subtotal
              font-family: 'lato'
              line-height: itemHeight
              span
                font-size: 18px
                color: #555
            .goods-count
              padding-top: (itemHeight/ 2) - 15px
            .goods-operate
              line-height: itemHeight
              i
                font-size: 30px
                cursor: pointer
                color: #999
              i:hover
                color: $theme_color
          li:hover
            box-shadow: 0 0 20px 0 #eeeeee
            border: 1px solid $theme_second_color
            top: -5px

      .cart-statistic
        width: 100%
        padding-top: 30px
        .stat-wrapper
          float: right
          padding: 0 40px
          .stat-item
            margin-bottom: 10px
            font-size: 14px
            span
              display: inline-block
              width: (statWidth/ 2)
              color: #777
            .item-value
              text-align: right
              color: #666
              em
                font-size: 24px
                font-style: normal
                font-family: 'lato'
          .btn-next-operate
            width: statWidth
            margin-top: 30px
            span
              display: inline-block
              width: ((statWidth - nextOperateBtnMargin) / 2)
              height: h = 40px
              color: #fff
              text-align: center
              line-height: h
              border-radius: 5px
              cursor: pointer
            .btn-shopping-continue
              margin-right: nextOperateBtnMargin
              background-color: #e3e3e3
              color: #888
            .btn-shopping-continue:hover
              background-color: #d5d5d5
              color: #666
            .btn-buy-now
              background-color: $theme_second_color
            .btn-buy-now:hover
              background-color: $theme_second_deep_colo
    .cart-no-goods
      width: 1200px
      height: 500px
      background-color: #fff
      margin: 0 auto
      box-shadow: 0 0 20px 0 #ddd
      overflow: hidden
      .cart-no-goods-wrapper
        width: 1000px
        margin: 0 auto
        margin-top: 120px
        .icon
          float: left
          margin-right: 80px
          i
            font-size: 162px
            color: $theme_second_color
        .cart-no-goods-info
          float: left
          color: #666
          h3
            padding-top: 10px
            font-size: 32px
          p
            font-size: 18px
            margin-top: 50px
            color: #999
        .goUserCenter
          width: 200px
          height: h = 60px
          text-align: center
          line-height: h
          font-size: 18px
          border-radius: 5px
          margin-top: 40px
          cursor: pointer
          background-color: $theme_second_color
          color: #fff
          &:hover
            background-color: $theme_second_deep_color
          i
            margin-right: 10px
</style>
