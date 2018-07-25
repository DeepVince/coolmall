<template>
  <div class="count" ref="outsideDiv" :style="{height:cssSet.myHeight+'px'}">
    <span class="op subtraction select-none" @click="subtraction" ref="ops" :style="{width:cssSet.btWidth+'px'}">-</span><input type="text" value="1" v-model="value" @keyup="adjust" ref="inputArea" :style="{width:cssSet.inputWidth+'px'}"><span class="op add select-none" @click="add" ref="opa" :style="{width:cssSet.btWidth+'px'}">+</span>
  </div>
</template>

<script>
  export default {
    props: ['cWidth', 'cHeight', 'maxV', 'minV'],
    data() {
      return {
        value: 1,
        minValue: 1,
        maxValue: 10,
        cssSet:{
          myHeight: 30,
          btWidth: 30,
          inputWidth: 50
        }
      }
    },
    created: function () {
      this.value = this.minV || 1
      this.minValue = this.minV || 1
      this.maxValue = this.maxV || 10

    },
    mounted: function () {
      this.$refs.outsideDiv.style.height = this.cHeight
      this.$refs.ops.style.lineHeight = this.cHeight
      this.$refs.opa.style.lineHeight = this.cHeight
      this.$refs.inputArea.style.width = this.cWidth
    },
    methods: {
      adjust() {
        if (/^[1-9][0-9]*[0-9]$/.test(this.value)) {
          const val = parseInt(this.value)
          if (val > this.maxValue) {
            this.value = this.maxValue
          } else if (val < this.minValue) {
            this.value = this.minValue
          } else {
            this.value = val
          }
        } else {
          this.value = 1
        }
      },
      add() {
        if (this.value < this.maxValue) {
          this.value++
        } else {
          this.value = this.maxValue
        }
      },
      subtraction() {
        if (this.value > this.minValue) {
          this.value--
        } else {
          this.value = this.minValue
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  initHeight = 36px
  .count
    height: initHeight
    .op
      display: inline-block
      width: 40px
      height: 100%
      line-height: 100%
      background-color: #eee
      font-size: 24px
      color: #999
      cursor: pointer
      text-align: center
    input
      display: inline-block
      width: 120px
      height: 100%
      line-height: 100%
      background-color: #fbfbfb
      vertical-align: top
      padding: 0 10px
      text-align: center
      font-family: 'lato'
</style>
