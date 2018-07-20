<template>
  <div id="app">
    <header-tips></header-tips>
    <header-search></header-search>
    <router-view/>
    <main-footer></main-footer>
  </div>
</template>

<script>
  import HeaderTips from 'common/components/header-tips/headerTips'
  import HeaderSearch from 'common/components/header-search/headerSearch'
  import Index from 'components/index/index'
  import MainFooter from 'common/components/main-footer/mainFooter'
  export default {
    name: 'App',
    components: {
      HeaderTips,HeaderSearch,Index,MainFooter
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  @import "~common/css/variable.styl"
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    background-color: $background_main

</style>
