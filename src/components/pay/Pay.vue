<template>
  <div class="pay">
    <div class="pay-wrapper" v-if="tradeInfo.trade && !hasPay">
      <div class="last-time">
        <span class="time-icon"><i class="iconfont icon-dingdanxiangqing-chuangjianshijian"></i></span>
        <div class="info">
          <h3>订单已提交，等待付款：￥{{tradeInfo.trade.amountOfMoney}}<span class="time"></span></h3>
          <p>48小时内未支付将自动取消订单，请尽快完成支付！</p>
        </div>
      </div>
      <div class="pay-order clear-fix">
        <h3>订单详情</h3>
        <div class="order-list">
          <ul>
            <li class="clear-fix" v-for="store in tradeInfo.settlementInfo.orderGoods">
              <!--<did class="store-info clear-fix">-->
              <!--<p class="store-name">天天OPPO官方旗舰店</p>-->
              <!--<p class="order-id">9f6e84abac8e4e44b828653ad2afaeb0</p>-->
              <!--</did>-->
              <div class=" store-info clear-fix">
                <p class="store-name"><i class="iconfont icon-dianpu"></i>{{store.storeName}}</p>
                <p class="order-id"><i class="iconfont icon-dingdan"></i>{{store.orderId}}</p>
              </div>
              <ul>
                <li class="goods-info clear-fix" v-for="goods in store.goodsList">
                  <div class="goods-img">
                    <img :src="goods.goodsImageUrl" alt="">
                  </div>
                  <p class="goods-name">{{goods.goodsTitle}}</p>
                  <p class="goods-amount">x{{goods.amount}}</p>
                  <p class="goods-price">￥{{goods.amount*(goods.goodsPrice/100)}}</p>
                </li>
              </ul>
            </li>
          </ul>
          <div class="address clear-fix">
            <h4><i class="iconfont icon-coordinates"></i>配送地址</h4>
            <p class="clear-fix">
              <span class="address-info">{{address}}</span>
              <span class="address-phone">{{this.tradeInfo.settlementInfo.address.contactPhone}}</span>
              <span class="address-user-name">{{this.tradeInfo.settlementInfo.address.contactName}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="pay-way clear-fix">
        <h3>支付方式</h3>
        <div class="pay-way-list">
          <ul class="clear-fix">
            <li :class="{selected:currentPayWay === 0}">
              <i class="iconfont icon-zhifubao_icon" style="color: #00a2eb"></i>支付宝
              <span class="checked-tips" v-if="currentPayWay === 0">
                <i class="iconfont icon-duigou2"></i>
              </span>
            </li>
            <li><i class="iconfont icon-weixinzhifu" style="color: #00c800;"></i>微信支付</li>
            <li><i class="iconfont icon-haikezhangguizhushou_huabeifenqi" style="color: #00a2eb"></i>蚂蚁花呗</li>
          </ul>
        </div>
      </div>
      <div class="qrcode">
        <img :src="qrCodeBase64" alt="支付二维码生成失败！" v-if="qrCodeBase64 !== ''">
        <p class="qrcode-desc">打开手机App<br>扫一扫付款</p>
      </div>
      <!--<img :src=url v-if="url !== ''">-->
    </div>
    <div class="pay-success" v-if="hasPay">
      <div class="pay-success-wrapper">
        <div class="icon">
          <i class="iconfont icon-wanchengshoukuan"></i>
        </div>
        <div class="success-info">
          <h3>恭喜你，订单支付完成！</h3>
          <p>在个人中心可以查看订单状态，10秒后自动返回首页。</p>
          <div class="goUserCenter"><i class="iconfont icon-user"></i>去个人中心</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import axios from 'axios'
  import {Message} from 'element-ui'

  export default {
    beforeRouteEnter(to, from, next) {
      axios.get("http://localhost:8080/TTMall/checkHasTrade", {withCredentials: true})
        .then((res) => {
          console.log("trade:")
          console.log(res)
          if (res.data.status === true) {
            next(vm => {
              vm.tradeInfo = res.data.data
              axios.get("http://localhost:8080/TTMall/pay?tradeId=" + vm.tradeInfo.trade.id)
                .then((res) => {
                  if (res.data.status === true) {
                    console.log(res.data.info)
                    vm.qrCodeBase64 = res.data.data
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            })
          } else {
            Message.error({
              message: '当前无可交易项!'
            })
            next(false)
          }
        })
        .catch((err) => {
          next(false)
          Message.error({
            message: '连接错误，请检查网络!'
          })
          console.log(err)
        })
    },
    beforeRouteLeave(to, from, next) {
      if (!this.hasPay) {
        this.$confirm('当前交易未完成支付，确认离开？', '确认信息', {
          distinguishCancelAndClose: true,
          closeOnHashChange: false,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            clearInterval(this.queryPayStatusTimer)
            // 设置交易状态为已取消，清除session中交易信息
            axios.get('http://localhost:8080/TTMall/cancelTrade?tradeId=' + this.tradeInfo.trade.id)
              .then((res) => {
                if(res.data.status === true){
                  next()
                }else{
                  next(false)

                }
              })
              .catch((err) => {
                next(false)
              })

          })
          .catch((action) => {
            next(false)
          })
      } else {
        next()
      }
    },
    created() {
      // 轮询支付状态
      this.queryPayStatusTimer = setInterval(() => {
        if (this.tradeInfo) {
          axios.get('http://localhost:8080/TTMall/queryPayStatus?tradeId=' + this.tradeInfo.trade.id)
            .then((res) => {
              console.log(res)
              if (res.data.status === true) {
                clearInterval(this.queryPayStatusTimer)
                this.hasPay = true
                this.$message({
                  type: 'success',
                  message: '支付成功！'
                })
                setTimeout(() => {
                  this.$router.push('/index')
                }, 10000)
                // 清除session
                axios.get('http://localhost:8080/TTMall/tradeSuccess?tradeId=' + this.tradeInfo.trade.id, {withCredentials: true})
                  .then((res) => {
                    if (res.data.status === true) {
                      console.log("session清除成功")
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }, 1000)
    },
    data() {
      return {
        tradeInfo: {},
        currentPayWay: 0,
        hasPay: false,
        qrCodeBase64: '',
        queryPayStatusTimer: {}
      }
    },
    computed: {
      address() {
        const address = this.tradeInfo.settlementInfo.address
        return address.province + address.city + address.county + address.detail
      },
      ...mapState({
        url: state => state.pay.qrCodeBase64
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .pay
    padding: 40px 0
    font-family: 'lato'
    .pay-wrapper
      width: 1200px
      padding-bottom: 40px
      margin: 0 auto
      background-color: #fff
      box-shadow: 0 0 20px 0 #ddd
      .last-time
        width: 88%
        margin: 0 auto
        padding-top: 60px
        padding-bottom: 30px
        padding-left: 140px
        position: relative
        top: 0
        left: 0
        .time-icon
          position: absolute
          top: 48px
          left: 0
          i
            font-size: 96px
            color: $theme_second_color
        .info
          h3
            font-size: 28px
            color: #555
          p
            margin-top: 28px
            color: #777
      .pay-order
        width: 88%
        margin: 0 auto
        margin-top: 10px
        margin-bottom: 30px
        padding: 30px 0
        border-top: 1px dashed #ddd
        border-bottom: 1px dashed #ddd
        h3
          width: 140px
          float: left
          font-size: 18px
          color: #666
        .order-list
          float: left
          ul
            li
              width: 100%
              color: #666
              margin-bottom: 30px
              .store-info
                width: 100%
                margin-bottom: 30px
                .store-name
                  display: block
                  float: left
                  i
                    font-size: 18px
                    margin-right: 10px
                .order-id
                  display: block
                  float: right
                  i
                    margin-right: 10px
              ul
                .goods-info
                  margin: 0 auto
                  padding: 0 20px
                  margin-bottom: 30px
                  .goods-img
                    float: left
                    img
                      width: w = 60px
                      height: w
                  .goods-name
                    float: left
                    margin: 0 20px
                    font-size: 14px
                    color: #777
                    line-height: 26px
                    width: 400px
                  .goods-amount
                    float: left
                    width: 100px
                    height: 100%
                    text-align: center
                    font-size: 20px
                    font-family: 'lato'
                    font-weight: 200
                    margin-left: 40px
                    line-height: 60px
                  .goods-price
                    float: left
                    width: 160px
                    text-align: center
                    height: 100%
                    font-size: 20px
                    margin-left: 40px
                    font-weight: 200
                    line-height: 60px
          .address
            margin-top: 50px
            line-height: 48px
            color: #666
            h4
              width: 14%
              height: 48px
              float: left
              padding-left: 30px
              color: #666
              position: relative
              top: 0
              left: -2px
              i
                font-size: 24px
                color: $theme_second_color
                margin-right: 10px
                position: absolute
                top: 0
                left: 0
            p
              width: 86%
              float: left
              font-size: 16px
              .address-info
                float: left
                width: 68%
              .address-phone, .address-user-name
                text-align: center
                width: 16%
                float: right
      .pay-way
        width: 88%
        margin: 0 auto
        padding-bottom: 30px
        border-bottom: 1px dashed #ddd
        h3
          width: 140px
          float: left
          line-height: 38px
          font-size: 18px
          color: #666
        .pay-way-list
          float: left
          ul
            li
              width: 160px
              text-align: center
              float: left
              color: #666
              border: 1px solid #ddd
              padding: 8px 0
              cursor: pointer
              border-radius: 3px
              margin-right: 60px
              position: relative
              top: 0
              left: 0
              i
                font-size: 20px
                margin-right: 12px
              &:hover
                border: 1px solid $theme_second_color
              &.selected
                border: 1px solid $theme_second_color
              .checked-tips
                position: absolute
                bottom: -1px
                right: -13px
                i
                  color: $theme_second_color
      .qrcode
        width: 100%
        padding-top: 30px
        text-align: center
        font-size: 14px
        color: #999
        img
          width: w = 140px
          height: w
        p
          margin-top: 10px

    .pay-success
      width: 1200px
      height: 500px
      background-color: #fff
      margin: 0 auto
      box-shadow: 0 0 20px 0 #ddd
      overflow: hidden
      .pay-success-wrapper
        width: 800px
        margin: 0 auto
        margin-top: 160px
        .icon
          float: left
          margin-right: 80px
          i
            font-size: 162px
            color: $theme_second_color
        .success-info
          float: left
          color: #666
          h3
            padding-top: 20px
            font-size: 42px
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

  /*img*/
  /*width: 160px*/
  /*height: 160px*/
</style>
