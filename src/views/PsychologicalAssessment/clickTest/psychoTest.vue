<template>
  <div>
    <!--头部-->
    <el-card class="head" :body-style="{ padding: '0px' }">
      <el-row style="height: 6vh;width: 40vw;display: inline-block;">
        <el-col :span="2" style="height: 6vh;">
          <el-icon style="cursor: pointer;
                     font-size: 3vh;margin-top: 1.7vh;
                     margin-left: 1vh" class="el-icon-arrow-left" @click.native="returnReady()"></el-icon>
        </el-col>
        <el-col :span="18" style="height: 6vh">
          <div style="margin-top: 1.7vh">
            <span style="font-size: 15px;font-weight: bold">{{title}}</span>
          </div>
        </el-col>
        <el-col :span="4" style="height: 6vh;font-size: 15px">
          <div style="margin-top: 1.7vh;color: red">
            共{{this.listLength}}道题
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!--测试-->
    <el-card class="test" :body-style="{ padding: '1vw' }">
      <!--            <div style="text-align: left; width: 38vw;height: 56vh;position: relative" v-if="questionList">-->
      <div class="menu-div" id="mainQuestion">
        <div style="text-align: left; width: 46vw;height: 100%;position: relative;overflow-y: auto"
             v-for="(option,item) in this.questionList" :key="item">
          <el-row style="width: 40vw;height: 8vh;margin-left: 2vw;margin-top: 2vh;">
            <!--标题-->
            <el-col :span="5" style="font-size: 20px;height: 3vh">{{"第"+option.questionNum+"题"}}</el-col>
            <el-col :span="19" style="font-size: 20px;height: 3vh"> {{option.head}}</el-col>
            <!--                    <el-col :span="5" style="font-size: 20px;height: 3vh">{{"第"+this.questionList[nowId].questionId+"题"}}</el-col>-->
            <!--                    <el-col :span="19" style="font-size: 20px;height: 3vh"> {{this.questionList[nowId].head}}</el-col>-->
          </el-row>
          <!--选项-->
          <el-row style="width: 40vw;height: 40vh;margin-top: 1vh;">
            <!--选项单元-->

            <el-row  style="margin-left: 2vw;">
              <el-radio-group style="width: 100%">
                <div>
                  <el-row  style="height: 5vh;width: 100%">
                    <el-radio v-if="option.a"
                              v-model="radio"
                              :label="'A'+option.a"
                              @click.native.prevent="changeChoice('a',option.questionId),testAnswer(option.pointA)"
                              :span="2" style="height: 10vh;margin-top: 2vh">
                    </el-radio>
                  </el-row>

                </div>
                <div>
                  <el-row  style="height: 5vh;width: 70%">
                    <el-radio v-if="option.b"
                              v-model="option.pointB"
                              :label="'B'+option.b"
                              @click.native.prevent="changeChoice('b',option.questionId),testAnswer(option.pointB)"
                              :span="2" style="height: 10vh;margin-top: 2vh">

                    </el-radio>
                  </el-row>

                </div>
                <div>
                  <el-row  style="height: 5vh;width: 70%">
                    <el-radio v-if="option.c"
                              v-model="option.pointC"
                              :label="'C'+option.c"
                              @click.native.prevent="changeChoice('c',option.questionId),testAnswer(option.pointC)"
                              :span="2" style="height: 10vh;margin-top: 2vh"></el-radio>
                  </el-row>

                </div>
                <div>
                  <el-row  style="height: 5vh;width: 70%">
                    <el-radio v-if="option.d"
                              v-model="option.pointD"
                              :label="'D'+option.d"
                              @click.native.prevent="changeChoice('d',option.questionId),testAnswer(option.pointD)"
                              :span="2" style="height: 10vh;margin-top: 2vh"></el-radio>
                  </el-row>

                </div>
                <div>
                  <el-row  style="height: 5vh;width: 70%">
                    <el-radio v-if="option.e"
                              v-model="option.pointE"
                              :label="'E'+option.e"
                              @click.native.prevent="changeChoice('e',option.questionId),testAnswer(option.pointE)"
                              :span="2" style="height: 10vh;margin-top: 2vh"></el-radio>
                  </el-row>

                </div>
                <div>
                  <el-row style="height: 5vh;width: 70%">
                    <el-radio v-if="option.f"
                              v-model="option.pointF"
                              :label="'F'+option.f"
                              @click.native.prevent="changeChoice('f',option.questionId),testAnswer(option.pointF)"
                              :span="2" style="height: 10vh;margin-top: 2vh"></el-radio>
                  </el-row>

                </div>
                <div>
                  <el-row style="height: 5vh;width: 70%">
                    <el-radio v-if="option.g"
                              v-model="option.pointG"
                              :label="'G'+option.g"
                              @click.native.prevent="changeChoice('g',option.questionId),testAnswer(option.pointG)"
                              :span="2" style="height: 10vh;margin-top: 2vh"></el-radio>
                  </el-row>

                </div>
              </el-radio-group>
            </el-row>
            <div class="option-label" style="width: 1vw"></div>

          </el-row>

          <el-row style="width: 40vw;height: 6vh;margin-left: 2vw;margin-top: 1vh;" >
            <el-button style="width: 20%;height: 100%; margin-left: 8vw;" v-if="isNextButton" type="warning" @click="lastQuestion()">上一题</el-button>
            <el-button style="width: 20%;height: 100%;margin-left: 6vw;" v-if="isOverQuestion" type="warning" @click.native="overQuestion()">完成答题</el-button>
          </el-row>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import servicesApi from "@/utils/servicesApi";

export default {
  name: "psychoTest",
  data() {
    return {
      listLength: 0,
      total: 0,//总分
      radio: 1,
      title: '',
      examId: '',
      isNextButton: false,
      isOverQuestion: false,
      nowId: 0,//当前题目ID
      titleId: 1,
      totalList: [],
      everQuestionScore: [],
      questionList: [],
      choiceList: [],//记录每一题的选择
      pageNum: 1,
      pageSize: 50,
      screeHeight: document.body.clientHeight, // 屏幕高
      moveLength: 0,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData(){
      //获取屏幕高度
      this.scrollHeight = window.innerHeight
      this.title = this.$route.query.title
      this.examId = this.$route.query.examId
      console.log('examId',this.examId);
      let fd = new FormData()
      fd.append('pageNum',this.pageNum)
      fd.append('pageSize',this.pageSize)
      fd.append('examId',this.examId)
      servicesApi.getTestQuestions(fd).then(res=>{
      // axios.post('/api/quiz/getQuizQuestion',fd).then(res=>{
        console.log('res:',res.data)
        this.questionList = res.data.data.records
        console.log('ques:',this.questionList)
        this.questionData()
      })
    },
    //进行测试前数据预处理
    questionData(){
      let len = this.questionList.length
      this.listLength = len
      for (let i = 0; i <= len; i++){
        this.totalList[i] = false
        this.everQuestionScore[i] = 0
      }
      // for (let i = 0;i < len;i++){
      //     console.log('this.questionList[i][j]',this.questionList[i])
      //     for (let key in this.questionList[i]){
      //         if (i===0){
      //             delete this.questionList[0]
      //         }
      //         if (this.questionList[i][key] === null){
      //             delete this.questionList[i][key]
      //         }
      //     }
      // }
      console.log('len:',len)
      console.log(this.questionList)
    },

    returnReady() {
      this.$router.push("/dashboard/testReady")
    },
    //计算测试得分
    testAnswer(fen){
      console.log(this.totalList)
      console.log('nowId:',this.nowId)
      console.log('Total:',this.total)
      console.log('len:',this.listLength)

      if (this.totalList[this.nowId] === false){
        this.everQuestionScore[this.nowId] = fen
        this.total = this.total + fen
        this.totalList[this.nowId] = true
      } else {
        this.total = this.total - this.everQuestionScore[this.nowId] + fen
      }

      if (this.nowId === this.listLength - 1){
        this.$message({
          type: 'success',
          message: "你的得分为" + this.total
        })
        console.log('this.choiceList:',this.choiceList)
      }

      console.log('nowTotal:',this.total)
      sessionStorage.setItem('score',this.total)
      if (this.nowId < this.listLength - 1){
        this.nowId = this.nowId + 1
        this.titleId = this.nowId + 1
      } else {
        return
      }
      // this.nowId ++

      if (this.nowId > 0){
        this.isNextButton = true
      }

      if (this.nowId === this.listLength - 1) {
        this.isOverQuestion = true
      }

      // if (this.nowId === this.listLength-1){
      //     this.$message({
      //         type: 'success',
      //         message: "你的得分为"+this.total
      //     })
      //     console.log('this.choiceList:',this.choiceList)
      // }

      this.handleScroll('down')
    },
    //记录选项
    changeChoice(val,id){
      console.log('val',val)
      console.log('id',id)
      console.log('shijian',this.nowId)

      this.choiceList[id] = val
    },
    //完成答题
    overQuestion() {
      // sessionStorage.setItem('score',this.total)
      // sessionStorage.setItem('examId',this.id)
      // this.$router.push("/dashboard/testResult")
      this.$router.push({
        path: '/dashboard/testResult',
        query: {
          score: this.total,
          examId: this.examId,
          title: this.title
        }
      })
    },
    //返回上一题
    lastQuestion(){
      if (this.nowId > 0) {
        this.nowId--
      } else {
        this.isNextButton = false
      }
      this.handleScroll('up')
    },


    //页面上下滚动

// 生成list
    handleList() {
      for (let i = 0; i < 100; i++) {
        this.list.push({
          label: i + 1,
          value: i + 1
        })
      }
    },
    // 滚动效果
    easeInQuad(curtime,begin,end,duration){
      let x = curtime / duration; //x值
      let y = x * x; //y值
      return begin + (end - begin) * y; //套入最初的公式
    },
    easeOutQuad(curtime,begin,end,duration){
      let x = curtime / duration; //x值
      let y = -x * x + 2 * x; //y值
      return begin + (end - begin) * y; //套入最初的公式
    },
    easeInoutQuad(curtime,begin,end,duration){
      if (curtime < duration / 2){ //前半段时间
        return this.easeInQuad(curtime,begin,(begin + end) / 2,duration / 2);//改变量和时间都除以2
      } else {
        let curtime1 = curtime - duration / 2; //注意时间要减去前半段时间
        let begin1 = (begin + end) / 2;//初始量要加上前半段已经完成的
        return this.easeOutQuad(curtime1,begin1,end,duration / 2);//改变量和时间都除以2
      }
    },
    // 滚动
    handleScroll(action) {
      let menuScroll = document.getElementById('mainQuestion')
      console.log('000',this.scrollHeight)
      // 每次滚动距离
      let dis = 0
      if (action === 'down'){
        // dis = this.scrollHeight * 1.01;
        dis = this.scrollHeight * 1;
      } else {
        dis = this.scrollHeight * 1;
        // dis = this.scrollHeight * 0.977;
      }
      // 滚动时长
      let duration = 500;
      // 初始距离
      let preX = 0;
      let startTime = new Date().getTime();
      let func = () => {
        let nowTime = new Date().getTime();
        let t = nowTime - startTime;
        // 当时长大于500时，停止滚动
        if (t > duration) {
          return;
        }
        let s = this.easeInoutQuad(t, 0, dis, duration);
        // 每次滚动距离
        let x = s - preX;
        preX = s;
        if (this.moveLength === 0){
          this.moveLength = x
        }
        if (action === 'up') {
          // 向上滚动
          menuScroll.scrollTop -= x
          // menuScroll.scrollTop -= this.moveLength
        } else if (action === 'down') {
          // 向上滚动
          menuScroll.scrollTop += x
          // menuScroll.scrollTop += this.moveLength
        }
        // 请求滚动
        requestAnimationFrame(func)
      }
      requestAnimationFrame(func)
    }
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
.option-label {
  display: inline-block;
  width: 40vw;
  height: 1vh;
}
.menu-div{
  margin: 16px 0;
  height: 100vh;
  overflow-y: auto;
}
</style>
