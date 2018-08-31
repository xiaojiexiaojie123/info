import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations' // 同步
import * as actions from './actions' // 异步

Vue.use(Vuex)

const state = {
  isAuthenticated: false, // 是否认证
  user: {},
  apply: {}, // 存储用户信息
  loading: false
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
