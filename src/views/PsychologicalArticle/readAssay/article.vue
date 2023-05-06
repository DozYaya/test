<template xmlns:el-row="http://www.w3.org/1999/html">
  <div>
    <el-row>
        <el-col :span="16">
            <el-card class="main">
                <div class="wenzi1">
                    <!--标题-->
                    <div class="biaoti">
                        <h5>{{this.article.title}}</h5>
                    </div>
                    <!--标签-->
                    <div class="tag">
                      <el-tag v-for="(item,index) in typeData" :key="index">
                        <div v-if="index > 0">
                          {{ item }}
                        </div>
                      </el-tag>
<!--                        <el-tag v-for="item in this.article.type"-->
<!--                                :key="item">-->
<!--                            {{ item }}-->
<!--                        </el-tag>-->
                    </div>
                    <!--文章信息-->
                    <div class="xinxi">
                        <span style="margin-left: 1vw; display: inline-block;width: 140px;height: 30px; font-size: 13px;color: #999999">发布时间：{{this.article.updateTime}}</span>
                        <span style="display: inline-block;width: 10px;height: 30px"></span>
                        <span style="display: inline-block;width: 100px;height: 30px;color: #999999;font-size: 13px"> <i class="el-icon-view">阅读量：{{this.article.asread}}</i> </span>
                    </div>
                </div>
                <!--文章-->
                <div class="wenzhang">
                    <!--文章图片-->
                    <div class="wzphoto">
                        <el-image class="img" :src="pictureURL+this.article.picture"/>
                    </div>
                    <div style="height: 200px;">
                    </div>
                    <!--文章内容-->
                    <div class="article">
                        <div style="background-color: #fafafa;text-indent: 1em;text-align: left;font-size: 20px; margin: 30px;;padding: 50px;width: 500px">
                            <p style="font-weight: bold">{{this.article.detail}}</p>
                            <div v-html="this.article.content"></div>
                          <div style="height: 20%"></div>
                        </div>
                    </div>
                </div>
            </el-card>
        </el-col>

        <!--右边内容卡片-->
        <el-col :span="1">
            <el-card class="recommend">
              <right-ranking :article-class="typeLike"></right-ranking>
<!--                <div class="read">-->
<!--                    <span style="text-align: left;display: inline-block; font-weight: bold;font-size: 20px;">相关测试</span>-->
<!--                    <span style="display: inline-block;width: 150px;height: 30px"></span>-->
<!--                    <span style="text-align: right; display: inline-block; color: #42b983">{{test}}<i class="el-icon-arrow-right"></i></span>-->
<!--                    <div style="height: 20px"></div>-->
<!--                    <div>-->
<!--                        <ul class="list">-->
<!--                            <li>无处不在的身材羞辱：印度第一美人发胖被骂“叛国”？</li>-->
<!--                            <li>精神和心理疾病的诊断一定可靠吗？| 世界精神卫生日</li>-->
<!--                            <li>克服你的拖延症——咨询师那些事儿</li>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <el-divider></el-divider>-->
<!--                <div>-->
<!--                    <span style="display: inline-block; font-weight: bold;font-size: 20px;">相关阅读</span>-->
<!--                    <span style="display: inline-block;width: 150px;height: 30px"></span>-->
<!--                    <span style=" display: inline-block; color: #42b983">{{articleType}}<i class="el-icon-arrow-right"></i></span>-->
<!--                    <div style="height: 20px"></div>-->
<!--                    <div>-->
<!--                        <ul class="list">-->
<!--                            <li>姑娘，身体有这几种表现，说明你心理感冒了！</li>-->
<!--                            <li>阴谋论缘何被传播？——阴谋论让人们显得独特和激进</li>-->
<!--                            <li>亲社会实验室丨为什么现在的人们都躺平了？</li>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                </div>-->
            </el-card>
        </el-col>
    </el-row>
    <footer-down></footer-down>
</div>
</template>

<script>
import axios from "axios";
import servicesApi from "@/utils/servicesApi";
import footerDown from "@/components/footerAll";
import rightRanking from "@/views/PsychologicalArticle/components/rightRanking";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "",
  components:{
    // eslint-disable-next-line vue/no-unused-components
    footerDown,
    rightRanking
  },
  data() {
    return {
      article:{
        title:'',
        author:'',
        asread: 0,
        detail:'',
        type:[],
        picture: 0,
        content: '',
        updateTime: '',
      },
      typeData: [],
      pictureURL: '/api/files/download/',
      typeLike: '',
    }
  },
  created() {
    this.getData()
  },
  methods:{
    getData(){
      const id = this.$route.query.assayId
      servicesApi.getAssayData(id).then(res => {
        console.log('res.',res.data)
        this.article.title = res.data.data.title
        this.article.author = res.data.data.author
        this.article.asread = res.data.data.asread
        this.article.detail = res.data.data.asdetail
        this.article.picture = res.data.data.picture
        this.article.type = res.data.data.type
        this.article.content = res.data.others
        this.article.updateTime = res.data.data.updatetime
        this.typeCut(this.article.type)
      })
    },
    //分割类型
    typeCut(typeData){
      this.typeData = typeData.toString().split('#')
      console.log(this.typeData)
    }
  },
}
</script>

<style scoped>
    .box {
        background-color: #DCDCDC;
        height: 1000px;
        width: 600px;
        position: relative;
    }
    .img {
        height: 100%;
        width: 100%;
        position: relative;
    }
    .main {
        margin-left: 2vw;
        margin-top: 4vh;
        width: 40vw;
    }
    .recommend {
        margin-top: 4vh;
        width: 20vw;
        /*height: 80vh;*/
        margin-right: 5vw;
    }
    .main {
        margin-left: 8vw;
        margin-top: 4vh;
        width: 55vw;
    }
    .recommend {
        margin-top: 4vh;
        width: 25vw;
        margin-right: 5vw;
    }
    .box-card {
        width: 25vw;
        height: 100vh;
    }
    .wzphoto {
        top: 0px;
        left: 25%;
        width: 50%;
        position: absolute;
        height: 200px;
    }
    .biaoti {
        position: relative;
        text-align: center;
        width: 458px;
        height: 70px;
    }
    .wenzhang {
        background-color: #fafafa;
        height: 100%;
        position: relative;
    }
    .wenzi1 {
        background-color: #fafafa;
        height: 150px;
    }
    .wenzi1 h5 {
        position: absolute;
        margin: 10px;
        text-align: center;
        font-size: 25px;
    }
    .wenzi1 h4 {
        position: absolute;
        margin: 10px;
        bottom: 90%;
        font-size: 10px;
    }
    .tag {
        width: 50vw;
        height: auto;
    }
    .xinxi {
        width: 458px;
        height: 30px;
    }
    .article {
        top: 200px;
    }
    .box-card {
        text-align: justify;
    }
    .read {
        position: relative;
    }
    .list {
        list-style-type: disc;
    }
    ul li {
        font-size: 13px;
        color: #666;
        line-height: 50px;
    }
    ::v-deep img{
      max-width: 80%;
    }
</style>
