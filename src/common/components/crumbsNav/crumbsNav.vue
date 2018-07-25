<template>
  <div class="crumbs-nav">
    <nav>
      <ul class="clear-fix">
        <li>商城首页</li>
        <li>手机</li>
        <li>OPPO R15</li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .crumbs-nav
    width: 100%
    padding: 10px 0
    nav
      ul
        li
          float: left
          font-size: 14px
          color: #999
        li:before
          display: block
          font-family: 'iconfont'
          content: '\e601'
          float: left
          font-size: 14px
          margin: 0 6px
          color: #999
        li:first-child:before
          display: none
        li:last-child
          color: $theme_second_color
</style>
