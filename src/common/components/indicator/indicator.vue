<template>
  <div class="indicator" :style="{width:count*parseInt(unitWidth)+(count-1)*parseInt(unitMargin)+'px'}">
    <div class="current-tag" ref="scrollBar" :style="{width:unitWidth}"><i :class="['iconfont icon-play_fill',{up:direction ==='up'}]" :style="{left:(parseInt(unitWidth)/2 - 8) + 'px'}"></i></div>
  </div>
</template>
<script>
  export default {
    // props: ['inWidth', 'inTop','itemWidth','up','marginSize'],
    props: {
      count: {
        type: String,
        default: '1'
      },
      unitWidth: {
        type: String,
        default: '100px'
      },
      barHeight: {
        type: String,
        default: '3px'
      },
      unitMargin: {
        type: String,
        default: '0'
      },
      direction:{
        type: String,
        default: 'down'
      }
    },
    data() {
      return {}
    },
    methods: {
      selectTag(index) {
        this.$refs.scrollBar.style.left = ((parseInt(this.unitWidth) + parseInt(this.unitMargin)) * index) + 'px'
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .indicator
    height: 3px
    background-color: #eee
    border-radius: 2px
    margin-bottom: 20px
    position: relative
    top: 0
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
