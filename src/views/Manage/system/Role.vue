/**
* 系统管理  角色管理
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.name" placeholder="输入角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small"
              :data="roleData"
              highlight-current-row
              v-loading="loading"
              border element-loading-text="拼命加载中"
              style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="roleId" label="角色编号" width="100">
      </el-table-column>
      <el-table-column sortable prop="name" label="角色名字" width="100">
      </el-table-column>
      <el-table-column sortable prop="permissions" label="权限" width="200">
      </el-table-column>
      <el-table-column sortable prop="comment" label="角色说明" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteRole(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="menuAccess(scope.$index, scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
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
      <el-form label-width="120px" :model="editForm" ref="editForm" :rules="rules">
        <!--        <el-form-item label="ID" prop="roleID">-->
        <!--          <el-input size="small" v-model="editForm.roleId" auto-complete="off" placeholder="请输入角色ID"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="角色名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色说明" prop="comment">
          <el-input size="small" v-model="editForm.comment" auto-complete="off" placeholder="请输入角色说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配权限"
               :visible.sync="menuAccessShow"
               width="50%"
               append-to-body
               @click='closeDialog("perm")'>
      <!--      <el-tree-->
      <!--          :data="powerList"-->
      <!--          show-checkbox-->
      <!--          default-expand-all-->
      <!--          node-key="id"-->
      <!--          ref="tree"-->
      <!--          highlight-current-->
      <!--          :props="defaultProps">-->
      <!--      </el-tree>-->
      <el-tree
        :data="powerList"
        show-checkbox
        node-key="id"
        ref="tree"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("perm")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="menuPermSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios";
import servicesApi from "@/utils/servicesApi";
  export default {
    data() {
      return {
        loading: false, //是显示加载
        editFormVisible: false, //控制编辑页面显示与隐藏
        menuAccessShow: false, //控制数据权限显示与隐藏
        title: '添加',
        editForm: {
          roleId: '',
          name: '',
          comment: ''
          // token: localStorage.getItem('logintoken')
        },
        // rules 表单验证
        rules: {
          roleId: [
            {
              pattern: /^[1-9]\d*$/,//正整数验证
              required: true,
              message: '请输入正确的id格式',
              trigger: 'blur'
            }
          ],
          name: [
            {type: "string", required: true, message: '请输入角色名称', trigger: 'blur' },
            {max: 30,message: '请保持角色名的长度最大为30'}
          ],
        },

        // rules: {
        //   roleId: [
        //     {required: true, message: '请输入角色ID', trigger: 'blur'}
        //   ],
        //   name: [
        //     {required: true, message: '请输入角色名称', trigger: 'blur'}
        //   ],
        //   permissions: [
        //     {required: true, message: '请选择角色权限', trigger: 'blur'}
        //   ]
        // },
        formInline: {
          pageNum: 1,
          pageSize: 10,
          name: '',
          roleId: '',
          // token: localStorage.getItem('logintoken')
        },
        // 删除
        selectdata: {
          ids: '',
          // token: localStorage.getItem('logintoken')
        },
        userparm: [], //搜索权限
        // 数据权限
        powerList: [],//权限列表
        defaultProps: {
          children: 'childrenButton',
          label: 'comment'
        },
        // 选中
        checkMenu: [],
        //参数role
        saveRoleId: '',
        // 分页参数
        pageparm: {
          pageNum: 1,
          pageSize: 10,
          total: 10
        },
        total: 0,
        roleData: [],//用户数据
      }
    },
    // 注册组件
    components: {
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
      // this.selectPermission()
      // this.showPermission()
    },

    /**
     * 里面的方法只有被调用才会执行
     */

    methods: {
      // 获取角色列表
      getdata(parameter) {
        let data = {
          search: this.formInline.name,//不为空即为按名字搜索
          pageNum: this.pageparm.pageNum,//第多少页数据
          pageSize: this.pageparm.pageSize//一页多少条数据
        }
        servicesApi.getAllRoles(data).then(res=>{
        // axios.post('/api/role/getViaPage',{
        //   search: this.formInline.name,//不为空即为按名字搜索
        //   pageNum: this.pageparm.pageNum,//第多少页数据
        //   pageSize: this.pageparm.pageSize//一页多少条数据
        // })
        //   .then(res => {
            this.loading = false
            this.formInline.name = null
            if (this.loading === false){
              this.roleData = res.data.data.records
              this.total = res.data.data.total//h
              console.log(res.data.data.records)
              console.log(res.data)
            } else {
              this.roleData = res.data.data.records
              // 分页赋值
              this.pageparm.pageNum = this.formInline.pageNum
              this.pageparm.pageSize = this.formInline.pageSize
              this.total = res.data.data.total
            }
          })
          .catch(err => {
            this.loading = false
            this.$message.error('获取角色列表失败，请稍后再试！')
          })
      },
      // 分页插件事件
      handleSizeChange(val){
        // 改变每页显示的条数
        this.pageparm.pageSize = val
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.pageparm.pageNum = 1
        console.log(`每页 ${val} 条`);
        this.getdata()
      },
      handleCurrentChange(val){
        // 改变默认的页数
        this.pageparm.pageNum = val
        console.log(`当前页: ${val}`);
        this.getdata()
      },
      //获取权限列表
      // selectPermission(){
      //   axios.get("/api/permission/getAllPermission").then(res=>{
      //     console.log(res.data);
      //     this.powerList = res.data.data
      //     console.log(this.powerList);
      //   })
      // },
      // 搜索事件
      search() {
        this.getdata(this.formInline)
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true
        // eslint-disable-next-line no-undefined
        if (row !== undefined && row !== 'undefined') {//row存在即为修改
          this.title = '修改'
          this.editForm.roleId = row.roleId //后端ID自增长，不需要设置ID
          this.editForm.name = row.name
          // this.editForm.permissions = row.permissions
          this.editForm.comment = row.comment
        } else {//row不存在为添加
          this.title = '添加'
          // this.editForm.roleId = ''
          this.editForm.name = ''
          this.editForm.comment = ''
        }
      },
      // 编辑、增加页面保存方法
      submitForm(editData) {
        let isHaving = false//判断弹窗内数据是否已存在
        for (let i in this.roleData){
          console.log(i)
          if (this.roleData[i].roleId === this.editForm.roleId){
            isHaving = true;
            console.log(isHaving)
            break;
          }
        }
        if (isHaving === true){//数据存在，进行修改
          let upData = {
            roleId: this.editForm.roleId,
            name: this.editForm.name,
            comment: this.editForm.comment
          }
          servicesApi.updateRole(upData).then(res=>{
          // axios.post('/api/role/updateRole',{
          //   roleId: this.editForm.roleId,
          //   name: this.editForm.name,
          //   comment: this.editForm.comment
          // }).then(res=>{
            console.log(res)
            this.$message({
              type: 'info',
              message: "修改成功"
            })
            this.editFormVisible = false
            this.getdata()
          })
        } else {//数据不存在，进行添加
          let addData = {
            roleId: this.editForm.roleId,
            name: this.editForm.name,
            comment: this.editForm.comment
          }
          servicesApi.addRole(addData).then(res =>{
          // axios.post('/api/role/addRole',{
          //   roleId: this.editForm.roleId,
          //   name: this.editForm.name,
          //   comment: this.editForm.comment
          // }).then(res =>{
            console.log(res)
            this.$message({
              type: 'info',
              message: "添加成功"
            })
            this.editFormVisible = false
            this.getdata()
          })
        }
      },
      // 删除角色
      deleteRole(index, row) {
        this.$confirm('确定要删除吗?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let name = {name: row.name}
          servicesApi.deleteRole(name).then(res=>{
          // axios.post('/api/role/deleteByRoleName', {
          //     name: row.name
          //   }).then(res => {
            console.log(res.data)
            if (res.data.code === "200") {//代表该角色已无被其他板块引用，可直接删除
              this.$message({
                type: 'success',
                message: '角色已删除！'
              });
              this.getdata()
            } else if (res.data.code === "502"){//该角色有绑定关系，先删除绑定的关系
              this.$confirm("该角色已被绑定，是否删除该角色及其所有绑定关系","删除异常",{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=>{
                //删除绑定权限
                let roleId = {roleId: row.roleId}
                servicesApi.deleteRolePermission(roleId).then(resp=>{
                // axios.post("/api/role/bondDeleteRolePermission",{
                //   roleId: row.roleId
                // }).then(resp=>{
                  //删除用户绑定
                  servicesApi.deleteRoleUser(roleId).then(resUser=>{
                  // axios.post("/api/role/bondDeleteUserRole",{
                  //   roleId: row.roleId
                  // }).then(resUser=>{
                    this.deleteRole(index,row)
                  })
                })
              }).catch(()=>{})
            }
          })
            .catch(err => {
              this.loading = false
              this.$message.error('角色删除失败，请稍后再试！')
            })
        }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      // 数据权限
      menuAccess: function (index, row) {
        this.menuAccessShow = true
        this.saveRoleId = row.roleId
        console.log("this.saveRoleId:" + this.saveRoleId)
        //获取后台已有权限数据
        servicesApi.getAllPermission().then(res=>{
        // axios.get("/api/permission/getAllPermission").then(res=>{
          console.log(res.data)
          if (res.data.code === "200"){
            this.$message({
              type: 'success',
              message: '获取权限成功'
            })
            this.changeMenu(res.data.data)
            this.powerList = this.changeArr(res.data.data)
            console.log(this.powerList)
            // alert("111")
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          }
        }).catch(err => {
          this.loading = false
          this.$message.error('获取权限失败，请稍后再试！')
        })
      },
      // 选中菜单
      changeMenu(arr) {//对后台返回数据进行处理
        let change = []
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].checked) {
            change.push(arr[i].id)
          }
        }
        this.checkMenu = change
      },
      // tree 递归
      changeArr(list) { //实现权限数据的树状展示
        var tempTree = [],
          tree = [],
          items = [];
        for (let i in list) {
          if (!tempTree[list[i].id]) {
            var trow = {
              id: list[i].id,
              pid: list[i].pid,
              name: list[i].name,
              comment: list[i].comment,
              path: list[i].path,
              is_menu: list[i].is_menu,
              childrenButton: []
            }
            tempTree[list[i].id] = trow
            items.push(trow)
          }
          if (list[i].childrenButton !== null){//当一个页面的children存在，进行树状分支
            for (let ch in list[i].childrenButton){
              tempTree[list[i].id]['childrenButton'].push({
                id: list[i].childrenButton[ch].id,
                pid: list[i].childrenButton[ch].pid,
                name: list[i].childrenButton[ch].name,
                comment: list[i].childrenButton[ch].comment,
                path: list[i].childrenButton[ch].path,
                is_menu: list[i].childrenButton[ch].is_menu,
                childrenButton: []
              })
            }
          }
        }
        for (var j in items) {
          if (tempTree[items[j].pid]) {
            tempTree[items[j].pid]['childrenButton'].push(tempTree[items[j].id])
          } else {
            tree.push(tempTree[items[j].id])
          }
        }
        tempTree = null
        items = null
        return tree
      },
      // 菜单权限-保存
      menuPermSave() {
        let parm = {
          roleId: this.saveRoleId,
          permissions: []
        }
        let node = this.$refs.tree.getCheckedNodes()
        let permissions = []
        let count = 0
        if (node.length !== 0) {
          for (let i = 0; i < node.length; i++) {
            for (let j = 0; j < permissions.length; j++){
              if (node[i].id === permissions[j]){
                count++;
                break;
              }
            }
            if (count === 0){
              permissions.push(node[i].id)
            } else {
              count = 0
            }
          }
          parm.permissions = permissions
        }
        let changeData = {
          roleId: this.saveRoleId,
          permissions: parm.permissions
        }
        servicesApi.changePermission(changeData).then(res=>{
        // axios.post("/api/role/changePermission", {
        //   roleId: this.saveRoleId,
        //   permissions: parm.permissions
        // })
        //   .then(res => {
            console.log(parm)
            console.log(res.data)
            if (res.data.code === "200") {
              this.$message({
                type: 'success',
                message: '权限保存成功'
              })
              this.menuAccessShow = false
              this.getdata(this.formInline)
            } else {
              this.$message({
                type: 'info',
                message: res.data.msg
              })
            }
          })
          .catch(err => {
            this.loading = false
            this.$message.error('权限保存失败，请稍后再试！')
          })
      },
      // 关闭编辑、增加弹出框
      closeDialog(dialog) {
        if (dialog === 'edit') {
          this.editFormVisible = false
        } else if (dialog === 'perm') {
          this.menuAccessShow = false
        }
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

