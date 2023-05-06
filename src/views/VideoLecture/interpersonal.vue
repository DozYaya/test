<!--人际交往-->

<template >
  <div>
    <video-main></video-main>
    <div style="margin-top: 1vh;height: 8vh;background-color: #fafafa">
      <el-col style="width: 30%;margin-left: 20%">
        <el-select v-model="orderBy" placeholder="最热" style="margin-top: 1vh" @change="getData">
          <el-option
              v-for="(category,index) in categories"
              :key="index"
              :label="category.label"
              :value="category.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col style="width: 40%">
        <!--        <el-col style="width: 35%">-->
        <!--          <el-select v-model="searchDefault" style="margin-top: 1vh;">-->
        <!--            <el-option-->
        <!--                v-for="(sear,index) in searchs"-->
        <!--                :key="index"-->
        <!--                :label="sear.label"-->
        <!--                :value="sear.name"-->
        <!--            ></el-option>-->
        <!--          </el-select>-->
        <!--        </el-col>-->
        <el-col style="width: 70%">
          <div style="margin-left: 5%">
            <el-input v-model="searchOf" style="margin-top: 1vh;" placeholder="请输入视频名称" >
              <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col style="width: 30%">
          <div style="margin-left: 10%;margin-top: 1vh;">
            <el-button type="primary" icon="el-icon-plus" @click="videoAdd">添加</el-button>
          </div>
        </el-col>

      </el-col>
    </div>
    <el-row>
      <el-row>
        <div class="box1"></div>
      </el-row>
      <!--视频区-->
      <el-row style="background-color: #fafafa">
        <!--视频单元-->

        <!--        <div style="margin-left: 6vw; width: 100%;height: 5vh;background-color: #fafafa;position: relative">-->
        <!--          <p style="font-weight: bold;font-size: 20px;margin: 10px;text-align: left;position: absolute">热门视频</p>-->
        <!--        </div>-->
        <div style="margin-left: 4vw;
                    width: 95%; height: 20vh;background-color: #fafafa;border-radius: 5px">
          <el-col class="video" v-for="(v,i) in this.videoList" :key="i">
            <div class="videoDetail">
              <!--视频图片-->
              <div style="cursor: pointer" @click="videoPlay(v.videoFileId,v.videoId)">
                <el-image class="videoImag" alt="图片加载中" :src="pictureURL+v.imageFileId"></el-image>
              </div>
              <div style="height: 0.5vh;width: 16vw"></div>
              <!--视频信息-->
              <div class="title">
                <p style="font-weight: bold;color: #999999">{{v.videoName}}</p>
                <p style="font-weight: bold;color: #999999;text-align: left">
                  <i class="el-icon-video-play"></i>{{v.videoWatch}}
                </p>
              </div>
            </div>
            <div class="box2"></div>
          </el-col>

        </div>

      </el-row>

      <!--分页-->
      <el-row style="width: 100%;height: 10vh;background-color: #fafafa">
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
      </el-row>
      <el-row>
        <footerall></footerall>
      </el-row>
    </el-row>


  </div>
</template>

<script>
import servicesApi from "@/utils/servicesApi";
import videoMain from "@/views/VideoLecture/components/videoMain";
import Footerall from '@/components/footerAll';
import axios from "axios";
export default {
  name: "video_lecture",
  components: {
    videoMain,
    Footerall
  },
  data() {
    return {
      createTime: '2022-10-06',
      title: '变态心理学',
      activeIndex: '1',
      activeIndex2: '1',
      number: [
        1,2,3,4,5,6,7,8,9,10,11,12
      ],
      pictureURL: '/api/files/download/',
      //分页参数
      pageparm: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      total: 10,
      //视频列表
      videoList: [],
      newVideoList: [],
      // 请求参数
      formInline:
          {
            videoTitleLike: '',
            videoWatchLike: '',
            createTimeLike: '',
            videoTypeLike: '',
          },
      orderBy: 1,
      categories: [
        {
          name: 1,
          label: '最热'
        },
        {
          name: 0,
          label: '最新'
        }
      ],
      searchs:[
        {
          name: 'title',
          label: '视频标题',
        },
        {
          name: 'author',
          label: '视频作者',
        },
      ],
      searchDefault:'title',
      searchApi: '',
      searchOf: '',
      classname: '人际交往',
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData(){
      let formData = new FormData()
      formData.append('pageNum',this.pageparm.pageNum)
      formData.append('pageSize',this.pageparm.pageSize)
      formData.append('newOrHot',this.orderBy)
      formData.append('searchVideoName',this.searchOf)
      formData.append('videoClassName',this.classname)
      servicesApi.getVideoListDataByHotOrNew(formData).then(res=>{
        // axios.post('/api/video/getVideoByClassName',formData).then(res=>{
        console.log(res.data)
        if (res.data.code === '200'){
          this.videoList = res.data.data.records
          this.total = res.data.data.total
          this.searchOf = ''
          console.log(this.videoList)
        }
      })
    },
    //搜索预处理
    search(){
      console.log(this.searchOf)
      this.getData()
    },
    // search(){
    //   console.log('search:',this.searchDefault)
    //   console.log('form:',this.formInline)
    //   if (this.searchDefault==='title'){
    //     this.formInline.authorLike = ''
    //   }else if (this.searchDefault === 'author'){
    //     this.formInline.authorLike = this.formInline.titleLike
    //     this.formInline.titleLike = ''
    //   }
    //   this.getData()
    // },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //上传视频
    videoAdd(){
      this.$confirm('是否上传视频','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(()=>{
        this.$router.push('/dashboard/uploadVideo')
      }).catch(()=>{})
    },
    //视频播放
    videoPlay(id,vid) {
      this.$router.push({
        path: '/dashboard/videoPlay',
        query: {
          videoId: id,
          aitId: vid
        }
      })
      // sessionStorage.setItem('videoId',id)
      // sessionStorage.setItem('aitId',vid)
      // this.$router.push("/dashboard/videoPlay")
    },
    // 分页插件事件
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageparm.pageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageparm.pageNum = 1
      console.log(`每页 ${val} 条`);
      this.getData()
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.pageparm.pageNum = val
      console.log(`当前页: ${val}`);
      this.getData()
    },
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.video {
  position: relative;
  width: 18vw;
  height: 25vh;
  background-color: #fafafa;
}
.videoDetail {
  background-color: #fafafa;
  height: 17vh;
  width: 14vw;
  margin: 0 auto;
}
.box1 {
  background-color: #fafafa;
  width: 100%;
  height: 3vh;
}
.box2 {
  height: 3vh;
  width: 15vw;
  background-color: #fafafa;
}
.videoImag {
  width: 15vw;
  height: 17vh;
  border-radius: 7px;
}
.title {
  width: 14vw;
  height: 3vh;
}
</style>
<!--<template>-->
<!--  <div>-->
<!--    <videoMain></videoMain>-->
<!--    <video-all></video-all>-->

<!--    <el-row style="width: 100%;height: 10vh;background-color: #fafafa">-->
<!--      <div class="container">-->
<!--        <el-pagination-->
<!--            @size-change="handleSizeChange"-->
<!--            @current-change="handleCurrentChange"-->
<!--            :current-page="pageparm.pageNum"-->
<!--            :page-sizes="[5, 10, 15]"-->
<!--            :page-size="pageparm.pageSize"-->
<!--            layout="total, sizes, prev, pager, next, jumper"-->
<!--            :total="total"-->
<!--        >-->
<!--        </el-pagination>-->
<!--      </div>-->
<!--    </el-row>-->
<!--    <el-row>-->
<!--      <footer-all></footer-all>-->
<!--    </el-row>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->
<!--import videoMain from "@/views/VideoLecture/video_main";-->
<!--import videoAll from "@/views/VideoLecture/videoList";-->
<!--import footerAll from '@/components/footerAll';-->
<!--import axios from "axios";-->
<!--export default {-->
<!--  name: "interpersonal",-->
<!--  components: {-->
<!--    videoAll,-->
<!--    videoMain,-->
<!--    footerAll-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      createTime: '2022-10-06',-->
<!--      title: '变态心理学',-->
<!--      activeIndex: '1',-->
<!--      activeIndex2: '1',-->
<!--      number: [-->
<!--        1,2,3,4,5,6,7,8,9,10,11,12-->
<!--      ],-->
<!--      pictureURL: '/api/files/download/',-->
<!--      //分页参数-->
<!--      pageparm: {-->
<!--        pageNum: 1,-->
<!--        pageSize: 10,-->
<!--        total: 10-->
<!--      },-->
<!--      total: 10,-->
<!--      //视频列表-->
<!--      videoList: [],-->
<!--      // 请求参数-->
<!--      formInline:-->
<!--          {-->
<!--            videoTitleLike: '',-->
<!--            videoWatchLike: '',-->
<!--            createTimeLike: '',-->
<!--            videoTypeLike: '',-->
<!--          },-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.getData()-->
<!--  },-->
<!--  methods: {-->
<!--    getData(){-->
<!--      axios.post('/api/video/getHotVideo',{-->
<!--        videoTitleLike: this.formInline.videoTitleLike,-->
<!--        createTimeLike: this.formInline.createTimeLike,-->
<!--        videoWatchLike: this.formInline.videoWatchLike,-->
<!--        videoTypeLike: this.formInline.videoTypeLike,-->
<!--        pageNum: this.pageparm.pageNum,-->
<!--        pageSize: this.pageparm.pageSize,-->
<!--      }).then(res=>{-->
<!--        // axios.post('/api/assay/getAssayPage',formData).then(res=>{-->
<!--        console.log(res.data)-->
<!--        this.formInline.videoTitleLike = ''-->
<!--        this.formInline.videoWatchLike = ''-->
<!--        this.formInline.videoTypeLike = ''-->
<!--        this.formInline.createTimeLike = ''-->
<!--        if (res.data.code === '200'){-->
<!--          this.videoList = res.data.data.records-->
<!--          this.total = res.data.data.total-->
<!--          console.log(this.videoList)-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    handleSelect(key, keyPath) {-->
<!--      console.log(key, keyPath);-->
<!--    },-->
<!--    //视频播放-->
<!--    videoPlay() {-->

<!--    },-->
<!--    // 分页插件事件-->
<!--    handleSizeChange(val) {-->
<!--      // 改变每页显示的条数-->
<!--      this.pageparm.pageSize = val-->
<!--      // 注意：在改变每页显示的条数时，要将页码显示到第一页-->
<!--      this.pageparm.pageNum = 1-->
<!--      console.log(`每页 ${val} 条`);-->
<!--      this.getData()-->
<!--    },-->
<!--    handleCurrentChange(val) {-->
<!--      // 改变默认的页数-->
<!--      this.pageparm.pageNum = val-->
<!--      console.log(`当前页: ${val}`);-->
<!--      this.getData()-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

