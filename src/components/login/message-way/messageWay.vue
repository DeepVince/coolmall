<template>
  <div class="message-way">
    <div class="input-area">
      <div :class="['account','input-unit',{activeColor: activeOne}]">
        <label for="account">
          <i class="iconfont icon-phone"></i>
        </label><input type="text" v-model="account" id="account" autocomplete="off" spellcheck="false" placeholder="绑定的手机号" @focus="activeInput(0)" @blur="blurInput(0)">
        <i class="clear-input-btn iconfont icon-close" v-show="account !== ''" @click="clearInput(0)"></i>
      </div>
      <div :class="['password','input-unit',{activeColor: activeTwo}]">
        <label for="password">
          <i class="iconfont icon-yanzhengma"></i>
        </label><input type="text" v-model="password" id="password" autocomplete="off" spellcheck="false" placeholder="验证码" @focus="activeInput(1)" @blur="blurInput(1)">
        <i class="clear-input-btn iconfont icon-close" v-show="password !== ''" @click="clearInput(1)"></i>
        <span :class="['btn-send-message',{'btn-disabled':!canSendValidateCode}]" @click="validateCode" :disabled="canSendValidateCode">{{sendBtnText}}</span>
      </div>
      <p class="forget-password clear-fix">
        <span class="input-tips"><i class="iconfont icon-tishishuoming" v-show="inputTips !== ''"></i>{{inputTips}}</span>
        <span class="forget-text">收不到短信<i class="iconfont icon-feedback_fill"></i></span>
      </p>
      <div class="login-btn">
        <span @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        account: '',
        password: '',
        inputTips: '',
        activeOne: false,
        activeTwo: false,
        canSendValidateCode: true,
        sendTimer: 60,
        sendBtnText: '获取验证码'
      }
    },
    methods: {
      clearInput(index) {
        index === 0 ? this.account = '' : this.password = ''
      },
      activeInput(index) {
        index === 0 ? this.activeOne = true : this.activeTwo = true
      },
      blurInput() {
        this.activeOne = false
        this.activeTwo = false
      },
      validatePhoneInput(){
        const regPhone = /^[1-9]{1}[0-9]{10}$/
        return this.account !== ''&& regPhone.test(this.account)
      },
      validatePassword(){
        return this.password !== ''
      },
      validateCode() {
        if(!this.validatePhoneInput()){
          this.$message({
            type: 'error',
            message: '请填写正确的手机号',
            showClose:true
          })
          return
        }
        if (this.canSendValidateCode) {
          const that = this
          that.canSendValidateCode = false
          that.sendBtnText = "重新发送(" + that.sendTimer + "s)"
          const timerOnce = setInterval(function () {
            that.sendTimer--
            that.sendBtnText = "重新发送(" + that.sendTimer + "s)"
          }, 1000)
          const timer = setTimeout(function () {
            clearInterval(timerOnce)
            that.sendBtnText = "获取验证码"
            that.canSendValidateCode = true
            that.sendTimer = 10
          }, that.sendTimer * 1000)
          axios.get('http://localhost:8080/TTMall/messageLogin?phone=' + this.account, {
            withCredentials: true
          })
            .then((res) => {
              if (res.data.status === true) {
                console.log("验证码生成成功！")
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      },
      login() {
        if(!this.validatePhoneInput()){
          this.$message({
            type: 'error',
            message: '请填写正确的手机号',
            showClose:true
          })
          return
        }
        if(!this.validatePassword()){
          this.$message({
            type: 'error',
            message: '验证码不能为空！',
            showClose:true
          })
          return
        }
        axios.post('http://localhost:8080/TTMall/messageLogin?code=' + this.password + "&phone=" + this.account, {}, {
          withCredentials: true
        })
          .then((res) => {
            if (res.data.status === true) {
              this.$router.push('/index')
            }else{
              this.$message({
                type:'error',
                message: '手机号或验证码错误',
                showClose:true
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  paddingSize = 40px
  .message-way
    .input-area
      .input-unit
        width: 80%
        height: h = 40px
        margin: 0 auto
        border: 1px solid #ddd
        font-size: 14px
        overflow: hidden
        margin-bottom: 20px
        label
          display: inline-block
          width: 40px
          height: 40px
          text-align: center
          line-height: 40px
        input
          width: 200px
        .clear-input-btn
          font-size: 14px
          color: #ddd
          cursor: pointer
        .clear-input-btn:hover
          color: $theme_second_color
      .activeColor
        border-color: $theme_second_color
      .password
        border-right: none
        input
          width: 100px
        .btn-send-message
          display: block
          float: right
          width: 100px
          height: 100%
          line-height: 40px
          text-align: center
          cursor: pointer
          background-color: $theme_second_color
          color: #fff
          vertical-align: top
          font-size: 12px
        .btn-send-message:hover
          background-color: $theme_second_deep_color
        .btn-disabled
          background-color: #bbb !important
          color: #eee !important
          cursor: not-allowed
      .forget-password
        padding: 0 paddingSize
        font-size: 12px
        text-align: right
        span
          color: #666
          cursor: pointer
          i
            font-size: 14px
        .input-tips
          float: left
        span:hover
          color: $theme_second_color
      .login-btn
        margin-top: 30px
        text-align: center
        span
          display: inline-block
          width: 80%
          margin: 0 auto
          height: h = 40px
          line-height: h
          cursor: pointer
          color: #fff
          font-size: 18px
          background-color: $theme_color
        span:hover
          background-color: $theme_deep_color
</style>
