/**
* 心理测试管理 测试题目管理
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测试题目管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row style="margin-top: 20px">
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </el-row>
    <div style="margin-top: 20px">
    </div>
    <!--:data是渲染数据-->
    <el-table
      :data="crud"
      border>
      <el-table-column sortable prop="examId" label="试卷id" width="90" fixed show-overflow-tooltip>
      </el-table-column>

      <el-table-column sortable prop="head" label="题目标题" width="200" fixed show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="questionNum" label="试题号" width="100" fixed show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="a" label="a" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="b" label="b" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="c" label="c" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="d" label="d" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="e" label="e" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="pointA" label="pointA" width="110" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="pointB" label="pointB" width="110" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="pointC" label="pointC" width="110" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="pointD" label="pointD" width="110" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="pointE" label="pointE" width="110" show-overflow-tooltip>
      </el-table-column>
      <!--    编辑 删除按钮    -->
      <el-table-column align="center" label="操作" min-width="200" fixed="right">
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
          <el-form-item label="试卷id" :label-width="formLabelWidth" prop="examId">
            <el-input v-model="formCrud.examId" autocomplete="off"></el-input>
          </el-form-item>
<!--          <el-form-item label="试题id" :label-width="formLabelWidth">-->
<!--            <el-input v-model="formCrud.questionId" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="题目标题" :label-width="formLabelWidth" prop="head">
            <el-input v-model="formCrud.head" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="题号" :label-width="formLabelWidth" prop="questionNum">
            <el-input v-model="formCrud.questionNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="a" :label-width="formLabelWidth" prop="a">
            <el-input v-model="formCrud.a"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="b" :label-width="formLabelWidth" prop="b">
            <el-input v-model="formCrud.b"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="c" :label-width="formLabelWidth" prop="c">
            <el-input v-model="formCrud.c"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="d" :label-width="formLabelWidth" prop="d">
            <el-input v-model="formCrud.d"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="e" :label-width="formLabelWidth" prop="e">
            <el-input v-model="formCrud.e"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="pointA" :label-width="formLabelWidth" prop="pointA">
            <el-input v-model="formCrud.pointA"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="pointB" :label-width="formLabelWidth" prop="pointB">
            <el-input v-model="formCrud.pointB"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="pointC" :label-width="formLabelWidth" prop="pointC">
            <el-input v-model="formCrud.pointC"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="pointD" :label-width="formLabelWidth" prop="pointD">
            <el-input v-model="formCrud.pointD"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="pointE" :label-width="formLabelWidth" prop="pointE">
            <el-input v-model="formCrud.pointE"  autocomplete="off"></el-input>
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
<!--        <div style="color: #999999;margin-bottom: 10px">备注：1：精选，2：情感，3：性格，4：健康，5：职场，6：人际，7：能力 </div>-->
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
          head: [
            {type: 'string', required: true, message: '请输入测试题标题', trigger: 'blur' },
            {max: 30,message: "名称长度不能超过30位" }
          ],
          questionNum: [
            {pattern: /^-?[1-9]\d*$/, required: true, message: '请输入测试题号', trigger: 'blur' },
          ],
          a: [
            {
              type: 'string', required: true, message: '请输入a选项的内容', rigger: 'blur'
            },
            {max: 150,message: "名称长度不能超过150位" }
          ],
          b: [
            {
              type: 'string', required: true, message: '请输入b选项的内容', rigger: 'blur'
            },
            {max: 150,message: "名称长度不能超过150位" }
          ],
          c: [
            {
              type: 'string', required: false, message: '请输入c选项的内容', rigger: 'blur'
            },
            {max: 150,message: "名称长度不能超过150位" }
          ],
          d: [
            {
              type: 'string', required: false, message: '请输入d选项的内容', rigger: 'blur'
            },
            {max: 150,message: "名称长度不能超过150位" }
          ],
          e: [
            {
              type: 'string', required: false, message: '请输入e选项的内容', rigger: 'blur'
            },
            {max: 150,message: "名称长度不能超过150位" }
          ],
          pointA: [
            {
              pattern: /^-?[1-9]\d*$/, required: true, message: '请输入a选项的分数', rigger: 'blur'
            },
          ],
          pointB: [
            {
              pattern: /^-?[1-9]\d*$/, required: true, message: '请输入b选项的分数', rigger: 'blur'
            },
          ],
          pointC: [
            {
              pattern: /^-?[1-9]\d*$/, required: false, message: '请输入c选项的分数', rigger: 'blur'
            },
          ],
          pointD: [
            {
              pattern: /^-?[1-9]\d*$/, required: false, message: '请输入c选项的分数', rigger: 'blur'
            },
          ],
          pointE: [
            {
              pattern: /^-?[1-9]\d*$/, required: false, message: '请输入c选项的分数', rigger: 'blur'
            },
          ],
        },

        dialogFormVisible:false,
        formCrud: {
          questionId: 0,
          questionNum: 0,
          head: '',
          examId: 0,
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',
          pointA: 0,
          pointB: 0,
          pointC: 0,
          pointD: 0,
          pointE: 0,
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      findByPage() {
        let fd = new FormData()
        fd.append('pageNum',this.pageparm.pageNum)
        fd.append('pageSize',this.pageparm.pageSize)
        servicesApi.getTestQuizListData(fd).then(res=>{
        // axios.post('/api/quiz/getQuizQuestion',fd).then(res=>{
          if (res.data.code === '200'){
            this.crud = res.data.data.records
            this.total = res.data.data.total
            console.log(this.crud)
          }
        }).catch((err) => {
          console.log(err)
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
            questionId: crud[index].questionId
          }
          servicesApi.deleteTestQuestion(deleteData).then(res => {
          // axios.post('/api/quiz/deleteQuizQuestion', {
          //   questionId: crud[index].questionId
          // }).then(res => {
            console.log(res.data)
            if (res.data.code === "200") {
              this.$message({
                type: 'success',
                message: '该试题已删除!'
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
        this.formCrud.head = crud[index].head
        this.formCrud.questionId = crud[index].questionId
        this.formCrud.questionNum = crud[index].questionNum
        this.formCrud.a = crud[index].a
        this.formCrud.b = crud[index].b
        this.formCrud.c = crud[index].c
        this.formCrud.d = crud[index].d
        this.formCrud.e = crud[index].e
        this.formCrud.pointA = crud[index].pointA
        this.formCrud.pointB = crud[index].pointB
        this.formCrud.pointC = crud[index].pointC
        this.formCrud.pointD = crud[index].pointD
        this.formCrud.pointE = crud[index].pointE

        // this.formCrud.crudHobby = crud[index].crudHobby
        // this.formCrud.crudAddr = crud[index].crudAddr
      },

      /**
       * 编辑发送ajax请求
       */
      handleUpdate() {
        let updateData = {
          examId: this.formCrud.examId,
          head: this.formCrud.head,
          questionId: this.formCrud.questionId,
          questionNum: this.formCrud.questionNum,
          a: this.formCrud.a,
          b: this.formCrud.b,
          c: this.formCrud.c,
          d: this.formCrud.d,
          e: this.formCrud.e,
          pointA: this.formCrud.pointA,
          pointB: this.formCrud.pointB,
          pointC: this.formCrud.pointC,
          pointD: this.formCrud.pointD,
          pointE: this.formCrud.pointE,
        }
        servicesApi.updateTestQuestion(updateData).then(res => {
        // axios.post("/api/quiz/updateQuizQuestion",{
        //   examId: this.formCrud.examId,
        //   head: this.formCrud.head,
        //   questionId: this.formCrud.questionId,
        //   questionNum: this.formCrud.questionNum,
        //   a: this.formCrud.a,
        //   b: this.formCrud.b,
        //   c: this.formCrud.c,
        //   d: this.formCrud.d,
        //   e: this.formCrud.e,
        //   pointA: this.formCrud.pointA,
        //   pointB: this.formCrud.pointB,
        //   pointC: this.formCrud.pointC,
        //   pointD: this.formCrud.pointD,
        //   pointE: this.formCrud.pointE,
        // }).then((res) => {
          //编辑成功后刷新页面
          // this.findByPage(this.pageCode, this.pageSize)
          //关闭遮罩层
          console.log(res.data.node)
          console.log(res.data)
          if (res.data.code === '200'){
            this.show = true
            this.dialogFormVisible = false
            this.$message({
              type: 'info',
              message: '数据修改成功'
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
        // formCrud: {
        //   questionId: 0,
        //     head: '',
        //     examId: 0,
        //     a: '',
        //     b: '',
        //     c: '',
        //     d: '',
        //     e: '',
        //     pointA: 0,
        //     pointB: 0,
        //     pointC: 0,
        //     pointD: 0,
        //     pointE: 0,
        // },
        this.show = true
        this.dialogFormVisible = true
        //将双向绑定数据滞空
        this.formCrud.examId = 0
        this.formCrud.head = ''
        this.formCrud.questionId = 0
        this.formCrud.questionNum = 0
        this.formCrud.a = ''
        this.formCrud.b = ''
        this.formCrud.c = ''
        this.formCrud.d = ''
        this.formCrud.e = ''
        this.formCrud.pointA = 0
        this.formCrud.pointB = 0
        this.formCrud.pointC = 0
        this.formCrud.pointD = 0
        this.formCrud.pointE = 0
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
          head:  this.formCrud.head ,
          questionNum: this.formCrud.questionNum,
          questionId: this.formCrud.questionId,
          a: this.formCrud.a,
          b: this.formCrud.b,
          c: this.formCrud.c,
          d: this.formCrud.d,
          e: this.formCrud.e,
          pointA: this.formCrud.pointA,
          pointB: this.formCrud.pointB,
          pointC: this.formCrud.pointC,
          pointD: this.formCrud.pointD,
          pointE: this.formCrud.pointE,
        }
        servicesApi.addTestQuestion(addData).then(res=>{
        // axios.post("/api/quiz/addQuizQuestion",{
        //   examId: this.formCrud.examId,
        //   head:  this.formCrud.head ,
        //   questionNum: this.formCrud.questionNum,
        //   questionId: this.formCrud.questionId,
        //   a: this.formCrud.a,
        //   b: this.formCrud.b,
        //   c: this.formCrud.c,
        //   d: this.formCrud.d,
        //   e: this.formCrud.e,
        //   pointA: this.formCrud.pointA,
        //   pointB: this.formCrud.pointB,
        //   pointC: this.formCrud.pointC,
        //   pointD: this.formCrud.pointD,
        //   pointE: this.formCrud.pointE,
        //   // crudAddr: this.formCrud.crudAddr
        // }).then((res) => {
          //添加成功后从新计算总页数
          //同时关闭遮罩层
          console.log('data',res.data)
          if (res.data.code === '200') {
            this.show = false
            this.dialogFormVisible = false
            this.findByPage()
          }
          if (res.data === '502') {
            this.$message({
              type: 'warning',
              message: res.data.msg
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


