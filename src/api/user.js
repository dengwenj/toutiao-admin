/*
  用户相关请求模块
*/

import request from '@/utils/request'

// 用户登录
export function login(data) {
  // 请求登录
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    // data 用来设置POST请求体 请求体里面放的是参数
    data
  })
}

// 用户个人资料
export function getUserProfile() {
  // 本体储存了 可以在任何地方用来了
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'GET'
      // 后端要求授权的用户身份放到请求头中
      // axios 可以通过 headers 选项设置请求头
      // headers: {
      //   Authorization: `Bearer ${user.token}`
      // }
  })
}

// 修改用户资料
export function upDataUser(data) {
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}