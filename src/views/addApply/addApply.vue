<template>
  <div class="add">
    <div class="title">
      编辑简历
    </div>

    <div class="step">
      <Steps :current="current">
        <Step title="步骤1"></Step>
        <Step title="步骤2"></Step>
        <Step title="步骤3"></Step>
        <Step title="步骤4"></Step>
      </Steps>
    </div>
    <div class="routerView">
      <router-view></router-view>
    </div>
    

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      current: 0
    }
  },
  methods: {
    next () {
      if (this.current === 3) {
        this.current = 0
      } else {
        this.current += 1
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.add
  // background-color #fff
  .title
      font-size .26rem
      padding .4rem 0
      position relative
    .title::before
      position absolutek
      content ''
      height .26rem
      border 1px solid #0068f1
      margin-right .1rem
  .step
    margin 0 auto .5rem
    p
      padding .1rem 0
      font-size .14rem
  .routerView
    display flex
    justify-content center
  
</style>
