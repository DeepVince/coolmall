<template>
  <div class="pay">
    <div class="pay-wrapper">
      <div class="info-block address clear-fix">
        <h2 class="block-name">配送地址</h2>
        <div class="block-body block-body-address">
          <ul class="clear-fix">
            <li v-for="address in addressList" :key="address.id" @click="selectAddress(address.id)" :class="{'active-address':currentAddress.id === address.id}">
              <div class="name-phone">
                <span class="address-name">{{address.name}}</span><span class="address-phone">{{address.phone}}</span>
              </div>
              <div class="address-content">
                <p>{{address.address}}</p>
              </div>
              <div class="address-operate clear-fix">
                <span class="check-state" v-show="currentAddress.id === address.id"><i class="iconfont icon-danxuankuang"></i></span>
                <span class="edit-address"><i class="iconfont icon-editor"></i></span>
              </div>
            </li>
            <li class="btn-add-address" @click="addAddress">
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
    <div class="pay-wrapper">
      <div class="info-block electronic-invoice clear-fix">
        <h2 class="block-name">电子发票&nbsp;<i class="iconfont icon-feedback"></i></h2>
        <div class="block-body">
          <span class="invoice-type">
            <input type="radio" value="person" id="rperson" name="invoice-type">
            <i class="iconfont icon-danxuankuang"></i>
            <label for="rperson">&nbsp;&nbsp;个人</label>
          </span>
          <span class="invoice-type">
            <input type="radio" value="enterprise" id="r-enterprise" name="invoice-type">
            <label for="r-enterprise">&nbsp;&nbsp;企业</label>
          </span>
        </div>
      </div>
      <div class="info-block discount-code clear-fix">
        <h2 class="block-name">优惠券码</h2>
        <div class="block-body">
          <div class="discount-code-input-box"><input type="text"></div>
        </div>
      </div>
      <div class="info-block pay-way clear-fix">
        <h2 class="block-name">支付方式</h2>
        <div class="block-body">
          <span class="weixin-pay">
            <i class="iconfont icon-weixinzhifu"></i>&nbsp;&nbsp;微信支付
          </span>
          <span class="ali-pay">
            <i class="iconfont icon-zhifubaozhifu1"></i>&nbsp;&nbsp;支付宝支付
          </span>
          <span class="huabei-pay">
            <i class="iconfont icon-haikezhangguizhushou_huabeifenqi"></i>&nbsp;&nbsp;花呗分期
          </span>
        </div>
      </div>
      <div class="total-info">
        <div class="total-info-wrapper clear-fix">
          <div class="r-info">
            <ul>
              <li class="clear-fix">
                <span class="info-key">商品数量</span>
                <span class="info-value">x<em>9</em></span>
              </li>
              <li class="clear-fix">
                <span class="info-key">商品总额</span>
                <span class="info-value">￥<em>9800</em></span>
              </li>
              <li class="clear-fix">
                <span class="info-key">优惠金额</span>
                <span class="info-value"><i style="font-style: normal;font-size: 20px;">-</i>&nbsp;&nbsp;￥<em>200</em></span>
              </li>
              <li class="clear-fix">
                <span class="info-key">运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费</span>
                <span class="info-value">￥<em>20</em></span>
              </li>
              <li class="clear-fix">
                <span class="info-key">应付金额</span>
                <span class="info-value">￥<em>9620</em></span>
              </li>
            </ul>
            <div class="btn-pay">去支付</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {autoVerticalCenter} from 'common/api/css'
  import {autoParentHeight} from "../../common/api/css"

  export default {
    data() {
      return {
        currentAddress: {
          id: '0',
          name: 'vince',
          phone: '18000244654',
          address: '江西省南昌市昌北经济技术开发区南天阳光小区31栋2单元312'
        },
        addressList: [
          {
            id: '0',
            name: 'vince',
            phone: '18000244654',
            address: '江西省南昌市昌北经济技术开发区南天阳光小区31栋2单元312'
          },
          {
            id: '1',
            name: 'Deep David',
            phone: '18052340021',
            address: '江西省南昌市昌北经济技术开发区南天阳光小区31栋2单元312光小区31栋2单元312'
          }
        ],
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
      autoVerticalCenter(this.$refs.goodsName, 80)
    },
    methods: {
      selectAddress(id, event) {
        const e = event || window.event
        for (let i = 0; i < this.addressList.length; i++) {
          if (id === this.addressList[i].id) {
            this.currentAddress = this.addressList[i]
          }
        }
      },
      addAddress(){
        let template ;
      }
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
          position: relative
          top: 0
          left: 0
          i
            position: absolute
            top: 0
            right: 0
            cursor: pointer
            font-size: 20px
          i:hover
            color: #666
        .block-body
          max-width: 1000px
          float: left
        .block-body-address
          color: #999
          font-family: 'LATO-REGULAR', 'Microsoft YaHei'
          font-weight: bold
          ul
            li
              width: 262px
              height: 162px
              margin-right: 40px
              float: left
              box-sizing: content-box
              border-radius: 3px
              cursor: pointer
              color: #666
              border: 1px solid #ddd
              text-align: left
              margin-bottom: 20px
              .name-phone
                width: 100%
                padding: 20px
                span
                  display: inline-block
                .address-name
                  width: 50%
                .address-phone
                  width: 50%
              .address-content
                max-height: 45px
                overflow: hidden
                padding: 0 20px
                font-size: 14px
                line-height: 1.6
              .address-operate
                padding: 0 20px
                padding-top: 24px
                span
                  display: inline-block
                .check-state
                  float: left
                  i
                    font-size: 16px
                .edit-address
                  float: right
                  transition: all .5s
                  i
                    font-size: 18px
                .edit-address:hover
                  transform: scale(1.3)
            .active-address
              color: $theme_second_color
              border-color: $theme_second_color
            .btn-add-address
              text-align: center
              box-sizing: border-box
              padding: 30px
              color: c = #a3a3a3
              border: 1px dashed c
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
              border-color: $theme_second_color
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
            li:last-child
              border-bottom: none
              margin-bottom: 0
      .electronic-invoice
        .block-body
          .invoice-type
            display: inline-block
            margin-right: 60px
      .discount-code
        .block-body
          position: relative
          top: -7px
          left: 0
          .discount-code-input-box
            input
              padding: 10px
              border: 1px solid #ddd
              border-radius: 3px
          .discount-code-input-box input:focus
            border: 1px solid $theme_second_color
      .pay-way
        .block-body
          position: relative
          top: -12px
          left: 0
          span
            display: inline-block
            border-radius: 5px
            padding: 16px 30px
            padding-left: 40px
            border: 1px solid transparent
            color: #666
            cursor: pointer
            margin-right: 30px
            font-size: 14px
            position: relative
            top: 0
            left: 0
            i
              position: absolute
              top: 10px
              left: 18px
              font-size: 24px
          .ali-pay, .huabei-pay
            color: #25abee
            border: 1px solid transparent
          .ali-pay:hover, .huabei-pay:hover
            color: c1 = #25abee
            border: 1px solid c1
          .weixin-pay
            color: #41b035
            border: 1px solid transparent
          .weixin-pay:hover
            color: c2 = #41b035
            border: 1px solid c2
      .total-info
        padding: 0 40px
        .total-info-wrapper
          width: 100%
          border-top: 1px dashed #ddd
          padding: 20px 0
          padding-top: 30px
          .r-info
            float: right
            padding: 0 20px
            ul
              li
                margin-bottom: 10px
                line-height: 20px
                color: #666
                span
                  display: inline-block
                .info-key
                  width: 100px
                  overflow: hidden
                  float: left
                  text-align: left
                .info-value
                  width: 140px
                  overflow: hidden
                  float: right
                  text-align: right
                  font-size: 14px
                  em
                    font-style: normal
                    font-family: 'lato'
                    font-size: 20px
                    font-weight: lighter
            .btn-pay
              width: 100%
              padding: 14px
              margin-top: 30px
              text-align: center
              color: #fff
              border-radius: 5px
              background-color: $theme_second_color
              cursor: pointer
            .btn-pay:hover
              background-color: $theme_second_deep_color
</style>
