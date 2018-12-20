<template>
  <div class="comments-list">
    <div class="overview clear-fix">
      <div class="evaluation-block degree-of-satisfaction">
        <h2><em>{{compData.wonderfulRate}}</em>%</h2>
        <p>用户感到满意</p>
      </div>
      <div class="evaluation-block degree-of-highest-star">
        <h2><em>{{compData.bestRate}}</em>%</h2>
        <p>最佳5星好评</p>
      </div>
      <div class="user-impression">
        <h2>大家印象</h2>
        <div class="impression-list">
          <ul class="clear-fix">
            <li v-for="item in compData.impressions">{{item.text}}({{item.count}})</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="comments">
      <div class="comment-tab">
        <ul class="clear-fix">
          <li>全部({{compData.statistic.all}})</li>
          <li>晒图({{compData.statistic.withPic}})</li>
          <li>追评({{compData.statistic.addAfter}})</li>
        </ul>
      </div>
      <div class="list-display">
        <ul>
          <li v-for='aComment in compData.commentsList' :key='aComment.user.id' class="clear-fix">
            <div class="head-portrait clear-fix">
              <img :src="aComment.user.headPortraitUrl" alt="">
              <div class="name-ratings">
                <h3 class="user-name">{{aComment.user.name}}</h3>
                <span>
                  <i class="iconfont icon-collection_fill"></i><i class="iconfont icon-collection_fill"></i><i class="iconfont icon-collection_fill"></i><i class="iconfont icon-collection_fill"></i><i
                  class="iconfont icon-collection_fill"></i>
                </span>
              </div>
            </div>
            <div class="comment-content">
              <div class="user-comment">
                <p class="user-comment-text">{{aComment.comment.content}}</p>
                <div class="user-comment-pic clear-fix" ref="commentPics" @click="selectPic">
                  <img v-for='aImg in aComment.comment.pics' :src="aImg.url" alt="" :key="aImg.id">
                </div>
              </div>
              <div class="seller-reply">
                <i class="iconfont icon-play_fill"></i>
                <span>商家回复：</span>
                <span class="reply-content">{{aComment.comment.reply.content}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <pic-look ref="picLook"></pic-look>
  </div>
</template>

<script>
  import PicLook from 'common/components/picLook/picLook'

  export default {
    props: {compData: Object},
    data() {
      return {
      }
    },
    methods: {
      selectPic(event) {
        const e = event || window.event
        const target = e.target
        if(target.tagName === 'IMG'){
          const list = target.parentNode.children
          const imgList = []
          let index = 0
          for(let i=0;i<list.length;i++){
            if(target === list[i]){
              index = i
            }
            imgList.push({id:i,url:list[i].src})
          }
          this.$refs.picLook.show(imgList,index)
        }
      }
    },
    components: {
      PicLook
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .comments-list
    width: 100%
    padding: 30px 0
    font-family: 'Microsoft YaHei'
    .overview
      .evaluation-block
        width: 100px
        height: 100px
        margin-left: 50px
        color: #333
        float: left
        h2
          width: 100%
          font-size: 18px
          color: $theme_color
          margin-bottom: 10px
          em
            font-size: 48px
            font-style: normal
        p
          font-size: 14px
          color: #999
      .user-impression
        float: left
        margin-left: 80px
        h2
          font-size: 14px
          font-weight: bold
          color: #bbb
        .impression-list
          margin-top: 20px
          ul
            li
              float: left
              padding: 12px 30px
              border-radius: 3px
              color: #666
              margin-right: 20px
              cursor: pointer
              font-size: 14px
              border: 1px solid #ddd
            li:hover
              color: $theme_second_color
              border: 1px solid $theme_second_color
    .comments
      .comment-tab
        width: 100%
        background-color: #f9f9f9
        ul
          margin-left: 380px
          li
            float: left
            line-height: 36px
            margin-right: 50px
            font-size: 14px
            font-family: 'PingFang SC'
            cursor: pointer
            color: #333
          li:last-child
            margin-right: 0
          li:hover
            color: $theme_second_color
      .list-display
        padding: 50px 20px 30px 120px
        ul
          li
            margin-bottom: 40px
            .head-portrait
              float: left
              img
                display: block
                width: w = 48px
                height: w
                border-radius: 50%
                float: left
              .name-ratings
                margin-left: 20px
                float: left
                h3
                  font-size: 16px
                  line-height: 24px
                  margin-bottom: 6px
                  color: #333
                span
                  i
                    font-size: 18px
                    color: $theme_color
            .comment-content
              float: left
              max-width: 700px
              margin-left: 60px
              .user-comment
                .user-comment-text
                  line-height: 24px
                  color: #333
                  margin-bottom: 20px
                .user-comment-pic
                  width: 100%
                  max-width: 700px
                  max-height: 80px
                  overflow: hidden
                  img
                    width: w = 80px
                    height: w
                    margin-right: 20px
                    cursor: pointer
                  img:last-child
                    margin-right: 0
              .seller-reply
                width: 100%
                padding: 20px
                position: relative
                top: 0
                left: 0
                color: #999
                background-color: c = #f3f3f3
                margin-top: 30px
                line-height: 24px
                i
                  transform: rotateZ(-90deg)
                  position: absolute
                  top: -13px
                  left: 50px
                  color: c
                .reply-content
                  color: #666
</style>
