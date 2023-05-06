<template>
  <div class="myDiv">
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
  </div>
</template>

<script>

import SparkMD5 from "spark-md5";
import axios from "axios";
const chunkSize = 5 * 1024 * 1024;//定义分片的大小 暂定为1M，方便测试
// import { message_s, message_w } from '@/methods/element';//引入elementui消息提示框
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      fileList: [],
      loadingFile: false,
      chunkCount: 0,
      successChunkCount: 0,
      uploadProgress: 0,
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
      var self = this
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
      await axios.post('/api/files/uploadBefore',fd
      ).then(res=>{
        console.log('res:',res.data)
        if (res.data.code === '200'){
          // 循环调用上传
          for (var i = 0; i < this.chunkCount; i++) {
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
        }else if (res.data.code === '500'){
          this.$message('视频上传成功')
          this.successChunkCount = this.chunkCount
          this.uploadProgress = 100
        }
      })
    },
    /**
     * 上传文件方法
     * @param formData 上传文件的参数
     */
    getMethods(formData) {
      return new Promise((resolve, reject) => {
        axios.post('/api/files/uploadVideo',formData).then(res=>{
          console.log(res,'1111')
          if (res.data.code === '200' && this.successChunkCount <= this.chunkCount){
            this.successChunkCount++
            this.uploadProgress = 100 * this.successChunkCount/this.chunkCount
            // const a = 100 * this.successChunkCount/this.chunkCount
            // this.uploadProgress = parseFloat(a).toFixed(2)
          }
          // formData.forEach((v,k)=>{
          //   console.log("key:",k)
          //   console.log("value:",v)
          // })
          resolve()
        })
        // this.service("/api/files2/upload", 'post', formData, (res) => {
        //   console.log(res)
        //   resolve();
        // })
      });
    },
    /**
     * 获取文件MD5
     * @param file
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
    /**
     * 请求后端合并文件
     * @param fileMd5 文件md5
     * @param fileName 文件名称
     * @param count 文件分片总数
     */
    // composeFile(fileMd5, fileName, count) {
    //   console.log("开始请求后端合并文件")
    //   var data = {
    //     "identifier": fileMd5, //文件的md5
    //     "filename": fileName, //文件名
    //     "totalChunks": count //分片的总数量
    //   }
    // this.service('/upload/merge', 'post', data, (data) => {
    //   if (data.successful === true) {
    //     alert(data.message)
    //     // message_s(data.message)
    //     this.loadingFile = false
    //     this.$refs.upload.clearFiles()
    //   } else {
    //     this.loadingFile = false
    //     alert(data.message)
    //     // message_w(data.message)
    //   }
    // })
    // },
  },
  created() { },
  mounted() { }
}
</script>
<style lang="less" scoped>
</style>
