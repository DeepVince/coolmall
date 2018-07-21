<template>
  <div class="goods-detail">
    <div class="wrap clear-fix">
      <div class="pictures">
        <div class="current-display">
          <div class="display-wrapper clear-fix" ref="bigPic">
            <img v-for='item in picList' :src="item.url" alt="">
          </div>
        </div>
        <div class="small-pics clear-fix">
          <div class="pics-bar">
            <div class="current-tag" ref="scrollBar"><i class="iconfont icon-play_fill"></i></div>
          </div>
          <ul class="clear-fix" @click='selectSmallPic' ref="smallPics">
            <li v-for="(item,index) in picList" :key="item.id"><img :src="item.url" alt="" :data-index="index"></li>
          </ul>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <h2>【R15星云特别版】OPPO R15 全面屏双摄拍照手机 6G+128G 星云版 全网通 移动联通电信4G 双卡双待手机</h2>
          <div class="sub-title">渐变玻璃机身，星云定制耳机，6+128GB。</div>
        </div>
        <div class="price">￥ <span class="price-count">2699.00 - 3999.00</span></div>
        <div class="goods-props">
          <div class="props-item">
            <h4>颜色</h4>
            <div class="prop-desc">
              <ul class="clear-fix">
                <li class="prop-selected">热力红</li>
                <li>星空紫</li>
                <li>雪莹白</li>
                <li>梦境红</li>
                <li>陶瓷黑</li>
                <li>梦境紫</li>
                <li>星云特别版</li>
                <li>星云特别版（礼盒装）</li>
              </ul>
            </div>
          </div>
          <div class="props-item">
            <h4>网络</h4>
            <div class="prop-desc">
              <ul class="clear-fix">
                <li>中国移动</li>
                <li>中国电信</li>
                <li>中国联通</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="goods-count">
          <span class="count-label">数量</span>
          <goods-count ref="count" class="comp-count" maxV="5" minV="1" cWidth="100px" cHeight="40px"></goods-count>
        </div>
        <div class="operates">
          <span class="op-btn btn-add-to-cart" @click="a">加入购物车 <i class="iconfont icon-publishgoods_fill" style="font-size: 18px;"></i></span>
          <span class="op-btn btn-buy-now">立刻购买 <i class="iconfont icon-zhixiangyou"></i></span>
        </div>
      </div>
    </div>
    <div class="wrap goods-all-info">
      <div class="tabs">
        <ul class="clear-fix">
          <li>
            <router-link to="#">商品描述</router-link>
          </li>
          <li>
            <router-link to="#">参数配置</router-link>
          </li>
          <li>
            <router-link to="#">用户评价</router-link>
          </li>
        </ul>
      </div>
      <div class="current-comp">
        <component :is="currentComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import GoodsCount from 'common/components/goods-count/goodsCount'
  import picData from 'mock-data/goodsDetail'
  import ImageTextInfo from 'components/goods-detail/imageTextInfo/imageTextInfo'
  import SpecParameter from 'components/goods-detail/specParameter/specParameter'

  export default {
    data() {
      return {
        picList: picData.picList,
        currentComponent: SpecParameter
      }
    },
    methods: {
      a() {
        alert(this.$refs.count.value)
      },
      selectSmallPic(event) {
        const e = event || window.event
        // 获取当前点击图片的索引,从而计算大图片的显示和游标滑动
        const index = e.target.attributes['data-index'].nodeValue

        // 更新大图片和滑块位置
        this.$refs.bigPic.style.left = (-560 * index) + 'px'
        this.$refs.scrollBar.style.left = (100 * index) + 'px'

        // 高亮当前小图片，模糊其他小图片
        const list = this.$refs.smallPics.children
        for (let i = 0; i < list.length; i++) {
          list[i].style.opacity = 0.3
        }
        list[index].style.opacity = 1
      }
    },
    components: {
      GoodsCount,ImageTextInfo,SpecParameter
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .goods-detail
    width: 100%
    margin: 30px 0
    .wrap
      width: $wrapper_width
      margin: 0 auto
      background-color: #fff
      margin-bottom: 40px
      .pictures
        padding: 20px
        float: left
        .current-display
          width: 560px
          overflow: hidden
          .display-wrapper
            width: 400%
            position: relative
            top: 0
            left: 0
            transition: left 0.5s
            img
              display: block
              width: w = 560px
              height: w
              float: left
        .small-pics
          width: 380px
          margin: 0 auto
          margin-top: 20px
          .pics-bar
            width: 100%
            height: 3px
            background-color: #eee
            border-radius: 2px
            margin-bottom: 20px
            .current-tag
              width: 80px
              height: 100%
              background-color: $theme_second_color
              border-radius: 2px
              position: relative
              top: 0
              left: 0
              transition: left 0.5s
              i
                position: absolute
                top: -4px
                left: 30px
                transform: rotateZ(90deg)
                color: $theme_second_color

          ul
            float: left
            li
              float: left
              margin-right: 20px
              opacity: 0.3
              cursor: pointer
              img
                width: w = 80px
                height: w
            li:last-child
              margin: 0
            li:first-child
              opacity: 1
            li:hover
              opacity: 1
      .info
        width: 600px
        float: left
        padding: 30px 50px
        font-family: 'Microsoft YaHei'
        .title
          h2
            font-size: 22px
            font-weight: lighter
            line-height: 32px
          .sub-title
            margin: 20px 0
            font-size: 14px
            color: #f79427
        .price
          color: $theme_color
          font-size: 20px
          .price-count
            font-size: 28px
        .goods-props
          margin-top: 20px
          .props-item
            h4
              color: #999
              font-weight: bold
            .prop-desc
              margin-top: 20px
              ul
                li
                  float: left
                  width: 230px
                  height: h = 40px
                  text-align: center
                  line-height: h
                  border: 1px solid #ddd
                  border-radius: 5px
                  margin-bottom: 20px
                  color: #666
                  cursor: pointer
                  margin-right: 20px
                li:hover
                  border: 1px solid $theme_color
                  color: $theme_color
                .prop-selected
                  border-color: $theme_color
                  color: $theme_color
        .goods-count
          margin-top: 20px
          .count-label
            display: inline-block
            color: #999
            font-weight: bold
            margin-right: 30px
          .comp-count
            display: inline-block
        .operates
          margin-top: 40px
          .op-btn
            display: inline-block
            width: 120px
            height: h = 40px
            line-height: h
            text-align: center
            color: #fff
            border-radius: 5px
            cursor: pointer
          .btn-add-to-cart
            background-color: #05b570
            margin-right: 20px
          .btn-add-to-cart:hover
            background-color: #049059
          .btn-buy-now
            background-color: $theme_color
          .btn-buy-now:hover
            background-color: #dd2946

    .goods-all-info
      padding: 20px
      .tabs
        width: 100%
        ul
          li
            float: left
            margin-right: 30px

</style>
