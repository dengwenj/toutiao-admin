<template>
  <div>
    <div class="upload-cover" @click="imageCover">
      <div class="type">
        <el-image
          ref="image"
          class="cover-img"
          :src="srcImg"
          @click.native="imageCover"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline i"></i>
          </div>
        </el-image>
      </div>
    </div>
    <!-- 弹出层 -->
    <el-dialog title="选择封面" :visible.sync="dialogVisible" append-to-body>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="素材库" name="first">素材库</el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input ref="input" type="file" @change="onChangeInput" />
          <img ref="img" src="" alt="" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 事件总线
import globalBus from '@/utils/global-bus'

// 网络请求
import { uploadImage } from '@/api/image'

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      type: null,
      dialogVisible: false,
      activeName: 'first',
      srcImg: '',
    }
  },
  computed: {},
  watch: {},
  created() {
    globalBus.$on('radioChange', (type) => {
      this.type = type
    })
    globalBus.$on('indexUrl', (img) => {
      this.srcImg = img
    })
  },
  mounted() {},
  methods: {
    imageCover() {
      this.dialogVisible = true
    },

    handleClick(tab, event) {
      // console.log(tab, event)
    },

    onChangeInput() {
      // 获取文件对象
      const file = this.$refs.input.files[0]

      // 预览图片
      this.$refs.img.src = window.URL.createObjectURL(file)
    },

    onCoverConfirm() {
      // 如果 tab 是上传图片，并且 input-file 有选择的文件，才执行上传图片的操作
      const file = this.$refs.input.files[0]
      if (this.activeName === 'second') {
        if (!file) {
          this.$message({
            type: 'warning',
            message: '请选择文件',
          })
          return
        }

        // 关闭弹出层
        this.dialogVisible = false

        // 执行上传文件的操作
        const fd = new FormData()
        fd.append('image', file)
        // 如果有文件就发送请求
        uploadImage(fd).then((res) => {
          this.srcImg = res.data.data.url

          this.$emit('coverUpload', res.data.data.url)
        })
      }
    },
  },
}
</script>

<style scoped lang="less">
.upload-cover {
  display: flex;
  .type {
    margin-right: 10px;
    width: 150px;
    height: 120px;
    border: 1px dotted #ccc;
    .cover-img {
      text-align: center;
      line-height: 120px;
      width: 100%;
      height: 100%;
      .i {
        font-size: 30px;
        color: #ccc;
      }
    }
  }
}
</style>