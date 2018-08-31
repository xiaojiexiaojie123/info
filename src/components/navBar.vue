<template>
  <div class="top">
    <div class="left">
      <div class="name" @click.prevent="toIndex">
        米修在线
      </div>
      <div class="development">
        开发者
      </div>
    </div>
    <div class="right">
      <div class="index" v-show="isLogin" @click.prevent="toPerson">个人中心</div>
      <div class="user">
        <div class="userPic" v-if="user !== null && isLogin">
          <img :src="user.avatar" alt="">
        </div>
        <div class="username" :title="user.name" v-if="user !== null">
          {{ user.name }}
        </div>
      </div>
      <div class="exit" v-show="isLogin" @click="logout">
        退出
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    logout () {
      this.$Modal.confirm({
        title: '确认要退出吗？',
        onOk: () => {
          sessionStorage.removeItem('jwtToken')
          // this.$store.dispatch('setIsAuthenticated', false)
          // this.$store.dispatch('setUser', {})
          this.$store.dispatch('clearCurrentState')
          this.$router.push('/index')
        }
      })
    },
    toPerson () {
      this.$router.push('/person')
    },
    toIndex () {
      this.$router.push('/index')
    }
  },
  computed: {
    isLogin () {
      if (this.$store.getters.isAuthenticated === true) {
        return true
      } else {
        return false
      }
    },
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="stylus" scoped>
.top
  min-width 1024px
  position fixed
  top 0
  z-index 99
  width 100%
  height .72rem
  box-sizing border-box
  background-color rgba(29, 29, 29, .8)
  display flex
  justify-content space-between
  align-items center
  padding 0 1rem
  .left
    display flex
    align-items center
    .name
      font-size .2rem
      font-weight 700
      color #fefefe
      cursor pointer
    .development
      font-size .16rem
      margin-left .2rem
      color #fefefe
  .right
    display flex
    align-items center
    .index, .exit
      font-size .16rem
      color #fefefe
      cursor pointer
    .index:hover, .exit:hover
      color #ccc
    .index
      margin-right .3rem
    .exit
      margin-left .3rem
      padding-left .3rem
      background-image url('../assets/exit.png')
      background-size .2rem .22rem
      background-position left center
      background-repeat no-repeat
    .user
      display flex
      align-items center
      .userPic
        width .46rem
        height  .46rem
        border-radius 50%
        overflow hidden
        img
          border none
          width 100%
          height 100%
      .username
        color #fefefe
        font-size .16rem
        margin-left .1rem
</style>
