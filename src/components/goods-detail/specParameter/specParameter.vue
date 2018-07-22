<template>
  <div class="spec-parameter">
    <div class="simple-props">
      <ul class="simple-props-list">
        <li v-for="item in allParameters" :key='item.id' class="simple-props-item clear-fix">
          <h2>{{item.nameZh}}</h2>
          <div class="detail-props">
            <ul class="detail-props-list">
              <li v-for="prop in item.detailParameters" :key="prop.id" class="detail-props-item">
                <span class="prop-key">{{prop.nameZh}}：</span>
                <span class="prop-value">{{prop.value}}</span>
              </li>
              <li v-for='info in item.descInfo' :key='info.id' class="desc-info-list">
                <span class="desc-info">{{info.content}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import datas from 'mock-data/goodsDetail'

  export default {
    data() {
      return {
        allParameters: datas.allParameters
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .spec-parameter
    width: 100%
    color: #666
    font-family: 'Microsoft YaHei'
    .simple-props
      width: 100%
      padding: 40px 20px 40px 80px
      .simple-props-list
        .simple-props-item
          border-bottom: 1px dashed #ccc
          margin-bottom: 30px
          h2
            width: 180px
            font-size: 20px
            color: #333
            float: left
            font-weight: lighter
          .detail-props
            padding: 0 80px
            float: left
            margin-bottom: 10px
            .detail-props-list
              .detail-props-item
                margin-bottom: 6px
                span
                  display: inline-block
                  vertical-align: top
                .prop-value
                  max-width: 500px
                  line-height: 30px
                  position: relative
                  top: -6px
                  left: 0
              .desc-info-list
                .desc-info
                  display: inline-block
                  line-height: 30px
                  position: relative
                  top: -6px
                  left: 0
                  max-width: 700px

</style>
