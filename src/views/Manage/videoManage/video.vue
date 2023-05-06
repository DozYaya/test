/**
* 视频讲座 视频讲座管理
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>视频讲座</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <!--      <el-form-item label="搜索：">-->
      <!--        <el-input size="small" v-model="formInline.deptName" placeholder="输入视频id"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.searchOf" placeholder="输入视频名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="uploadVideo">上传视频</el-button>
        <el-button size="small" type="primary" @click="handleAdd">添加视频信息</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="crud" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <!--      <el-table-column align="center" type="index" width="60">-->
      <!--      </el-table-column>-->
      <el-table-column sortable prop="videoId" label="视频id" width="100" fixed>
      </el-table-column>
      <!--视频名称不超过15个字-->
      <el-table-column sortable prop="videoName" label="视频名称" width="200">
      </el-table-column>
      <el-table-column sortable prop="videoClassId" label="视频分类id" width="200">
      </el-table-column>
      <el-table-column sortable prop="imageFileId" label="视频封面id" width="200">
      </el-table-column>
<!--      <el-table-column prop="imageFileId" label="视频封面" width="200" >-->
<!--        <template v-slot:default="scope">-->
<!--          <el-image :src="'http://47.96.95.225:8081/files/download/' + scope.row.imageFileId"-->
<!--                    alt="图片加载中"></el-image>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <!--      <el-table-column sortable prop="videoImag" label="视频封面" width="200">-->
      <!--        <template v-slot:default="scope">-->
      <!--          <el-image :src="scope.row.img"/>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column sortable prop="videoFileId" label="视频文件id" width="120">
      </el-table-column>
      <el-table-column sortable prop="videoWatch" label="视频播放量" width="150">
      </el-table-column>
      <el-table-column sortable prop="create_time" label="视频创建时间" width="175">
      </el-table-column>
      <!--      <el-table-column sortable prop="editUser" label="修改人" width="300">-->
      <!--      </el-table-column>-->
      <el-table-column align="center" label="操作" min-width="200" fixed="right">
        <template v-slot="scope">
          <el-button size="mini" @click="playVideo(scope.$index, scope.row,crud)">查看</el-button>
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

      <el-dialog title="视频信息" :visible.sync="dialogFormVisible">
        <el-form :rules="rules">
          <el-form-item label="视频id" :label-width="formLabelWidth" >
            <el-input v-model="formCrud.videoId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="测试标题" :label-width="formLabelWidth">
            <el-input v-model="formCrud.videoName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="视频封面id" :label-width="formLabelWidth">
            <el-input v-model="formCrud.imageFileId" autocomplete="off"></el-input>
          </el-form-item>
          <!--          <el-form-item label="测试评语" :label-width="formLabelWidth">-->
          <!--            <el-input v-model="formCrud.comment" autocomplete="off"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="视频分类id" :label-width="formLabelWidth">
            <el-input v-model="formCrud.videoClassId"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="视频文件id" :label-width="formLabelWidth">
            <el-input v-model="formCrud.videoFileId"  autocomplete="off"></el-input>
          </el-form-item>
          <!--          <el-form-item  label="视频播放量" :label-width="formLabelWidth">-->
          <!--            <el-input v-model="formCrud.videoWatch"  autocomplete="off"></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item  label="地址" :label-width="formLabelWidth">-->
          <!--            <el-input v-model="formCrud.crudAddr" autocomplete="off"></el-input>-->
          <!--          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" >取 消</el-button>
          <el-button v-show="btn_show" type="primary" @click="handleUpdate">确 定</el-button>
          <el-button type="primary" v-show="btn2_show" @click="add">确定添加</el-button>
        </div>
        <div style="color: #999999;margin-bottom: 10px">备注：1：心理科普，2：人际交往，3：婚恋关系，4：成长学习，5：自我健康，6：职场技能，7：性心理 </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import servicesApi from "@/utils/servicesApi";
  import videoClass from "./videoClass";
  export default {
    data() {
      return {

        show: false,
        btn_show: false,
        btn2_show: false,
        crud: [],

        dialogFormVisible:false,
        formCrud: {
          videoId: 0,
          videoName: '',
          videoWatch: 0,
          videoClassId: 0,
          videoFileId: 0,
          imageFileId: 0,
        },
        formLabelWidth: '120px',
        // rules表单验证
        rules: {
          // videoBrief: [
          //   { required: false, message: '请输入视频简介', trigger: 'blur' }
          // ],
          videoName: [
            { required: true, message: '请输入视频名称', trigger: 'blur' }
          ],
          // videoLink: [
          //   { required: true, message: '请输入视频链接', trigger: 'blur' }
          // ],
          videoId: [{ required: true, message: '请输入视频id', trigger: 'blur' }]
        },

        // 请求参数
        formInline:
          {
            searchOf: '',
            videoTitleLike: '',
            videoWatchLike: '',
            createTimeLike: '',
            videoTypeLike: '',
          },
        //分页
        pageparm: {
          pageNum: 1,
          pageSize: 10,
          total: 10
        },
        total: 0,
      }
    },
    // 注册组件
    components: {
    },
    /**
     * 数据发生改变
     */

    /**
     * 创建完毕
     */
    created() {
      this.findByPage();
    },

    /**
     * 里面的方法只有被调用才会执行
     */
    methods: {
      // 获取视频列表
      findByPage() {
        this.loading = true
        let formData = new FormData()
        formData.append('pageNum',this.pageparm.pageNum)
        formData.append('pageSize',this.pageparm.pageSize)
        formData.append('search',this.formInline.searchOf)
        servicesApi.getVideoListData('getHotVideo',formData).then(res=>{
        // axios.post('/api/video/getHotVideo',formData).then(res=>{
          console.log(res.data)
          if (res.data.code === '200'){
            this.loading = false
            this.crud = res.data.data.records
            this.total = res.data.data.total
            this.formInline.searchOf = ''
            console.log(this.crud)
          }
        })
          .catch(err => {
            this.loading = false
            this.$message.error('视频数据加载失败，请稍后再试！')
          })
      },

      uploadVideo(){
        this.$confirm('是否上传视频','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(()=>{
          this.$router.push('/videoManage/uploadVideo')
        }).catch(()=>{})
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
      // 搜索事件
      search() {
        this.findByPage(this.formInline)
      },
      playVideo(index, row,crud){
        this.$router.push({
          path: '/videoManage/videoPlay',
          query: {
            videoId: row.videoFileId,
            aitId: row.videoId
          }
        })
      },
      //删除视频
      // handleDelete(index,row,crud) {
      //   // var id = crud[index].examId;
      //   this.$confirm('确定要删除吗?', '信息', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     axios.post('/api/video/deleteVideo', {
      //       videoId: crud[index].videoId
      //     }).then(res => {
      //       console.log(res.data.node)
      //       con
      //       this.$message({
      //         type: 'info',
      //         message: res.data.msg
      //       })
      //       console.log()
      //       this.findByPage()
      //
      //     }).catch(err => {
      //       this.loading = false
      //       this.$message.error('数据删除失败，请稍后再试！')
      //     }).catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消删除！'
      //       })
      //     })
      //   })
      // },
      handleDelete(index, row,crud) {
        this.$confirm('确定要删除吗?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let fd = new FormData()
          fd.append('videoId',row.videoId)
          servicesApi.deleteVideoData(fd).then(res=>{
          // axios.post('/api/video/deleteVideo',fd).then(res=>{
            console.log(crud[index].videoId)
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
        this.formCrud.videoFileId = crud[index].videoFileId
        this.formCrud.imageFileId = crud[index].imageFileId
        this.formCrud.videoId = crud[index].videoId
        this.formCrud.videoName = crud[index].videoName
        this.formCrud.videoClassId = crud[index].videoClassId
        this.formCrud.videoWatch = crud[index].videoWatch
        // this.formCrud.crudHobby = crud[index].crudHobby
        // this.formCrud.crudAddr = crud[index].crudAddr
      },

      /**
       * 编辑发送ajax请求
       */
      handleUpdate() {
        let updateData = {
          videoClassId: this.formCrud.videoClassId,
          videoName: this.formCrud.videoName,
          videoId: this.formCrud.videoId,
          videoWatch: this.formCrud.videoWatch,
          videoFileId: this.formCrud.videoFileId,
          imageFileId: this.formCrud.imageFileId,
        }
        servicesApi.updateVideoData(updateData).then(res=>{
        // axios.post("/api/video/updateVideo",{
        //   videoClassId: this.formCrud.videoClassId,
        //   videoName: this.formCrud.videoName,
        //   videoId: this.formCrud.videoId,
        //   videoWatch: this.formCrud.videoWatch,
        //   videoFileId: this.formCrud.videoFileId,
        //   imageFileId: this.formCrud.imageFileId,
        // }).then((res) => {
          //编辑成功后刷新页面
          // this.findByPage(this.pageCode, this.pageSize)
          //关闭遮罩层
          // console.log(res.data.node)
          console.log(res.data)
          // if(res.data.node === '200'){
          this.show = true
          this.dialogFormVisible = false
          this.findByPage()
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          // }
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
        this.formCrud.videoId = 0
        this.formCrud.imageFileId = 0
        this.formCrud.videoName = ''
        this.formCrud.videoFileId = 0
        this.formCrud.videoClassId = 0
        this.formCrud.videoWatch = 0
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
          videoId: this.formCrud.videoId,
          videoClassId:  this.formCrud.videoClassId ,
          videoName: this.formCrud.videoName,
          videoFileId: this.formCrud.videoFileId,
          videoWatch: this.formCrud.videoWatch,
          imageFileId: this.formCrud.imageFileId,
        }
        servicesApi.addVideoData(addData).then(res=>{
        // axios.post("/api/video/uploadVideo",{
        //   videoId: this.formCrud.videoId,
        //   videoClassId:  this.formCrud.videoClassId ,
        //   videoName: this.formCrud.videoName,
        //   videoFileId: this.formCrud.videoFileId,
        //   videoWatch: this.formCrud.videoWatch,
        //   imageFileId: this.formCrud.imageFileId,
        //   // crudAddr: this.formCrud.crudAddr
        // }).then((res) => {
          //添加成功后从新计算总页数
          //同时关闭遮罩层
          console.log('data',res.data)
          if (res.data.code === '200') {
            this.show = false
            this.dialogFormVisible = false
            this.findByPage()
          } if (res.data === '502') {
            this.$message({
              type: 'warning',
              message: '上传失败!'
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


