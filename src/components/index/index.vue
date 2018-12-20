<template>
  <div class="index">
    <main-nav></main-nav>
    <div class="discount-limit-time clear-fix">
      <div class="time-area">
        <h2>限时秒杀</h2>
        <p class="eng-title">FLASH DEALS</p>
        <p><i></i></p>
        <div class="count-down">
          <p>距离本场结束还剩</p>
          <div class="last-time">
            <span class="time-block hours">00</span>&nbsp;:
            <span class="time-block minutes">20</span>&nbsp;:
            <span class="time-block seconds">30</span>
          </div>
        </div>
      </div>
      <div class="discount-list">
        <ul class="clear-fix">
          <li v-for="item in discountList" :key="item.id"  :title="item.desc">
            <div class="image-area">
              <img :src="item.imgSrc">
            </div>
            <div class="info-area">
              <p class="goods-desc">{{item.desc}}</p>
              <div class="price">
                <span class="old-price">￥{{item.oldPrice}}</span><span class="new-price">￥{{item.newPrice}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="discount-ad-area">
          <div class="top-ad">
            <img src="https://img30.360buyimg.com/da/s680x400_jfs/t12112/94/2007989304/162629/e19f8e1/5a2f8f66N0ae25659.jpg!q90!cc_340x200" alt="" class="hover-big">
          </div>
          <div class="find-more">
            <p>更多折扣等着你</p>
            <span>查看所有秒杀</span>
          </div>
        </div>
      </div>
    </div>
    <div class="fashion-style">
      <div class="fashion-style-wrapper">
        <h2>时尚潮流</h2>
        <div class="block-container clear-fix">
          <div class="left-ads">
            <img :src="indexData.fashionStyleLeftImg" alt="">
          </div>
          <div class="goods-list"></div>
          <div class="right-ads"></div>
        </div>
      </div>
    </div>
    <div class="new-phone">
      <div class="wrapper new-phone-wrapper">
        <h2>新机风尚</h2>

      </div>
    </div>
  </div>
</template>

<script>
  import MainNav from 'common/components/main-nav/mainNav'
  import GoodsItem from 'common/components/goods-item/goodsItem'
  import indexData from 'mock-data/index'

  export default {
    name: 'index',
    components: {
      MainNav,GoodsItem
    },
    created(){
    },
    data: function(){
      return {
        indexData: indexData,
        discountList: indexData.flashDealsList
      }
    },
    computed:{
      userHeadPortraitUrl(){
        return this.$store.state.user.info.headPortraitUrl
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .index
    width: 100%
    padding: 0 0 200px 0
    margin-bottom: 200px
    background-color: $background_main
    .discount-limit-time
      width: 1200px
      margin: 0 auto
      padding: 40px 0
      .time-area
        width: 200px
        height: 260px
        background: $theme_color
        text-align: center
        padding: 20px
        color: #fff
        float: left
        h2
          font-size: 32px
          margin-bottom: 16px
          margin-top: 20px
        .eng-title
          font-size: 20px
          color: rgba(252, 251, 251, 0.42)
        .count-down
          margin-top: 40px
          p
            margin-bottom: 20px
          .last-time
            margin-top: 20px
            .time-block
              display: inline-block
              width: w=36px
              height: w
              line-height: w
              background-color: #333
      .discount-list
        width: 1000px
        height: 260px
        background-color: #fff
        float: left
        font-family: 'Microsoft YaHei'
        ul
          width: 800px
          float: left
          li
            float: left
            width: 200px
            height: 260px
            cursor: pointer
            transition all 0.5s
            position: relative
            top: 0
            left: 0
            background-color: #fff
            .image-area
              width: 100%
              text-align: center
              padding: 20px
              img
                width: 140px
                height: 140px
            .info-area
              .goods-desc
                width: 80%
                margin: 0 auto
                overflow: hidden
                font-size: 12px
                line-height: 30px
                -ms-text-overflow: ellipsis
                text-overflow: ellipsis
                white-space nowrap
              .price
                width: 180px
                margin: 0 auto
                font-size: 12px
                margin-top: 10px
                span
                  display: inline-block
                  width: 90px
                  height: ph = 24px
                  line-height: ph
                  text-align: center
                .old-price
                  background-color: #efefef
                  color: #898989
                  text-decoration: line-through
                .new-price
                  background-color: $theme_color
                  color: #fff
          li:hover
            box-shadow: 0 0 12px 2px #e1dfdf
            position: relative
            top: -10px
            left: 0
            z-index: 10
        .discount-ad-area
          float: right
          width: 200px
          height: 100%
          .top-ad
            width: 100%
            height: 130px
            background-color: red
            overflow: hidden
            cursor: pointer
            img
              width: 100%
              height: 100%
          .find-more
            width: 100%
            height: 130px
            background-color: #f9f9f9
            text-align: center
            padding: 30px 20px 20px 20px
            p
              color: #afafaf
            span
              display: inline-block
              width: 120px
              height: th = 36px
              line-height: th
              background-color: $theme_color
              color: #fff
              margin-top: 20px
              cursor: pointer
              font-size: 14px
            span:hover
              background-color: #ef2d4d
    .fashion-style
      width: 100%
      .fashion-style-wrapper
        width: $wrapper_width
        margin: 0 auto
        h2
          width: 150px
          text-align: center
          font-size: 28px
          color: #666
          margin: 0 auto
          position: relative
          top: 0
          left: 0
          margin-bottom: 40px
        h2:before,h2:after
          position: absolute
          top: 14px
          display: block
          content:''
          width: 50px
          height: 3px
          background-color: #666
        h2:before
          left: -50px
        h2:after
          right: -50px
        .block-container
          width: 100%
          background-color: #fff
          .left-ads
            float: left
            width: 240px
            img
              display: block
              width: 100%

</style>
