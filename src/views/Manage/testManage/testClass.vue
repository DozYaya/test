
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测试分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 20px">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit">添加</el-button>
    </div>
    <div style="margin-top: 20px">
    </div>
    <el-table size="small" :data="classList" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="classId" label="分类ID" width="100">
      </el-table-column>
      <el-table-column sortable prop="className" label="分类名" width="100">
      </el-table-column>
      <el-table-column sortable prop="comment" label="分类说明" width="200">
      </el-table-column>
      <el-table-column sortable prop="create_time" label="创建时间" width="180">
      </el-table-column>
      <el-table-column sortable prop="update_time" label="修改时间" width="180">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteClass(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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

    <!-- 编辑界面 -->
    <el-dialog :title="title"
               :visible.sync="editFormVisible"
               width="30%"
               append-to-body
               @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="分类名" prop="username">
          <el-input size="small" v-model="editForm.className" auto-complete="off" placeholder="请输入分类名"></el-input>
        </el-form-item>
        <el-form-item label="分类简介" prop="username">
          <el-input size="small" v-model="editForm.comment" auto-complete="off" placeholder="请输入分类简介"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import servicesApi from "@/utils/servicesApi";
export default {
  name: "testClass",
  data() {
    return {
      classList: [],
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加分类',
      editForm: {
        classId: 0,
        className: '',
        comment: '',
      },
      // 分页参数
      pageparm: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      total: 0,
      rules: {
        name: [
          {type: 'string',required: true,message: "请输入分类名", trigger: 'blur'},
          {max: 30,message: "名称长度不能超过30位" }
        ],
      },

    }
  },
  created() {
    this.getData()
  },
  methods:{
    getData(){
      servicesApi.getTestClassifyData().then(res=>{
      // axios.post('/api/quiz/getQuizClass').then(res=>{
        // console.log(res.data)
        this.classList = res.data.data.records
        // console.log(this.classList)
      })
    },
    // 断言 target 为非空
    assertNotEmpty(target, msg) {
      if (!target) {
        this.$message({
          message: msg,
          type: "warning",
        });
        return false;
      }
      return true;
    },

    deleteClass(index,row) {
      this.$confirm('是否删除该分类？','警告',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        let fd = new FormData()
        // fd.append('id',row.classId)
        // axios.post('/api/quiz/deleteQuizClass/',fd).then(res=>{
        let deleteData = {
          classId: row.classId
        }
        servicesApi.deleteTestClassifyData(deleteData).then(res=>{
        // axios.post('/api/quiz/deleteQuizClass',{
        //   classId: row.classId
        // }).then(res=>{
          if (res.data.code === '200' || res.data.code === 200){
            this.$message('删除成功')
            this.getData()
          }
        })
      }).catch(()=>{})
    },

    // 分页插件事件
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageparm.pageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageparm.pageNum = 1
      console.log(`每页 ${val} 条`);
      this.getdata()
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.pageparm.pageNum = val
      console.log(`当前页: ${val}`);
      this.getdata()
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      // eslint-disable-next-line no-undefined
      if (row !== undefined && row !== 'undefined') {
        this.title = '修改分类'
        this.editForm.classId = row.classId
        this.editForm.className = row.className
        this.editForm.comment = row.comment
      } else {
        this.title = '添加分类'
        this.editForm.classId = ''
        this.editForm.className = ''
        this.editForm.comment = ''
      }
    },
    // 编辑、添加提交方法
    submitForm() {
      console.log(this.editForm)
      if (this.assertNotEmpty(this.editForm.className,'分类名不能为空')){
        if (this.title === '添加分类'){
          // let fd1 = new FormData()
          // fd1.append('addclass',this.editForm.name)
          // axios.post('/api/quiz/addQuizClass',fd1).then(res=>{
          // axios.post('/api/video/addVideoClass',this.editForm.name).then(res=>{
          let addData = {
            className: this.editForm.className,
            comment: this.editForm.comment
          }
          servicesApi.addTestClassifyData(addData).then(res=>{
            // axios.post('/api/quiz/addQuizClass',{
            //   className: this.editForm.name,
            //   comment: this.editForm.comment
            // }).then(res=>{
            console.log(res.data)
            if (res.data.code === "200") {
              this.editFormVisible = false
              this.getData()
              this.$message('新增成功')
              this.editForm.id = ''
              this.editForm.name = ''
              this.editForm.comment = ''
            } else {
              alert(res.data.msg)
            }
          })
        } else {
          // let fd = new FormData()
          // fd.append('id',this.editForm.id)
          // fd.append('name',this.editForm.name)
          let updateData = {
            classId: this.editForm.classId,
            className: this.editForm.className,
            comment: this.editForm.comment
          }
          servicesApi.updateTestClassifyData(updateData).then(res=>{
            // axios.post('/api/quiz/updateQuizClass',{
            //   classId: this.editForm.classId,
            //   className: this.editForm.className,
            //   comment: this.editForm.comment
            // }).then(res=>{
            console.log(res.data)
            if (res.data.code === "200") {
              this.editFormVisible = false
              this.getData()
              this.$message('修改成功')
              this.editForm.id = ''
              this.editForm.name = ''
            } else {
              alert(res.data.msg)
            }
          })
        }
      }
      // if (this.editForm.name === null || this.editForm.name === ''){
      //   alert('分类名不能为空！！！')
      //   return
      // }

    },
    // 选择复选框事件
    selectChange(val) {
      this.selectdata = val
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog === 'edit') {
        this.editFormVisible = false
      } else if (dialog === 'perm') {
        this.dataAccessShow = false
      } else if (dialog === 'unit') {
        this.unitAccessShow = false
      }
    },
  }
}
</script>

<style scoped>

</style>
