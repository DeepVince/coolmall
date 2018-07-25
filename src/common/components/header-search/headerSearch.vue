<template>
  <div class="header-search">
    <div class="search-wrapper clear-fix">
      <div class="logo-area">
        ZEROMALL
      </div>
      <div class="search-area">
        <div class="search-bar">
          <span class="input">
            <input type="text" placeholder="请输入要搜素的关键字" autocomplete="false" spellcheck="false">
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
        <span class="cart-span" @click="enterCart"><i class="iconfont icon-publishgoods_fill cart-icon"></i>我的购物车 <i class="cart-count">1</i></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      searchGoods() {
        this.$router.push('goodsDetail')
      },
      enterCart(){
        this.$router.push('cart')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/css/variable.styl'
  headerHeight = 120px
  .header-search
    background-color: #fff
    .search-wrapper
      width: 1200px
      height: headerHeight
      margin: 0 auto
      .logo-area
        float: left
        line-height: headerHeight
        font-size: 36px
        font-weight: bold
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
            width: 500px
            border: 2px solid $theme_color
            padding: 10px 10px
            input
              display: block
              width: 100%
              height: 20px
          .search-btn
            background-color: $theme_color
            color: #fff
            padding: 0 30px
            cursor: pointer
            font-size: 18px
            font-weight: 400
        .recommends
          margin-top: 15px
          font-size: 12px
          color: $theme_color
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
          border: 2px solid $theme_color
          color: $theme_color
          font-weight: 600
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
            background-color: $theme_color
            border-radius: 50%
            color: #fff
            text-align: center
            font-style: normal
            font-size: 12px
        span:hover
          background-color: $theme_color
          color: #fff
          .cart-count
            background-color: #fff
            color: $theme_color

</style>
