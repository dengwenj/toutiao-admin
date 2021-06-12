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
            <el-button type="primary" :loading="loadingUpdate" @click="onSubmit"
              >更新</el-button
            >
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
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="cropper_div">
        <img class="cropper_img" :src="blobData" ref="preview-image" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdateImg" :loading="loadingUpdate"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 网络请求
import { upDataUser, upDateImg } from '@/api/user'

// 事件总线
import globalBus from '@/utils/global-bus'

// 图片裁剪
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

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
      cropper: null, // 裁切器实例
      loadingUpdate: false, // 点击确定 loading
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
      // 开启 loading
      this.loadingUpdate = true

      // 对整个表单进行校验的方法 通过的话发送请求 不通过不发送请求
      this.$refs['userSettings'].validate((val, object) => {
        if (!val) {
          return
        } else {
          // 发送请求
          upDataUser({
            // 这里也可以用解构
            // const {name,intro,email} = this.userSettings
            name: this.userSettings.name,
            intro: this.userSettings.intro,
            email: this.userSettings.email,
          }).then((res) => {
            // 更新成功 刷新页面
            // location.reload()
            // 关闭 loading
            this.loadingUpdate = false
          })

          // 事件总线  更新顶部登录用户的信息
          globalBus.$emit('update-user', this.userSettings)

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

    onDialogOpened() {
      // 图片裁剪器必须基于 img 进行初始化
      // 注意: img 必须是可见状态才能正常完成初始化
      //   因为我们这里要在对话框里面初始化裁剪器
      //   所以务必要在对话框完全打开的状态去进行初始化

      // 第一次初始化好以后，如果预览裁切的图片发生了变化，裁切器默认不会更新
      // 如果需要预览图片发生变化更新裁切器
      //   方式一: 裁切器 .replace方法
      //   方式二: 销毁裁切器，重新初始化
      // if (this.cropper) {
      //   // 方式一
      //   this.cropper.replace(this.blobData)
      //   return
      // }
      // Vue中操作dom通过ref
      const image = this.$refs['preview-image']
      // const image = document.getElementById('image')
      this.cropper = new Cropper(image, {
        // 配置
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: '1',
        cropBoxMovable: true,

        // 当移动裁切器的时候会触发调用 crop 方法
        crop(event) {
          // console.log(event.detail.x)
          // console.log(event.detail.y)
          // console.log(event.detail.width)
          // console.log(event.detail.height)
          // console.log(event.detail.rotate)
          // console.log(event.detail.scaleX)
          // console.log(event.detail.scaleY)
        },
      })
    },

    onDialogClosed() {
      // 对话框关闭，销毁裁切器  方式二
      this.cropper.destroy()
    },

    onUpdateImg() {
      // 开启loading
      this.loadingUpdate = true
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const fd = new FormData()
        fd.append('photo', file)
        // 请求更新用户头像
        upDateImg(fd).then((res) => {
          // 关闭对话框
          this.dialogVisible = false
          // 更新试图展示
          this.userSettings.photo = window.URL.createObjectURL(file) // api 里面传的是文件

          // 关闭loading
          this.loadingUpdate = false

          this.$message({
            type: 'success',
            message: '修改头像成功',
          })

          // 事件总线 更新顶部登录用户的信息
          globalBus.$emit('update-user', this.userSettings)
        })
      })
    },
  },
}
</script>

<style scoped lang="less">
.updataimage {
  text-align: center;
}
.cropper_div {
  .cropper_img {
    display: block;
    max-width: 100%;
    height: 200px;
  }
}
</style>
