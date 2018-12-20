<template>
  <div class="goods-detail">
    <div class="top-block">
      <div class="wrap clear-fix">
        <crumbs-nav></crumbs-nav>
        <div class="pictures">
          <div class="current-display">
            <div class="display-wrapper clear-fix" ref="bigPic">
              <img v-for='item in goodsInfo.images' :src="item.url" alt="">
            </div>
          </div>
          <div class="small-pics clear-fix">
            <indicator unitWidth="80px" count='4' unitMargin="20px" ref="picIndicator"></indicator>
            <ul class="clear-fix" @click='selectSmallPic' ref="smallPics">
              <li v-for="(item,index) in goodsInfo.images" :key="item.id"><img :src="item.url" alt="" :data-index="index"></li>
            </ul>
          </div>
        </div>
        <div class="info" v-if="goodsInfo.base">
          <div class="title">
            <h2>{{goodsInfo.base.title}}</h2>
            <div class="sub-title">{{goodsInfo.base.subtitle}}</div>
          </div>
          <div class="price">￥ <span class="price-count">{{goodsInfo.base.price/100}}</span></div>
          <div class="goods-props" v-if="goodsInfo.goodsList">
            <div class="props-item">
              <h4>版本型号</h4>
              <div class="prop-desc">
                <ul class="clear-fix">
                  <li v-for="config in goodsInfo.goodsList"
                      :class="{'prop-selected':config.goodsId === goodsInfo.base.id}"
                      @click="goOtherGoods(config.goodsId)">
                    {{config.configuration}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="goods-inventory">
            <span class="inventory-label">库存</span>
            <span class="inventory">{{goodsInfo.base.inventory}}</span>
          </div>
          <div class="goods-count">
            <span class="count-label">数量</span>
            <goods-count ref="count"
                         class="comp-count"
                         maxV="5" minV="1"
                         cWidth="100px"
                         cHeight="40px"
                         initCount="1"></goods-count>
          </div>
          <div class="operates">
            <span class="op-btn btn-add-to-cart" @click="addToCart">加入购物车 <i class="iconfont icon-gouwuche" style="font-size: 20px;"></i></span>
            <span class="op-btn btn-buy-now">立刻购买</span>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap goods-all-info">
      <div class="tabs clear-fix" ref="tabs">
        <ul class="clear-fix" ref="tabUl">
          <li class="select-none" @click="tabDescImages">商品描述</li>
          <li class="select-none" @click="tabParameters">参数配置</li>
          <li class="select-none" @click="tabComments">用户评价</li>
        </ul>
        <indicator unitWidth="72px" unitMargin='60px' count='3' up="true" ref="indicator"></indicator>
      </div>
      <div class="current-comp">
        <component :is="currentComponent" :comp-data="currentData"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import GoodsCount from 'common/components/goods-count/goodsCount'
  import allData from 'mock-data/goodsDetail'
  import ImageTextInfo from 'components/goods-detail/imageTextInfo/imageTextInfo'
  import SpecParameter from 'components/goods-detail/specParameter/specParameter'
  import CommentsList from 'components/goods-detail/commentsList/commentsList'
  import Indicator from 'common/components/indicator/indicator'
  import CrumbsNav from 'common/components/crumbsNav/crumbsNav'
  import axios from 'axios'
  import {Message} from 'element-ui'

  export default {
    beforeRouteEnter(to, from, next) {
      const id = to.params.goodsId
      axios.get('http://localhost:8080/TTMall/goodsDetail?id=' + id)
        .then((res) => {
          console.log(res)
          if (res.data.status === true) {
            next(vm => {
              vm.$nextTick(function () {
                this.goodsInfo = res.data.data
                this.currentData = res.data.data.descImages
              })
            })
          } else {
            next(false)
            Message.error("不存在该商品！")
          }
        })
        .catch((err) => {
          next(false)
        })
    },
    beforeRouteUpdate(to, from, next) {
      const id = to.params.goodsId
      axios.get('http://localhost:8080/TTMall/goodsDetail?id=' + id)
        .then((res) => {
          console.log(res)
          if (res.data.status === true) {
            this.goodsInfo = res.data.data
            this.currentData = res.data.data.descImages
            next()
          } else {
            next(false)
            Message.error("不存在该商品！")
          }
        })
        .catch((err) => {
          next(false)
        })
    },
    components: {
      GoodsCount, ImageTextInfo, SpecParameter, CommentsList, Indicator, CrumbsNav
    },
    data() {
      return {
        picList: allData.picList,
        goodsInfo: {},
        currentComponent: ImageTextInfo,
        currentData: [],
      }
    },
    methods: {
      addToCart() {
        if (!this.$store.state.userInfo) {
          // 终端当前导航，提示登录
          this.$confirm('当前未登录，登录后才能添加到购物车，是否去登录？', '确认信息', {
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
        }
        const goodsId = this.goodsInfo.base.id
        const amount = this.$refs.count.count
        const userId = this.$store.state.userInfo.id
        console.log("count:" + amount)
        axios.post('http://localhost:8080/TTMall/cartGoods', {
          goods_id: goodsId,
          user_id: userId,
          amount: amount
        })
          .then((res) => {
            if (res.data.status === true) {
              Message.success('添加成功！')
              // 获取新的购物车信息
              axios.get('http://localhost:8080/TTMall/userCartGoods?userId=' + userId)
                .then((res) => {
                  console.log(res)
                  if (res.data.status === true) {
                    this.$store.commit('setCart', res.data.data)
                    console.log("获取购物车商品成功！")
                  } else {
                    console.log("购物车中没有商品！")
                  }
                })
                .catch((err) => {
                  console.log("网络故障，请检查网络后重试！")
                })
            } else {
              Message.error('添加失败！')
            }
          })
          .catch((err) => {
            Message.error('连接故障！请检查网络后重试！')
            console.log(err)
          })
      },
      tabDescImages(event) {
        this.currentComponent = ImageTextInfo
        this.currentData = this.goodsInfo.descImages
        this.$refs.indicator.selectTag(0)
        const tabLiList = this.$refs.tabs.children[0].children
        for (let i = 0; i < tabLiList.length; i++) {
          tabLiList[i].style.color = '#666'
        }
        event.currentTarget.style.color = '#05b570'
      },
      tabParameters(event) {
        this.currentComponent = SpecParameter
        this.currentData = this.goodsInfo.propDesc
        this.$refs.indicator.selectTag(1)
        const tabLiList = this.$refs.tabs.children[0].children
        for (let i = 0; i < tabLiList.length; i++) {
          tabLiList[i].style.color = '#666'
        }
        event.currentTarget.style.color = '#05b570'
      },
      tabComments(event) {
        this.currentComponent = CommentsList
        this.currentData = this.goodsInfo.comments
        this.$refs.indicator.selectTag(2)
        const tabLiList = this.$refs.tabs.children[0].children
        for (let i = 0; i < tabLiList.length; i++) {
          tabLiList[i].style.color = '#666'
        }
        event.currentTarget.style.color = '#05b570'
      },
      // 切换Tab方法
      switchTab(event) {
        const e = event || window.event
        console.log(e.target)
        const tabLiList = this.$refs.tabs.children[0].children
        for (let i = 0; i < tabLiList.length; i++) {
          tabLiList[i].style.color = '#666'
          if (e.target === tabLiList[i]) {
            this.currentComponent = this.tabComponentList[i].component
            this.currentData = this.tabComponentList[i].data
            this.$refs.indicator.selectTag(i)
            tabLiList[i].style.color = '#05b570'
          }
        }
      },
      selectSmallPic(event) {
        const e = event || window.event
        let index = 0
        // 获取当前点击图片的索引,从而计算大图片的显示和游标滑动
        if (e.target.tagName === 'IMG') {
          index = e.target.attributes['data-index'].nodeValue
        } else {
          return
        }

        // 更新大图片和滑块位置
        this.$refs.bigPic.style.left = (-560 * index) + 'px'
        this.$refs.picIndicator.selectTag(index)
        // 高亮当前小图片，模糊其他小图片
        const list = this.$refs.smallPics.children
        for (let i = 0; i < list.length; i++) {
          list[i].style.opacity = 0.3
        }
        list[index].style.opacity = 1
      },
      goOtherGoods(goodsId) {

        this.$router.push('/goodsDetail/' + goodsId)

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .wrap
    width: $wrapper_width
    margin: 0 auto
    background-color: #fff
    margin-bottom: 40px

  .goods-detail
    width: 100%
    margin: 30px 0
    margin-top: 0
    .top-block
      width: 100%
      background-color: #fff
      .wrap
        .pictures
          padding: 20px 0
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
            margin-top: 60px
            position: relative
            top: 0
            left: 0
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
          width: 640px
          float: left
          padding: 20px 70px
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
            margin-top: 30px
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
                    height: h = 48px
                    text-align: center
                    line-height: h
                    margin-bottom: 20px
                    border-radius: 3px
                    background-color: #fcfcfc
                    font-size: 14px
                    color: #666
                    cursor: pointer
                    margin-right: 20px
                  li:hover
                    color: $theme_second_color
                    background-color: #fff
                    box-shadow: 0 0 16px 0 #eee
                  .prop-selected
                    color: $theme_second_color
                    background-color: #fff
                    box-shadow: 0 0 16px 0 #eee
          .goods-inventory
            margin: 20px 0
            .inventory-label
              margin-right: 30px
              color: #999
              font-weight: bold
            .inventory
              color: #666
          .goods-count
            margin-top: 30px
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
              width: 180px
              height: h = 60px
              line-height: h
              text-align: center
              color: #fff
              border-radius: 5px
              cursor: pointer
              font-size: 18px
            .btn-add-to-cart
              background-color: #05b570
              margin-right: 40px
            .btn-add-to-cart:hover
              background-color: #049059
            .btn-buy-now
              background-color: $theme_color
            .btn-buy-now:hover
              background-color: #dd2946
    .goods-all-info
      padding: 30px
      font-family: 'Microsoft YaHei'
      .tabs
        width: 100%
        color: #666
        position: relative
        top: 0
        left: 0
        ul
          li
            float: left
            padding-bottom: 30px
            margin-right: 60px
            cursor: pointer
            font-size: 18px
          li:first-child
            color: $theme_second_color
          li:last-child
            margin-right: 0
          li:hover
            color: $theme_second_color !important
</style>
