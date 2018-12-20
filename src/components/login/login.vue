<template>
  <div class="login">
    <div class="header">
      <div class="header-wrapper">
        <div class="logo">ZEROMALL</div>
      </div>
      <div class="platform-tips"><i class="iconfont icon-tishishuoming"></i>依据《网络安全法》，为保障您的账户安全和正常使用，未完成手机验证的用户，请尽快完成手机号验证！</div>
    </div>
    <div class="content">
      <div class="banner"><img src="http://pccnvwbyj.bkt.clouddn.com/login-banner-1.jpg" alt=""></div>
      <div class="login-box">
        <div class="box-tips"><i class="iconfont icon-tishishuoming"></i>平台不会以任何理由要求您转账汇款，谨防诈骗。</div>
        <div class="login-way-text">
          <span @click="changeLoginWay(0)">账号登录</span><span @click="changeLoginWay(1)">短信登录</span>
          <div class="bar">
            <indicator unitWidth="130px" count=2 up="true" ref="indicator"></indicator>
          </div>
        </div>
        <div class="switch-login-way">
          <component :is="currentComponent"></component>
        </div>
        <div class="other-login-way clear-fix">
          <div class="other-way">
            <span class="qq-way"><i class="iconfont icon-qq1"></i>QQ</span>
            <span class="weixin-way"><i class="iconfont icon-weixin1"></i>微信</span>
          </div>
          <div class="go-register" @click="goRegister"><i class="iconfont icon-jinlingyingcaiwangtubiao04"></i>去注册</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <ul class="clear-fix">
        <li>关于我们</li>&nbsp;&nbsp;|&nbsp;
        <li>联系我们</li>&nbsp;&nbsp;|&nbsp;
        <li>人才招聘</li>&nbsp;&nbsp;|&nbsp;
        <li>商家入驻</li>&nbsp;&nbsp;|&nbsp;
        <li>广告服务</li>&nbsp;&nbsp;|&nbsp;
        <li>手机天天</li>&nbsp;&nbsp;|&nbsp;
        <li>友情链接</li>&nbsp;&nbsp;|&nbsp;
        <li>销售联盟</li>&nbsp;&nbsp;|&nbsp;
        <li>天天社区</li>&nbsp;&nbsp;|&nbsp;
        <li>天天公益</li>
      </ul>
      <p>Copyright © 2018 天天ttianmall.com 版权所有</p>
    </div>
  </div>
</template>

<script>
  import Indicator from 'common/components/indicator/indicator'
  import AccountWay from 'components/login/account-way/accountWay'
  import MessageWay from 'components/login/message-way/messageWay'

  export default {
    components: {Indicator, AccountWay, MessageWay},
    data() {
      return {
        currentComponent: AccountWay
      }
    },
    methods: {
      changeLoginWay(index) {
        index === 0 ? this.currentComponent = AccountWay : this.currentComponent = MessageWay
        this.$refs.indicator.selectTag(index)
      },
      goRegister(){
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .login
    width: 100%
    height: 100%
    overflow: hidden
    min-height: 792px
    background-color: #fff
    color: #666
    position: fixed
    top: 0
    left: 0
    .header
      width: 100%
      height: 15%
      box-shadow: 0 0 10px 0 #ddd
      position: relative
      top: 0
      left: 0
      .header-wrapper
        width: 1200px
        margin: 0 auto
        position: relative
        top: 0
        left: 0
        .logo
          display: inline-block
          font-size: 36px
          font-weight: bold
          color: $theme_color
          position: absolute
          top: 24px
          left: 0
      .platform-tips
        width: 100%
        background-color: #fff3f4
        color: #bb8e8e
        text-align: center
        font-size: 12px
        line-height: 36px
        position: absolute
        bottom: 0
        left: 0
        i
          margin-right: 6px
          font-size: 12px
    .content
      width: 100%
      height: 60%
      background-color: #222327
      position: relative
      top: 0
      left: 0
      .banner
        position: absolute
        top: 0
        left: 246px
      .login-box
        width: 340px
        background-color: #fff
        position: absolute
        top: 20px
        right: 240px
        .box-tips
          width: 100%
          height: h = 36px
          text-align: center
          background-color: #fff3f4
          line-height: h
          color: #bb8e8e
          font-size: 12px
          i
            font-size: 12px
            margin-right: 6px
        .login-way-text
          width: 100%
          span
            display: inline-block
            width: 50%
            font-size: 16px
            font-weight: bold
            line-height: 56px
            cursor: pointer
            text-align: center
          .bar
            margin-bottom: 30px
            padding: 0 40px
            position: relative
            top: 0
            left: 0
        .other-login-way
          width: 100%
          height: h = 40px
          background-color: #fafafa
          margin: 0 auto
          margin-top: 30px
          padding: 0 30px
          line-height: h
          .other-way
            float: left
            span
              font-size: 12px
              cursor: pointer
              i
                font-size: 14px
                margin-right: 5px
            .qq-way
              margin-right: 12px
              i
                color: #359fed
            .weixin-way
              i
                color: #07b906
          .go-register
            float: right
            font-size: 12px
            cursor: pointer
            i
              margin-right: 6px
              font-size: 12px
          .go-register:hover
            color: $theme_second_color
  .footer
    width: 100%
    height: 25%
    text-align: center
    padding-top: 40px
    font-size: 12px
    ul
      margin: 0 auto
      text-align: center
      li
        display: inline-block
    p
      margin-top: 15px
</style>
