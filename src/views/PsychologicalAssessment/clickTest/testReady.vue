<!--测试准备-->
<template>
  <div>
    <!--头部-->
    <el-card class="head" :body-style="{ padding: '0px' }">
      <el-row style="height: 6vh;width: 40vw;display: inline-block;">
        <el-col :span="2" style="height: 6vh" >
          <el-icon @click.native="toTest()" style="cursor: pointer; font-size: 3vh;margin-top: 1vh;margin-left: 1vh" class="el-icon-s-home"></el-icon>
        </el-col>
        <!-- 标题-->
        <el-col :span="20" style="height: 6vh">
          <span style="font-size: 3vh;margin-top: 1vh ">详情</span>
        </el-col>

      </el-row>
    </el-card>

    <!--测试说明-->
    <el-card class="ready">
      <el-row class="title">{{this.examList.head}}</el-row>
      <el-row class="tis">
        <span > <el-icon :size="20" class="el-icon-edit"></el-icon> <label>{{this.examList.visitorNum}}</label></span>
        <span ><el-icon :size="20" class="el-icon-date"></el-icon> <label>{{this.examList.create_time}}</label></span>
        <br>
        <span ><el-icon :size="20" class="el-icon-s-opportunity"></el-icon> <label>{{this.examList.quantity}}</label></span>
      </el-row>
      <!--图片-->
      <el-row style="width: 30vw;height: 30vh;margin-left: 3vw;">
        <el-image
            style="width: 30vw;height: 30vh " alt="图片加载中"
            src="https://imgco.xinli001.com/ceping/lingxi/scalePool/227d17b099de46b2a00e1efdae754656.png?x-oss-process=image/resize,p_60/quality,Q_80"
        ></el-image>
        <!--                <el-image-->
        <!--                        style="width: 30vw;height: 30vh "-->
        <!--                        :src=""-->
        <!--                ></el-image>-->
      </el-row>
      <el-row style="width: 30vw;height: 6vh;margin-left: 3vw;line-height: 1.5em; margin-top: 1vh; color: #999999 ">
        在日常生活中，出于自我保护，或符合社会的期许，人们会不自觉地隐藏真实的想法，如个性、好恶、欲望等。
      </el-row>
      <!--开始测试按钮-->
      <el-row style="width: 10vw;height: 8vh;margin-left: 14vw; background-color: #42b983 ">
        <el-button style="width: 100%;height: 100%" type="success" @click.native="psychoTest()">开始测试</el-button>
      </el-row>

    </el-card>

  </div>
</template>

<script>
import servicesApi from "@/utils/servicesApi";
import axios from "axios";
export default {
  name: "testReady",
  data() {
    return {
      exam: '',
      examList: '',
      // examList: {
      //     head:'',
      //     visitorNum: '',
      //     create_time: '',
      //     quantity: '',
      //     coverFileId: ''
      // }

    }
  },
  created() {
    this.getData()
  },
  methods: {
    //
    getData(){
      // this.exam = sessionStorage.getItem('exam')
      this.exam = this.$route.query.testHead
      console.log(this.exam)
      let fd = new FormData()
      fd.append('examName',this.exam)
      servicesApi.getTestListData(fd).then(res=>{
      // axios.post('/api/quiz/getQuizExam',fd).then(res=>{
        console.log(res.data)
        this.examList = res.data.data.records[0]
        // sessionStorage.setItem('examId',res.data.data.records[0].examId)
        console.log('exam',this.examList)
      })
    },
    //测试跳转
    psychoTest() {
      this.$router.push({
        path: '/dashboard/psychoTest',
        query: {
          title: this.examList.head,
          examId: this.examList.examId
        }
      })
      // sessionStorage.setItem('title',this.examList.head)
      // this.$router.push("/dashboard/psychoTest")
    },
    //测试主界面跳转
    toTest() {
      // sessionStorage.setItem('examId',this.examList.examId)
      this.$router.push("/dashboard/psychologicalAssessment")
    }
  }
}
</script>

<style scoped>
.head {
  margin-left: 30vw;
  margin-top: 5vh;
  width: 40vw;
  height: 6vh;
}
.ready {
  width: 40vw;
  height:  65vh;
  margin-top: 2vh;
  margin-left: 30vw;
}
.title {
  font-size: 20px;font-weight: bold;height: 6vh
}
.tis label{
  position: relative;
  margin-right: 50px;
  line-height: 5vh;
  color: #999999;
  /*text-align: left;*/
}
</style>
