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
        <div :class="['input-tips','tips-'+this.globalTips.status]">
          <i :class="['iconfont',globalTips.icon]"></i><span>{{globalTips.message}}</span>
        </div>
        <div class="box-wrapper">
          <ul :style="{left:-(340*(currentProcess-1)) + 'px'}">
            <li>
              <div class="input-item input-phone">
                <span class="tips"><i class="iconfont icon-phone"></i></span><input type="text" v-model="inputPhone" autocomplete="off" spellcheck="false" placeholder="请输入手机号" @blur="formatValidate('phone','手机号')">
              </div>
              <div class="input-item input-message-code">
                <span class="tips"><i class="iconfont icon-yanzhengma"></i></span><input type="text" v-model="inputMessageCode" autocomplete="off" spellcheck="false" placeholder="验证码"
                                                                                         @blur="formatValidate('messageCode','验证码')"><span :class="['btn-get-code',{'btn-disabled':!canSendValidateCode}]" @click="validateCode">{{sendBtnText}}</span>
              </div>
              <div class="next-btn" @click="beforeSendCodeValidate">
                下一步
              </div>
            </li>
            <li>
              <div class="input-item input-account-name">
                <span class="tips"><i class="iconfont icon-user"></i></span><input type="text" placeholder="请输入用户名" v-model="inputAccountName" autocomplete="off" spellcheck="false" @blur="accountNameIsUsed">
              </div>
              <div class="input-item input-password">
                <span class="tips"><i class="iconfont icon-suoding"></i></span><input :type="pwdShow?'text':'password'" v-model="inputPassword" placeholder="请输入密码" autocomplete="off" spellcheck="false"
                                                                                      @blur="formatValidate('password','密码')"><i
                :class="['iconfont', {'icon-yincang':!pwdShow},{'icon-chakan':pwdShow},'op-tips']" @click="changePwdShowWay"></i>
              </div>
              <div class="input-item input-confirm-password">
                <span class="tips"><i class="iconfont icon-suoding"></i></span><input :type="pwdShow?'text':'password'" v-model="inputConfirmPwd" placeholder="确认密码" autocomplete="off" spellcheck="false"
                                                                                      @blur="formatValidate('confirmPwd','确认密码')"><i
                :class="['iconfont', {'icon-yincang':!pwdShow},{'icon-chakan':pwdShow},'op-tips']" @click="changePwdShowWay"></i>
              </div>
              <div class="next-btn" @click="register">
                提交注册
              </div>
            </li>
            <li>3</li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        currentProcess: 1,
        pwdShow: false,
        inputPhone: '',
        inputMessageCode: '',
        inputAccountName: '',
        inputPassword: '',
        inputConfirmPwd: '',
        globalTips: {status: 'info', icon: 'icon-tishishuoming', message: '填写合理数据！'},
        canSendValidateCode: true,    //作用于发送验证码按钮，表示能否发送验证码，可发送状态按钮为绿色，不可发送为灰色
        sendTimer: 60,
        sendBtnText: '获取验证码',
        codeValidateStatus: false     //作用于下一步按钮，表示当前整个第一步过程是否验证通过
      }
    },
    methods: {
      nextStep(index) {
        this.currentProcess = index
      },
      changePwdShowWay() {
        this.pwdShow = !this.pwdShow
      },
      formatValidate(target, errorMessage) {
        if (this[target + 'Validate']) {
          this.globalTips = {status: 'success', icon: 'icon-zhengque', message: errorMessage + '格式正确！'}
          return true
        } else {
          const temp = target.substring(0, 1).toUpperCase() + target.substring(1, target.length)
          if (this['input' + temp] === '') {
            this.globalTips = {status: 'error', icon: 'icon-cancel', message: errorMessage + '不能为空！'}
          } else {
            this.globalTips = {status: 'error', icon: 'icon-cancel', message: errorMessage + '格式错误！'}
          }
          return false
        }
      },
      validateCode() {
        /**
         * 单击发送验证码按钮时调用的方法
         * 首先验证手机号是否符合格式
         * 然后判断当前验证按钮是否能验证，即处于绿色状态，关键属性 canSendValidateCode
         * 然后发送ajax请求到后台生成验证码
         * 只有生成 验证码成功后才能将验证按钮设置为灰色，否则提示验证码发送失败。
         */
        if (!this.phoneValidate) {
          this.globalTips = {
            status: 'error',
            icon: 'icon-cancel',
            message: '手机号错误，请重新填写'
          }
          return
        }
        if (this.canSendValidateCode) {
          const that = this
          axios.get('http://localhost:8080/TTMall/userRegister?phone=' + this.inputPhone, {
            withCredentials: true
          })
            .then((res) => {
              console.log(res)
              if (res.data.status === false) {
                if (res) {
                  that.globalTips = {
                    status: 'error',
                    icon: 'icon-cancel',
                    message: res.data.info
                  }
                }
              } else {
                that.canSendValidateCode = false
                this.codeValidateStatus = true
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
                that.globalTips = {
                  status: 'success',
                  icon: 'icon-zhengque',
                  message: res.data.info
                }
              }
            })
            .catch((err) => {
              console.log(err)
              that.globalTips = {
                status: 'error',
                icon: 'icon-cancel',
                message: '网络故障，请稍后重试！！！'
              }
            })
        }
      },
      beforeSendCodeValidate() {
        if (this.codeValidateStatus) {
          axios.get('http://localhost:8080/TTMall/userRegister?code=' + this.inputMessageCode, {
            withCredentials: true
          })
            .then((res) => {
              if (res.data.status === true) {
                this.nextStep(2)
                this.globalTips = {
                  status: 'success',
                  icon: 'icon-zhengque',
                  message: '验证通过！'
                }
              } else {
                this.globalTips = {
                  status: 'error',
                  icon: 'icon-cancel',
                  message: res.data.info ? res.data.info : '验证码错误！'
                }
              }
            })
            .catch((err) => {
              console.log(err)
              this.globalTips = {
                status: 'error',
                icon: 'icon-cancel',
                message: '网路故障，请稍后重试！！！'
              }
            })

        } else {
          this.globalTips = {
            status: 'error',
            icon: 'icon-cancel',
            message: '手机号验证失败'
          }
        }

      },
      accountNameIsUsed() {
        if (!this.formatValidate('accountName', "用户名")) {
          return true
        }
        const that = this
        this.isUsedName()
          .then((res) => {
            that.globalTips = {
              status: 'error',
              icon: 'icon-cancel',
              message: '用户名已被注册！'
            }
          })
          .catch((err) => {
            that.globalTips = {
              status: 'success',
              icon: 'icon-zhengque',
              message: '可用用户名 ^_^'
            }
          })
        return false
      },
      isUsedName() {
        const that = this
        return new Promise(function (resolve, reject) {
          axios.get('http://localhost:8080/TTMall/users?account_name=' + that.inputAccountName)
            .then((res) => {
              res.data.status === true ? resolve(res) : reject(res)
            })
            .catch((err) => {
              console.log(err)
              that.globalTips = {
                status: 'error',
                icon: 'icon-cancel',
                message: '网络故障，11请检查网络！'
              }
              reject(err)
            })
        })
      },
      register() {
        const that = this
        if (this.validate) {
          axios.post('http://localhost:8080/TTMall/userRegister', {
            bindingPhoneNumber: this.inputPhone,
            accountName: this.inputAccountName,
            password: this.inputPassword
          })
            .then((res) => {
              if (res.data.status === true) {
                that.nextStep(3)
                that.globalTips = {
                  status: 'success',
                  icon: 'icon-zhengque',
                  message: '注册成功！'
                }
              } else {
                that.globalTips = {
                  status: 'error',
                  icon: 'icon-cancel',
                  message: '注册失败，服务异常！！！'
                }
              }
            })
            .catch((err) => {
              console.log(err)
              that.globalTips = {
                status: 'error',
                icon: 'icon-cancel',
                message: '注册失败，请检查网络后重试！！！'
              }
            })
        }
      }
    },
    computed: {
      phoneValidate() {
        const phone = this.inputPhone
        const regPhone = /^[1-9]{1}[0-9]{10}$/
        return phone !== '' && regPhone.test(phone)
      },
      messageCodeValidate() {
        return this.inputMessageCode !== ''
      },
      accountNameValidate() {
        const accountName = this.inputAccountName
        const regAccountName = /^[a-zA-Z]{1}[a-zA-Z_0-9]{5,17}$/
        return accountName !== '' && regAccountName.test(accountName)
      },
      passwordValidate() {
        const password = this.inputPassword
        const regPassword = /^[a-zA-Z0-9~.!@#$%^&*()+\-=`,/_]{6,18}$/
        return password !== '' && regPassword.test(password)
      },
      confirmPwdValidate() {
        return this.inputPassword === this.inputConfirmPwd
      },
      validate() {
        return this.accountNameValidate && this.passwordValidate && this.confirmPwdValidate
      },
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
      width: 100%
      .process-bar
        width: 100%
        padding-top: 30px
        .process-bar-wrapper
          width: 620px
          margin: 0 auto
          .process-one, .process-two, .process-three
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
                height: h = 20px
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
          .activeProcessStyle > span
            color: activeColor !important
          .activeProcessStyle > .process-number
            i
              background-color: activeColor
      .register-box
        width: 100%
        padding-top: 80px
        position: relative
        top: 0
        left: 0
        .input-tips
          position: absolute
          top: 30px
          left: 618px
          padding: 10px
          font-size: 12px
          border-radius: 3px
          color: #54c2ea
          background-color: #dff2f9
          i
            font-size: 12px
            margin-right: 10px
        .tips-info
          color: #54c2ea
          background-color: #dff2f9
        .tips-error
          color: #da7a72
          background-color: #fee
        .tips-success
          color: #19da6e
          background-color: #e7f9ef
        .box-wrapper
          width: 340px
          overflow: hidden
          margin: 0 auto
          ul
            width: 400%
            transition: all .5s
            position: relative
            top: 0
            left: 0
            li
              width: 25%
              float: left
              padding: 0 20px
              .input-item
                height: 42px
                border: 1px solid #ddd
                position: relative
                top: 0
                left: 0
                .tips
                  display: inline-block
                  width: 36px
                  text-align: center
                  i
                    color: #666
                input
                  height: 28px
                  margin-top: 7px
                  padding-right: 10px
                .op-tips
                  position: absolute
                  top: 12px
                  right: 12px
                  cursor: pointer
                  &:hover
                    color: $theme_second_deep_color
                &:hover
                  border: 1px solid $theme_second_color
              .input-phone, .input-account-name, .input-password
                margin-bottom: 20px
              .input-message-code
                input
                  width: 162px
                .btn-get-code
                  display: inline-block
                  vertical-align: top
                  width: 100px
                  height: 100%
                  line-height: 40px
                  font-size: 13px
                  color: #fff
                  text-align: center
                  cursor: pointer
                  background-color: $theme_second_color
                .btn-disabled
                  background-color: #bbb !important
                  color: #eee !important
                  cursor: not-allowed
              .next-btn
                width: 100%
                height: 42px
                margin-top: 30px
                border-radius: 3px
                text-align: center
                cursor: pointer
                line-height: 42px
                color: #fff
                background-color: $theme_second_color
                &:hover
                  background-color: $theme_second_deep_color
</style>
