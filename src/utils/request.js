// axios网络请求 封装模块
import axios from 'axios'
// 引入json-bigint 把后端返回的长的数字 js一样返回回来 默认是返回不一样的数字太长的话
import jsonBig from 'json-bigint'

// 创建一个axios实例，就是复制一个axios
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基础地址

  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据
  transformResponse: [function (data) {
    try {
      // 如果转换成功，则直接把结果返回
      return jsonBig.parse(data)
    } catch (error) {
      // 转换失败就进入这里
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 任何所有请求都会经过这里
  // config 是当前请求相关的配置信息， config 是可以修改的
  // 统一设置 token
  const user = JSON.parse(window.localStorage.getItem('user'))

  // 有登录用户信息，统一设置token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 这样才能去发送请求，不然一直拦截
  return config
})

// 导出 request
export default request
