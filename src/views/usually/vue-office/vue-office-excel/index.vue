<template>
  <vue-office-excel :src="excel" style="height: 100vh" @rendered="renderedHandler" @error="errorHandler" />
</template>

<script>
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel'
// import VueOfficeExcel from '@vue-office/excel'
//引入相关样式

export default {
  components: {
    VueOfficeExcel,
  },
  data() {
    return {
      excel: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.xlsx', //设置文档地址
    }
  },
  methods: {
    renderedHandler() {
      console.log('渲染完成')
    },
    errorHandler() {
      console.log('渲染失败')
    },
  },
}
</script>
