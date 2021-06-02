// axios网络请求 封装模块
import axios from 'axios'

// 创建一个axios实例，就是复制一个axios
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求的基础地址
})

// 导出 request
export default request
