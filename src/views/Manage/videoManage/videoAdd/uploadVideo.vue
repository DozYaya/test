<template>
  <div class="myDiv">
    <div class="title-box">
      <input type="text" class="title" v-model="videoFile.videoName" placeholder="请输入标题..." />
      <div>
        <el-button type="text" @click="openDialog">提交</el-button>
        <el-button type="text" @click="cancel">取消</el-button>
      </div>
    </div>
    <el-upload class="upload-demo"
               action="#"
               :on-change="uploadFile"
               :show-file-list="true"
               :file-list="fileList"
               :auto-upload="false"
               ref="upload"
               :limit="1">
      <el-button size="small" type="primary" :loading="loadingFile">上传文件</el-button>
    </el-upload>
    <el-progress :text-inside="true" :stroke-width="24" :percentage="this.uploadProgress" status="success"></el-progress>

    <!--  弹出框-->
    <el-dialog :title="`发布文章：${videoFile.videoName}`" append-to-body :visible.sync="showDialog" width="40%">
      <el-form label-position="left" label-width="7vw">
        <el-form-item label="分类：">
          <el-select v-model="category" placeholder="请选择">
            <el-option
                v-for="(category,index) in categories"
                :key="index"
                :label="category.name"
                :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介：">
          <el-input type="textarea" v-model="videoFile.comment" rows="4"></el-input>
        </el-form-item>
        <!--        <el-form-item label="作者：">-->
        <!--          <el-input type="text" v-model="videoFile.author"></el-input>-->
        <!--        </el-form-item>-->
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
import SparkMD5 from "spark-md5";
import axios from "axios";
const chunkSize = 5 * 1024 * 1024;//定义分片的大小 暂定为1M，方便测试
// import { message_s, message_w } from '@/methods/element';//引入elementui消息提示框
export default {
  name: 'uploadVideo',
  components: {},
  props: {},
  data() {
    return {
      showDialog: false,//弹出框显示
      category: "",
      categories: [],
      upLoadUrl:"/api/files/uploadImage",//视频封面上传接口
      headers:{
        "Content-Type": "multipart/form-data"
      },
      videoHeader:{
        'Content-Type': 'application/json;charset=UTF-8'
      },


      fileList: [],
      successCount: 0,
      loadingFile: false,
      chunkCount: 0,
      successChunkCount: 0,
      uploadProgress: 0,
      videoFile: {
        videoName: '',
        comment: '',
        imageFileId: 0,
        videoFileId: 0,
        videoClassId: 0,
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    /**
     * 上传文件
     */
    async uploadFile(File) {
      this.loadingFile = true
      this.successChunkCount = 0
      const self = this;
      //获取用户选择的文件
      const file = File.raw
      const fileName = File.name
      this.currentFile = file
      //文件大小(大于100m再分片哦，否则直接走普通文件上传的逻辑就可以了，这里只实现分片上传逻辑)
      const fileSize = File.size
      // 放入文件列表
      this.fileList = [{ "name": File.name }]
      // 可以设置大于多少兆可以分片上传，否则走普通上传
      // if (fileSize <= chunkSize) {
      //   console.log("上传的文件大于1m才能分片上传")
      // }
      //计算当前选择文件需要的分片数量
      this.chunkCount = Math.ceil(fileSize / chunkSize)
      console.log("文件大小：", (File.size / 1024 / 1024) + "Mb", "分片数：", this.chunkCount)
      //获取文件md5
      const fileMd5 = await this.getFileMd5(file, this.chunkCount);

      console.log("文件md5：", fileMd5)

      // this.str = file.name.replace(/.+\./, "");
      // console.log("文件后缀：",this.str)

      console.log("向后端请求本次分片上传初始化")

      //先判断数据库中是否有上传视频，如果有，实现大数据秒传
      let fd = new FormData()
      fd.append('identifier',fileMd5)
      await servicesApi.uploadBefore(fd).then(res=>{
        // await axios.post('/api/files/uploadBefore',fd).then(res=>{
        console.log('res:',res.data)
        if (res.data.code === '200'){
          // 循环调用上传
          for (let i = 0; i < this.chunkCount; i++) {
            //分片开始位置
            let start = i * chunkSize
            //分片结束位置
            let end = Math.min(fileSize, start + chunkSize)
            //取文件指定范围内的byte，从而得到分片数据
            console.log(File, '0000')
            let _chunkFile = File.raw.slice(start, end)
            console.log(_chunkFile)
            console.log("开始上传第" + i + "个分片")
            let formData = new FormData()
            formData.append('identifier', fileMd5)//MD5码
            formData.append('name', File.name)//文件名
            formData.append('chunks', this.chunkCount)//分片总数
            formData.append('chunk', i)//当前分片数
            formData.append('totalSize', fileSize)//文件总大小
            formData.append('file', _chunkFile)//
            // formData.forEach((v,k)=>{
            //   console.log(v)
            //   console.log(k)
            // })
            // 通过await实现顺序上传
            this.getMethods(formData)
          }
        } else if (res.data.code === '500'){
          this.$message('视频上传成功')
          this.successChunkCount = this.chunkCount
          this.uploadProgress = 100
          this.videoFile.videoFileId = res.data.data
        }
      })
    },
    /**
     * 上传文件方法
     * @param formData 上传文件的参数
     */
    getMethods(formData) {
      return new Promise((resolve, reject) => {
        servicesApi.uploadVideo(formData).then(res=>{
          // axios.post('/api/files/uploadVideo',formData).then(res=>{
          console.log(res,'1111')
          if (res.data.code === '200' && this.successChunkCount <= this.chunkCount){
            this.successChunkCount++
            this.uploadProgress = 100 * Math.ceil(this.successChunkCount / this.chunkCount)
            if (this.successChunkCount === this.chunkCount){
              this.videoFile.videoFileId = res.data.data
              this.successChunkCount = 0
            }
            // const a = 100 * this.successChunkCount/this.chunkCount
            // this.uploadProgress = parseFloat(a).toFixed(2)
          }
          // formData.forEach((v,k)=>{
          //   console.log("key:",k)
          //   console.log("value:",v)
          // })
          resolve()
        })
      });
    },
    /**
     * 获取文件MD5
     * @param file
     * @param chunkCount
     * @returns {Promise<unknown>}
     */
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
    handleCancel() {
      this.showDialog = false;
    },
    //文章提交
    handleSubmit() {
      // console.log(this.category)
      console.log("this.video:")
      console.log(this.videoFile)
      this.videoFile.videoClassId = this.category
      if (
          this.assertNotEmpty(this.videoFile.videoClassId, "分类不能为空") &&
          // this.assertNotEmpty(this.videoFile.comment, "文章摘要不能为空") &&
          this.assertNotEmpty(this.videoFile.imageFileId, "视频展示图片不能为空")
      ) {
        this.showDialog = false;
        // this.article.content = this.content
        // this.article.content = this.$refs.md.d_render
        // console.log(this.article)
        this.videoFile.videoName = this.videoFile.videoName.toString()
        this.videoFile.comment = this.videoFile.comment.toString()
        // axios({
        //   url: '/api/video/uploadVideo',
        //   method: 'post',
        //   headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        //   data: this.videoFile
        // }).then(res=>{
        servicesApi.uploadVideoData(this.videoFile).then(res=>{
          // console.log(this.imgID)
          // console.log(res.data)
          if (res.data.code === "200" || res.data.code === 200){
            this.$notify({
              title: "提示",
              message: `视频《${this.videoFile.videoName}》发布成功`,
              type: "success",
            });
            this.$router.push("/dashboard/videoLecture")
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
          this.assertNotEmpty(this.videoFile.videoName, "请填写视频标题")
          &&
          this.assertNotEmpty(this.videoFile.videoFileId, "请上传视频")
      ) {
        this.getClassify()
        this.showDialog = true;
      }
    },
    //获取分类
    getClassify(){
      servicesApi.getVideoClassify().then(res=>{
        // axios.post('/api/video/getVideoClass').then(res=>{
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
    //退出视频上传
    cancel() {
      this.$confirm("视频上传未完成，是否退出编辑","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$router.push("/dashboard/videoLecture")
      })
    },

    //封面图片事件
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
    async addImage(obj){
      let fd = new FormData();
      const fileSize = obj.file.size//上传图片大小
      this.chunkCount = Math.ceil(fileSize / chunkSize)//获取分片数
      // console.log('this.chunkcount',this.chunkCount)
      const fileMd5 = await this.getFileMd5(obj.file, this.chunkCount);//获取md5码
      fd.append('identifier',fileMd5)
      servicesApi.uploadBefore(fd).then(resp=>{
        // axios.post('/api/files/uploadBefore',fd).then(resp=>{
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
          this.videoFile.imageFileId = resp.data.data
          this.$message('上传成功')
          // this.$refs.md.$img2Url('/api/files/download/'+resp.data.data)
        }
      }).catch(()=>{})
    },
    imgADD2(formData){
      servicesApi.uploadImg(formData).then(res=>{
        // axios({
        //   url: '/api/files/uploadImage',
        //   method: 'post',
        //   data: formData,
        //   headers: { 'Content-Type': 'multipart/form-data' },
        // }).then(res => {
        console.log('封面图片',res.data)
        if (res.data.code === '200'){
          this.successCount++

          if (this.successCount === this.chunkCount){
            this.videoFile.imageFileId = res.data.data
            this.$message('上传成功')
            this.successCount = 0
          }
        }
      })
    },
  },
  created() { },
  mounted() { }
}
</script>
<style lang="less" scoped>

.myDiv {
  width: 90%;
  margin-left: 5%;
  position: center;
  background-color: #f1f1f1;
}
.title-box {
  display: grid;
  grid-template-columns: 22fr 2fr;
}
</style>

<!--<template>-->
<!--  <div class="myDiv">-->
<!--    <div class="title-box">-->
<!--      <input type="text" class="title" v-model="videoFile.videoName" placeholder="请输入标题..." />-->
<!--      <div>-->
<!--        <el-button type="text" @click="openDialog">提交</el-button>-->
<!--        <el-button type="text" @click="cancel">取消</el-button>-->
<!--      </div>-->
<!--    </div>-->
<!--    <el-upload class="upload-demo"-->
<!--               action="#"-->
<!--               :on-change="uploadFile"-->
<!--               :show-file-list="true"-->
<!--               :file-list="fileList"-->
<!--               :auto-upload="false"-->
<!--               ref="upload"-->
<!--               :limit="1">-->
<!--      <el-button size="small" type="primary" :loading="loadingFile">上传文件</el-button>-->
<!--    </el-upload>-->
<!--    <el-progress :text-inside="true" :stroke-width="24" :percentage="this.uploadProgress" status="success"></el-progress>-->

<!--    &lt;!&ndash;  弹出框&ndash;&gt;-->
<!--    <el-dialog :title="`发布文章：${videoFile.videoName}`" append-to-body :visible.sync="showDialog" width="40%">-->
<!--      <el-form label-position="left" label-width="7vw">-->
<!--        <el-form-item label="分类：">-->
<!--          <el-select v-model="category" placeholder="请选择">-->
<!--            <el-option-->
<!--                v-for="(category,index) in categories"-->
<!--                :key="index"-->
<!--                :label="category.name"-->
<!--                :value="category.id"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="简介：">-->
<!--          <el-input type="textarea" v-model="videoFile.comment" rows="4"></el-input>-->
<!--        </el-form-item>-->
<!--&lt;!&ndash;        <el-form-item label="作者：">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input type="text" v-model="videoFile.author"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--        <el-form-item label="展示图片：" >-->
<!--          <el-upload-->
<!--              :action="upLoadUrl"-->
<!--              :on-exceed="moreImg"-->
<!--              :on-success="upSuccess"-->
<!--              @change="handleSubmit"-->
<!--              list-type="picture-card"-->
<!--              :show-file-list="false"-->
<!--              name="aFile"-->
<!--              :headers="headers"-->
<!--              :http-request="addImage"-->
<!--              :limit="1"-->
<!--              ref="upload"-->
<!--          >-->
<!--            &lt;!&ndash;            name="aFile" 设置上传文件的file参数值类似于formData.append("aFile":file)&ndash;&gt;-->
<!--            <el-button size="small" type="primary">点击上传</el-button>-->
<!--            &lt;!&ndash;            <img v-if="imgUrl" :src="imgUrl" class="avatar" />&ndash;&gt;-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <span slot="footer">-->
<!--    <el-button @click="handleCancel">取 消</el-button>-->
<!--    <el-button type="primary" @click="handleSubmit">发布</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--import SparkMD5 from "spark-md5";-->
<!--import axios from "axios";-->
<!--const chunkSize = 5 * 1024 * 1024;//定义分片的大小 暂定为1M，方便测试-->
<!--// import { message_s, message_w } from '@/methods/element';//引入elementui消息提示框-->
<!--export default {-->
<!--  name: 'uploadVideo',-->
<!--  components: {},-->
<!--  props: {},-->
<!--  data() {-->
<!--    return {-->
<!--      showDialog: false,//弹出框显示-->
<!--      category: "",-->
<!--      categories: [],-->
<!--      upLoadUrl:"/api/files/uploadImage",//视频封面上传接口-->
<!--      headers:{-->
<!--        "Content-Type": "multipart/form-data"-->
<!--      },-->
<!--      videoHeader:{-->
<!--        'Content-Type': 'application/json;charset=UTF-8'-->
<!--      },-->


<!--      fileList: [],-->
<!--      successCount: 0,-->
<!--      loadingFile: false,-->
<!--      chunkCount: 0,-->
<!--      successChunkCount: 0,-->
<!--      uploadProgress: 0,-->
<!--      videoFile: {-->
<!--        videoName: '',-->
<!--        comment: '',-->
<!--        imageFileId: 0,-->
<!--        videoFileId: 0,-->
<!--        videoClassId: 0,-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  watch: {},-->
<!--  computed: {},-->
<!--  methods: {-->
<!--    /**-->
<!--     * 上传文件-->
<!--     */-->
<!--    async uploadFile(File) {-->
<!--      this.loadingFile = true-->
<!--      var self = this-->
<!--      //获取用户选择的文件-->
<!--      const file = File.raw-->
<!--      const fileName = File.name-->
<!--      this.currentFile = file-->
<!--      //文件大小(大于100m再分片哦，否则直接走普通文件上传的逻辑就可以了，这里只实现分片上传逻辑)-->
<!--      const fileSize = File.size-->
<!--      // 放入文件列表-->
<!--      this.fileList = [{ "name": File.name }]-->
<!--      // 可以设置大于多少兆可以分片上传，否则走普通上传-->
<!--      // if (fileSize <= chunkSize) {-->
<!--      //   console.log("上传的文件大于1m才能分片上传")-->
<!--      // }-->
<!--      //计算当前选择文件需要的分片数量-->
<!--      this.chunkCount = Math.ceil(fileSize / chunkSize)-->
<!--      console.log("文件大小：", (File.size / 1024 / 1024) + "Mb", "分片数：", this.chunkCount)-->
<!--      //获取文件md5-->
<!--      const fileMd5 = await this.getFileMd5(file, this.chunkCount);-->

<!--      console.log("文件md5：", fileMd5)-->

<!--      // this.str = file.name.replace(/.+\./, "");-->
<!--      // console.log("文件后缀：",this.str)-->

<!--      console.log("向后端请求本次分片上传初始化")-->

<!--      //先判断数据库中是否有上传视频，如果有，实现大数据秒传-->
<!--      let fd = new FormData()-->
<!--      fd.append('identifier',fileMd5)-->
<!--      await axios.post('/api/files/uploadBefore',fd-->
<!--      ).then(res=>{-->
<!--        console.log('res:',res.data)-->
<!--        if (res.data.code === '200'){-->
<!--          // 循环调用上传-->
<!--          for (var i = 0; i < this.chunkCount; i++) {-->
<!--            //分片开始位置-->
<!--            let start = i * chunkSize-->
<!--            //分片结束位置-->
<!--            let end = Math.min(fileSize, start + chunkSize)-->
<!--            //取文件指定范围内的byte，从而得到分片数据-->
<!--            console.log(File, '0000')-->
<!--            let _chunkFile = File.raw.slice(start, end)-->
<!--            console.log(_chunkFile)-->
<!--            console.log("开始上传第" + i + "个分片")-->
<!--            let formData = new FormData()-->
<!--            formData.append('identifier', fileMd5)//MD5码-->
<!--            formData.append('name', File.name)//文件名-->
<!--            formData.append('chunks', this.chunkCount)//分片总数-->
<!--            formData.append('chunk', i)//当前分片数-->
<!--            formData.append('totalSize', fileSize)//文件总大小-->
<!--            formData.append('file', _chunkFile)//-->
<!--            // formData.forEach((v,k)=>{-->
<!--            //   console.log(v)-->
<!--            //   console.log(k)-->
<!--            // })-->
<!--            // 通过await实现顺序上传-->
<!--            this.getMethods(formData)-->
<!--          }-->
<!--        } else if (res.data.code === '500'){-->
<!--          this.$message('视频上传成功')-->
<!--          this.successChunkCount = this.chunkCount-->
<!--          this.uploadProgress = 100-->
<!--          this.videoFile.videoFileId = res.data.data-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    /**-->
<!--     * 上传文件方法-->
<!--     * @param formData 上传文件的参数-->
<!--     */-->
<!--    getMethods(formData) {-->
<!--      return new Promise((resolve, reject) => {-->
<!--        axios.post('/api/files/uploadVideo',formData).then(res=>{-->
<!--          console.log(res,'1111')-->
<!--          if (res.data.code === '200' && this.successChunkCount <= this.chunkCount){-->
<!--            this.successChunkCount++-->
<!--            this.uploadProgress = 100 * Math.ceil(this.successChunkCount / this.chunkCount)-->
<!--            if (this.successChunkCount === this.chunkCount){-->
<!--              this.videoFile.videoFileId = res.data.data-->
<!--              this.successChunkCount = 0-->
<!--            }-->
<!--            // const a = 100 * this.successChunkCount/this.chunkCount-->
<!--            // this.uploadProgress = parseFloat(a).toFixed(2)-->
<!--          }-->
<!--          // formData.forEach((v,k)=>{-->
<!--          //   console.log("key:",k)-->
<!--          //   console.log("value:",v)-->
<!--          // })-->
<!--          resolve()-->
<!--        })-->
<!--      });-->
<!--    },-->
<!--    /**-->
<!--     * 获取文件MD5-->
<!--     * @param file-->
<!--     * @returns {Promise<unknown>}-->
<!--     */-->
<!--    getFileMd5(file, chunkCount) {-->
<!--      return new Promise((resolve, reject) => {-->
<!--        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;-->
<!--        let chunks = chunkCount;-->
<!--        let currentChunk = 0;-->
<!--        let spark = new SparkMD5.ArrayBuffer();-->
<!--        let fileReader = new FileReader();-->

<!--        fileReader.onload = function (e) {-->
<!--          spark.append(e.target.result);-->
<!--          currentChunk++;-->
<!--          if (currentChunk < chunks) {-->
<!--            loadNext();-->
<!--          } else {-->
<!--            let md5 = spark.end();-->
<!--            resolve(md5);-->
<!--          }-->
<!--        };-->
<!--        fileReader.onerror = function (e) {-->
<!--          reject(e);-->
<!--        };-->
<!--        function loadNext() {-->
<!--          let start = currentChunk * chunkSize;-->
<!--          let end = start + chunkSize;-->
<!--          if (end > file.size) {-->
<!--            end = file.size;-->
<!--          }-->
<!--          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));-->
<!--        }-->
<!--        loadNext();-->
<!--      });-->
<!--    },-->


<!--    handleCancel() {-->
<!--      this.showDialog = false;-->
<!--    },-->
<!--    //文章提交-->
<!--    handleSubmit() {-->
<!--      // console.log(this.category)-->
<!--      console.log("this.video:")-->
<!--      console.log(this.videoFile)-->
<!--      this.videoFile.videoClassId = this.category-->
<!--      if (-->
<!--          this.assertNotEmpty(this.videoFile.videoClassId, "分类不能为空") &&-->
<!--          // this.assertNotEmpty(this.videoFile.comment, "文章摘要不能为空") &&-->
<!--          this.assertNotEmpty(this.videoFile.imageFileId, "视频展示图片不能为空")-->
<!--      ) {-->
<!--        this.showDialog = false;-->
<!--        // this.article.content = this.content-->
<!--        // this.article.content = this.$refs.md.d_render-->
<!--        // console.log(this.article)-->
<!--        this.videoFile.videoName = this.videoFile.videoName.toString()-->
<!--        this.videoFile.comment = this.videoFile.comment.toString()-->
<!--        axios({-->
<!--          url: '/api/video/uploadVideo',-->
<!--          method: 'post',-->
<!--          headers: { 'Content-Type': 'application/json;charset=UTF-8' },-->
<!--          data: this.videoFile-->
<!--        }).then(res=>{-->
<!--          // console.log(this.imgID)-->
<!--          // console.log(res.data)-->
<!--          if (res.data.code === "200" || res.data.code === 200){-->
<!--            this.$notify({-->
<!--              title: "提示",-->
<!--              message: `视频《${this.videoFile.videoName}》发布成功`,-->
<!--              type: "success",-->
<!--            });-->
<!--            this.$router.push("/videoManage/video")-->
<!--          } else {-->
<!--            this.$message({-->
<!--              type: "info",-->
<!--              message: res.data.msg-->
<!--            })-->
<!--          }-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--    // 断言 target 为非空-->
<!--    assertNotEmpty(target, msg) {-->
<!--      if (!target) {-->
<!--        this.$message({-->
<!--          message: msg,-->
<!--          type: "warning",-->
<!--        });-->
<!--        return false;-->
<!--      }-->
<!--      return true;-->
<!--    },-->
<!--// 打开文章信息填写框-->
<!--    openDialog() {-->
<!--      if (-->
<!--          this.assertNotEmpty(this.videoFile.videoName, "请填写视频标题")-->
<!--          &&-->
<!--          this.assertNotEmpty(this.videoFile.videoFileId, "请上传视频")-->
<!--      ) {-->
<!--        this.getClassify()-->
<!--        this.showDialog = true;-->
<!--      }-->
<!--    },-->
<!--    //获取分类-->
<!--    getClassify(){-->
<!--      axios.post('/api/video/getVideoClass').then(res=>{-->
<!--        console.log(res.data)-->
<!--        if (res.data.code === "200"){-->
<!--          this.categories = res.data.data-->
<!--        } else {-->
<!--          this.$message({-->
<!--            type:"info",-->
<!--            message: res.data.msg-->
<!--          })-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    //退出视频上传-->
<!--    cancel() {-->
<!--      this.$confirm("视频上传未完成，是否退出编辑","提示",{-->
<!--        confirmButtonText: '确定',-->
<!--        cancelButtonText: '取消',-->
<!--        type: 'warning'-->
<!--      }).then(()=>{-->
<!--        this.$router.push("videoManage/video")-->
<!--      }).catch(()=>{})-->
<!--    },-->

<!--    //封面图片事件-->
<!--    upSuccess(res){-->
<!--      console.log("upRes:")-->
<!--      console.log(res)-->
<!--    },-->
<!--    moreImg(){-->
<!--      this.$message({-->
<!--        type:"info",-->
<!--        message:"上传图片过多"-->
<!--      })-->
<!--    },-->
<!--    async addImage(obj){-->
<!--      let fd = new FormData();-->
<!--      const fileSize = obj.file.size//上传图片大小-->
<!--      this.chunkCount = Math.ceil(fileSize / chunkSize)//获取分片数-->
<!--      // console.log('this.chunkcount',this.chunkCount)-->
<!--      const fileMd5 = await this.getFileMd5(obj.file, this.chunkCount);//获取md5码-->
<!--      fd.append('identifier',fileMd5)-->
<!--      axios.post('/api/files/uploadBefore',fd)-->
<!--          .then(resp=>{-->
<!--            console.log('resp:',resp.data)-->
<!--            if (resp.data.code === '200'){-->
<!--              // 循环调用上传-->
<!--              for (var i = 0; i < this.chunkCount; i++) {-->
<!--                console.log('00000')-->
<!--                //分片开始位置-->
<!--                let start = i * chunkSize-->
<!--                console.log('start:',start)-->
<!--                //分片结束位置-->
<!--                let end = Math.min(fileSize, start + chunkSize)-->
<!--                console.log('end:',end)-->
<!--                //取文件指定范围内的byte，从而得到分片数据-->
<!--                let _chunkFile = obj.file.slice(start, end)-->
<!--                console.log('_chunkFile:',_chunkFile)-->
<!--                console.log("开始上传第" + i + "个分片")-->
<!--                let formData = new FormData()-->
<!--                formData.append('identifier', fileMd5)//MD5码-->
<!--                formData.append('name', obj.file.name)//文件名-->
<!--                formData.append('chunks', this.chunkCount)//分片总数-->
<!--                formData.append('chunk', i)//当前分片数-->
<!--                formData.append('totalSize', fileSize)//文件总大小-->
<!--                formData.append('file', _chunkFile)//-->
<!--                this.imgADD2(formData)-->
<!--              }-->
<!--            } else if (resp.data.code === '500'){-->
<!--              this.videoFile.imageFileId = resp.data.data-->
<!--              this.$message('上传成功')-->
<!--              // this.$refs.md.$img2Url('/api/files/download/'+resp.data.data)-->
<!--            }-->
<!--          }).catch(()=>{-->
<!--      })-->
<!--    },-->
<!--    imgADD2(formData){-->
<!--      axios({-->
<!--        url: '/api/files/uploadImage',-->
<!--        method: 'post',-->
<!--        data: formData,-->
<!--        headers: { 'Content-Type': 'multipart/form-data' },-->
<!--      }).then(res => {-->
<!--        console.log('封面图片',res.data)-->
<!--        if (res.data.code === '200'){-->
<!--          this.successCount++-->

<!--          if (this.successCount === this.chunkCount){-->
<!--            this.videoFile.imageFileId = res.data.data-->
<!--            this.$message('上传成功')-->
<!--            this.successCount = 0-->
<!--          }-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--  },-->
<!--  created() { },-->
<!--  mounted() { }-->
<!--}-->
<!--</script>-->
<!--<style  scoped>-->

<!--.myDiv {-->
<!--  width: 90%;-->
<!--  margin-left: 5%;-->
<!--  position: center;-->
<!--  background-color: #f1f1f1;-->
<!--}-->
<!--.title-box {-->
<!--  display: grid;-->
<!--  grid-template-columns: 22fr 2fr;-->
<!--}-->
<!--</style>-->
