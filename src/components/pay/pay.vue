<template>
  <div class="pay">
    <div class="pay-wrapper">
      <div class="info-block address clear-fix">
        <h2 class="block-name">配送地址</h2>
        <div class="block-body block-body-address">
          <ul class="clear-fix">
            <li class="btn-add-address">
              <i class="iconfont icon-add"></i>
              <p>添加新地址</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pay-wrapper">
      <div class="info-block goods-list clear-fix">
        <h2 class="block-name">商品清单</h2>
        <div class="block-body block-body-goods-list">
          <ul>
            <li class="clear-fix" v-for="goods in goodsList" :key="goods.id">
              <div class="goods-info-block goods-img">
                <img :src="goods.imgUrl" alt="">
              </div>
              <div class="goods-info-block goods-name">
                <p ref="goodsName">{{goods.name}}</p>
              </div>
              <div class="goods-info-block goods-price">
                ￥<span>{{goods.price}}</span>
              </div>
              <div class="goods-info-block goods-count">
                x<span>{{goods.count}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {autoVerticalCenter} from 'common/api/css'

  export default {
    data() {
      return {
        goodsList: [
          {
            id: '0',
            name: 'R15星云特别版 OPPO R15 全面屏双摄拍照手机 6G+128G 星云版 全网通 移动联通电信4G 双卡双待手机',
            imgUrl: 'http://pccnvwbyj.bkt.clouddn.com/phone-3.png',
            price: 1000,
            count: 1
          },
          {
            id: '1',
            name: 'R15星云特别版 OPPO R15 全面屏双摄拍照手机 6G+128G 星云版 全网通 移动联通电信4G 双卡双待手机',
            imgUrl: 'http://pccnvwbyj.bkt.clouddn.com/phone-2.png',
            price: 2500,
            count: 2
          }
        ]
      }
    },
    mounted() {
      console.dir(this.$refs.goodsName)
      autoVerticalCenter(this.$refs.goodsName, 80)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  goodsLiHeight = 80px
  .pay
    width: 100%
    padding: 40px 0
    font-family: 'LATO-REGULAR'
    .pay-wrapper
      width: $wrapper_width
      margin: 0 auto
      margin-bottom: 20px
      background-color: #fff
      .info-block
        padding: 40px
        color: #666
        .block-name
          width: 90px
          height: 100%
          color: #999
          margin-right: 30px
          float: left
        .block-body
          float: left
        .block-body-address
          color: #999
          ul
            li
              float: left
              padding: 30px
              border-radius: 5px
              text-align: center
              cursor: pointer
              color: #a3a3a3
              border: 1px dashed #a3a3a3
            .btn-add-address
              i
                display: block
                width: 200px
                height: h = 84px
                line-height: h
                font-size: 72px
              p
                width: 200px
                height: h = 16px
                line-height: h
                font-size: 14px
            li:hover
              border: 1px dashed #7e7e7e
              color: #7e7e7e

        .block-body-goods-list
          ul
            li
              max-width: 980px
              height: goodsLiHeight
              margin-bottom: 30px
              padding-bottom: 30px
              box-sizing: content-box
              border-bottom: 1px dashed #ddd
              .goods-info-block
                float: left
                text-align: center
              .goods-img
                margin-right: 20px
                img
                  width: w = goodsLiHeight
                  height: w
              .goods-name
                width: 420px
                text-align: left
                line-height: 24px
              .goods-price, .goods-count
                width: 230px
                line-height: goodsLiHeight
                span
                  font-size: 20px
</style>
