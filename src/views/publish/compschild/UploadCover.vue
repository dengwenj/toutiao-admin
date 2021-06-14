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
        <el-tab-pane label="素材库" name="first">
          <!-- 素材列表 -->
          <image-layout
            ref="image-layout"
            :images="images"
            :loadImage="loadImage"
            :is-show-add="false"
            :is-show-action="false"
            is-show-selected
            @collect="collect"
          ></image-layout>

          <!-- 素材分页 -->
          <image-pagination
            @changePage="changePage"
            :totalCount="totalCount"
            :pageSize="pageSize"
            :currentpagesync="currentpagesync"
          ></image-pagination>
        </el-tab-pane>
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
import ImageLayout from '@/views/image/compschild/ImageLayout'
import ImagePagination from '@/views/image/compschild/ImagePagination'

// 事件总线
import globalBus from '@/utils/global-bus'

// 网络请求
import { uploadImage, getImages } from '@/api/image'

export default {
  name: '',
  components: {
    ImageLayout,
    ImagePagination,
  },
  props: {},
  data() {
    return {
      type: null,
      dialogVisible: false,
      activeName: 'first',
      srcImg: '',
      images: [], // 图片素材列表
      loadImage: null, // 重新发送请求渲染新的数据
      page: 1, // 当前页
      totalCount: 0, // 总数据条数
      pageSize: 12, // 每页有多少条
      currentpagesync: 1, // 重置高亮页码，防止数据页码不对应 就是在全部和收藏的时候防止页码不对应
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

    // 发送请求
    this.loadImage = this.loadImages
    this.loadImages(this.page)
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
      } else if (this.activeName === 'first') {
        // 关闭弹出层
        this.dialogVisible = false
        //
        const selected = this.$refs['image-layout'].selected
        if (selected === null) {
          this.$message({
            type: 'warning',
            message: '请选择封面图片',
          })
        }
        this.srcImg = this.images[selected].url
        this.$emit('coverUpload', this.images[selected].url)
      }
    },

    // 网络请求
    loadImages(page = 1, value = false) {
      // 重置高亮页码，防止数据页码不对应
      this.currentpagesync = page
      getImages({
        collect: value,
        page,
        per_page: this.pageSize,
      }).then((res) => {
        console.log(res)
        const { data } = res.data
        this.images = data.results
        this.totalCount = data.total_count // 总条数
      })
    },

    // 点击是否收藏
    collect(value) {
      // 只要触发这里就每次就是从第一页开始
      this.loadImages(1, value)
    },

    // 点击下面的页码
    changePage(page) {
      this.page = page
      this.loadImages(this.page)
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