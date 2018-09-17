<template>
  <div class="main-nav">
    <div class="nav-wrapper">
      <div class="nav-box">
        <goods-nav></goods-nav>
      </div>
      <banner></banner>
      <div class="banner-bg"></div>
    </div>
  </div>
</template>

<script>
  import Banner from 'common/components/banner/banner'
  import GoodsNav from './goods-nav/goodsNav'

  export default {
    components: {Banner,GoodsNav}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .main-nav
    width: 100%
    height: 442px
    /*background-color: #e8e8e8*/
    background-color: #fff
    .nav-wrapper
      text-align: center
      width: 100%
      height: 100%
      position: relative
      .nav-box
        position: absolute
        top: -32px
        left: 158px
        z-index: 200
      .banner
        width: 100%
        height: 100%
        overflow: hidden
        position: relative
        top: 0
        left: 0
        ul
          padding-top: 80px
          width: 1400px
          height: 100%
          margin: 0 auto
          position: relative
          top: 0
          left: 0
          z-index: 10
          li
            width: 280px
            height: 140px
            position: absolute
            bottom: 0
            left: 0
            img
              display: block
              width: 100%
              height: 100%
          li.active-banner
            width: 840px
            height: 440px
        .banner-bg
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          background-image: url("http://pccnvwbyj.bkt.clouddn.com/banner-4.jpg")
          background-repeat: no-repeat
          background-size: 100% 100%
          filter: blur(20px)
          z-index: 9

</style>
