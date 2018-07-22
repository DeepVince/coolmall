<template>
  <div class="image-text-info select-none">
    <img v-for="item in picList" :key='item.id' :src="item.url" alt="">
  </div>
</template>

<script>
  import list from 'mock-data/goodsDetail'
  export default {
    data(){
      return {
        picList: list.imageTextInfoPicList
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .image-text-info
    width: 100%
    img
      display: block
      width: 100%
</style>
