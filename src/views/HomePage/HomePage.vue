<template>
  <div>
    <!--走马灯-->
    <div>
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--热门文章-->
    <div style="width: 100%;min-height: 120vh;background-color: #fafafa;position: relative">
      <div style="margin: 0 auto;width: 100%;height: 5vh;background-color: #fafafa;position: absolute">
        <span style="font-size: 20px;font-weight: bold;position: absolute;padding: 2vh;left: 20vw">热门文章</span>
        <span style="font-size: 15px;color: #999999;position: absolute;padding: 2vh;left: 26.5vw;top: 1vh">生活原本沉闷，但跑起来就会有风。</span>
        <span style="font-size: 15px;color: #999999;position: absolute;padding: 2vh;left: 73vw;top: 1vh;cursor: pointer;" @click="toArticle()">更多<i class="el-icon-d-arrow-right
"></i></span>
      </div>
      <div style="width: 100%;height: 6vh"></div>
      <!--文章区-->
      <div>
        <el-row>
          <el-col style="width: 20vw;height: 74vh;background-color: #fafafa">
          </el-col>
          <el-col style="width: 61vw;height: 90vh;background-color: #fafafa">
            <div v-for="(v,i) in this.assayList" :key="i" >
              <el-col :span="12" >
                <el-card class="box-card" @click.native="testClick(v.id)" style="cursor: pointer">
                  <el-row class="unit">
                    <el-col :span="5" class="photo" >
                      <img :src="pictureURL+v.picture" alt="图片加载中" style="max-width: 12vh;max-height: 12vh;">
                      <!--              <el-image class="photo" :src="photo" fit="fit" font-sizer="20px"></el-image>-->
                    </el-col>
                    <el-col :span="2" style="height: 10vh"></el-col>
                    <el-col :span="15" class="content">
                      <p class="title">{{v.title}}</p>
                      <p class="detail">{{v.asdetail}}</p>
                      <!--                      <p class="author">{{"作者："+v.author}}</p>-->
                      <p class="articledata">{{v.updatetime}}</p>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </div>


          </el-col>
        </el-row>
      </div>
    </div>
    <!--心理测试-->
    <div style="width: 100%;height: 120vh;background-color: #f3f4f5">
      <div style="width: 80vw;height: 5vh;background-color: #f3f4f5;position: absolute">
        <span style="font-size: 20px;font-weight: bold;position: absolute;padding: 2vh;left: 20vw">热门测试 </span>
        <span style="font-size: 15px;color: #999999;position: absolute;padding: 2vh;left: 26.5vw;top: 1vh">认识自己·了解他人</span>
        <span style="font-size: 15px;color: #999999;position: absolute;padding: 2vh;left: 73vw;top: 1vh;cursor: pointer;" @click="toTest">更多<i class="el-icon-d-arrow-right
"></i></span>
      </div>
      <div style="width: 100%;height: 6vh"></div>
      <!--测试区-->
      <div>
        <el-row>
          <el-col style="width: 20vw;height: 74vh;background-color: #f3f4f5">
          </el-col>
          <el-col style="width: 61vw;height: 74vh;background-color: #f3f4f5">
            <div v-for="(v,i) in this.testList" :key="i" >
              <el-col :span="12"  >
                <el-card class="box-card" @click.native="testReady(v.head)" style="cursor: pointer">
                  <el-row class="unit">
                    <el-col :span="5" class="photo2" >
                      <el-image class="photo" :src="photo" fit="fit" font-sizer="20px"></el-image>
                    </el-col>
                    <el-col :span="4" style="height: 10vh"></el-col>
                    <el-col :span="15" class="content">

                      <p class="title">{{v.head}}</p>

                      <p class="detail">{{v.comment}}</p>

                      <p class="articledata">{{v.create_time}}</p>

                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--热门视频-->
    <div style="width: 100%;height: 120vh;background-color: #fafafa">
      <div style="margin: 0 auto;width: 100%;height: 5vh;background-color: #fafafa;position: absolute">
        <span style="font-size: 20px;font-weight: bold;position: absolute;padding: 2vh;left: 20vw">热门视频</span>
        <span style="font-size: 15px;color: #999999;position: absolute;padding: 2vh;left: 26.5vw;top: 1vh">半山腰太挤 你总得去山顶看看.</span>
        <span style="font-size: 15px;color: #999999;position: absolute;padding: 2vh;left: 73vw;top: 1vh;cursor: pointer;" @click="toVideo()">更多<i class="el-icon-d-arrow-right
    "></i></span>
      </div>
      <div style="width: 100%;height: 6vh"></div>
      <!--视频区-->
      <div>
        <el-row>
          <el-col style="width: 20vw;height: 74vh;background-color: #fafafa">
          </el-col>
          <el-col style="width: 61vw;height: 74vh;background-color: #fafafa">
            <div v-for="(v,i) in this.videoList" :key="i">
              <el-col :span="12" >
                <el-card class="box-card" @click.native="clickVideo(v.videoFileId,v.videoId)" style="cursor: pointer">
                  <el-row class="unit">
                    <el-col :span="5" class="photo" >
                      <img :src="pictureURL+v.imageFileId" style="max-width: 12vh;max-height: 12vh">
                      <!--              <el-image class="photo" :src="photo" fit="fit" font-sizer="20px"></el-image>-->
                    </el-col>
                    <el-col :span="4" style="height: 10vh"></el-col>
                    <el-col :span="15" class="content">
                      <p class="title">{{v.videoName}}</p>
                      <p class="detail">{{v.comment}}</p>
                      <!--                      <p class="author">{{"作者："+v.author}}</p>-->
                      <p class="articledata">{{v.create_time}}</p>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--页脚-->
    <footer-all></footer-all>
    <!--    <Footerall></Footerall>-->
  </div>
</template>

<script>
import servicesApi from "@/utils/servicesApi";
import axios from "axios";
import footerAll from '@/components/footerAll';
import photo from "@/views/img/4.jpg";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "homepage",
  components: { footerAll },
  data() {
    return {
      drawer: false,
      direction: 'btt',
      //请求参数
      formInline: {
        titleLike: '',
        detailLike: '',
        authorLike: '',
        typeLike: '',
      },
      photo:photo,
      total: 0,
      assayList: [],
      testList: [],
      videoList: [],
      pictureURL: '/api/files/download/',
      //分页参数
      pageparm: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      searchApi: 'getHotVideo',
    }
  },
  created() {
    this.getAssayData();
    this.getTestData();
    this.getVideoData();
  },
  methods: {
    //获取文章
    getAssayData(){
      let assayData = {
        titleLike: this.formInline.titleLike,
        detailLike: this.formInline.detailLike,
        authorLike: this.formInline.authorLike,
        typeLike: this.formInline.typeLike,
        pageNum: this.pageparm.pageNum,
        pageSize: this.pageparm.pageSize,
        orderBy: this.orderBy
      }
      servicesApi.getAssayListData(assayData).then(res=>{
        // axios.post('/api/assay/getAssayPage',formData).then(res=>{
        console.log(res.data)
        this.formInline.authorLike = ''
        this.formInline.detailLike = ''
        this.formInline.titleLike = ''
        if (res.data.code === '200'){
          this.assayList = res.data.data.records
          this.total = res.data.data.total
          console.log(this.assayList)
        }
      })
    },
    //获取心理测试
    getTestData(){
      let testData = {
        testTitleLike: this.formInline.testTitleLike,
        testDetailLike: this.formInline.testDetailLike,
        testDateLike: this.formInline.testDateLike,
        testedNumLike: this.formInline.testedNumLike,
        questionNumLike: this.formInline.questionNumLike,
        pageNum: this.pageparm.pageNum,
        pageSize: this.pageparm.pageSize,
        orderBy: this.orderBy
      }
      servicesApi.getTestListData(testData).then(res=>{
        console.log(res.data)
        this.formInline.testTitleLike = ''
        this.formInline.testDetailLike = ''
        this.formInline.testDateLike = ''
        this.formInline.testedNumLike = ''
        this.formInline.questionNumLike = ''
        if (res.data.code === '200'){
          this.testList = res.data.data.records
          this.total = res.data.data.total
          console.log(this.testList)
        }
      })
    },
    //获取视频
    getVideoData(){
      if (this.orderBy === 1){
        this.searchApi = 'getHotVideo'
      } else {
        this.searchApi = 'getNewVideo'
      }
      let formData = new FormData()
      formData.append('pageNum',this.pageparm.pageNum)
      formData.append('pageSize',this.pageparm.pageSize)
      // formData.append('search',this.searchOf)
      // formData.append('classname',this.classname)
      servicesApi.getVideoListData(this.searchApi,formData).then(res=>{
      // axios.post('/api/video/' + this.searchApi,formData).then(res=>{
        console.log(res.data)
        if (res.data.code === '200'){
          this.videoList = res.data.data.records
          this.total = res.data.data.total
          // this.searchOf = ''
          console.log('this.videoList',this.videoList)
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    //文章显示
    testClick(id){
      //路由传参
      this.$router.push({
        path: '/dashboard/article',
        query: {
          assayId: id
        }
      })
    },
    //测试点击
    testReady(head) {
      //路由传参
      this.$router.push({
        path: '/dashboard/testReady',
        query: {
          testHead: head
        }
      })
    },
    //视频点击
    clickVideo(id,vid) {
      this.$router.push({
        path: '/dashboard/videoPlay',
        query: {
          videoId: id,
          aitId: vid
        }
      })
    },
    //路由跳转
    toArticle() {
      this.$router.push("/dashboard/psychologicalArticle").catch(()=>{})
    },
    toTest() {
      this.$router.push("/dashboard/psychologicalAssessment")
    },
    toVideo() {
      this.$router.push("/dashboard/videoLecture")
    }
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  }
}
</script>
<style scoped>


.el-carousel__item:nth-child(2n) {
  background-image: url("../img/12.jpg");
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-image: url("../img/11.jpg");
  background-color: #d3dce6;
}

.box-card {
  /*margin-left: 10vw;*/
  width: 28vw;
  height: 20vh;
  margin-bottom: 20px;
  border-radius: 10px;
}
.box-card2 {
  /*margin-left: 10vw;*/
  width: 14vw;
  height: 15vh;
  margin-bottom: 20px;
  border-radius: 10px;
}
.unit {
  height: 15vh;
}
.photo {
  height: 5vw;
}
.photo2 {
  height: 5vw;
  background-image: url("../img/10.jpg");
}
.title {
  font-size: 5px;
  top: 0;
  font-weight: bold;
  text-align: left;
}
.detail {
  font-size: 3px;
  text-align: left;
}

.content {
  height: 10vh;
}
.articledata {
  color: #4E655D;
  position: absolute;
  padding: 1px;
  bottom: 1px;
}
.el-container{
  background: #fafafa;
  text-align: center;
  height: 10vh;
  position: relative;
  margin-left: 10px;
}

</style>
