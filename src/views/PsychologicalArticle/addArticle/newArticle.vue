<template>
  <div>
    <div class="title-box">
      <input type="text" class="title" v-model="article.title" placeholder="请输入标题..." />
      <div>
        <el-button type="text" @click="openDialog">提交</el-button>
        <el-button type="text" @click="cancel">取消</el-button>
      </div>
    </div>
    <mavon-editor
        v-model="content"
        class="editor"
        ref=md
        @imgAdd="imgAdd"
        @imgDel="imgDel"
        :ishljs="true"
    />

    <!--  弹出框-->
    <el-dialog :title="`发布文章：${article.title}`" append-to-body :visible.sync="showDialog" width="30%">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="分类：">
          <el-select v-model="category" multiple placeholder="请选择">
            <el-option
                v-for="(category,index) in categories"
                :key="index"
                :label="category.name"
                :value="category.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="摘要：">
          <el-input type="textarea" v-model="article.asdetail" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="作者：">
          <el-input type="text" v-model="article.author"></el-input>
        </el-form-item>
        <el-form-item label="展示图片：" >
          <el-upload
              :action="upLoadUrl"
              :on-exceed="moreImg"
              :on-success="upSuccess"
              @change="handleSubmit"
              list-type="picture-card"
              :show-file-list="false"
              name="aFile"
              :headers="headers"
              :http-request="addImage"
              :limit="1"
              ref="upload"
          >
<!--            name="aFile" 设置上传文件的file参数值类似于formData.append("aFile":file)-->
            <el-button size="small" type="primary">点击上传</el-button>
<!--            <img v-if="imgUrl" :src="imgUrl" class="avatar" />-->
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer">
    <el-button @click="handleCancel">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">发布</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import servicesApi from "@/utils/servicesApi";
import axios from "axios";
import SparkMD5 from "spark-md5";
const chunkSize = 1024 * 1024;//定义分片的大小 暂定为1Mb，方便测试

export default {
  name: "newArticle",
  data() {
    return {
      showDialog: false,
      categories: [],
      // categories: [
      //   "心理科普","人际社交","婚恋关系","成长学习","自我健康","职场技能"
      // ],
      inputTag: "",
      inputTagVisible: false,
      showAddCategoryInput: false,
      category: "",
      showImage:"",
      upLoadUrl:"/api/files/uploadImage",
      headers:{
        "Content-Type": "multipart/form-data"
      },
      content:'',
      imgID: [],//上传图片ID
      article: {
        title: "",
        content: "",
        type: "",
        asdetail: "",
        picture: "",
        // type: true,
        author: "",
        // userid: this.$store.state.data.id
      },
      imgUrl:"",
      fileChunkCountList: [],
      chunkCount: 0,
      successCount: 0,
    };
  },
  methods: {
    //获取分类
    getClassify(){
      servicesApi.getAssayClassify().then(res => {
        console.log(res.data)
        if (res.data.code === "200"){
          this.categories = res.data.data
        } else {
          this.$message({
            type:"info",
            message: res.data.msg
          })
        }
      })
    },
    handleCancel() {
      this.showDialog = false;
    },
    //文章提交
    handleSubmit() {
      // console.log(this.category)
      for (let i in this.category){
        if (i === 0){
          this.article.type = this.category[i]
        } else {
          this.article.type = this.article.type + "#" + this.category[i]
        }
      }
      if (
          this.assertNotEmpty(this.article.type, "分类不能为空") &&
          this.assertNotEmpty(this.article.asdetail, "文章摘要不能为空") &&
          this.assertNotEmpty(this.article.author, "文章作者不能为空")
      ) {
        this.showDialog = false;
        this.article.content = this.content
        this.article.content = this.$refs.md.d_render
        // console.log(this.article)
        servicesApi.uploadAssay(this.article).then(res => {
          console.log("this.article:")
          console.log(this.article)
          // console.log(res.data)
          if (res.data.code === "200" || res.data.code === 200){
            this.$notify({
              title: "提示",
              message: `文章《${this.article.title}》发布成功`,
              type: "success",
            });
            this.$router.push("/dashboard/psychologicalArticle")
          } else {
            this.$message({
              type: "info",
              message: res.data.msg
            })
          }
        })
      }
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
// 打开文章信息填写框
    openDialog() {
      if (
          this.assertNotEmpty(this.article.title, "请填写文章标题") &&
          this.assertNotEmpty(this.content, "请填写文章内容")
      ) {
        this.getClassify()
        this.showDialog = true;
      }
    },
    cancel() {
      this.$confirm("文章未保存，是否退出编辑","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$router.push("/dashboard/psychologicalArticle")
      }).catch(()=>{})
    },
    async imgAdd(pos,file){
      let fd = new FormData();
      const fileSize = file.size//上传图片大小
      // console.log(fileSize)
      this.chunkCount = Math.ceil(fileSize / chunkSize)//获取分片数
      console.log(this.chunkCount)
      const fileMd5 = await this.getFileMd5(file, this.chunkCount);//获取md5码,需要异步操作，否则可能会造成MD5为空
      fd.append('identifier',fileMd5)
      // axios.post('/api/files/uploadBefore',fd)
      servicesApi.uploadBefore(fd).then(resp=>{
        console.log('resp:',resp.data)
        if (resp.data.code === '200'){
          // 循环调用上传
          for (let i = 0; i < this.chunkCount; i++) {
            console.log('00000')
            //分片开始位置
            let start = i * chunkSize
            console.log('start:',start)
            //分片结束位置
            let end = Math.min(fileSize, start + chunkSize)
            console.log('end:',end)
            //取文件指定范围内的byte，从而得到分片数据
            let _chunkFile = file.slice(start, end)
            console.log('_chunkFile:',_chunkFile)
            console.log("开始上传第" + i + "个分片")
            let formData = new FormData()
            formData.append('identifier', fileMd5)//MD5码
            formData.append('name', file.name)//文件名
            formData.append('chunks', this.chunkCount)//分片总数
            formData.append('chunk', i)//当前分片数
            formData.append('totalSize', fileSize)//文件总大小
            formData.append('file', _chunkFile)//
            this.imgADD(pos,formData)
          }
        } else if (resp.data.code === '500'){
          this.$message('上传成功')
          this.$refs.md.$img2Url(pos,'/api/files/download/' + resp.data.data)
        }
      }).catch(()=>{})
    },

    async addImage(obj){
      let fd = new FormData();
      const fileSize = obj.file.size//上传图片大小
      this.chunkCount = Math.ceil(fileSize / chunkSize)//获取分片数
      const fileMd5 = await this.getFileMd5(obj.file, this.chunkCount);//获取md5码
      fd.append('identifier',fileMd5)
      // axios.post('/api/files/uploadBefore',fd)
      servicesApi.uploadBefore(fd).then(resp=>{
        console.log('resp:',resp.data)
        if (resp.data.code === '200'){
          // 循环调用上传
          for (let i = 0; i < this.chunkCount; i++) {
            console.log('00000')
            //分片开始位置
            let start = i * chunkSize
            console.log('start:',start)
            //分片结束位置
            let end = Math.min(fileSize, start + chunkSize)
            console.log('end:',end)
            //取文件指定范围内的byte，从而得到分片数据
            let _chunkFile = obj.file.slice(start, end)
            console.log('_chunkFile:',_chunkFile)
            console.log("开始上传第" + i + "个分片")
            let formData = new FormData()
            formData.append('identifier', fileMd5)//MD5码
            formData.append('name', obj.file.name)//文件名
            formData.append('chunks', this.chunkCount)//分片总数
            formData.append('chunk', i)//当前分片数
            formData.append('totalSize', fileSize)//文件总大小
            formData.append('file', _chunkFile)//
            this.imgADD2(formData)
          }
        } else if (resp.data.code === '500'){
          this.$message('上传成功')
          this.article.picture = resp.data.data
          // this.$refs.md.$img2Url('/api/files/download/'+resp.data.data)
        }
      }).catch(()=>{})
    },

    imgADD(pos,formData){
      // axios({
      //   url: '/api/files/uploadImage',
      //   method: 'post',
      //   data: formData,
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // }).then(res => {
      servicesApi.uploadImg(formData).then(res=>{
        console.log(res.data)
        if (res.data.code === '200'){
          this.successCount++
          if (this.successCount === this.chunkCount){
            this.imgID = this.imgID + res.data.data
            this.$refs.md.$img2Url(pos,'/api/files/download/' + res.data.data)
            this.successCount = 0
          }
        }
      })
    },
    imgADD2(formData){
      servicesApi.uploadImg(formData).then(res=>{
      // axios({
      //   url: '/api/files/uploadImage',
      //   method: 'post',
      //   data: formData,
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // }).then(res => {
        console.log(res.data)
        if (res.data.code === '200'){
          this.successCount++
          if (this.successCount === this.chunkCount){
            this.$message('上传成功')
            this.successCount = 0
            this.article.picture = res.data.data
          }
        }
      })
    },
    // imgAdd(pos,file){
    //   let formData = new FormData();
    //   // console.log(formData)
    //   formData.append('aFile', file);
    //   axios({
    //     url: '/api/files/upLoad',
    //     method: 'post',
    //     data: formData,
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   }).then(res => {
    //     console.log(res.data)
    //     this.imgID = this.imgID + res.data.data
    //     this.$refs.md.$img2Url(pos,'/api/files/download/'+res.data.data)
    //   })
    // },
    // addImage(obj){
    //   console.log(obj.file.size)
    //   let fd = new FormData();
    //   fd.append("aFile",obj.file)
    //   axios({
    //     url: '/api/files/upLoad',
    //     method: 'post',
    //     data: fd,
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   }).then(res => {
    //     console.log("12121")
    //     console.log(res.data)
    //     this.article.picture = res.data.data
    //     this.imgUrl = '/api/files/download/'+res.data.data
    //   })
    // },
    upSuccess(res){
      console.log("upRes:")
      console.log(res)
    },
    moreImg(){
      this.$message({
        type:"info",
        message:"上传图片过多"
      })
    },
    imgDel(pos){
      let imgDelete = pos[0]
      console.log(imgDelete)
      // axios({
      //   url: '/api/files/delete'+imgDelete
      // })
    },
    //文件分片
    getFileMd5(file, chunkCount) {
      return new Promise((resolve, reject) => {
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        let chunks = chunkCount;
        let currentChunk = 0;
        let spark = new SparkMD5.ArrayBuffer();
        let fileReader = new FileReader();

        fileReader.onload = function (e) {
          spark.append(e.target.result);
          currentChunk++;
          if (currentChunk < chunks) {
            loadNext();
          } else {
            let md5 = spark.end();
            resolve(md5);
          }
        };
        fileReader.onerror = function (e) {
          reject(e);
        };
        function loadNext() {
          let start = currentChunk * chunkSize;
          let end = start + chunkSize;
          if (end > file.size) {
            end = file.size;
          }
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }
        loadNext();
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.editor {
  height: 650px;
}
.title-box {
  display: grid;
  grid-template-columns: 22fr 2fr;
}
.title {
  background: none;
  color: #303133;
  text-indent: 0px;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  display: block;

  border: none;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0;
  line-height: 1;
  overflow: visible;
  margin-bottom: 15px;
  padding: 4px;
}
.title:focus {
  border-color: #409eff;
}

</style>

