<template>
  <div class="cart">
    <div class="wrapper">
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
          <li v-for="item in goodsList" class="clear-fix" @click="goodsClick" :key="item.id">
            <div :style="{width: tabWidth[0]}" class="goods-block goods-img-and-name clear-fix">
              <img :src="item.imgUrl" alt="">
              <p ref="goodsName" :title="item.name">{{item.name}}</p>
            </div>
            <div class="goods-block goods-price" :style="{width: tabWidth[1]}">
              <span>￥{{item.price}}</span>
            </div>
            <div :style="{width: tabWidth[2]}" class="goods-block goods-count" @click.stop="">
              <goods-count></goods-count>
            </div>
            <div :style="{width: tabWidth[3]}" class="goods-block goods-subtotal">
              <span>￥{{item.price*item.count}}</span>
            </div>
            <div :style="{width: tabWidth[4]}" class="goods-block goods-operate">
              <i class="iconfont icon-empty" @click.stop=""></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="cart-statistic clear-fix">
        <div class="stat-wrapper">
          <div class="stat-item stat-count">
            <span class="item-key">商品数量</span><span class="item-value">x&nbsp;<em>{{this.getGoodsCount()}}</em></span>
          </div>
          <div class="stat-item stat-price">
            <span class="item-key">商品总价</span><span class="item-value">￥&nbsp;<em>{{this.getTotalPrice()}}</em></span>
          </div>
          <div class="btn-next-operate">
            <span class="btn-shopping-continue" @click="shoppingContinue">继续购物</span><span class="btn-buy-now" @click="buyNow">去结算</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoodsCount from 'common/components/goods-count/goodsCount'

  export default {
    components: {
      GoodsCount
    },
    data() {
      return {
        tabWidth: ['560px', '150px', '150px', '150px', '108px'],
        goodsList: [
          {
            id: 0,
            name: 'R15星云特别版 OPPO R15 全面屏双摄拍照手机 6G+128G 星云版 全网通 移动联通电信4G 双卡双待手机',
            imgUrl: 'http://pccnvwbyj.bkt.clouddn.com/phone-1.png',
            count: 1,
            price: 3500
          },
          {
            id: 2,
            name: 'R15星云特别版 OPPO R15 全面屏双摄拍照手机 6G+128G 星云版 全网通 移动联通电信4G 双卡双待手机',
            imgUrl: 'http://pccnvwbyj.bkt.clouddn.com/phone-3.png',
            count: 1,
            price: 2700
          },
          {
            id: 3,
            name: 'R15星云特别版 OPPO R15 全面屏双摄拍照手机 6G+128G 星云版 全网通 移动联通电信4G 双卡双待手机',
            imgUrl: 'http://pccnvwbyj.bkt.clouddn.com/phone-4.png',
            count: 1,
            price: 2100
          }
        ]
      }
    },
    methods: {
      adjustCss() {
        const top = this.$refs.goodsName[0].offsetHeight
        console.dir(this.$refs.goodsName)
        this.$refs.goodsName[0].style.marginTop = (100 - parseInt(top)) / 2 + 'px'
      },
      goodsClick() {
        alert(1)
      },
      stop(e) {
        alert(2)
        e.stopPropagation()
      },
      getGoodsCount() {
        let count = 0
        for (let i = 0; i < this.goodsList.length; i++) {
          count += this.goodsList[i].count
        }
        return count
      },
      getTotalPrice() {
        let price = 0
        for (let i = 0; i < this.goodsList.length; i++) {
          price += this.goodsList[i].count * this.goodsList[i].price
        }
        return price
      },
      shoppingContinue(){
        this.$router.push('/index')
      },
      buyNow(){
        this.$router.push('/pay')
      }
    },
    mounted() {
      this.adjustCss()
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
                color: $theme_color
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
              width: (statWidth/2)
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
              width: ((statWidth - nextOperateBtnMargin)/2)
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
              background-color: $theme_second_deep_color
</style>
