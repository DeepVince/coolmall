<template>
  <div class="account-way">
    <div class="input-area">
      <div :class="['account','input-unit',{activeColor: activeOne}]">
        <label for="account">
          <i class="iconfont icon-yonghu"></i>
        </label><input type="text" v-model="account" id="account" autocomplete="off" spellcheck="false" placeholder="手机号/邮箱/用户名" @focus="activeInput(0)" @blur="blurInput(0)">
        <i class="clear-input-btn iconfont icon-close" v-show="account !== ''" @click="clearInput(0)"></i>
      </div>
      <div :class="['password','input-unit',{activeColor: activeTwo}]">
        <label for="password">
          <i class="iconfont icon-suoding"></i>
        </label><input type="password" v-model="password" id="password" autocomplete="false" spellcheck="false" placeholder="密码" @focus="activeInput(1)" @blur="blurInput(1)">
        <i class="clear-input-btn iconfont icon-close" v-show="password !== ''" @click="clearInput(1)"></i>
      </div>
      <p class="forget-password clear-fix">
        <span class="input-tips"><i class="iconfont icon-tishishuoming" v-show="inputTips !== ''"></i>{{inputTips}}</span>
        <span class="forget-text">忘记密码 <i class="iconfont icon-feedback_fill"></i></span>
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
        inputTips: 'xx',
        activeOne: false,
        activeTwo: false
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
      login(){
        let account = 'accountName'
        account = this.isLoginByPhone ? 'phone' : account
        axios.get('http://localhost:8080/TTMall/userLogin?'+account+'='+this.account+"&password="+this.password,{withCredentials:true})
          .then((res) =>{
            console.log(res)
            if(res.data.status === true){
              this.$router.push('/index')
            }
          })
          .catch((err) =>{
            console.log(err)
          })
      }
    },
    computed:{
      isLoginByPhone(){
        return /^[1-9]{1}[0-9]{10}$/.test(this.account)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  paddingSize = 40px
  .account-way
    .input-area
      .input-unit
        width: 80%
        height: h = 40px
        line-height: h
        margin: 0 auto
        border: 1px solid #ddd
        font-size: 14px
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
