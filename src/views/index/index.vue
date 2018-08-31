<template>
  <div class="index">
    <div class="content">
      <div class="title">学霸在线</div>
      <div class="desc">专注线上教育，用心做课程，用心做服务</div>
      <div class="entry">
        <Button @click="login" type="primary" v-show="!isLogin">登录</Button>
        <Button @click="register" style="margin-left: .1rem" v-show="!isLogin">注册</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    register () {
      this.$router.push({path: '/register'})
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style lang="stylus" scoped>
.index
  margin 0 -1rem
  height 100%
  color #000
  background url('../../assets/showcase.jpg') no-repeat
  background-size cover
  .content
    width 100%
    height 100%
    background-color rgba(0, 0, 0, .5)
    display flex
    flex-direction column
    // justify-content center
    align-items center
    .title
      color #fff
      font-size .5rem
      letter-spacing .2rem
      margin-top 2rem
    .desc
      color #fff
      font-size .16rem
      padding .2rem 0
</style>
