/* 
  素材请求相关模块
*/

import request from '@/utils/request'

// 上传用户图片素材
export const uploadImage = data => {
  // 一般文件上传的接口都要求把请求头中的 Content-Type设置为multipart/form-data，但是我们使用 axios 上传文件的话不需要手动设置，只要给 data 一个FormData 对象即可
  // new FormData
  return request({
    url: '/mp/v1_0/user/images',
    method: 'POST',
    data
  })
}

// 获取素材列表
export const getImages = params => {
  return request({
    url: '/mp/v1_0/user/images',
    method: 'GET',
    params
  })
}

// 收藏素材列表
export const collectImage = (imgID, collect) => {
  return request({
    url: `/mp/v1_0/user/images/${imgID}`,
    method: 'PUT',
    data: {
      collect
    }
  })
}

// 删除素材
export const collectDelete = (deteleId) => {
  return request({
    url: `/mp/v1_0/user/images/${deteleId}`,
    method: 'DELETE',
  })
}