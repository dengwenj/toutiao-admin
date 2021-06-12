/* 
  全局事件通信中心
  // 作用: 可以让任何组件之间相互通信
  事件总线
  在 Vue 原型上加个方法也可以
*/

import Vue from "vue";

export default new Vue()

// globalBus.$emit('自定义事件',canshu)  发布的

// globalBus.$on('自定义事件',(canshu)=>{})  注册的