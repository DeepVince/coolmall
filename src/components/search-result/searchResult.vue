<template>
  <div class="search-result">
    <div class="search-result-wrapper">
      <div class="tip-search">搜索结果</div>
      <crumbs-nav></crumbs-nav>
      <div class="filtrate-list">
        <ul>
          <li class="clear-fix" v-for="option in searchResultOptions">
            <div class="option-name">{{option.name}}</div>
            <div class="option-content">
              <ul class="clear-fix">
                <li v-for="item in option.contents">{{item}}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="goods-list clear-fix">
        <!--<div class="left-ad">-->
        <!--广告区域-->
        <!--</div>-->
        <div class="list">
          <div class="top-filter clear-fix">
            <ul class="clear-fix">
              <li class="filter-active-item">综合&nbsp;<i class="iconfont icon-nixu"></i></li>
              <li>销量&nbsp;<i class="iconfont icon-nixu"></i></li>
              <li>评论数&nbsp;<i class="iconfont icon-nixu"></i></li>
            </ul>
            <div class="price-filter">
              <label for="goods-price">价格</label><input type="text" id="goods-price">-<input type="text"><span class="confirm-btn">确定</span>
            </div>
            <div class="goods-count">
              <span class="count-info">共<em>100+</em>件商品</span>
              <span class="page-info"><em>1</em>/9</span>
              <span class="btn-prev-page page-btn"><i class="iconfont icon-fanhui"></i></span>
              <span class="btn-next-page page-btn"><i class="iconfont icon-gengduo"></i></span>
            </div>
          </div>
          <ul class="clear-fix goodsList">
            <li v-for="goods in goodsList" @click="getGoodsDetail">
              <div class="top-img">
                <img :src="goods.imageUrl" alt="">
              </div>
              <div class="goods-price">￥{{goods.price}}</div>
              <div class="goods-title">{{goods.title}}</div>
              <div class="goods-comments">
                <span class="comments-count">{{goods.commentsCount}}</span>&nbsp;条评价
              </div>
              <div class="store">{{goods.storeName}}</div>
            </li>
          </ul>
          <div class="page-select">
            <pagination></pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CrumbsNav from 'common/components/crumbsNav/crumbsNav'
  import Pagination from 'common/components/pagination/pagination'

  export default {
    data() {
      return {
        searchResultOptions: [
          {
            name: '分辨率',
            contents: ['高清HD', '全高清HD', '超清FHD以上', '标清SD', '其他']
          },
          {
            name: '机身内存',
            contents: ['32GB', '16GB', '256GB', '128GB', '512GB']
          },
          {
            name: '屏幕尺寸',
            contents: ['3.0英寸及以下', '4.5-3.1英寸', '5.0-4.6英寸', '5.5-5.1英寸', '5.6英寸以上']
          },
        ],
        goodsList: [
          {
            name: 'oppo r17',
            title: 'OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装',
            price: '3599',
            commentsCount: '9995',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR17-1.jpg'
          },
          {
            name: 'oppo r17',
            title: 'OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装',
            price: '3599',
            commentsCount: '9995',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR17-2.png'
          },
          {
            name: 'oppo r17',
            title: 'OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装',
            price: '3599',
            commentsCount: '9995',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR17-3.png'
          },
          {
            name: 'oppo r17',
            title: 'OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装',
            price: '3599',
            commentsCount: '9995',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR17-4.png'
          },
          {
            name: 'oppo r17',
            title: 'OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装',
            price: '3599',
            commentsCount: '9995',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR17-5.png'
          },
          {
            name: 'oppo r15',
            title: '购R17享免息,下单送蓝牙音箱，9月17日起店铺将陆续对购买R17 6+128G的用户补发MH135耳机，详情咨询客服详情点击',
            price: '2709',
            commentsCount: '8325',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR15-1.jpg'
          },
          {
            name: 'oppo r15',
            title: '购R17享免息,下单送蓝牙音箱，9月17日起店铺将陆续对购买R17 6+128G的用户补发MH135耳机，详情咨询客服详情点击',
            price: '2709',
            commentsCount: '8325',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR15-2.jpg'
          },
          {
            name: 'oppo r15',
            title: '购R17享免息,下单送蓝牙音箱，9月17日起店铺将陆续对购买R17 6+128G的用户补发MH135耳机，详情咨询客服详情点击',
            price: '2709',
            commentsCount: '8325',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR15-3.jpg'
          },
          {
            name: 'oppo r15',
            title: '购R17享免息,下单送蓝牙音箱，9月17日起店铺将陆续对购买R17 6+128G的用户补发MH135耳机，详情咨询客服详情点击',
            price: '2709',
            commentsCount: '8325',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR15-4.jpg'
          },
          {
            name: 'oppo r15',
            title: '购R17享免息,下单送蓝牙音箱，9月17日起店铺将陆续对购买R17 6+128G的用户补发MH135耳机，详情咨询客服详情点击',
            price: '2709',
            commentsCount: '8325',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR15-5.jpg'
          },
          {
            name: 'oppo r17',
            title: 'OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装',
            price: '3599',
            commentsCount: '9995',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR17-1.jpg'
          },
          {
            name: 'oppo r17',
            title: 'OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装',
            price: '3599',
            commentsCount: '9995',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR17-2.png'
          },
          {
            name: 'oppo r17',
            title: 'OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装',
            price: '3599',
            commentsCount: '9995',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR17-3.png'
          },
          {
            name: 'oppo r17',
            title: 'OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装',
            price: '3599',
            commentsCount: '9995',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR17-4.png'
          },
          {
            name: 'oppo r17',
            title: 'OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装',
            price: '3599',
            commentsCount: '9995',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR17-5.png'
          },
          {
            name: 'oppo r15',
            title: '购R17享免息,下单送蓝牙音箱，9月17日起店铺将陆续对购买R17 6+128G的用户补发MH135耳机，详情咨询客服详情点击',
            price: '2709',
            commentsCount: '8325',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR15-1.jpg'
          },
          {
            name: 'oppo r15',
            title: '购R17享免息,下单送蓝牙音箱，9月17日起店铺将陆续对购买R17 6+128G的用户补发MH135耳机，详情咨询客服详情点击',
            price: '2709',
            commentsCount: '8325',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR15-2.jpg'
          },
          {
            name: 'oppo r15',
            title: '购R17享免息,下单送蓝牙音箱，9月17日起店铺将陆续对购买R17 6+128G的用户补发MH135耳机，详情咨询客服详情点击',
            price: '2709',
            commentsCount: '8325',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR15-3.jpg'
          },
          {
            name: 'oppo r15',
            title: '购R17享免息,下单送蓝牙音箱，9月17日起店铺将陆续对购买R17 6+128G的用户补发MH135耳机，详情咨询客服详情点击',
            price: '2709',
            commentsCount: '8325',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR15-4.jpg'
          },
          {
            name: 'oppo r15',
            title: '购R17享免息,下单送蓝牙音箱，9月17日起店铺将陆续对购买R17 6+128G的用户补发MH135耳机，详情咨询客服详情点击',
            price: '2709',
            commentsCount: '8325',
            storeName: 'OPPO天天自营官方旗舰店',
            imageUrl: 'http://pccnvwbyj.bkt.clouddn.com/oppoR15-5.jpg'
          }
        ]
      }
    },
    components: {CrumbsNav, Pagination},
    methods: {
      getGoodsDetail(){
        this.$router.push('/goodsDetail')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  filterItemHeight = 26px
  .search-result
    width: 100%
    background-color: #fff
    font-family: 'YaHei'
    border-top: 3px solid $theme_color
    padding-top: 20px

  .search-result-wrapper
    width: 1200px
    margin: 0 auto
    position: relative
    top: 0
    left: 0
    .tip-search
      background-color: $theme_color
      color: #fff
      padding: 8px 26px
      position: absolute
      top: -55px
      left: 0
    .filtrate-list
      margin-top: 20px
      box-shadow: 0 0 20px 0 #eee
      padding: 20px
      font-size: 14px
      ul
        li
          margin-bottom: 14px
          color: #666
          .option-name
            width: 100px
            float: left
            margin-right: 20px
            font-weight: bold
          .option-content
            float: left
            font-size: 14px
            ul
              li
                float: left
                margin-right: 40px
                padding-bottom: 2px
                border-bottom: 1px dashed #999
                cursor: pointer
              li:last-child
                margin-right: 0
              li:hover
                color: $theme_second_color
        li:last-child
          margin-bottom: 0
    .goods-list
      margin-top: 20px
      .left-ad
        width: 170px
        height: 400px
        background-color: #93ff94
        float: left
      .list
        float: left
        width: 1200px
        padding-bottom: 30px
        box-shadow: 0 0 20px 0 #eee
        .top-filter
          margin-bottom: 40px
          background-color: #f4f4f4
          padding: 10px
          ul
            float: left
            background-color: #fff
            border-radius: 20px
            margin-right: 20px
            overflow: hidden
            li
              height: filterItemHeight
              line-height: filterItemHeight
              padding: 0 16px
              color: #666
              font-size: 12px
              float: left
              cursor: pointer
              i
                font-size: 14px
            li.filter-active-item
              background-color: $theme_color
              color: #fff
          .price-filter
            height: filterItemHeight
            line-height: filterItemHeight
            float: left
            font-size: 12px
            border-radius: 20px
            background-color: #fff
            overflow: hidden
            label
              display: inline-block
              height: 100%
              background-color: $theme_color
              padding: 0 16px
              color: #fff
            input
              width: 60px
              text-align: center
              display: inline-block
              height: 100%
              padding: 0 10px
            .confirm-btn
              width: 60px
              display: inline-block
              text-align: center
              color: #fff
              background-color: $theme_color
              cursor: pointer
            .confirm-btn:hover
              background-color: $theme_deep_color
          .goods-count
            height: filterItemHeight
            line-height: filterItemHeight
            float: right
            font-size: 12px
            color: #999
            .count-info
              margin-right: 10px
              em
                font-style: normal
                color: $theme_second_color
            .page-info
              margin: 0 10px
              em
                font-style: normal
                color: $theme_color
            .page-btn
              padding: 0 10px
              cursor: pointer
              i
                font-size: 12px
            .page-btn:hover
              color: $theme_color
        ul.goodsList
          li
            width: 240px
            margin-bottom: 10px
            padding: 10px
            float: left
            font-size: 12px
            color: #666
            transition: top .3s
            position: relative
            top: 0
            left: 0
            border: 1px dashed transparent
            box-sizing: border-box
            .top-img
              width: 100%
              img
                width: w = 220px
                height: w
            .goods-price
              font-size: 24px
              color: $theme_color
              margin: 8px 0
              padding: 0 10px
            .goods-title
              width: 100%
              padding: 0 10px
              line-height: 1.2
              color: #333
              overflow: hidden
              -ms-text-overflow: ellipsis
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 2
            .goods-comments
              padding: 0 10px
              margin-top: 16px
              color: #999
              .comments-count
                color: $theme_second_color
            .store
              padding: 0 10px
              margin: 16px 0
          li:hover
            cursor: pointer
            border: 1px dashed $theme_second_color
            box-shadow: 0 0 15px 0 #ddd
            top: -10px
        .page-select
          margin: 0 auto
          margin-top: 30px
          text-align: center
</style>
