<template>
  <div>
    <el-form :inline="true" :model="formInline" class="user-search">
    <el-form-item label="">
      <el-input size="small" v-model.trim="formInline.username" placeholder="输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input size="small" v-model.trim="formInline.phone" placeholder="输入手机号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button size="small" type="primary" icon="el-icon-search" @click="getData">取消搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table size="small" :data="loginLogData"
              highlight-current-row v-loading="loading" border element-loading-text="拼命加载中"
              style="width: 100%" onscroll="">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column align="center"  prop="id" label="ID" width="50">
      </el-table-column>
      <el-table-column align="center"  prop="name" label="用户名" width="120">
      </el-table-column>
      <el-table-column align="center"  prop="phone" label="手机号" width="120">
      </el-table-column>
      <el-table-column align="center"  prop="roles" label="角色" min-width="70">
      </el-table-column>
      <el-table-column align="center"  prop="logintime" label="登陆时间" width="120">
      </el-table-column>
      <el-table-column align="center"  prop="ip" label="IP地址" min-width="70">
      </el-table-column>
      <el-table-column align="center"  prop="result" label="操作信息" min-width="250">
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template v-slot="scope">
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
import servicesApi from "@/utils/servicesApi";
export default {
  name: "loginLog",
  data() {
    return {
      loading:false,
      formInline:{
        username:'',
        phone:''
      },
      loginLogData:[],
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
      this.loading = true
      //获取登录日志信息
      let loginLogData = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        //数据不为空即为搜索
        phoneLike: this.formInline.phone,
        usernameLike: this.formInline.username
      }
      servicesApi.getLoginLogList(loginLogData).then(res=>{
        this.loading = false
        console.log(res.data)
        // console.log(res.data.code)
        this.formInline.username = null
        this.formInline.phone = null
        let code = res.data.code
        if (code === "200"){
          // console.log("111")
          // for (let i in res.data.data.record){
          //   res.data.data.records.logintime = res.data.data.records.logintime +8*3600*1000
          //   console.log(res.data.data.records.logintime)
          // }
          this.loginLogData = res.data.data.records
          // for (let i in this.loginLogData){
          //   // this.loginLogData[i].logintime = this.loginLogData[i].logintime +8*3600*1000
          //   // this.loginLogData.logintime =new Date(1000*this.loginLogData.logintime+8*3600*1000)
          //   console.log(this.loginLogData[i].logintime)
          // }
          this.page.total = res.data.others.total
          console.log(this.loginLogData)
        } else {
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
    deleteData(index,row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        // console.log('/api/loginLog/deleteById/'+row.id)
        servicesApi.deleteLoginLog(row.id).then(res=>{
        // axios.post('/api/loginLog/deleteById/' + row.id).then(res=>{
          console.log(res.data)
          if (res.data.code === '200') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
          this.getData()
        })
      }).catch(()=>{})
    },
    // 分页插件事件
    handleSizeChange(val){
      // 改变每页显示的条数
      this.page.pageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.page.pageNum = 1
      console.log(`每页 ${val} 条`);
      this.getData()
    },
    handleCurrentChange(val){
      // 改变默认的页数
      this.page.pageNum = val
      console.log(`当前页: ${val}`);
      this.getData()
    },
  }

}
</script>

<style scoped>

</style>
