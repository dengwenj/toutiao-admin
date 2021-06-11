<template>
  <div class="">
    <el-row>
      <el-col :span="15" :xs="24">
        <el-form
          ref="userSettings"
          :model="userSettings"
          :rules="userSettings_form"
          label-width="80px"
        >
          <el-form-item label="编号">{{ userSettings.id }}</el-form-item>
          <el-form-item label="手机">{{ userSettings.mobile }}</el-form-item>
          <el-form-item label="媒体名称" prop="name">
            <el-input v-model="userSettings.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍" prop="intro">
            <el-input type="textarea" v-model="userSettings.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userSettings.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">更新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="9">
        <div class="updataimage" @click="$refs.file.click()">
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            :src="userSettings.photo"
          ></el-avatar>
          <p>修改头像</p>
          <input type="file" hidden ref="file" @change="onChangeFile" />
        </div>
      </el-col>
    </el-row>
    <el-dialog title="修改头像" :visible.sync="dialogVisible" append-to-body>
      <img width="150px" :src="blobData" alt="" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 网络请求
import { upDataUser } from '@/api/user'

export default {
  name: '',
  components: {},
  props: {
    user: {
      type: Object,
      defalut() {
        return {}
      },
    },
  },
  data() {
    return {
      userSettings: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        phtot: '',
      },
      dialogVisible: false, // 控制上传图片裁切预览的显示状态
      blobData: '', // 上传图片的地址
      // 校验
      userSettings_form: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' },
        ],
        intro: [
          {
            validator(rule, value, callback) {
              if (value === '') {
                callback(new Error('请输入媒体介绍'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式输入不正确',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {},
  watch: {
    user(value) {
      this.userSettings = value
    },
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      // 对整个表单进行校验的方法 通过的话发送请求 不通过不发送请求
      this.$refs['userSettings'].validate((val, object) => {
        if (!val) {
          return
        } else {
          // 发送请求
          upDataUser({
            name: this.userSettings.name,
            intro: this.userSettings.intro,
            email: this.userSettings.email,
          }).then((res) => {
            // 更新成功 刷新页面
            location.reload()
          })
          this.$message({
            type: 'success',
            message: '更新成功',
          })
        }
      })
    },

    onChangeFile() {
      // 处理图片预览
      const file = this.$refs.file
      console.log(file.files[0]) // 拿到这个文件了
      const blobData = window.URL.createObjectURL(file.files[0])
      this.blobData = blobData

      // 展示弹出层，预览用户选择的图片
      this.dialogVisible = true

      // 解决选择相同文件不触发 change 事件问题 每次把它的value值为空就触发 change 事件了
      this.$refs.file.value = ''
    },
  },
}
</script>

<style scoped lang="less">
.updataimage {
  text-align: center;
}
</style>
