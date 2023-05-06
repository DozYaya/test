<template>
  <div >
    <!--头部-->
    <el-card class="head" :body-style="{ padding: '0px' }">
      <el-row style="height: 6vh;width: 40vw;display: inline-block;">
        <el-col :span="2" style="height: 6vh;">
          <el-icon style="cursor: pointer;
                    font-size: 3vh;margin-top: 1.7vh;
                    margin-left: 1vh" class="el-icon-arrow-left" @click.native="toMain()"></el-icon>
        </el-col>
        <el-col :span="18" style="height: 6vh">
          <div style="margin-top: 1.7vh">
            <span style="font-size: 15px;font-weight: bold">测试结果</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="test" :body-style="{ padding: '1vw' }">
      <el-row class="title">{{title}}</el-row>

      <!--图片-->
      <el-row style="width: 30vw;height: 30vh;margin-left: 7vw;">
        <el-image
            style="width: 30vw;height: 30vh " alt="图片加载中"
            src="https://imgco.xinli001.com/ceping/lingxi/scalePool/227d17b099de46b2a00e1efdae754656.png?x-oss-process=image/resize,p_60/quality,Q_80"
        ></el-image>
      </el-row>
      <el-row style="text-align: left; width: 39vw;height: 6vh;margin-left: 3vw;margin-top: 1vh; color: #999999 ">
        <div style="font-weight: bold;font-size: 15px;color: black;display: inline-block">测试结果:</div>
        <!--                <div style="color: #999999;display: inline-block;font-size: 12px ">忽视型</div>-->
        <div style="width: 39vw;height: 2vh;"></div>
        <div>{{note}}</div>
      </el-row>
      <!--开始测试按钮-->
      <!--            <el-row style="width: 10vw;height: 8vh;margin-left: 14vw; background-color: #42b983 ">-->
      <!--                <el-button style="width: 100%;height: 100%" type="success" @click.native="psychoTest()">开始测试</el-button>-->
      <!--            </el-row>-->
    </el-card>

  </div>
</template>

<script>
import servicesApi from "@/utils/servicesApi";
import axios from "axios";
export default {
  name: "testResult",
  data() {
    return {
      title: '',
      score: 0,
      note: '',
      resultList: [],//测试
    }
  },
  created() {
    this.getData();
  },
  methods: {
    toMain() {
      this.$router.push("/dashboard/psychologicalAssessment")
    },
    getData(){
      // this.title = sessionStorage.getItem('title');
      // this.score = sessionStorage.getItem('score')
      // this.exam = sessionStorage.getItem('examId')
      this.title = this.$route.query.title
      this.score = this.$route.query.score
      this.exam = this.$route.query.examId
      // console.log(this.exam)
      // console.log(this.score)
      let fd = new FormData()
      fd.append('examName',this.exam)
      servicesApi.getTestResult(fd).then(res=>{
      // axios.post('/api/quiz/getQuizResult',fd).then(res=>{
        console.log(res.data)
        this.resultList = res.data.data.records[this.exam - 1]
        console.log('result',this.resultList)
        //判断得分情况
        if (this.score > 0 && this.score < 25) {
          this.note = this.resultList.situation1
          console.log(this.note);
        }
        if (this.score >= 15 && this.score < 50) {
          this.note = this.resultList.situation2
          console.log(this.note);
        }
        if (this.score >= 50 && this.score < 80) {
          this.note = this.resultList.situation3
          console.log(this.note);
        }
      })
    },
  }
}
</script>

<style scoped>
.head {
  margin-left: 27vw;
  margin-top: 5vh;
  width: 46vw;
  height: 6vh;
}
.test {
  margin-left: 27vw;
  margin-top: 5vh;
  width: 46vw;
  height: 68vh;
}
.title {
  font-size: 20px;font-weight: bold;height: 6vh
}
</style>
