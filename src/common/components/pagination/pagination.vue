<template>
  <div class="pagination">
    <span class="btn-prev-page">上一页</span>
    <ul>
      <li :class="[currentPageIndex === num?'active-page':'']" v-for="(num,index) in pagerCount">{{num}}</li>
    </ul>
    <span class="btn-next-page">下一页</span>
    <span class="page-amount">共<em>9</em>页</span>
    <span class="jump-to">
      <span><label for="page-num">跳转到</label><input type="text" id="page-num">页</span>
      <span class="btn-jump-page">确定</span>
    </span>
  </div>
</template>

<script>
  export default {
    created() {
      this.$parent.created = function () {
        console.log('ch')
      }
    },
    props: {
      pageCount: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        currentPageIndex: 3
      }
    },
    computed: {
      pagerCount(){
        const pageCount = this.pageCount
        let array = []
        for(let i =0;i<pageCount;i++){
          array.push(i+1)
        }
        return array
      },
    },
    methods: {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  btnHeight = 30px
  btnBorderRadius = 4px
  .pagination
    display: inline-block
    font-size: 14px
    line-height: btnHeight
    color: #666
    ul, span, li
      display: inline-block
      vertical-align: top
      text-align: center
    .btn-prev-page, .btn-next-page
      width: 80px
      height: btnHeight
      background-color: #eee
      cursor: pointer
      border-radius: btnBorderRadius
    .btn-prev-page:hover, .btn-next-page:hover
      background-color: $theme_second_color
      color: #fff
    ul
      margin: 0 20px
      li
        width: btnHeight
        height: btnHeight
        margin-right: 10px
        border-radius: btnBorderRadius
        cursor: pointer
      li:last-child
        margin-right: 0
      li.active-page
        background-color: $theme_second_color
        color: #fff
    .page-amount
      margin: 0 20px
      em
        font-style: normal
    .jump-to
      input#page-num
        display: inline-block
        width: 80px
        margin: 0 10px
        padding: 5px 10px
        font-size: 14px
        color: #666
        border: 1px solid #ddd
      input#page-num:focus
        border: 1px solid $theme_second_color
      .btn-jump-page
        height: btnHeight
        border-radius: btnBorderRadius
        padding: 0 10px
        color: #fff
        margin-left: 20px
        cursor: pointer
        background-color: $theme_second_color
      .btn-jump-page:hover
        background-color: $theme_second_deep_color
</style>
