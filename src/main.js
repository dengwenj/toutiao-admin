/*
   项目的启动入口
*/

import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入 element 组件库
import ElementUl from 'element-ui'

// 导入element组件库样式文件
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式文件
import './styles/index.less'

// 全局注册element组件库 安装插件
Vue.use(ElementUl)

Vue.config.productionTip = false

// 创建Vue根实例
// 把router配置到根实例中
// 通过render方法吧App根组件渲染到#app入口节点
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')