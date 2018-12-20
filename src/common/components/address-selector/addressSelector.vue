<template>
  <div class="address-selector">
    <div class="name-phone clear-fix">
      <div class="user-name">
        <el-input v-model="userName" placeholder="姓名"></el-input>
      </div>
      <div class="user-phone">
        <el-input v-model="userPhone" placeholder="电话"></el-input>
      </div>
    </div>
    <div class="position">
      <div class="position-select clear-fix">
        <div class="select">
          <el-select v-model="currentProvince" @change="provinceChange" placeholder="省">
            <el-option :key="p.id"
                       :value="p.name"
                       :label="p.name"
                       v-for="p in province"></el-option>
          </el-select>
        </div>
        <div class="select">
          <el-select v-model="currentCity" @change="cityChange" placeholder="市">
            <el-option :key="ci.id"
                       :value="ci.name"
                       :label="ci.name"
                       v-for="ci in city"></el-option>
          </el-select>
        </div>
        <div class="select">
          <el-select v-model="currentCounty" placeholder="县/区">
            <el-option :key="co.id"
                       :value="co.name"
                       :label="co.name"
                       v-for="co in county"></el-option>
          </el-select>
        </div>
      </div>
      <div class="position-detail">
        <el-input v-model="detailAddress" class="detail-address" placeholder="小区/街道  等详细地址信息"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
  import allAddress from "../../js/allAddress"

  export default {
    data() {
      return {
        userName: '',
        userPhone: '',
        currentProvince: '',
        currentCity: '',
        currentCounty: '',
        detailAddress: ''
      }
    },
    computed: {
      province() {
        let array = []
        Object.keys(allAddress).forEach(function (key) {
          let obj = {id: '', name: ''}
          obj.id = key
          obj.name = allAddress[key].name
          array.push(obj)
        })
        return array
      },
      city() {
        let array = []
        const that = this
        Object.keys(allAddress).forEach(function (key) {
          if (allAddress[key].name === that._data.currentProvince) {
            const children = allAddress[key].child
            Object.keys(children).forEach(function (key1) {
              let tempCity = {}
              tempCity.id = key1
              tempCity.name = children[key1].name
              array.push(tempCity)
            })
          }
        })
        return array
      },
      county() {
        let array = []
        const that = this
        Object.keys(allAddress).forEach(function (key) {
          if (allAddress[key].name === that._data.currentProvince) {
            const cities = allAddress[key].child
            Object.keys(cities).forEach(function (key1) {
              if (cities[key1].name === that._data.currentCity) {
                const counties = cities[key1].child
                Object.keys(counties).forEach(function (key2) {
                  let tempCounty = {}
                  tempCounty.id = key2
                  tempCounty.name = counties[key2]
                  array.push(tempCounty)
                })
              }
            })
          }
        })
        return array
      }
    },
    methods: {
      provinceChange() {
        this.currentCity = ''
        this.currentCounty = ''
      },
      cityChange() {
        this.currentCounty = ''
      },
      validateAddress() {
        return (
          this.currentProvince !== ''
          && this.currentCity !== ''
          && this.currentCounty !== ''
          && this.detailAddress !== '')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/variable.styl"
  .address-selector
    .name-phone
      margin-bottom: 20px
      .user-name
        float: left
        width: 220px
      .user-phone
        float: left
        width: 220px
        margin-left: 20px
    .position
      margin-bottom: 20px
      .position-select
        .select
          float: left
          margin-right: 20px
      .detail-address
        width: 360px
        margin-top: 20px
</style>
