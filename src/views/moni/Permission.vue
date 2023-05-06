<style>
</style>
<template>
  <div id="privilege-manager">
    <!--顶部菜单栏-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="搜索：">
        <el-input size="small"  placeholder="输入权限名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit(scope.$index, scope.row)">添加</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-row>
      <el-table :data="tableData" style="width: 100%;" row-key="id" :tree-props="{children: 'children'}">
        <el-table-column prop="privilegeName" label="权限名称" >
        </el-table-column>
        <el-table-column prop="privilegeType" label="权限类别" >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">

            <el-button type="primary" size="mini" @click="toAdd(scope)">新增</el-button>
            <el-button type="primary" size="mini" @click="toEdit(scope)">编辑</el-button>
            <el-button type="danger" size="mini" @click="todelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageIndex"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size=pagination.pageSize
        layout="total, prev, pager, next"
        :total=pagination.total>
      </el-pagination>
    </el-row>
<!--     编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="权限名称" prop="privilegeName">
          <el-input size="small" v-model="editForm.privilegeName" auto-complete="off" placeholder="请输入权限名称"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="privilegeType">
          <el-input size="small" v-model="editForm.privilegeType" auto-complete="off" placeholder="请输入权限类型"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from "axios";
  export default{
    name: 'privilege-manager',
    data () {
      //模拟数据
      return {
        nshow: true, //switch开启
        fshow: false, //switch关闭
        loading: false, //是显示加载
        editFormVisible: false, //控制编辑页面显示与隐藏
        privilegeData: [],
        editForm: {
          privilegeName: '',
          privilegeType: '',
        },
        rules: {
          // privilegeName: [
          //   {required: true, message: '请输入正确的权限名称', trigger: 'blur'}
          // ],
          // privilegeName: [
          //   {required: true, message: '请输入正确的权限类型', trigger: 'blur'}
          // ]
        },
        formInline: {
          pid: 0,
          privilegeName: '',
          privilegeType: '',
          roleId: '0',
          token: localStorage.getItem('logintoken')
        },
        tableData: [{
          id: 1,
          privilegeName: '心理测试',
          privilegeType: '目录',
            children: [
              {
                id: 11,
                privilegeName: '删除测试',
                privilegeType: '按钮',
              },{
                id: 12,
                privilegeName: '增加测试',
                privilegeType: '按钮',
              }
            ]
      },
          {
        id: 2,
        privilegeName: '视频讲座',
        privilegeType: '目录',
              children: [
                {
                  id: 21,
                  privilegeName: '删除视频',
                  privilegeType: '按钮',
                },
                {
                  id: 22,
                  privilegeName: '上传视频',
                  privilegeType: '按钮',
                }
              ]
      },
          {
        id: 3,
        privilegeName: "心理文章",
        privilegeType: "目录",
          children: [
            {
              id: 31,
              privilegeName: '删除文章',
              privilegeType: '按钮',
            },
            {
              id: 32,
              privilegeName: '上传文章',
              privilegeType: '按钮',
            }
          ]
      },
          {
         id: 4,
         privilegeName: '预约咨询',
         privilegeType: '目录',
              children: [
                {
                  id: 41,
                  privilegeName: '预约健康师',
                  privilegeType: '按钮',
                },
                {
                  id: 42,
                  privilegeName: '取消预约',
                  privilegeType: '按钮',
                }
              ]
      },
          {
            id: 5,
            privilegeName: '留言问答',
            privilegeType: '目录',
              children: [
                {
                  id: 51,
                  privilegeName: '删除该留言',
                  privilegeType: '按钮',
                },
                {
                  id: 52,
                  privilegeName: '删除该问答',
                  privilegeType: '按钮',
                }
              ]

          },
          {
            id: 6,
            privilegeName: '首页',
            privilegeType: '目录',
            children: [{
              id: 61,
              privilegeName: '视频讲座',
              privilegeType: '菜单',
            }, {
              id: 62,
              privilegeName: '视频讲座',
              privilegeType: '菜单',
            }]
          }
      ],
        //模拟数据结束
        dialogFormEdit: false,
        dialogFormAdd:false,
        privilege: {
          id: '',
          privilegeName: '',
          privilegeCode: '',
          privilegeType: '',
          pid: '0'
        },
        pagination: {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
        }
      }
    },
    methods:{
      getdata() {
        this.loading = true

        // // 获取权限列表
        // axios.post("/api/users/selectByUsernameAndPhoneLike",{
        //   usernameLike: this.formInline.username,
        //   phoneLike: this.formInline.phone,
        //   pageNum: this.pageparm.pageNum,
        //   pageSize: this.pageparm.pageSize
        // }).then(res => {
        //   console.log(res.data)
        //   this.formInline.username = null
        //   this.formInline.phone = null
        //   this.loading = false
        //   // if (this.loading === false) {
        //   if(this.loading === false) {
        //     this.userData = res.data.data
        //     this.total = res.data.others.total
        //     console.log(this.userData)
        //   } else {
        //     this.userData = res.data.data
        //     // 分页赋值
        //     this.pageparm.pageNum = this.formInline.pageNum
        //     this.pageparm.pageSize = this.formInline.pageSize
        //   }
        // })
      },
      //显示编辑页面
      toEdit: function(index, row) {
        this.editFormVisible = true
        if (row != undefined && row != 'undefined') {
          this.title = '修改权限'
          this.editForm.privilegeName = row.privilegeName
          this.editForm.privilegeType = row.privilegeType
        } else {
          this.title = '添加权限'
          this.editForm.privilegeName = ''
          this.editForm.privilegeType = ''
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagination.pageSize = val;
        this.pagination.pageIndex = 1;
        this.init();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagination.pageIndex = val;
        this.init();
      },
      //关闭编辑界面
      closeDialog() {
        this.editFormVisible = false
      },
      // 权限类别转换
      formatPrivilegeType: function( row, column) {
        if(row.privilegeType === '1'){
          return '目录'
        } else if(row.privilegeType === '2') {
          return '菜单'
        } else if (row.privilegeType === '3') {
          return '按钮'
        } else {
          return ''
        }
      }
    },
    mounted: function () {
      this.init()
    }


  }
</script>
