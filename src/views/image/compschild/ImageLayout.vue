<template>
  <div class="">
    <div class="action-head" style="padding-bottom: 20px">
      <!-- @change是时绑定值变化触发的事件	回调的参数(value)是选中的 Radio label 值 -->
      <!-- 自己用点击事件的话 会调用两次 -->
      <el-radio-group v-model="collect" size="small" @change="onCollect">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="small" @click="dialogUpLoadVisible = true"
        >上传素材<i class="el-icon-upload el-icon--right"></i
      ></el-button>
    </div>
    <el-row :gutter="20">
      <el-col
        class="image-item"
        :xl="4"
        :lg="4"
        :md="6"
        :sm="8"
        :xs="12"
        :span="4"
        v-for="(item, index) in images"
        :key="index"
      >
        <el-image style="height: 200px" :src="item.url" fit="cover"></el-image>
        <div class="scsc">
          <el-button
            class="image-button"
            type="warning"
            :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            @click="isCollect(item)"
            circle
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="ondetele(item.id)"
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      class="dialog"
      title="上传素材"
      :visible.sync="dialogUpLoadVisible"
      :append-to-body="true"
    >
      <!-- 
        upload组件本身就支持请求提交上传操作，就是使用他不用自己取法请求，他会自己发
        请求方法:默认就是POST
        请求路径：action， 必须写完整路径
        请求头：headers
       -->
      <el-upload
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        multiple
        :headers="upLoadHeader"
        name="image"
        :on-success="upLoadSuccess"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// 网络请求
import { collectImage, collectDelete } from '@/api/image'

export default {
  name: '',
  components: {},
  props: ['images', 'loadImage'],
  data() {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 绑定值的变化 是否为收藏
      dialogUpLoadVisible: false, // 是否要显示
      upLoadHeader: {
        Authorization: `Bearer ${user.token}`,
      }, //请求头
    }
  },
  computed: {},
  watch: {
    // images(value) {
    //   this.loadingcollect = value
    //   // 每一个小的item 对象本来没有 loading 数据
    //   // 我们往里添加一个loading用户控制状态
    //   this.loadingcollect.forEach((item) => {
    //     item.loading = false
    //   })
    // },
  },
  created() {},
  mounted() {},
  methods: {
    onCollect(value) {
      this.$emit('collect', value)
      // console.log(value) 是选中的 Radio label 值
    },

    // 上传图片成功
    upLoadSuccess() {
      // 1 让upload隐藏起来
      this.dialogUpLoadVisible = false
      // 2 刷新页面 这种是整个页面都刷新了
      // location.reload()
      // 也可以重新发送请求渲染新数据  传过来的 子传父
      this.loadImage()
      this.$message({
        type: 'success',
        message: '上传成功',
      })
    },

    // 是否收藏
    isCollect(item) {
      // console.log(item)
      // 收藏 点击取消收藏
      // 未收藏 点击添加收藏
      item.is_collected = !item.is_collected
      // if (item.is_collected) {
      //   item.is_collected = !item.is_collected
      // } else {
      //   item.is_collected = !item.is_collected
      // }

      collectImage(item.id, item.is_collected).then((res) => {
        console.log(res)

        if (res.data.data.collect === true) {
          this.$message({
            type: 'success',
            message: '收藏成功',
          })
        } else {
          this.$message({
            type: 'warning',
            message: '取消收藏成功',
          })
        }
        item.loading = false
      })
    },
    ondetele(id) {
      collectDelete(id).then((res) => {
        // 删除了然后重新渲染数据
        this.loadImage()
        this.$message({
          type: 'success',
          message: '删除成功',
        })
      })
    },
  },
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.dialog {
  text-align: center;
}
.image-item {
  position: relative;
}
.scsc {
  height: 40px;
  position: absolute;
  bottom: 4px;
  left: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ccc;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
}
.image-button {
  margin-right: 30px;
}
</style>