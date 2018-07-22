<template>
  <div class="indicator" :style="{width:indicatorWidth + 'px',top:indicatorTop + 'px'}">
    <div class="current-tag" ref="scrollBar" :style="{width:blockWidth+'px'}"><i :class="['iconfont icon-play_fill',{up:upClass}]"></i></div>
  </div>
</template>

<script>
  export default {
    props: ['inWidth', 'inTop','itemWidth','up','marginSize'],
    data() {
      return {
        indicatorWidth: this.inWidth || 0,
        indicatorTop:this.inTop || 0,
        blockWidth: this.itemWidth || 0,
        moveSize:this.marginSize || 0,
        upClass: this.up
      }
    },
    methods: {
      selectTag(event,index) {
        const e = event || window.event
        // 获取当前点击图片的索引,从而计算大图片的显示和游标滑动
        // const index = e.target.attributes['data-index'].nodeValue
        // 更新大图片和滑块位置
        // this.$refs.bigPic.style.left = (-560 * index) + 'px'
        this.$refs.scrollBar.style.left = ((parseInt(this.blockWidth) + parseInt(this.moveSize)) * index) + 'px'
        // 高亮当前小图片，模糊其他小图片
        // const list = this.$refs.smallPics.children
        // for (let i = 0; i < list.length; i++) {
        //   list[i].style.opacity = 0.3
        // }
        //list[index].style.opacity = 1
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .indicator
    width: 100%
    height: 3px
    background-color: #eee
    border-radius: 2px
    margin-bottom: 20px
    position: absolute
    top: 30px
    left: 0
    .current-tag
      width: 72px
      height: 100%
      background-color: $theme_second_color
      border-radius: 2px
      position: absolute
      top: 0
      left: 0
      transition: left 0.5s
      i
        position: absolute
        top: -4px
        left: 30px
        transform: rotateZ(90deg)
        color: $theme_second_color
      .up
        top: -9px
        transform: rotateZ(-90deg)
</style>
