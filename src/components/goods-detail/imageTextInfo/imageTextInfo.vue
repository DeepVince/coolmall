<template>
  <div class="image-text-info select-none">
    <img v-for="item in compData" :key='item.id' :src="item.url" alt="">
  </div>
</template>

<script>
  export default {
    props: {compData: Array},
    data() {
      return {
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
