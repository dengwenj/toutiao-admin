/*
  用户相关请求模块
*/

import request from '@/utils/request'

// 用户登录
export function login (data) {
  // 请求登录
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    // data 用来设置POST请求体 请求体里面放的是参数
    data
  })
}
