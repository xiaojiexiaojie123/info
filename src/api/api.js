import axios from './http.js'

// 注册
export const register = (params) => axios.post('api/users/register', params)

// 登录
export const login = (params) => axios.post('api/users/login', params)

// 创建简历
export const createApply = (params) => axios.post('api/apply/create', params)

// 获取简历
export const getApply = () => axios.post('api/apply/getApply')

// 删除简历
export const deleteApply = (params) => axios.post('api/apply/deleteApply', params)

// 更新简历
export const updateApply = (params) => axios.post('api/apply/updateApply', params)
