/**
* 系统管理 用户管理
*/
<template>
  <div>
    <p>今日使用人数：{{this.todayUsePeople}}</p>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="">
        <el-input size="small" v-model.trim="formInline.username" placeholder="输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model.trim="formInline.phone" placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-search" @click="getdata">取消搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-search" @click="handleEdit()">添加用户</el-button>
        <!--        <el-button size="small" type="primary" icon="el-icon-plus" @click="addUser()">添加用户</el-button>-->
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @selection-change="selectChange" :data="userData"
              highlight-current-row v-loading="loading" border element-loading-text="拼命加载中"
              style="width: 100%" onscroll="">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column align="center"  prop="id" label="ID" width="50">
      </el-table-column>
      <el-table-column align="center"  prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column align="center"  prop="phone" label="手机号" width="120">
      </el-table-column>
      <el-table-column align="center"  prop="age" label="年龄" width="120">
      </el-table-column>
      <el-table-column align="center"  prop="sex" label="性别" min-width="70">
      </el-table-column>
      <el-table-column align="center"  prop="role" label="用户身份" min-width="120">
      </el-table-column>
      <!--      <el-table-column align="center"  prop="lastLogin_time" label="上次登录时间" min-width="120">-->
      <!--      </el-table-column>-->
      <el-table-column align="center"  prop="create_time" label="创建时间" width="120">
      </el-table-column>
      <el-table-column align="center"  prop="update_time" label="修改时间" min-width="120">
        <!--        <template slot-scope="scope">-->
        <!--          <div>{{scope.row.editTime|timestampToTime}}</div>-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column label="操作" min-width="300">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
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
        <el-form-item label="用户名" prop="username">
          <el-input size="small" v-model="editForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input size="small" v-model="editForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户身份" prop="role">
          <el-select size="small"
                     v-model="editForm.role"
                     @click.native="selectRole" multiple placeholder="请选择"
                     class="userRole">
            <el-option v-for="(roles,i) in this.roleData" :key="i" :value="roles.name" :label=roles.name></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input size="small" v-model="editForm.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="editForm.sex" label="男">男</el-radio>
          <el-radio v-model="editForm.sex" label="女">女</el-radio>
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
  // 导入请求方法
  import axios from "axios";
  import servicesApi from "@/utils/servicesApi";
  export default {
    // 注册组件
    components: {
    },
    data() {
      return {
        // nshow: true, //switch开启
        // fshow: false, //switch关闭
        loading: false, //是显示加载
        title: '添加用户',
        editFormVisible: false, //控制编辑页面显示与隐藏
        dataAccessShow: false, //控制数据权限显示与隐藏
        unitAccessShow: false, //控制所属单位隐藏与显示
        // 编辑与添加
        editForm: {
          id: '',
          username: '',
          phone: '',
          password: '',
          age: '',
          sex: '',
          update_time: '',
          role: [],
          create_time: '',
          // token: localStorage.getItem('logintoken')
        },
        // rules表单验证
        rules: {
          username: [
            {type: 'string',required: true,message: "请输入用户名", trigger: 'blur'},
            {max: 30,message: "名称长度不能超过30位" }
          ],
          role: [
            {type: 'string', required: true, message: '请至少选择一个角色', trigger: 'blur' }
          ],
          phone: [
            {
              pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
              required: true,
              message: '请输入正确的手机号',
              trigger: 'blur'
            }
          ],
          age: [
            {pattern:/^[1-9]\d*$/, required: true, message: '请输入年龄', trigger: 'blur' },
            {max: 3,message: "年龄不能超过3位数"}
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ]
        },
        // rules: {
        //   username: [
        //     { required: true, message: '请输入用户名', trigger: 'blur' }
        //   ],
        //   role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        //   phone: [
        //     { required: true, message: '请输入手机号', trigger: 'blur' },
        //     {
        //       // pattern: /^1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}$/,
        //       pattern: /^1[0-9]{10}$/g,
        //       required: true,
        //       message: '请输入正确的手机号',
        //       trigger: 'blur'
        //     }
        //   ],
        //   sex: [{ required: true, message: '请选择性别', trigger: 'blur' }]
        // },
        // 删除用户
        selectdata: {
          ids: '',
          // token: localStorage.getItem('logintoken')
        },
        // 重置密码
        resetpsd: {
          userId: '',
          // token: localStorage.getItem('logintoken')
        },
        // 请求数据参数
        formInline: {
          pageNum: 1,
          pageSize: 10,
          deptId: '',
          username: '',
          phone: '',
          isLock: ''
        },
        // 数据权限
        UserDept: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        // 选中
        checkmenu: [],
        //参数role
        saveroleId: '',
        // 分页参数
        pageparm: {
          pageNum: 1,
          pageSize: 10,
          total: 10
        },
        total: 0,
        //用户数据
        userData: [],
        //角色数据
        roleData: [],
        todayUsePeople: 0,//今日使用人数
      }
    },


    /**
     * 数据发生改变
     */
    watch: {},
    /**
     * 创建完毕
     */
    created() {
      this.getdata(this.formInline)
      this.getUserPeople()
      // this.selectRole()
    },
    /**
     * 里面的方法只有被调用才会执行
     */
    methods: {
      // 获取数据方法
      getdata() {
        this.loading = true
        // 获取用户列表
        let findData = {
          usernameLike: this.formInline.username,
          phoneLike: this.formInline.phone,
          pageNum: this.pageparm.pageNum,
          pageSize: this.pageparm.pageSize
        }
        servicesApi.getUserList(findData).then(res=>{
        // axios.post("/api/users/selectByUsernameAndPhoneLike", {
        //   usernameLike: this.formInline.username,
        //   phoneLike: this.formInline.phone,
        //   pageNum: this.pageparm.pageNum,
        //   pageSize: this.pageparm.pageSize
        // }).then(res => {
          console.log('res.',res.data)
          this.formInline.username = null
          this.formInline.phone = null
          this.loading = false
          // if (this.loading === false) {
          if (this.loading === false) {
            this.userData = res.data.data
            this.total = res.data.others.total
            console.log(this.userData)
          } else {
            this.userData = res.data.data
            // 分页赋值
            this.pageparm.pageNum = this.formInline.pageNum
            this.pageparm.pageSize = this.formInline.pageSize
            this.total = res.data.others.total
          }
        })
      },
      getUserPeople(){
        servicesApi.getPassPeople().then(res=>{
        // axios.get('/api/users/getPassPeople').then(res=>{
          console.log(res.data)
          this.todayUsePeople = res.data.data
        })
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
      //搜索事件
      search() {
        console.log(this.formInline)
        this.getdata()
      },
      //获取所有角色
      selectRole() {
        let data = {
          search: '',
          pageNum: 1,
          PageSize: 30
        }
        servicesApi.getAllRoles(data).then(res => {
        // axios.get('/api/role/getAllRoles').then(res => {
          console.log('roles',res.data)
          this.roleData = res.data.data.records
        })
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        // this.selectRole()
        this.editFormVisible = true
        // eslint-disable-next-line no-undefined
        if (row !== undefined && row !== 'undefined') {
          this.title = '修改用户'
          this.editForm.id = row.id
          this.editForm.username = row.username
          this.editForm.age = row.age
          this.editForm.role = row.role
          this.editForm.phone = row.phone
          this.editForm.sex = row.sex
        } else {
          this.title = '添加用户'
          this.editForm.username = ''
          this.editForm.phone = ''
          this.editForm.role = []
          this.editForm.sex = ''
          this.editForm.age = ''
        }
      },
      // 编辑、添加提交方法
      submitForm() {
        let data = {
          phone: this.editForm.phone
        }
        servicesApi.userIsHave(data).then(resp=>{
        // axios.post('/api/users/account-have', {
        //   phone: this.editForm.phone
        // }).then(resp => {
          console.log(resp.data);
          console.log(this.editForm.role);
          if (resp.data.code === "200") {
            let changeData = {
              id: this.editForm.id,
              role: this.editForm.role
            }
            servicesApi.changeRole(changeData).then(()=>{
            // axios.post('/api/users/changeRole', {
            //   id: this.editForm.id,
            //   role: this.editForm.role
            // }).then(res => {
              console.log(this.editForm.role)
              this.editFormVisible = false
              this.updateUserData()
              // this.getdata()
            })
          } else {
            let regData = {
              username: this.editForm.username,
              phone: this.editForm.phone,
              password: this.$md5(this.editForm.password),
              age: this.editForm.age,
              sex: this.editForm.sex,
              role: this.editForm.role
            }
            servicesApi.register(regData).then(res=>{
            // axios.post('/api/users/register', {
            //   username: this.editForm.username,
            //   phone: this.editForm.phone,
            //   password: this.$md5(this.editForm.password),
            //   age: this.editForm.age,
            //   sex: this.editForm.sex,
            //   role: this.editForm.role
            // }).then(res => {
              console.log(res.data);
              console.log(res.data.code);
              if (res.data.code === "200") {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.getdata()
                this.editFormVisible = false
              } else {
                alert(res.data.msg);
                this.editFormVisible = false
              }
            })
          }
        })
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

      updateUserData(){
        // console.log('1111')
        let upUserData = {
          id: this.editForm.id,
          username: this.editForm.username,
          age: this.editForm.age,
          sex: this.editForm.sex,
          role: this.editForm.role
        }
        servicesApi.updateUserData(upUserData).then(async res => {
        // axios.post('/api/users/updateUserMessage',{
        //   id: this.editForm.id,
        //   username: this.editForm.username,
        //   age: this.editForm.age,
        //   sex: this.editForm.sex,
        //   role: this.editForm.role
        // }).then(res=>{
          console.log(res.data)
          this.getdata()
        })
      },
      // 删除用户
      deleteUser(index, row) {
        this.$confirm('该用户及其绑定关系会被同时删除，确定要删除吗?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除
          let deleteData = {
            id: row.id
          }
          servicesApi.deleteUser(deleteData).then(res=>{
          // axios.post('/api/users/deleteById', {
          //   id: row.id
          // }).then(res => {
            console.log(res.data)
            if (res.data.code === "200") {
              this.$message({
                type: 'success',
                message: '数据已删除!'
              })
              this.getdata(this.formInline)
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
      },
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

