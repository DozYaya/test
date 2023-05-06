<template>
  <div class="personalCenter">
    <el-container>
      <el-header style="font-size: 30px">个人中心</el-header>
      <el-container>
        <el-aside width="25%">
          <el-col :span="12">
            <div class="sub-title"></div>
            <div class="demo-basic--circle">
              <div class="img">
                <el-avatar
                    :size="100"
                    :src="circleUrl"
                ></el-avatar>
              </div>
              <div class="block">
                <span>ADMIN</span>
              </div>
            </div>
          </el-col>
          <el-col>
            <el-form>
              <el-form-item label="用户昵称:" style="margin-left: 2%"><p>{{username}}</p></el-form-item>
              <el-form-item label="电话号码:" style="margin-left: 2%">{{phone}}</el-form-item>
              <el-form-item label="用户年龄:" style="margin-left: 2%">{{age}}</el-form-item>
              <el-form-item label="用户性别:" style="margin-left: 2%">{{sex}}</el-form-item>
              <el-form-item label="用户权限:" style="margin-left: 2%">{{role}}</el-form-item>
            </el-form>
            <el-button-group style="float: right;margin-right: 5%; padding: 3px 0" type="text">
              <el-button type="primary" size="medium" round @click="handleEdit">修改个人信息</el-button>
            </el-button-group>
          </el-col>
        </el-aside>
        <el-container>
          <el-main>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="float: left"><b>账号绑定</b></span>
<!--                <el-button-group-->
<!--                    style="float: right; padding: 3px 0"-->
<!--                    type="text"-->
<!--                >-->
<!--                  <el-button-->
<!--                      type="primary"-->
<!--                      icon="el-icon-edit"-->
<!--                      size="medium"-->
<!--                      round-->
<!--                  >-->
<!--                    修改信息-->
<!--                  </el-button>-->
<!--                  <el-button-->
<!--                      type="primary"-->
<!--                      icon="el-icon-check"-->
<!--                      size="medium"-->
<!--                      round-->
<!--                  >-->
<!--                    确认修改-->
<!--                  </el-button>-->
<!--                </el-button-group>-->
              </div>
              <div class="text item">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column label="账号名" width="180">
                    <template v-slot="scope">
                      <p>{{ scope.row.name1 }}：{{phone}}</p>
                      <div slot="reference" class="name-wrapper"></div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template v-slot="scope">
                      <p>手机号为您的登录账号，不可以修改哦！如果想要更改手机号，请联系工作人员。</p>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div>
                <span style="float: left" shadow="hover"><b>个人说明</b></span>
                <br/>
                <br/>
                <span>螃蟹在剥我的壳</span>
                <el-divider></el-divider>
                <span>笔记本在写我</span>
                <el-divider></el-divider>
                <span>漫天的我落在枫叶的雪花上</span>
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>

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
<!--        <el-form-item label="手机号" prop="phone">-->
<!--          <el-input size="small" v-model="editForm.phone" placeholder="请输入手机号"></el-input>-->
<!--        </el-form-item>-->
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
  import axios from 'axios';
  import servicesApi from "@/utils/servicesApi";
  import global from "@/js/global";

  export default {
    name: 'person_data',
    inject: ['reload'],
    data: function () {
      return {
        id: this.$store.state.data.id,
        username: this.$store.getters.showUsername,
        age: this.$store.getters.showAge,
        sex: this.$store.getters.showSex,
        phone: this.$store.getters.showPhone,
        role: this.$store.getters.showRoles,
        // id: '',
        // username: '',
        // age: '',
        // sex: '',
        // phone:'',
        // role: '',
        mail: '',
        circleUrl:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        sizeList: ['large'],
        tableData: [
          {
            date: '2016-05-03',
            name1: '手机号',
            name2: 'Gitee',
          },
        ],
        title: '修改个人信息',
        editFormVisible: false, //控制编辑页面显示与隐藏
        loading: false, //是显示加载
        isReload: false,//是否刷新页面
        // 编辑
        editForm: {
          id: '',
          username: '',
          phone: '',
          password: '',
          age: 0,
          sex: '',
          update_time: '',
          role: [],
          create_time: '',
        },
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
      }
    },
    created() {
      console.log(this.$store.state)
    },
    methods: {

      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true
        this.editForm.id = this.id
        this.editForm.username = this.username
        this.editForm.age = this.age
        this.editForm.phone = this.phone
        this.editForm.sex = this.sex
      },

      // 编辑、添加提交方法
      async submitForm() {
        if (this.editForm.username === '' || this.editForm.username === null){
          alert('用户昵称不能为空！！！')
          return;
        }
        if (this.editForm.age === '' || this.editForm.age === null){
          alert('用户年龄不能为空！！！')
          return;
        }
        if (this.editForm.sex === '' || this.editForm.sex === null){
          alert('用户性别不能为空！！！')
          return;
        }
        let updateData = {
          id: this.editForm.id,
          username: this.editForm.username,
          age: this.editForm.age,
          sex: this.editForm.sex,
        }
        servicesApi.updateUserData(updateData).then(async res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.$message({
              // message: '您的个人信息已修改完成,您所修改的个人信息将在下次登陆时更新，谢谢。',
              message: '您的个人信息已修改完成',
              type: 'success'
            })
            this.editFormVisible = false
            await this.newPersonalData()
          }
        })
      },
      haveReload(){
        if (this.isReload){
          this.reload()
          this.isReload = false
        }
      },

      //显示修改后的信息
      newPersonalData(){
        let pwd = this.$store.state.password
        let loginData = {
          phone: this.phone,
          password: this.$md5(pwd)
        }
        servicesApi.login(loginData).then(res=>{
          console.log(res.data);
          // console.log(res.data.code);
          if (res.data.code === "200"){//跳转首页
            console.log(res.data.msg);
            this.$store.state.password = pwd
            sessionStorage.setItem('Token',res.data.data.token)
            //将后台返回数据放入store中
            this.$store.commit("update",res.data);
            console.log(this.$store.state);
            // this.getUserData()
            this.isReload = true
            this.haveReload()
          } else {
            console.log(res.data);
            alert(res.data.msg);
          }
        })
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
    },
}
</script>
<style>
.el-header {
  line-height: 60px;
  text-align: center;
  background-color: #b3c0d1;
}
.el-aside {
  line-height: 44px;
  text-align: center;
  background-color: #d3dce6;
}
.el-main {
  line-height: 36px;
  text-align: center;
  background-color: #e9eef3;
}

.demo-basic--circle {
  align: 'center';
  margin-top: 30px;
  margin-left: 55%;
  /*margin-left: 150px;*/
}
.block {
  margin-left: 25px;
  font-weight: bold;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  /*width: 765px;*/
  width: 95%;
  border-radius: 30px;
}
</style>
