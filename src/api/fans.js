import request from '@/utils/request'

// 获取粉丝列表
export const fansList = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers'
  })
}

// 获取粉丝统计数据
export const fansStatisticsDate = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/statistics/followers'
  })
}