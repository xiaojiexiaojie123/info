<template>
  <div class="wrap">
    <div class="shadow">
      <div class="login">
        <div class="top">
          登录
        </div>
        <div class="pannel">
          <div class="left"></div>
          <div class="right">
            <div class="title">
              账号登陆
            </div>
            <div class="input">
              <Form ref="user" :model="user" :rules="ruleUser">
                <FormItem label="" prop="email">
                  <Input v-model="user.email" placeholder="请输入邮箱" icon="person" />
                </FormItem>
                <FormItem label="" prop="password">
                  <Input type="password" v-model="user.password" placeholder="请输入密码" icon="ios-locked" />
                </FormItem>
                <div class="psw">
                  <div class="remember">
                    <Checkbox v-model="rememberPsw" style="color:#ccc">记住密码</Checkbox>
                  </div>
                  <div class="forget">
                    忘记密码?
                  </div>
                </div>
                <FormItem>
                  <Button type="primary" @click="handleSubmit('user')" long>登陆</Button>
                  <div style="height: 20px">
                    <span v-show="err" style="color: red">账号或密码错误,请重新输入</span>
                  </div>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { login } from '@/api/api'
import {setCookie, getCookie} from '@/common/js/cookie'
export default {
  name: 'login',
  data () {
    const validatePsw = (rule, value, callback) => {
      this.err = false
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不少于6位'))
      } else if (value.length > 16) {
        callback(new Error('密码长度不超过16位'))
      } else {
        callback()
      }
    }
    const validateUserEmail = (rule, value, callback) => {
      this.err = false
      let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!mailReg.test(value)) {
        callback(new Error('邮箱非法'))
      } else {
        callback()
      }
    }
    return {
      user: {
        email: '',
        password: ''
      },
      ruleUser: {
        email: [
          { validator: validateUserEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePsw, trigger: 'blur' }
        ]
      },
      rememberPsw: false,
      err: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const res = login(this.user)
          res.then(result => {
            if (result) {
              // 存储token
              window.sessionStorage.setItem('jwtToken', result.token)
              // 解析token
              const decode = jwtDecode(result.token)
              console.log(decode)
              this.$store.dispatch('setIsAuthenticated', !this.isEmpty(decode))
              this.$store.dispatch('setUser', decode)
              setCookie('xp_userEmail', this.user.email, 7)
              this.cookie()
              this.$router.push('/index')
            }
          }).catch(err => {
            if (err.response) {
              this.err = err.response.data
            }
          })
        }
      })
    },
    isEmpty (value) {
      return value === 'underfind' || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)
    },
    getCookies () {
      this.user.email = getCookie('xp_userEmail')
      this.user.password = getCookie('xp_password')
      if (getCookie('xp_status') === '1') {
        this.rememberPsw = true
      }
    },
    cookie () {
      if (this.rememberPsw === true) {
        setCookie('xp_status', '1', 7)
        setCookie('xp_password', this.user.password, 7)
      } else {
        setCookie('xp_password', '', -1)
        this.user.password = ''
        setCookie('xp_status', '', -1)
      }
    }
  },
  created () {
    this.getCookies()
  }
}
</script>

<style lang="stylus" scoped>
.wrap
  width 100%
  height 100%
  background url('../../assets/showcase.jpg') no-repeat
  background-size cover
  .shadow
    width 100%
    height 100%
    background-color rgba(0, 0, 0, .5)
    display flex
    justify-content center
    align-items center
    .login
      width 700px
      height 340px
      border-radius 6px
      background-color: #fff
      .top
        width 100%
        height 54px
        display flex
        justify-content center
        align-items center
        font-size 30px
        color #010101
      .pannel
        display flex
        justify-content center
        align-items center
        margin-top 2px
        .left
          width 260px
          height 220px
          border-radius 6px
          overflow hidden
          margin-right 30px
          background-image url('https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=6afa84c2f1faaf519be387bfbc5694ed/738b4710b912c8fc672fda29f0039245d7882171.jpg')
          background-repeat no-repeat
          background-size 100% 100%
        .right
          width 220px
          .title
            height 30px
            color #1990ff
            border-bottom 1px solid #1990ff
            text-align center
            line-height 30px
            font-size 14px
            margin-bottom 20px
          .input
            form
              .psw
                height 26px
                display flex
                justify-content space-between
                .forget
                  color #ccc
                  cursor pointer
</style>
