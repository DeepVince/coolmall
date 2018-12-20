<template>
  <div class="footer">
    <div class="wrap">
      <div class="items clear-fix">
        <ul class="items-ul clear-fix">
          <li class="item">
            <h3>购物指南</h3>
            <ul>
              <li><router-link to="#">购买流程</router-link></li>
              <li><router-link to="#">会员介绍</router-link></li>
              <li><router-link to="#">常见问题</router-link></li>
              <li><router-link to="#">联系客服</router-link></li>
            </ul>
          </li>
          <li class="item">
            <h3>平台服务</h3>
            <ul>
              <li><router-link to="#">依旧换新</router-link></li>
              <li><router-link to="#">服务网点查询</router-link></li>
              <li><router-link to="#">官方授权网站</router-link></li>
              <li><router-link to="#">延保服务</router-link></li>
              <li><router-link to="#">售后政策</router-link></li>
            </ul>
          </li>
          <li class="item">
            <h3>关于我们</h3>
            <ul>
              <li><router-link to="#">关于汇优品</router-link></li>
              <li><router-link to="#">新闻资讯</router-link></li>
              <li><router-link to="#">加入我们</router-link></li>
              <li><router-link to="#">媒体联络</router-link></li>
            </ul>
          </li>
          <li class="item">
            <h3>平台合作</h3>
            <ul>
              <li><router-link to="#">开放平台</router-link></li>
              <li><router-link to="#">商家入驻</router-link></li>
              <li><router-link to="#">物流接入</router-link></li>
            </ul>
          </li>
        </ul>
        <div class="qr-code">
          <img src="../../../assets/qr-code-2.png" alt="汇优品官方微信公众号">
          <p>官方微信公众号</p>
        </div>
      </div>
      <div class="footer-end">
        <p>©CopyRight 2005 - 2018 <router-link to="/#">汇优品(www.hupmall.com)</router-link> 版权所有 赣ICP备xxxxxxxx号-1 联系方式：4001-999-899</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .footer
    width: 100%
    background-color: $footer-background
    box-shadow: 0 0 20px 0 #ddd
    a:hover
      color: $theme_color
    .wrap
      width: $wrapper_width
      margin: 0 auto
      padding: 50px 0
      .items
        padding-bottom: 20px
        border-bottom: 1px dashed #ccc
        margin-bottom: 20px
        .items-ul
          float: left
          .item
            float: left
            font-weight: lighter
            margin-right: 140px
            h3
              font-size: 18px
              color: #333
            ul
              margin-top: 20px
              font-size: 14px
              color: #999
              li
                margin-top: 16px
        .qr-code
          float: right
          font-size: 14px
          img
            width: 140px
          p
            margin-top: 20px
            color: #666
      .footer-end
        font-size: 12px
        color: #999

</style>
