<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->
    <!--
       表单验证
       1 必须给 el-from 组价绑定 model 为表单数据对象
       2 给需要验证的表单项 el-from-item 绑定 prop属性
         注意:prop 属性需要指定表单对象中的数据名称
       3 通过 el-from 组件的 rules 属性配置验证规则

       手动触发表单验证:
       1 给 el-form 设置 ref 起个名字
       2 通过 ref 获取 el-form 组件，调用组件的 validate 进行验证
      -->
    <el-form
      class="login-form"
      ref="login-form"
      :model="user"
      :rules="rulesFrom"
    >
      <div class="xiaodeng">xiaoDeng头条号</div>
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox class="login-ckb" v-model="user.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="loginLoading"
          @click="onLogin"
          >{{ text }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 同意协议
      },
      loginLoading: false, // 登录的时候loading提示
      text: '登录',
      rulesFrom: {
        // 表单验证规则匹配
        // 要验证的数据名称: 规则列表 []
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: /^1[3|5|6|7|8|9]\d{9}$/,
            message: '手机号码格式错误',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误',
            trigger: 'blur'
          }
        ],
        // 自定义校验规则
        // 验证通过:callback()
        // 验证失败：callback（new Error('ggg')）
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              }
              callback(new Error('请同意协议'))
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据 （根据接口要求绑定数据）
      // const user = this.user

      // 表单验证
      // validate 方法是异步的
      this.$refs['login-form'].validate((val) => {
        // 表单验证失败 停止请求提交
        if (!val) {
          return
        }
        // 表单验证成功 请求登录
        this.login()
      })
    },
    login () {
      this.loginLoading = true
      this.text = '登录中'
      // 请求登录
      request({
        url: '/mp/v1_0/authorizations',
        method: 'POST',
        // data 用来设置POST请求体 请求体里面放的是参数
        data: this.user
      })
        .then((result) => {
          console.log(result)
          // 登录成功
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.loginLoading = false
          this.text = '登录'
        })
        .catch((err) => {
          console.log('登录失败', err)
          // 登录失败
          this.$message.error('登录失败，手机号或验证码错误')
          this.loginLoading = false
          this.text = '登录'
        })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./login_bg.jpg') no-repeat;
  background-size: cover;

  .login-form {
    position: relative;
    width: 300px;
    padding: 50px;
    background-color: #fff;
    .xiaodeng {
      position: absolute;
      top: 15px;
      left: 125px;
      font-size: 18px;
      color: #2692ff;
    }
    .login-ckb {
      color: #a5a3a2;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
