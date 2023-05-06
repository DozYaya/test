/**
* 心理文章管理 文章管理
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.titleLike" placeholder="输入你想搜索的内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="addAssay">撰写文章</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="assayData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="id" label="文章id" width="60">
      </el-table-column>
      <el-table-column sortable prop="title" label="文章标题" width="200">
      </el-table-column>
      <el-table-column sortable prop="type" label="文章类型" width="150">
      </el-table-column>
      <el-table-column sortable prop="asdetail" label="文章摘要" width="200">
      </el-table-column>
      <el-table-column prop="img" label="图片" width="200">
        <template v-slot:default="scope">
          <el-image :src="'http://47.96.95.225:8081/files/download/'+scope.row.picture" alt="图片加载中"/>
        </template>
      </el-table-column>
      <el-table-column sortable prop="author" label="作者" width="100">
      </el-table-column>
      <el-table-column sortable prop="createtime" label="发布时间" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template v-slot="scope">
          <el-button size="mini" type="danger" @click="readAssay(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageparm.pageNum"
        :page-sizes="[5, 10, 15]"
        :page-size="pageparm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import servicesApi from "@/utils/servicesApi";

export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      assayData: [],
      resData: [],

      editForm: {
        articleDetail: '',
        author: '',
        articleTitle: '',
        articleId: 0,
        articleType: '',
      },
      // rules表单验证
      rules: {
        articleId: [
          { required: true, message: '请输入文章的id', trigger: 'blur' }
        ],
        articleTitle: [
          { required: true, message: '请输入文章的标题', trigger: 'blur' }
        ],
        articleDetail: [
          { required: true, message: '请输入文章的摘要', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ]
      },
      // 请求数据参数
      formInline: {
        titleLike: '',
        detailLike: '',
        authorLike: '',
        typeLike: '',
      },
      //分页
      pageparm: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      total: 0,
      // 删除部门
      seletedata: {
        ids: '',
        // token: localStorage.getItem('logintoken')
      },
    }
  },
  // 注册组件
  components: {
  },
  /**
   * 创建完毕
   */
  created() {
    this.getData();
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    addAssay(){
      this.$confirm("是否撰写文章","确认选择",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$router.push("/assayManage/assayAdd")
      }).catch(()=>{})
    },
    // 获取文章
    getData() {
      this.loading = true
      let postData = {
        titleLike: this.formInline.titleLike,
        detailLike: this.formInline.detailLike,
        authorLike: this.formInline.authorLike,
        typeLike: this.formInline.typeLike,
        pageNum: this.pageparm.pageNum,
        pageSize: this.pageparm.pageSize,
        orderBy: this.orderBy
      }
      servicesApi.getAssayListData(postData).then(res => {
        console.log(res.data)
        this.formInline.authorLike = ''
        this.formInline.detailLike = ''
        this.formInline.titleLike = ''
        if (res.data.code === '200'){
          this.loading = false
          this.assayData = res.data.data.records
          this.total = res.data.data.total
        }
      }).catch(err => {
        this.loading = false
        this.$message.error('文章数据加载失败，请稍后再试！')
      })
    },
    // 分页插件事件
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageparm.pageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageparm.pageNum = 1
      console.log(`每页 ${val} 条`);
      this.getData()
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.pageparm.pageNum = val
      console.log(`当前页: ${val}`);
      this.getData()
    },

    // 搜索事件
    search() {
      // this.formInline.authorLike = this.formInline.titleLike
      // this.formInline.detailLike = this.formInline.titleLike
      this.getData()
    },
    //阅读文章
    readAssay(index,row){
      this.$router.push({
        path: '/assayManage/article',
        query: {
          assayId: row.id
        }
      })
    },
    // 删除文章
    handleDelete(index, row) {
      let id = row.id;
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        servicesApi.deleteAssay(id).then(res=>{
        // axios.post('/api/assay/deleteAssay/' + id).then(res => {
          console.log(res.data)
          if (res.data.code === "200") {
            this.$message({
              type: 'success',
              message: '数据已删除!'
            })
            this.findByPage()
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          }
        }).catch(err => {
          this.loading = false
          this.$message.error('数据删除失败，请稍后再试！')
        })
        //     .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除！'
        //   })
        // })
      }).catch(()=>{})
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>
