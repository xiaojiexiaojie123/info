import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'
import Index from '@/views/index/index'
import Login from '@/views/login/login'
import Register from '@/views/register/register'
import Person from '@/views/person/person'
import addApply from '@/views/addApply/addApply'
import Basic from '@/views/addApply/child/basic'
import Education from '@/views/addApply/child/education'
import PersonInfo from '@/views/addApply/child/person'
import Practice from '@/views/addApply/child/practice'

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '*'
      // redirect: '/'
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: 'index',
      children: [
        {
          name: 'index',
          path: 'index',
          component: Index
        },
        {
          path: 'person',
          component: Person
        },
        {
          path: 'addApply',
          component: addApply,
          redirect: '/addApply/basic',
          children: [
            {
              path: 'basic',
              component: Basic
            },
            {
              path: 'education',
              component: Education
            },
            {
              path: 'personInfo',
              component: PersonInfo
            },
            {
              path: 'practice',
              component: Practice
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ],
  mode: 'history'
})

// 全局守卫
route.beforeEach((to, from, next) => {
  // 获取token
  let isLogin = null

  if (sessionStorage.jwtToken) {
    isLogin = true
  } else {
    isLogin = false
  }

  if (to.path === '/' || to.path === '/index' || to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default route
