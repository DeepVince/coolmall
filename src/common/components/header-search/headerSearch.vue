<template>
  <div class="header-search">
    <div class="search-wrapper clear-fix">
      <div class="logo-area">
        ZEROMALL
      </div>
      <div class="search-area">
        <div class="search-bar">
          <span class="input">
            <input type="text" v-model="searchWords" placeholder="请输入要搜素的关键字" autocomplete="false" spellcheck="false" @keyup.enter="searchGoods">
          </span><span class="search-btn" @click='searchGoods'>搜 索</span>
        </div>
        <div class="recommends">
          <span>热门搜索：</span>
          <router-link to="/">iphoneX</router-link>
          <router-link to="/">OPPO FindX</router-link>
          <router-link to="/">VIVO NEX</router-link>
        </div>
      </div>
      <div class="myCart">
        <span class="cart-span" @click="enterCart"><i class="iconfont icon-publishgoods_fill cart-icon"></i>我的购物车 <i class="cart-count">{{cartGoodsCount}}</i></span>
      </div>
      <div class="user-has-login" v-if="userHeadPortraitUrl !== ''">
        <span class="user-order">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="iconfont icon-dingdan"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>

              </el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
        <span class="user-head-pic">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="userHeadPortraitUrl" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>

              </el-dropdown-item>
              <el-dropdown-item>
                <div class="user-info-item">
                  <i class="iconfont icon-user" style="margin-right: 10px;"></i>个人信息
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="user-info-item">
                  <i class="iconfont icon-dizhi" style="margin-right: 10px;"></i>我的地址
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="user-info-item">
                  <i class="iconfont icon-shoucang" style="margin-right: 10px;"></i>我的收藏
                </div>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <div class="user-info-item btn-logout" @click="logout">
                  <i class="iconfont icon-tuichu" style="margin-right: 10px;"></i>退出登录
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
      <div class="user-login-register clear-fix" v-if="userHeadPortraitUrl === ''">
        <span class="span-login" @click="goToLogin">登录</span>
        <span class="span-register" @click="goToRegister">注册</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import dataApi from 'common/api/data'
  export default {
    data() {
      return {
        searchWords: ""
      }
    },
    methods: {
      searchGoods() {
        this.$router.push('/searchResult/' + this.searchWords+'?time='+dataApi.dateFormat(new Date()))
      },
      enterCart() {
        this.$router.push('/cart')
      },
      goToLogin() {
        this.$router.push('/login')
      },
      goToRegister(){
        this.$router.push('/register')
      },
      logout(){
        axios.get('http://localhost:8080/TTMall/userLogout',{withCredentials:true})
          .then((res) =>{
            console.log(res.data)
            this.$store.commit('setIsLogin',null)
            this.$store.commit('setUserInfo',null)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    computed: {
      userHeadPortraitUrl() {
        const userInfo = this.$store.state.userInfo
        if (userInfo !== null) {
          return userInfo.headPortraitUrl
        } else {
          return ''
        }
      },
      cartGoodsCount(){
        return this.$store.getters.cartGoodsAmount
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/css/variable.styl'
  headerHeight = 140px
  .header-search
    background-color: #fff
    box-shadow: 0 0 20px 0 #ddd
    .search-wrapper
      width: 1400px
      height: headerHeight
      margin: 0 auto
      padding-bottom: 20px
      .logo-area
        float: left
        line-height: 120px
        font-size: 36px
        font-weight: bold
        padding-left: 100px
        color: #ff4470
        img
          height: 60px
      .search-area
        float: left
        margin-left: 100px
        .search-bar
          margin-top: 38px
          span
            display: inline-block
            height: h = 44px
            line-height: h
            vertical-align: top
          .input
            width: 450px
            border: 2px solid #43e97b
            border-right: none
            border-top-left-radius: 20px
            border-bottom-left-radius: 20px
            padding: 10px 16px
            input
              display: block
              width: 100%
              height: 20px
          .search-btn
            background-image: linear-gradient(to right, #43e97b 0%, #39cca6 100%)
            color: #fff
            padding: 0 30px
            cursor: pointer
            font-size: 18px
            border-top-right-radius: 30px
            border-bottom-right-radius: 30px
            font-weight: 400
        .recommends
          margin-top: 22px
          font-size: 12px
          color: #999
          a
            margin-right: 10px
      .myCart
        float: left
        height: headerHeight
        padding: 38px 0
        margin-left: 50px
        span
          display: block
          height: 44px
          padding: 0 30px
          padding-left: 50px
          line-height: 44px
          color: #fff
          background-image: linear-gradient(to right, #43e97b 0%, #39cca6 100%)
          font-weight: 600
          border-radius: 30px
          cursor: pointer
          position: relative
          top: 0
          left: 0
          .cart-icon
            position: absolute
            top: 0
            left: 20px
            font-size: 24px
          .cart-count
            display: block
            height: h = 16px
            width: h
            line-height: h
            position: absolute
            top: 10px
            right: 10px
            background-color: #fff
            border-radius: 50%
            color: #39cca6
            text-align: center
            font-style: normal
            font-size: 12px
          &:hover
            box-shadow: 0 0 16px 0 #ddd
      .user-has-login
        height: 100%
        padding-top: 38px
        float: left
        margin-left: 80px
        .user-order
          display: inline-block
          margin-right: 40px
          position: relative
          top: -10px
          left: 0
          color: #777
          cursor: pointer
          i
            font-size: 24px
          &:hover
            color: #39cca6
        img
          width: w = 46px
          height: w
          border-radius: 50%
          box-shadow: 0 0 10px 0 #ddd
      .user-login-register
        height: 100%
        padding-top: 56px
        margin-left: 80px
        float: left
        span
          display: inline-block
          color: #777
          cursor: pointer
          &:hover
            color: #39cca6
        .span-login
          margin-right: 30px
</style>
