<style>
</style>
<template>
  <div id="privilege-manager">
    <!--顶部菜单栏-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit">添加</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <div class="over">
      <el-tree
        :data="powerList"
        show-checkbox
        node-key="id"
        ref="tree"
        :props="defaultProps"
        :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
           <!-- 新增 -->
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleEdit(node, data)"
                  >编辑</el-button>

          <!-- 编辑 -->
<!--                  <el-button-->
<!--                    size="mini"-->
<!--                    type="text"-->
<!--                    @click="handleEdit(node, data)"-->
<!--                  >编辑</el-button>-->

          <!-- 删除 -->
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleDelete(node, data)"
                  >删除</el-button>
        </span>
      </span>
      </el-tree>
<!--      <el-pagination-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page="pagination.pageIndex"-->
<!--        :page-sizes="[5, 10, 20, 30, 40]"-->
<!--        :page-size=pagination.pageSize-->
<!--        layout="total, prev, pager, next"-->
<!--        :total=pagination.total>-->
<!--      </el-pagination>-->
    </div>
    <!--     编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="权限ID" prop="id" v-if="this.title === '修改权限'">
          <el-input size="small" v-model="editForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入权限名称"></el-input>
        </el-form-item>
        <el-form-item label="权限路径" prop="path">
          <el-input size="small" v-model="editForm.path" auto-complete="off" placeholder="请输入权限路径"></el-input>
        </el-form-item>
        <el-form-item label="权限简介" prop="comment">
          <el-input size="small" v-model="editForm.comment" auto-complete="off" placeholder="请输入权限简介"></el-input>
        </el-form-item>
        <el-form-item label="父页面" prop="pid">
          <el-input size="small" v-model="editForm.pid" auto-complete="off" placeholder="请输入父页面ID"></el-input>
        </el-form-item>
        <el-form-item label="是否按钮" prop="is_menu">
          <el-select size="small"
                     v-model="editForm.is_menu"
                     placeholder="请选择" value="">
            <el-option v-for="(v,i) in this.isMenu" :key="i" :value="v.value" :label="v.label"></el-option>
          </el-select>
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
  import servicesApi from "@/utils/servicesApi";
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'permission',
    data() {
      //模拟数据
      return {
        nshow: true, //switch开启
        fshow: false, //switch关闭
        loading: false, //是显示加载
        title: '',
        editFormVisible: false, //控制编辑页面显示与隐藏
        privilegeData: [],
        powerList: [],
        defaultProps: {
          children: 'childrenButton',
          label: 'comment'
        },
        editForm: {
          id: null,
          name: '',
          path: '',
          comment: '',
          pid: null,
          is_menu: null,
        },
        isMenu: [
          {
            value: 0,
            label: '按钮'
          },
          {
            value: 1,
            label: '页面'
          }
        ],
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

        dialogFormEdit: false,
        dialogFormAdd: false,
        privilege: {
          id: '',
          privilegeName: '',
          privilegeCode: '',
          privilegeType: '',
          pid: '0'
        },
        // 分页参数
        pageparm: {
          pageNum: 1,
          pageSize: 10,
          total: 10
        },
        total: 0,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      // 获取角色列表
      getData() {
        servicesApi.getAllPermission().then(res=>{
        // axios.get('/api/permission/getAllPermission').then(res => {
          console.log('res', res.data.data)
          // if (res.data.code === 200){
          //   this.$message({
          //     type: 'success',
          //     message: '获取权限成功'
          //   })
          //   // this.changeMenu(res.data.data)
          //   this.powerList = this.changeArr(res.data.data)
          //   console.log('powerList', this.powerList)
          // } else{
          //   this.$message({
          //     type: 'info',
          //     message: res.data.msg
          //   })
          // }
          this.powerList = res.data.data
          console.log('powerList', this.powerList)
        })
            .catch(() => {
              this.loading = false
              this.$message.error('获取权限失败，请稍后再试！')
            })
      },
      //显示编辑页面
      handleEdit: function (index, row) {
        this.editFormVisible = true
        // eslint-disable-next-line no-undefined
        if (row !== undefined && row !== 'undefined') {
          this.title = '修改权限'
          this.editForm.id = row.id
          this.editForm.name = row.name
          this.editForm.path = row.path
          this.editForm.comment = row.comment
          this.editForm.pid = row.pid
          this.editForm.is_menu = row.is_menu
        } else {
          this.title = '添加权限'
          this.editForm.id = ''
          this.editForm.name = ''
          this.editForm.path = ''
          this.editForm.comment = ''
          this.editForm.pid = ''
          this.editForm.is_menu = ''
        }
      },
      // 编辑、添加提交方法
      submitForm() {
        // let fd = new FormData
        // fd.append('id',this.editForm.id)
        // fd.append('name',this.editForm.name)
        // fd.append('path',this.editForm.path)
        // fd.append('comment',this.editForm.comment)
        // fd.append('pid',this.editForm.pid)
        // fd.append('is_menu',this.editForm.is_menu)
        if (this.title === '添加权限') {
          let addData = {
            name: this.editForm.name,
            pid: this.editForm.pid,
            is_menu: this.editForm.is_menu,
            comment: this.editForm.comment,
            path: this.editForm.path,
          }
          if (this.editForm.is_menu === 0 || this.editForm.is_menu === '0') {//按钮
            servicesApi.addButton(addData).then(res=>{
            // axios.post('/api/permission/addButton',fd).then(res=>{
            // axios.post('/api/permission/addButton', {
            //   name: this.editForm.name,
            //   pid: this.editForm.pid,
            //   is_menu: this.editForm.is_menu,
            //   comment: this.editForm.comment,
            //   path: this.editForm.path,
            // }).then(res => {
              console.log('buttonRES:', res.data)
              if (res.data.code === '200') {
                this.editFormVisible = false
                this.$message("添加按钮权限成功")
                this.getData()
              } else {
                alert(res.data.msg)
              }
            })
          } else {
            // axios.post('/api/permission/addPermission',fd).then(res=>{
            servicesApi.addPermission(addData).then(res=>{
            // axios.post('/api/permission/addPermission', {
            //   name: this.editForm.name,
            //   pid: this.editForm.pid,
            //   is_menu: this.editForm.is_menu,
            //   comment: this.editForm.comment,
            //   path: this.editForm.path,
            // }).then(res => {
              console.log('viewRES:', res.data)
              if (res.data.code === '200') {
                this.editFormVisible = false
                this.$message("添加页面权限成功")
                this.getData()
              } else {
                alert(res.data.msg)
              }
            })
          }
        } else {
          // axios.post('/api/permission/alterPermission',fd).then(res=>{
          let changeData = {
            id: this.editForm.id,
            name: this.editForm.name,
            pid: this.editForm.pid,
            is_menu: this.editForm.is_menu,
            comment: this.editForm.comment,
            path: this.editForm.path,
          }
          servicesApi.updatePermission(changeData).then(res=>{
          // axios.post('/api/permission/alterPermission', {
          //   id: this.editForm.id,
          //   name: this.editForm.name,
          //   pid: this.editForm.pid,
          //   is_menu: this.editForm.is_menu,
          //   comment: this.editForm.comment,
          //   path: this.editForm.path,
          // }).then(res => {
            console.log('editRES:', res.data)
            if (res.data.code === '200') {
              this.editFormVisible = false
              this.$message("修改权限成功")
              this.getData()
            } else {
              alert(res.data.msg)
            }
          })
        }
      },
      //关闭编辑界面
      closeDialog() {
        this.editFormVisible = false
      },
      //删除权限绑定关系
      deleteRolePermission(index, row) {
        this.$confirm('该权限存在绑定关系，是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = {id: row.id,}
          servicesApi.deleteRolePermission(id).then(res=>{
          // axios.post('/api/permission/bondDeletePermissionRole', {
          //   id: row.id,
          // }).then(res => {
            console.log('绑定删除返回：', res.data)
            if (res.data.code === '200') {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.handleDelete(index, row)
            }
          })
        }).catch(() => {
        })
      },
      //删除权限
      handleDelete(index, row) {
        this.$confirm('该权限将会被删除，确定要删除吗?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let fd = new FormData()
          // this.deleteRolePermission(row.id)
          fd.append('permissionName', row.name)
          servicesApi.deletePermission(fd).then(res => {
          // axios.post('/api/permission/deleteByPermissionName', fd).then(res => {
            console.log(res.data)
            if (res.data.code === "200") {
              this.$message({
                type: 'success',
                message: '数据已删除!'
              })
              this.getData()
            } else if (res.data.code === '502') {
              //存在绑定关系，删除绑定关系
              this.deleteRolePermission(index, row)
            } else {
              this.$message({
                type: 'info',
                message: res.data.msg
              })
            }
          }).catch(() => {
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

      // 权限类别转换
      // formatPrivilegeType: function (row, column) {
      //   if (row.privilegeType === '1') {
      //     return '目录'
      //   } else if (row.privilegeType === '2') {
      //     return '菜单'
      //   } else if (row.privilegeType === '3') {
      //     return '按钮'
      //   } else {
      //     return ''
      //   }
      // },
      append(data) {
        const newChild = {id: id++, label: 'testtest', children: []};
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      search() {

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
        let tempTree = [],
            tree = [],
            items = [];
        for (let i in list) {
          if (!tempTree[list[i].id]) {
            const trow = {
              id: list[i].id,
              pid: list[i].pid,
              name: list[i].name,
              comment: list[i].comment,
              path: list[i].path,
              is_menu: list[i].is_menu,
              childrenButton: []
            };
            tempTree[list[i].id] = trow
            items.push(trow)
          }
          if (list[i].childrenButton !== null) {//当一个页面的children存在，进行树状分支
            for (let ch in list[i].childrenButton) {
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
        for (const j in items) {
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
    }
  }
</script>
<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

</style>
