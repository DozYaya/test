
/**
* 心理测试管理 测试结果管理
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测试结果管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row style="margin-top: 20px">
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </el-row>
    <div style="margin-top: 20px"></div>
    <!--:data是渲染数据-->
    <el-table
      :data="crud"
      border>
      <el-table-column
        fixed
        prop="examId"
        label="试卷id"
        width="100">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="comment"-->
<!--        label="试卷标题"-->
<!--        width="200">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="situation1"
        label="测试结果1"
        width="300">
      </el-table-column>
      <el-table-column
        prop="situation2"
        label="测试结果2"
        width="300">
      </el-table-column>
      <el-table-column
        prop="situation3"
        label="测试结果3"
        width="300">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="create_time"-->
<!--        label="创建时间"-->
<!--        width="200">-->
<!--      </el-table-column>-->
      <!--    编辑 删除按钮    -->
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row,crud)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row,crud)">删除</el-button>
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


    <!--添加与编辑、弹出层页面-->
    <div  v-show="show">

      <el-dialog title="测试信息" :visible.sync="dialogFormVisible">
        <el-form :rules="rules">
          <el-form-item label="测试试卷id" :label-width="formLabelWidth" prop="examId">
            <el-input v-model="formCrud.examId" autocomplete="off"></el-input>
          </el-form-item>
<!--          <el-form-item label="测试标题" :label-width="formLabelWidth">-->
<!--            <el-input v-model="formCrud.comment" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="测试结果1" :label-width="formLabelWidth" prop="situation1">
            <el-input v-model="formCrud.situation1" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="测试结果2" :label-width="formLabelWidth" prop="situation2">
            <el-input v-model="formCrud.situation2"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  label="测试结果3" :label-width="formLabelWidth" prop="situation3">
            <el-input v-model="formCrud.situation3"  autocomplete="off"></el-input>
          </el-form-item>
          <!--          <el-form-item  label="地址" :label-width="formLabelWidth">-->
          <!--            <el-input v-model="formCrud.crudAddr" autocomplete="off"></el-input>-->
          <!--          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" >取 消</el-button>
          <el-button v-show="btn_show" type="primary" @click="handleUpdate">确 定</el-button>
          <el-button type="primary" v-show="btn2_show" @click="add">确定添加</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import servicesApi from "@/utils/servicesApi";
  import axios from "axios";

  export default {
    data() {
      return {
        show: false,
        btn_show: false,
        btn2_show: false,
        crud: [],
        pageparm: {
          pageNum: 1,
          pageSize: 10,
          total: 10
        },
        total: 0,
        rules: {
          examId: [
            {pattern: /^-?[1-9]\d*$/,required: true,message: "请输入测试id", trigger: 'blur'},
          ],
          situation1: [
            {type: 'string', required: true, message: '请输入测试评语1', trigger: 'blur' },
            {max: 100,message: "名称长度不能超过100位" }
          ],
          situation2: [
            {type: 'string', required: true, message: '请输入测试评语2', trigger: 'blur' },
            {max: 100,message: "名称长度不能超过100位" }
          ],
          situation3: [
            {type: 'string', required: false, message: '请输入测试评语3', trigger: 'blur' },
            {max: 100,message: "名称长度不能超过100位" }
          ],

        },
        dialogFormVisible:false,
        formCrud: {
          examId: 0,
          comment: '',
          situation1: '',
          situation2: '',
          situation3: '',
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      // 获取测试列表
      findByPage() {
        this.loading = true
        let fd = new FormData()
        fd.append('pageNum',this.pageparm.pageNum)
        fd.append('pageSize',this.pageparm.pageSize)
        // fd.append('classId',this.classId)
        // fd.append('examName',this.examName)
        servicesApi.getTestResultData(fd).then(res=>{
        // axios.post('/api/quiz/getQuizResult',fd).then(res=>{
          console.log(res.data)
          if (res.data.code === '200'){
            this.crud = res.data.data.records
            this.total = res.data.data.total
            console.log(this.crud)
          }
        })
          .catch(err => {
            this.loading = false
            this.$message.error('视频数据加载失败，请稍后再试！')
          })
      },
      // 分页插件事件
      handleSizeChange(val) {
        // 改变每页显示的条数
        this.pageparm.pageSize = val
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.pageparm.pageNum = 1
        console.log(`每页 ${val} 条`);
        this.findByPage()
      },
      handleCurrentChange(val) {
        // 改变默认的页数
        this.pageparm.pageNum = val
        console.log(`当前页: ${val}`);
        this.findByPage()
      },
      /**
       * 删除
       * @param index
       * @param row
       * @param crud
       */
      handleDelete(index, row, crud) {
        // var id = crud[index].examId;
        this.$confirm('确定要删除吗?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let deleteData = {
            examId: crud[index].examId
          }
          servicesApi.deleteTestResult(deleteData).then(res => {
          // axios.post('/api/quiz/deleteQuizResult', {
          //   examId: crud[index].examId
          // }).then(res => {
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除！'
            })
          })
        }).catch(()=>{})
      },
      /**
       * 编辑 之前回显数据
       * @param index
       * @param row
       * @param crud
       */
      handleEdit(index, row, crud) {
        this.show = true
        this.dialogFormVisible = true
        this.btn_show = true
        this.btn2_show = false
        this.formCrud.examId = crud[index].examId
        this.formCrud.situation1 = crud[index].situation1
        this.formCrud.situation2 = crud[index].situation2
        this.formCrud.situation3 = crud[index].situation3
        // this.formCrud.crudHobby = crud[index].crudHobby
        // this.formCrud.crudAddr = crud[index].crudAddr
      },

      /**
       * 编辑发送ajax请求
       */
      handleUpdate() {
        let updateData = {
          examId: this.formCrud.examId,
          situation1: this.formCrud.situation1,
          situation2: this.formCrud.situation2,
          situation3: this.formCrud.situation3,
        }
        servicesApi.updateTestResult(updateData).then(res => {
        // axios.post("/api/quiz/updateQuizResult",{
        //   examId: this.formCrud.examId,
        //   situation1: this.formCrud.situation1,
        //   situation2: this.formCrud.situation2,
        //   situation3: this.formCrud.situation3,
        // }).then((res) => {
          //编辑成功后刷新页面
          // this.findByPage(this.pageCode, this.pageSize)
          //关闭遮罩层
          if (res.data.code === '200') {
            this.show = true
            this.dialogFormVisible = false
            this.$message({
              type: 'info',
              message: res.data.msg
            })
            this.findByPage()
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
            this.findByPage()
          }
        }).catch((err) => {
          console.log(2, err)
        })
      },
      /**
       * 点击添加按钮的时候显示遮罩层,同时将编辑的按钮隐藏掉
       */
      handleAdd() {
        this.show = true
        this.dialogFormVisible = true
        //将双向绑定数据滞空
        this.formCrud.examId = 0
          this.formCrud.situation1 = ''
          this.formCrud.situation2 = ''
          this.formCrud.situation3 = ''

        // this.formCrud.crudAddr = ''
        //将新编辑按钮隐藏掉
        this.btn_show = false
        //将新增按钮显示 v-show 其实是display：none 和black操作
        this.btn2_show = true
      },
      /**
       *  新增
       */
      add() {
        let addData = {
          examId: this.formCrud.examId,
          situation1: this.formCrud.situation1,
          situation2: this.formCrud.situation2,
          situation3: this.formCrud.situation3,
        }
        servicesApi.addTestResult(addData).then(res=>{
        // axios.post("/api/quiz/addQuizResult",{
        //   examId: this.formCrud.examId,
        //   situation1: this.formCrud.situation1,
        //   situation2: this.formCrud.situation2,
        //   situation3: this.formCrud.situation3,
        //   // crudAddr: this.formCrud.crudAddr
        // }).then((res) => {
          //添加成功后从新计算总页数
          //同时关闭遮罩层
          console.log('data',res.data)
          if (res.data.code === '200') {
            this.show = false
            this.dialogFormVisible = false
            this.$message({
              type: 'info',
              message: '新增成功'
            })
            this.findByPage()
          } if (res.data === '502') {
            this.$message({
              type: 'warning',
              message: '新增失败!'
            })
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    created() {
      this.findByPage()
    },

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
