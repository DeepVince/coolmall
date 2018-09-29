<template>
  <div class="register">
    <div class="header">
      <div class="logo">ZEROMALL</div>
    </div>
    <div class="content">
      <div class="process-bar">
        <div class="process-bar-wrapper clear-fix">
          <div :class="['process-one',{activeProcessStyle: currentProcess >= 1}]">
            <span class="process-number"><i>1</i></span><br><span class="process-text">验证手机号</span><span class="process-line">...................................</span>
          </div>
          <div :class="['process-two',{activeProcessStyle: currentProcess >= 2}]">
            <span class="process-number"><i>2</i></span><br><span class="process-text">填写账号信息</span><span class="process-line">...................................</span>
          </div>
          <div :class="['process-three',{activeProcessStyle: currentProcess === 3}]">
            <span class="process-number"><i>3</i></span><br><span class="process-text">完成注册</span>
          </div>
        </div>
      </div>
      <div class="register-box">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        currentProcess: 1
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  commonColor = #999
  activeColor = $theme_second_color
  .register
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background-color: #fff
    .header
      width: 100%
      height: 100px
      background-color: #fff
      box-shadow: 0 0 10px 0 #ddd
      position: relative
      .logo
        display: inline-block
        font-size: 36px
        font-weight: bold
        color: $theme_color
        position: absolute
        top: 25px
        left: 200px
    .content
      .process-bar
        width: 100%
        padding-top: 30px
        .process-bar-wrapper
          width: 620px
          margin: 0 auto
          .process-one,.process-two,.process-three
            float: left
            span
              width: 100px
              display: inline-block
              text-align: center
              vertical-align: top
            .process-number
              i
                display: inline-block
                width: 20px
                height: h= 20px
                text-align: center
                line-height: h
                font-size: 12px
                font-style: normal
                background-color: commonColor
                color: #fff
                border-radius: 50%
            .process-text
              font-size: 12px
              color: #666
              margin-top: 16px
            .process-line
              width: 160px
              color: commonColor
              position: relative
              top: -20px
              left: 0
          .activeProcessStyle>span
            color: activeColor !important
          .activeProcessStyle>.process-number
            i
              background-color: activeColor
</style>
