<template>
  <div>
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="">
        <el-input size="small" v-model.trim="formInline.usernameLike" placeholder="输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model.trim="formInline.phoneLike" placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model.trim="formInline.operateLike" placeholder="输入操作"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model.trim="formInline.moduleLike" placeholder="输入模块"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-search" @click="cancelSearch">取消搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table size="small" :data="operateLogData"
              highlight-current-row v-loading="loading" border element-loading-text="拼命加载中"
              style="width: 100%" onscroll="">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column align="center"  prop="id" label="ID" width="50">
      </el-table-column>
      <el-table-column align="center"  prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column align="center"  prop="phone" label="手机号" width="100">
      </el-table-column>
      <el-table-column align="center"  prop="module" label="模块" width="120">
      </el-table-column>
      <el-table-column align="center"  prop="operate" label="操作名" min-width="150">
      </el-table-column>
      <el-table-column align="center"  prop="operatetime" label="操作时间" width="120">
      </el-table-column>
      <el-table-column align="center"  prop="ip" label="IP地址" min-width="70">
      </el-table-column>
      <el-table-column align="center"  prop="result" label="操作信息" min-width="100">
      </el-table-column>
      <el-table-column label="操作" min-width="75">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteData(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[5, 10, 15]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "operateLog",
  data() {
    return{
      loading:false,
      formInline:{
        usernameLike:'',
        phoneLike:'',
        moduleLike: '',
        operateLike: ''
      },
      operateLogData:[],
      page:{
        pageNum:1,
        pageSize:10,
        total:10
      }
    }
  },

  created() {
    this.getData()
  },

  methods:{
    getData(){
      this.loading=true
      //获取操作日志信息
      axios.post('/api/operateLog/selectByManyLike',{
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        //数据不为空即为搜索
        phoneLike: this.formInline.phoneLike,
        usernameLike: this.formInline.usernameLike,
        moduleLike: this.formInline.moduleLike,
        operateLike: this.formInline.operateLike
      }).then(res=>{
        this.loading = false
        console.log(res.data)
        // console.log(res.data.code)
        // this.formInline.usernameLike = null
        // this.formInline.phoneLike = null
        // this.formInline.moduleLike = null
        // this.formInline.operateLike = null
        let code = res.data.code
        if (code === "200"){
          // console.log("111")
          this.operateLogData = res.data.data.records
          this.page.total = res.data.others.total
          console.log(this.loginLogData)
        }else {
          this.$message({
            type: "info",
            message: res.data.msg
          })
        }
      })
    },
    search() {
      this.getData()
    },
    cancelSearch(){
      this.formInline.usernameLike = null
      this.formInline.phoneLike = null
      this.formInline.moduleLike = null
      this.formInline.operateLike = null
      this.getData()
    },
    deleteData(index,row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        // console.log('/api/loginLog/deleteById/'+row.id)
        axios.post('/api/operateLog/deleteById/'+row.id).then(res=>{
          console.log(res.data)
          this.$message({
            message: "日志删除成功",
            type: 'success'
          })
          this.getData()
        })
      })
    },
    // 分页插件事件
    handleSizeChange(val){
      // 改变每页显示的条数
      this.page.pageSize=val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.page.pageNum=1
      console.log(`每页 ${val} 条`);
      this.getData()
    },
    handleCurrentChange(val){
      // 改变默认的页数
      this.page.pageNum=val
      console.log(`当前页: ${val}`);
      this.getData()
    },
  }
}
</script>

<style scoped>

</style>
