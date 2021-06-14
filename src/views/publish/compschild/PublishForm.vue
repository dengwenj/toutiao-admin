<template>
  <el-form
    ref="publish-form"
    :model="article"
    :rules="publishRules"
    label-width="60px"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <quill-editor
        v-model="article.content"
        ref="myQuillEditor"
        style="height: 100%"
        :options="editorOption"
      >
      </quill-editor>
    </el-form-item>
    <el-form-item label="封面">
      <el-radio-group
        v-model="article.cover.type"
        @change="radioChange(article)"
      >
        <el-radio :label="1">单图</el-radio>
        <el-radio :label="3">三图</el-radio>
        <el-radio :label="0">无图</el-radio>
        <el-radio :label="-1">自动</el-radio>
      </el-radio-group>
      <!-- 插槽 -->
      <slot></slot>
    </el-form-item>
    <el-form-item label="频道" prop="channel_id">
      <el-select v-model="article.channel_id" placeholder="请选择频道">
        <el-option
          :label="item.name"
          :value="item.id"
          v-for="(item, index) in channels"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onPublish(article, false)">{{
        activeId ? '修改' : '发表'
      }}</el-button>
      <el-button
        v-if="activeId ? false : true"
        @click="onPublish(article, true)"
        >存入草稿</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
// 富文本编辑器
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 富文本编辑器 图片拖拽 放大缩小
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

// 富文本编辑器的图片上传，显示的地址是base64格式，如何图片上传过多的话就会特别减缓富文本的提交速度，特别慢而且会报错。所以会选择将图片上传到服务器上，然后返回后台给的img链接，最后显示在富文本对应的位置。
// 给后台传的图片格式是formData格式，就是文件格式

// 事件总线
import globalBus from '@/utils/global-bus'

export default {
  name: 'PublishForm',
  components: { quillEditor },
  props: {
    channels: {
      type: Array,
      defalut() {
        return []
      },
    },
    activeId: {
      type: String,
      defalut: '',
    },
    index: {
      type: Number,
      defalut: 0,
    },
    url: {
      type: String,
      defalut: '',
    },
  },
  data() {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        // 文章封面
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [], // 封面图片地址
        },
        channel_id: null, // 文章频道id
      },
      publishRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 5,
            max: 30,
            message: '长度在 5 到 30 个字符',
            trigger: 'blur',
          },
        ],
        content: [
          {
            validator(rule, value, callback) {
              // value 是输入的值 数据的值
              // console.log(value)
              // console.log(rule)
              // console.log(callback)
              if (value === '<p></p>') {
                callback(new Error('请再次输入'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' },
        ],
        channel_id: [{ required: true, message: '请选择文章频道' }],
      },
      // 富文本编辑器
      editorOption: {
        modules: {
          // imageDrop: true, //图片拖拽
          // //放大缩小
          // imageResize: {
          //   displaySize: true,
          // },
          imageDrop: true, //图片拖拽
          //放大缩小
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['link', 'image', 'video'], // 链接、图片、视频
          ], //工具菜单栏配置
        },
        placeholder: '请输入内容', //提示
        readyOnly: false, //是否只读
        theme: 'snow', //主题 snow/bubble
        syntax: true, //语法检测
      },
      indexImg: null,
      urlImg: '',
    }
  },
  computed: {},
  watch: {
    index(value) {
      this.indexImg = value
    },
    url(value) {
      this.urlImg = value
    },
  },
  created() {},
  mounted() {},
  methods: {
    onPublish(article, draft) {
      this.article.cover.images[this.indexImg] = this.urlImg

      globalBus.$emit('indexUrl', this.article.cover.images[this.indexImg])
      // 校验
      this.$refs['publish-form'].validate((valid) => {
        // valid 只要有一个没有符合校验规则就是 false  符合就是 true
        // console.log(valid)
        if (!valid) {
          return
        } else {
          // 符合校验规则为 true 就让传过去
          this.$emit('addArticle', article, draft)
        }
      })
    },

    // 当单选框发生改变的时候
    radioChange(article) {
      this.$emit('radioChange', article.cover.type)
      globalBus.$emit('radioChange', article.cover.type)
    },
  },
}
</script>

<style scoped lang="less">
</style>


