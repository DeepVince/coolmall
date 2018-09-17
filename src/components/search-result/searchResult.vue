<template>
  <div class="search-result">
    <div class="search-result-wrapper">
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
        <div class="left-ad">
          广告区域
        </div>
        <div class="list">
          <ul class="clear-fix">
            <li>
              <div class="top-img">
                <img src="http://pccnvwbyj.bkt.clouddn.com/oppoR17-1.jpg" alt="">
              </div>
              <div class="goods-price">￥3599</div>
              <div class="goods-title"> OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装</div>
              <div class="goods-comments">
                <span class="comments-count">999+</span>&nbsp;条评价
              </div>
              <div class="store">OPPO天天自营官方旗舰店</div>
            </li>
            <li>
              <div class="top-img">
                <img src="http://pccnvwbyj.bkt.clouddn.com/oppoR17-1.jpg" alt="">
              </div>
              <div class="goods-price">￥3599</div>
              <div class="goods-title"> OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装</div>
              <div class="goods-comments">
                <span class="comments-count">999+</span>&nbsp;条评价
              </div>
              <div class="store">OPPO天天自营官方旗舰店</div>
            </li>
            <li>
              <div class="top-img">
                <img src="http://pccnvwbyj.bkt.clouddn.com/oppoR17-1.jpg" alt="">
              </div>
              <div class="goods-price">￥3599</div>
              <div class="goods-title"> OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装</div>
              <div class="goods-comments">
                <span class="comments-count">999+</span>&nbsp;条评价
              </div>
              <div class="store">OPPO天天自营官方旗舰店</div>
            </li>
            <li>
              <div class="top-img">
                <img src="http://pccnvwbyj.bkt.clouddn.com/oppoR17-1.jpg" alt="">
              </div>
              <div class="goods-price">￥3599</div>
              <div class="goods-title"> OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装</div>
              <div class="goods-comments">
                <span class="comments-count">999+</span>&nbsp;条评价
              </div>
              <div class="store">OPPO天天自营官方旗舰店</div>
            </li>
            <li>
              <div class="top-img">
                <img src="http://pccnvwbyj.bkt.clouddn.com/oppoR17-1.jpg" alt="">
              </div>
              <div class="goods-price">￥3599</div>
              <div class="goods-title"> OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装</div>
              <div class="goods-comments">
                <span class="comments-count">999+</span>&nbsp;条评价
              </div>
              <div class="store">OPPO天天自营官方旗舰店</div>
            </li>
            <li>
              <div class="top-img">
                <img src="http://pccnvwbyj.bkt.clouddn.com/oppoR17-1.jpg" alt="">
              </div>
              <div class="goods-price">￥3599</div>
              <div class="goods-title"> OPPO R17新品手机【6期免息】指纹水滴屏全网通8G+128G 双摄拍照手机 R15梦境升级版 流光蓝(8G+128G) 超值套装</div>
              <div class="goods-comments">
                <span class="comments-count">999+</span>&nbsp;条评价
              </div>
              <div class="store">OPPO天天自营官方旗舰店</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CrumbsNav from 'common/components/crumbsNav/crumbsNav'
  export default {
    data(){
      return {
        searchResultOptions: [
          {
            name: '分辨率',
            contents: ['高清HD','全高清HD','超清FHD以上','标清SD','其他']
          },
          {
            name: '机身内存',
            contents: ['32GB','16GB','256GB','128GB','512GB']
          },
          {
            name: '屏幕尺寸',
            contents: ['3.0英寸及以下','4.5-3.1英寸','5.0-4.6英寸','5.5-5.1英寸','5.6英寸以上']
          },
        ]
      }
    },
    components:{CrumbsNav}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .search-result
    width: 100%
    background-color: #fff
  .search-result-wrapper
    width: 1390px
    margin: 0 auto
    .filtrate-list
      background-color: #67ffec
      font-family: 'YaHei'
      margin-top: 20px
      ul
        li
          margin-bottom: 10px
          .option-name
            width: 120px
            float: left
            margin-right: 20px
          .option-content
            float: left
            font-size: 14px
            ul
              li
                float: left
                margin-right: 20px
              li:last-child
                margin-right: 0
    .goods-list
      margin-top: 20px
      .left-ad
        width: 170px
        height: 400px
        background-color: #93ff94
        float: left
      .list
        float: left
        width: 1220px
        padding-left: 20px
        ul
          li
            width: 240px
            margin-bottom: 10px
            padding: 10px
            float: left
            font-size: 12px
            color: #666
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
            box-shadow: 0 0 5px 0 #ddd

</style>
