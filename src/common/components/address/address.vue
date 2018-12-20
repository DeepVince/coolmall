<template>
  <div class="address">
    <address-selector></address-selector>
  </div>
</template>

<script>
  import AllAdress from 'common/js/allAddress'
  import AddressSelector from 'common/components/address-selector/addressSelector'
  export default {
    created(){

    },
    methods:{
      getProvinces(){
        Object.keys(AllAdress).forEach(function(key){
          console.log(key,AllAdress[key])
        })
      }
    },
    computed:{
      province(){

      }
    },
    components:{
      AddressSelector
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
