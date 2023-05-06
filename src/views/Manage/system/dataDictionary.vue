<template>
  <section>
    <!--高级查询-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="type">
        <el-input v-model="formInline.sn" placeholder="type"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="formInline.name" placeholder="类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="querySubmit">查询</el-button>
        <el-button type="success" @click="addSubmit">添加</el-button>
      </el-form-item>
    </el-form>

    <!--列表数据展示-->
    <el-table :data="tableData" @selection-change="selsChange" border :visible="drawer" @row-dblclick="rowDrawerClick">
      <!--innerDrawer = true-->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
      <el-table-column prop="sn" align="center" label="type"></el-table-column>
      <el-table-column prop="name" align="center" label="类型"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="info" @click="editClick(scope.row)" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteTypeById(scope.row)">删除</el-button>
          <!--          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <!--批量删除-->
      <el-button type="danger" size="mini" @click="batchTypeRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <!--分页-->
      <el-pagination style="float: right;"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="pageSizes"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-col>

    <!--添加、编辑组件-->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>
        <el-form ref="form" :model="addOrEditform" label-width="80px">
          <el-form-item label="type">
            <el-input v-model="addOrEditform.sn"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="addOrEditform.name"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditformSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!--==============================================================内层抽屉===========================================================================-->
    <div>
      <el-drawer :append-to-body="true" :before-close="handleClose" :visible.sync="innerDrawer">

        <!--内层抽屉高级查询-->
        <el-form :inline="true" :model="formDrawerInline" class="demo-form-inline">
          <el-form-item label="商品名">
            <el-input v-model="formDrawerInline.name" size="mini" placeholder="商品名" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="queryDrawerSubmit">查询</el-button>
            <el-button type="success" size="mini" @click="addDrawerSubmit">添加</el-button>
          </el-form-item>
        </el-form>

        <!--内层抽屉列表展示-->
        <el-table :data="drawerData" border @selection-change="selsChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="品牌名" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="info" @click="drawerEditClick(scope.row)" size="small">编辑
              </el-button>
              <el-button type="danger" @click="deleteDetailById(scope.row)" size="small">删除</el-button>
              <!--          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
            </template>
          </el-table-column>
        </el-table>


        <el-col :span="24" class="toolbar">
          <!--批量删除-->
          <el-button type="danger" size="mini" @click="batchDetailRemove" :disabled="this.sels.length===0">批量删除
          </el-button>
          <!--分页-->
          <el-pagination style="float: right; margin: 10px"
                         @size-change="drawerHandleSizeChange"
                         @current-change="drawerHandleCurrentChange"
                         :current-page="drawerCurrentPage"
                         :page-sizes="drawerPageSizes"
                         :page-size="drawerPageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="drawerTotal">
          </el-pagination>
        </el-col>
      </el-drawer>
      <!--添加、编辑组件-->
      <el-dialog :title="title" :visible.sync="drawerDialogVisible" width="30%" :before-close="handleClose">
          <span>
            <el-form ref="form" :model="drawerAddOrEditform" label-width="80px">
              <el-form-item label="品牌名">
                <el-input v-model="drawerAddOrEditform.name"></el-input>
              </el-form-item>
              <el-form-item label="类型">
<!--                <el-input v-model="drawerAddOrEditform.sn"></el-input>-->
                <el-select v-model="drawerAddOrEditform.parentId" clearable placeholder="请选择">
                  <el-option v-for="item in parentSn" :key="parentSn" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="drawerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="drawerAddOrEditformSubmit">确 定</el-button>
          </span>
      </el-dialog>
    </div>


  </section>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        //默认不显示抽屉
        drawer: false,
        //多层抽屉
        innerDrawer: false,

        //多选框
        sels: [],
        //数据列表
        tableData: [],
        //页码
        currentPage: 1,
        //每页数据数组
        pageSizes: [5, 10, 15, 20],
        //每页数据条数
        pageSize: 5,
        //数据总条数
        total: 0,

        //高级查询公共前缀绑定
        formInline: {
          sn: "",
          name: "",
        },

        //添加、编辑动态标题绑定
        title: "",
        //是否打开组件
        dialogVisible: false,
        //添加、编辑公共前缀绑定
        addOrEditform: {
          id: "",
          sn: "",
          name: "",
        },


        //==========================================================以下内层抽屉属性======================================================================
        //页码
        drawerCurrentPage: 1,
        //每页数据数组
        drawerPageSizes: [5, 10, 15, 20],
        //每页数据条数
        drawerPageSize: 5,
        //数据总条数
        drawerTotal: 0,
        //数据列表
        drawerData: [],
        //高级查询公共前缀绑定
        formDrawerInline: {
          //品牌id
          parentId: "",
          //商品id
          id: "",
          //商品名
          name: "",
        },
        //添加、修改模态框
        drawerDialogVisible: false,
        //添加、编辑公共前缀绑定
        drawerAddOrEditform: {
          //品牌id
          parent: {
            id: "",

          },
          //父级id（for循环展示）
          parentId:"",
          //商品id
          id: "",
          //商品名
          name: "",
        },
        //内层抽屉对应第一层产品名称
        parentSn: [],
      };
    },
    methods: {
      //双击显示内层抽屉
      rowDrawerClick(row) {
        // console.debug(row)
        //每次子表打开，页码重新赋值为1
        this.drawerCurrentPage = 1
        //每次子表打开，每页数据条数重新赋值为5条
        this.drawerPageSize = 5
        //品牌id赋值
        this.formDrawerInline.parentId = row.id
        //展示内层抽屉列表
        this.loadRowDrawerDataByQuery();
        //弹出内层抽屉
        this.innerDrawer = true
      },
      //每页数据量
      drawerHandleSizeChange(val) {
        this.drawerPageSize = val;
        //展示内层抽屉列表（刷新页面）
        this.loadRowDrawerDataByQuery();
      },
      //当前页
      drawerHandleCurrentChange(val) {
        this.drawerCurrentPage = val;
        //展示内层抽屉列表（刷新页面）
        this.loadRowDrawerDataByQuery();
      },
      //高级查询
      queryDrawerSubmit() {
        //展示内层抽屉列表（刷新页面）
        this.loadRowDrawerDataByQuery();
      },
      //添加事件注册
      addDrawerSubmit() {
        this.title = "添加"
        //清空表单
        for (let k in this.drawerAddOrEditform) {
          this.drawerAddOrEditform[k] = "";
        }
        //打开模态框
        this.drawerDialogVisible = true;

      },
      //编辑事件注册
      drawerEditClick(row) {
        this.innerDrawer = false
        this.title = "编辑"
        //清空表单
        for (let k in this.drawerAddOrEditform) {
          this.drawerAddOrEditform[k] = "";
        }
        //回显数据
        for (let k in this.drawerAddOrEditform) {
          this.drawerAddOrEditform[k] = row[k];
        }
        // console.debug(this.formDrawerInline.parentId)
        this.drawerAddOrEditform.parentId = this.formDrawerInline.parentId
        // console.debug(this.drawerAddOrEditform.parentId )
        //打开模态框
        this.drawerDialogVisible = true;
      },
      //编辑、添加提交事件
      drawerAddOrEditformSubmit() {
        //获取参数
        this.drawerAddOrEditform.parent = {"id": this.drawerAddOrEditform.parentId}
        // console.debug(this.drawerAddOrEditform)
        //发送请求
        axios.post("/detail/saveDetail", this.drawerAddOrEditform)
          .then((res => {
          let {success, msg} = res.data
          if (success) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            //关闭模态框
            this.drawerDialogVisible = false
            //刷新页面
            this.loadRowDrawerDataByQuery();
          } else {
            //错误提示
            //this.$message.error("网络延迟，保存数据失败了哦！")
            this.$message({
              type: 'success',
              message: msg
            })
            //关闭模态框
            this.drawerDialogVisible = false
            //刷新页面
            this.loadRowDrawerDataByQuery();
          }
        }))
      },
      //删除事件,删除一条
      deleteDetailById(row) {
        // console.debug(row)
        //发送请求
        axios.delete("/detail/deleteDetailById/" + row.id).then((res => {
          let {success, msg} = res.data
          if (success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            //关闭模态框
            this.dialogVisible = false
            //刷新页面
            this.loadRowDrawerDataByQuery();
          } else {
            //错误提示
            //this.$message.error("网络延迟，保存数据失败了哦！")
            this.$message({
              type: 'success',
              message: msg
            })
            //关闭模态框
            this.dialogVisible = false
            //刷新页面
            this.loadRowDrawerDataByQuery();
          }
        }))
      },
      //批量删除
      batchDetailRemove() {
        // console.debug(this.sels)
        let ids = this.sels.map(item => item.id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送请求
          axios.post("/detail/deleteByIds", ids).then((res => {
            let {success, msg} = res.data
            if (success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //刷新页面
              this.loadRowDrawerDataByQuery();
            } else {
              this.$message.error("删除失败!")
              //刷新页面
              this.loadRowDrawerDataByQuery();
            }
          }))
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //列表展示方法
      loadRowDrawerDataByQuery() {
        //分页、高级查询参数
        let param = {
          "id": this.formDrawerInline.parentId,
          //每页数据条数
          "pageSizeDetail": this.drawerPageSize,
          //页码
          "currentPageDetail": this.drawerCurrentPage,
          //高级查询参数
          "name": this.formDrawerInline.name,
        }
        // console.debug(param)
        //发送请求，查询此行所属的参数
        axios.post("/detail/loadRowDrawerDataByQuery", param).then((res => {
          // console.debug(res.data)
          let {total, list} = res.data
          this.drawerTotal = total
          this.drawerData = list
        }))
      },
      //================================================以上为内层抽屉事件========================================================
      //每页数据量
      handleSizeChange(val) {
        // console.debug("每页数据量", val)
        this.pageSize = val;
        //刷新页面
        this.loadAllDatas();
      },
      //当前页
      handleCurrentChange(val) {
        // console.debug("页码", val)
        this.currentPage = val;
        //刷新页面
        this.loadAllDatas();
      },
      //多选事件注册
      selsChange(sels) {
        this.sels = sels;
      },
      //内层抽屉关闭提示
      handleClose(done) {
        this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      //高级查询
      querySubmit() {
        this.loadAllDatas();
      },
      //添加事件注册
      addSubmit() {
        this.title = "添加"
        //清空表单
        for (let k in this.addOrEditform) {
          this.addOrEditform[k] = "";
        }
        //打开模态框
        this.dialogVisible = true;

      },
      //编辑事件注册
      editClick(row) {
        this.title = "编辑"
        //清空表单
        for (let k in this.addOrEditform) {
          this.addOrEditform[k] = "";
        }
        //回显数据
        for (let k in this.addOrEditform) {
          this.addOrEditform[k] = row[k];
        }
        //打开模态框
        this.dialogVisible = true;
      },
      //编辑、添加提交事件
      addOrEditformSubmit() {
        //获取参数
        //发送请求
        axios.post("/type/saveType", this.addOrEditform).then((res => {
          let {success, msg} = res.data
          if (success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            //关闭模态框
            this.dialogVisible = false
            //刷新页面
            this.loadAllDatas();
          } else {
            //错误提示
            //this.$message.error("网络延迟，保存数据失败了哦！")
            this.$message({
              type: 'success',
              message: msg
            })
            //关闭模态框
            this.dialogVisible = false
            //刷新页面
            this.loadAllDatas();
          }
        }))
      },
      //删除事件
      deleteTypeById(row) {
        // console.debug(row)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送请求
          axios.delete("/type/deleteTypeById/" + row.id).then((res => {
            let {success, msg} = res.data
            if (success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //刷新页面
              this.loadAllDatas();
            } else {
              this.$message.error("删除失败!")
              //刷新页面
              this.loadAllDatas();
            }
          }))
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //批量删除
      batchTypeRemove() {
        // console.debug(this.sels)
        let ids = this.sels.map(item => item.id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送请求
          axios.patch("/type/deleteByIds", ids).then((res => {
            let {success, msg} = res.data
            if (success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //刷新页面
              this.loadAllDatas();
            } else {
              this.$message.error("删除失败!")
              //刷新页面
              this.loadAllDatas();
            }
          }))
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //数据列表展示
      loadAllDatas() {
        //准备分页数据
        let param = {
          //每页数据条数
          "pageSize": this.pageSize,
          //页码
          "currentPage": this.currentPage,
          //高级查询参数
          "sn": this.formInline.sn,
          "name": this.formInline.name,
        }
        // console.debug(param)
        //发送请求
        axios.patch("/type/loadAllByQuery", param).then((res => {
          // console.debug(res.data)
          let {total, list} = res.data
          this.total = total
          this.tableData = list
        }))
      },
      //查询所有品牌类型名，无分页
      loadAllType(){
        axios.patch("/type/loadAll").then((res=>{
          //产品名写入内层抽屉中
          this.parentSn = res.data
          // console.debug(res.data)
        }))
      }
    },
    mounted() {
      //数据列表展示
      this.loadAllDatas();
      //查询所有品牌类型名，无分页
      this.loadAllType();
    }
  };
</script>
