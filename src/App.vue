<template>
  <div id="app">
    <router-view/>
    <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  created () {
    (function (doc, win) {
      let docEl = doc.documentElement
      let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
      let recalc = function () {
        let clientWidth = docEl.clientWidth
        if (!clientWidth) return
        if (clientWidth < 1300) {
          docEl.style.fontSize = '70px'
        } else {
          docEl.style.fontSize = (100 * clientWidth) / 1920 + 'px'
        }
      }
      if (!doc.addEventListener) return
      win.addEventListener(resizeEvt, recalc, false)
      doc.addEventListener('DOMContentLoaded', recalc, false)
    })(document, window)
  }
}
</script>

<style lang="stylus" scoped>
#app
  height 100%
</style>
