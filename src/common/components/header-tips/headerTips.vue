<template>
  <div class="header-tips">
    <div class="tips-wrapper clear-fix">
      <div class="left">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
      <div class="right">
        <router-link to="">请登录</router-link>
        <router-link to="">我的订单</router-link>
        <router-link to="">积分商城</router-link>
        <router-link to="">优品会员</router-link>
        <router-link to="">商家入驻</router-link>
        <router-link to="">关于ZeroMall</router-link>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .header-tips
    background-color: #eeeeee
    .tips-wrapper
      width: 1200px
      margin: 0 auto
      font-size: 12px
      line-height: 30px
      color: #333
      background-color: #eeeeee
      a:hover
        color: #ff0000
      .left
        float: left
        a
          margin-right: 5px
      .right
        float: right
        a
          margin-left: 5px
</style>
