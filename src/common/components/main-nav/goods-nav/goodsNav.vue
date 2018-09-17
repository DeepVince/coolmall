<template>
  <div class="goods-nav">
    <div class="nav-title">
      <h2>商品分类</h2>
    </div>
    <div class="classification-list">
      <ul>
        <li>家电、生活器材</li>
        <li>家居建材</li>
        <li>手机、运营商、数码</li>
        <li>男装、女装、童装、内衣</li>
        <li>美妆、个人护理、宠物</li>
        <li>女鞋、箱包、钟表、珠宝</li>
        <li>男鞋、运动、户外</li>
        <li>母婴、玩具、乐器</li>
        <li>食品、酒类</li>
        <li>生鲜、水果</li>
        <li>医疗保健、计生情趣</li>
        <li>艺术、鲜花、农资绿植</li>
        <li>图书、音像</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .goods-nav
    width: 200px
    .nav-title
      h2
        line-height: 32px
        background-color: #049c61
        color: #fff
    .classification-list
      width: 100%
      ul
        background-color: #fff
        li
          height: 24px
          line-height: 24px
          box-sizing:content-box
          padding: 5px 0
          padding-left: 20px
          font-size: 14px
          color: #333
          text-align: left
        li:hover
          background-color: #eaeaea
</style>
