<template>
  <div class="wrap">
    <NavBar></NavBar>
    <div class="routerView">
      <router-view></router-view>
    </div>
    <!-- <NavFoot></NavFoot> -->
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import NavBar from '@/components/navBar'
import NavFoot from '@/components/foot'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  components: {
    NavBar,
    NavFoot
  },
  created () {
    if (sessionStorage.jwtToken) {
      const decode = jwtDecode(sessionStorage.jwtToken)

      const currentTime = Date.now() / 1000

      if (decode.exp < currentTime) {
        // this.$store.dispatch('setIsAuthenticated', false)
        // this.$store.dispatch('setUser', {})
        this.$store.dispatch('clearCurrentState')

        this.$Modal.warning({
          title: '登录过期，请重新登录',
          onOk: () => {
            this.$router.push('/login')
          }
        })
      } else {
        this.$store.dispatch('setIsAuthenticated', !this.isEmpty(sessionStorage.jwtToken))
        this.$store.dispatch('setUser', decode)
      }
    }
  },
  methods: {
    isEmpty (value) {
      return value === 'underfind' || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrap
  height 100%
  min-width 1024px
  .routerView
    height 100%
    margin-top .72rem
    padding 0 1rem
</style>
