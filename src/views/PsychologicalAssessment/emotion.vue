<!--情感-->
<template>
  <div class="box">
    <!--走马灯-->
    <div class="zoumadeng">
      <el-carousel trigger="click" indicator-position="outside">
        <el-carousel-item v-for="item in imgData" :key="imgData.value">
          <img ref="imgHeight" :src="item.src" :title="item.title" width="100%" height="100%" object-fit="cover">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!--菜单-->
    <testmenu></testmenu>

    <!--心理测试-->
    <el-row style="display: inline-block; margin-left: 8vw">
      <el-col :span="15">
        <!--单元-->
        <el-card style="width: 45vw;height: 100%;" shadow="never" :body-style="{ padding: '0px' }">
          <el-col>
            <div v-for="(v,i) in this.testList" :key="i">
              <el-card class="introCard"  @click.native="testReady(v.head)">
                <el-row :gutter="20" >
                  <el-col :span="19"><div class="title" >{{v.head}}</div>
                    <div class="describe">{{v.comment}}</div>
                    <div class="tis">
                      <span class="testnum"> <el-icon :size="18" class="el-icon-edit"></el-icon> <label>{{v.visitorNum}}</label></span>
                      <!--                      <span class="comment"> <label>391</label></span>-->
                      <!--                      <span class="keep"> <label>660</label> </span>-->
                      <span class="date"><el-icon :size="18" class="el-icon-date"></el-icon> <label>{{v.create_time}}</label></span>
                      <span class="date"><el-icon :size="18" class="el-icon-s-opportunity"></el-icon> <label>{{v.quantity}}</label></span>
                    </div>
                  </el-col>
                  <el-col :span="5"><div >
                    <el-image
                        style="width: 100px; height: 100px" alt="图片加载中"
                        src="https://imgco.xinli001.com/ceping/lingxi/scalePool/227d17b099de46b2a00e1efdae754656.png?x-oss-process=image/resize,p_60/quality,Q_80"
                    ></el-image>
                  </div>
                  </el-col>
                </el-row>
              </el-card>
            </div>


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
          </el-col>
        </el-card>
      </el-col>
      <!--推荐-->
      <el-col :span="4">
        <el-card class="recommend">

          <el-form :inline="true" :model="formInline">
            <el-form-item label="">
              <el-input v-model="formInline.searchOf"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
              <el-button size="small" type="primary" icon="el-icon-search" @click="getData">取消搜索</el-button>
            </el-form-item>
          </el-form>


          <div class="box-card">
            <div style="text-align: left">
              <!--推荐测试图片-->
              <img src="../img/1.jpg" style="width: 100%;height: 80px;border-radius: 5px">
              <img src="../img/2.jpg" style="width: 100%;height: 80px;border-radius: 5px">
              <div style="height: 50px"></div>
              <!--推荐文章-->
              <div style="height: 50px" v-for="item in 5" :key="item">
                <p><b>#{{articleTitle}}</b></p>
                <p style="color: #999999">{{articleDetail}}</p>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

    </el-row>

    <!--页脚-->
    <el-row>
      <Footerall></Footerall>
    </el-row>

  </div>
  <!--  </div>-->
</template>
<script>
import Footerall from '@/components/footerAll';
import testmenu from "@/views/PsychologicalAssessment/components/testmenu";
import axios from "axios";
import servicesApi from "@/utils/servicesApi";
export default {
  name: "emotion",
  components: {
    Footerall,
    testmenu
  },
  data() {
    return {
      pageparm: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      total: 0,
      testList: [],
      classId: 2,//测试分类
      formInline: {
        searchOf: ''
      },//搜索信息
      articleTitle: '消费心理学',
      articleDetail: '买买买的背后，心理学悄然控制了你的双手。',
      imgData: [
        {
          src: require('../img/1.jpg'),
          title: "点击进入测试"
        }, {
          src: require('../img/2.jpg'),
          title: "点击进入测试"
        }, {
          src: require('../img/3.jpg'),
          title: "点击进入测试"
        }, {
          src: require('../img/4.jpg'),
          title: "点击进入测试"
        }, {
          src: require('../img/5.jpg'),
          title: "点击进入测试"
        }
      ],
    }
  },
  created() {
    this.getData();
  },
  methods: {

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    testReady(head) {
      //路由传参
      this.$router.push({
        path: '/dashboard/testReady',
        query: {
          testHead: head
        }
      })
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

    search(){
      this.getData()
    },

    getData(){
      let fd = new FormData()
      console.log(this.formInline.searchOf)
      fd.append('pageNum',this.pageparm.pageNum)
      fd.append('pageSize',this.pageparm.pageSize)
      fd.append('classId',this.classId)
      fd.append('examName',this.formInline.searchOf)
      // axios.post('/api/quiz/getQuizExam',fd).then(res=>{
      servicesApi.getTestListData(fd).then(res => {
        console.log(res.data)
        if (res.data.code === '200'){
          this.formInline.searchOf = ''
          this.testList = res.data.data.records
          this.total = res.data.data.total
          console.log(this.testList)
        }
      })
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
  background-color: #d3dce6;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.box {
  position: relative;
  background-color: #fafafa;
}
.zoumadeng {
  background-color: #fafafa;
  border-radius: 2px;
}
.menu {
  position: absolute;
  display: inline-block;
}
.introCard{
  /* width: 700px; */
  height: 18vh;
  position: relative;
  cursor: pointer;
}
.title{
  font-size: 20px;
  color: #333;
  text-align: left;
}
.describe{
  font-size: 14px;
  color: #999;
  line-height: 1.4em;
  height: 3em;
  text-align: left;
  margin-top: 10px;
}
.tis label{
  position: relative;
  margin-right: 50px;
  line-height: 18px;
  /*text-align: left;*/
}
.tis-icon{
  display: inline-block;
  top: 5px;
}
.recommend {
  display: inline-block;
  width: 25vw;
  margin-right: 5vw;
}
</style>


