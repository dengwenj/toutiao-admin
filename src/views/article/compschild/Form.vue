<template>
  <el-form ref="form" :model="form" size="small" label-width="40px">
    <el-form-item label="状态">
      <!-- 查询文章 status
          label 是 Radio 的 value
          v-model 跟表单值有关
      -->
      <el-radio-group v-model="status">
        <el-radio :label="null">全部</el-radio>
        <el-radio :label="0">草稿</el-radio>
        <el-radio :label="1">待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核失败</el-radio>
        <el-radio :label="4">已删除</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="频道">
      <el-select v-model="form.region" placeholder="请选择">
        <el-option label="全部" :value="null"></el-option>
        <el-option
          :label="item.name"
          :value="item.id"
          v-for="(item, index) in channels"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker
        v-model="rangDate"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <!-- button 按钮的 click 事件有个默认参数
           当你没有指定参数的时候，他会默认传递一个没用的数据 和下面不搭噶
       -->
      <el-button
        type="primary"
        :disabled="loading"
        @click="onSubmit(status, form.region, rangDate)"
        >筛选</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Form',
  components: {},
  props: ['dianji', 'channels', 'loading'],
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      status: null, // 查询文章的状态，不传就是全部
      rangDate: [] // 范围日期
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit (status, region, rangDate) {
      this.$emit('status', status, region, rangDate)
      this.dianji()
      // console.log(status)
      // console.log(region)
      // console.log(rangDate)
    }
  }
}
</script>

<style scoped lang="less"></style>
