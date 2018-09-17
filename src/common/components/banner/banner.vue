<template>
  <div class="banner" ref="banner" :style="{backgroundImage:'url('+pics[currentIndex].url+')'}">
    <div class="bg-wrapper" :style="{backgroundImage:'url('+pics[currentIndex].url+')'}"></div>
    <ul :style="ulStyle" ref="ul">
      <li>
        <img :src="this.pics[this.pics.length-1].url" alt="">
      </li>
      <li v-for="item in pics">
        <img :src="item.url" alt="">
      </li>
      <li>
        <img :src="this.pics[0].url" alt="">
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    mounted(){
      this.autoPlay()
    },
    data() {
      return {
        currentIndex:0,
        ulStyle:{
          width:'',
          left: '-100%',
          transition: 'left 0.8s'
        },
        pics: [
          {
            url: 'http://pccnvwbyj.bkt.clouddn.com/banner-1.jpg',
            color: ''
          },
          {
            url: 'http://pccnvwbyj.bkt.clouddn.com/banner-2.jpg',
            color: ''
          },
          {
            url: 'http://pccnvwbyj.bkt.clouddn.com/banner-3.jpg',
            color: ''
          },
          {
            url: 'http://pccnvwbyj.bkt.clouddn.com/banner-4.jpg',
            color: ''
          },
          {
            url: 'http://pccnvwbyj.bkt.clouddn.com/banner-5.jpg',
            color: ''
          },
          {
            url: 'http://pccnvwbyj.bkt.clouddn.com/banner-6.jpg',
            color: ''
          }
        ]
      }
    },
    methods: {
      autoPlay(){
        setInterval(function(){
          this.nextItem()
        }.bind(this),4000)
      },
      nextItem(){
        console.log('index:'+this.currentIndex)
        this.ulStyle.left = parseInt(this.ulStyle.left)- 100+ '%'
        console.log(this.ulStyle.left)

        if(this.currentIndex<this.pics.length-1){
          this.ulStyle.transition = 'left 0.8s'
          this.currentIndex++
        }else{
          this.ulStyle.left = parseInt(this.ulStyle.left)- 100+ '%'
          this.currentIndex = 0
        }

        if(parseInt(this.ulStyle.left)<-parseInt((this.pics.length+1)*100)){
          this.ulStyle.transition = 'left 0s'
          console.log(this.$refs.ul.style.transition)
          this.ulStyle.left = '-100%'
        }
      },
      prevItem(){
        this.currentIndex>0 ? this.currentIndex-- : this.currentIndex = pics.length-1
      }
    },
    computed:{

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .banner
    width: 100%
    overflow: hidden
    background: url("http://pccnvwbyj.bkt.clouddn.com/banner-4.jpg") no-repeat
    -webkit-background-size: cover
    background-size: cover
    transition: all 0.8s
    ul
      width: 800%
      height: 100%
      position: relative
      top: 0
      left: 0
      li
        width: 12.5%
        height: 100%
        float: left
        text-align: center
        font-size: 60px
        img
          height: 442px
    .bg-wrapper
      width: 100%
      height: 100%
      background-image: url("http://pccnvwbyj.bkt.clouddn.com/banner-4.jpg")
      background-repeat: no-repeat
      -webkit-background-size: cover
      background-size: cover
      filter: blur(20px)
      transition: all 0.8s
      position: absolute
      top: 0
      left: 0
</style>
