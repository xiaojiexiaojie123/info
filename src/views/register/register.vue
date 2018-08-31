<template>
  <div class="wrap">
    <div class="shadow">
      <div class="register">
        <div class="top">
          注册
        </div>
        <div class="pannel">
          <div class="left"></div>
          <div class="right">
            <div class="title">
              账号注册
            </div>
            <div class="input">
              <Form ref="user" :model="user" :rules="ruleUser">
                <FormItem label="" prop="name">
                  <Input type="text" v-model="user.name" placeholder="请输入用户名" icon="person" long />
                </FormItem>
                <FormItem label="" prop="email">
                  <Input type="text" v-model="user.email" placeholder="请输入邮箱" icon="person" long />
                </FormItem>
                <FormItem label="" prop="password">
                  <Input type="password" v-model="user.password" placeholder="请输入密码" icon="ios-locked" long />
                </FormItem>
                <FormItem label="" prop="password2">
                  <Input type="password" v-model="user.password2" placeholder="请输入确认密码" icon="ios-locked" long />
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmit('user')" long>注册</Button>
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
import { register } from '@/api/api'
export default {
  name: 'register',
  data () {
    const validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validateUserEmail = (rule, value, callback) => {
      let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!mailReg.test(value)) {
        callback(new Error('邮箱非法'))
      } else {
        callback()
      }
    }
    const validatePsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (this.user.password2 !== '') {
        console.log(this.user.password2)
        console.log(111)
        this.$refs.user.validateField('password2')
        callback()
      } else if (value.length < 6) {
        callback(new Error('密码长度不少于6位'))
      } else if (value.length > 16) {
        callback(new Error('密码长度不超过16位'))
      }
    }
    const validateConPsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password2: ''
      },
      ruleUser: {
        name: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        email: [
          { validator: validateUserEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePsw, trigger: 'blur' }
        ],
        password2: [
          { validator: validateConPsw, trigger: 'blur' }
        ]
      },
      rememberPsw: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const res = register(this.user)
          res.then(result => {
            if (result.data) {
              // 执行actions异步操作
              this.$store.dispatch('setUser', result.data)
              this.$Message.success('注册成功')
              this.$router.push('/index')
            }
          })
        }
      })
    }
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
    .register
      width 700px
      height 400px
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
          width 300px
          height 260px
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
