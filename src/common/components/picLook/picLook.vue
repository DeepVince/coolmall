<template>
  <transition name="fade">
    <div class="pic-look" v-show="shouldShow">
      <div class="bg-wrapper" @click="bgClick" ref="wrap">
        <div class="look-box" ref="box">
          <i class="btn-close iconfont icon-close" @click="this.hide"></i>
          <div class="show-area">
            <ul class="clear-fix" ref="imgUl" :style="{left:-(currentIndex*showWidth) + 'px'}">
              <li v-for="item in pics"><img :src="item.url" alt=""></li>
            </ul>
          </div>
          <span class="count-tip">
            <em class="currentIndex">{{currentIndex+1}}</em>&nbsp;/&nbsp;<em class="amount">{{pics.length}}</em>
          </span>
          <span class="btn-switch prev-img" @click="prevImg" v-show="currentIndex > 0"><i class="iconfont icon-fanhui"></i></span>
          <span class="btn-switch next-img" @click="nextImg" v-show="currentIndex < pics.length-1"><i class="iconfont icon-gengduo"></i></span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        shouldShow: false,
        pics: [],
        currentIndex: 0,
        showWidth: 600
      }
    },
    methods: {
      show(picList, i) {
        if (picList && picList.length && picList.length > 0) {
          this.pics = picList
          this.currentIndex = i
          // 调整ul left以显示当前index下标的图片
          this.$refs.imgUl.style.left = -(this.showWidth * i) + 'px'
          this.shouldShow = true
        }
      },
      hide() {
        this.shouldShow = false
      },
      bgClick(event) {
        const e = event || window.event
        if (e.target === this.$refs.wrap) {
          this.hide()
        }
      },
      prevImg() {
        if (this.currentIndex > 0) {
          this.currentIndex --
          console.log(this.showWidth)
        }
      },
      nextImg() {
        if (this.currentIndex < this.pics.length-1) {
          this.currentIndex ++
          console.log(this.showWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  myWidth = 800px
  myHeight = 600px
  showWidth = 600px
  .pic-look
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    .bg-wrapper
      width: 100%
      height: 100%
      background-color: rgba(28, 28, 28, .1)
      .look-box
        width: myWidth
        height: myHeight
        background-color: #fff
        overflow: hidden
        border-radius: 5px
        padding: 60px 0
        position: absolute
        top: 50%
        left: 50%
        margin-left: -(myWidth/ 2)
        margin-top: -(myHeight/ 2)
        .btn-close
          display: block
          position: absolute
          top: t = 16px
          right: t
          font-size: 30px
          color: #666
          cursor: pointer
          transition: all .3s
        .btn-close:hover
          transform: rotateZ(180deg)
        .show-area
          width: showWidth
          height: 100%
          margin: 0 auto
          overflow: hidden
          ul
            width: 400%
            height: 100%
            position: relative
            top: 0
            left: 0
            transition: all .5s
            li
              width: 25%
              height: 100%
              float: left
              background-color: #fff
              img
                display: block
                width: 80%
                height: 100%
                margin: 0 auto
        .count-tip
          display: block
          width: 50px
          text-align: center
          margin: 0 auto
          margin-top: 20px
          font-size: 18px
          color: #666
          em
            font-style: normal
        .btn-switch
          width: 30px
          height: h = 80px
          text-align: center
          line-height: 80px
          /*background-color: #f1f1f1*/
          margin-top: -(h/ 2)
          cursor: pointer
          position: absolute
          top: 50%
          i
            display: block
            font-size: 28px
            color: #666
            transition: all .3s
        .prev-img
          left: 50px
        .next-img
          right: 50px
        .btn-switch:hover i
          color: $theme_second_color
          transform: scale(1.3)

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
