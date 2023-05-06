<!--&lt;!&ndash;心理科普&ndash;&gt;-->
<!--<template>-->
<!--  <div>-->
<!--    <new-button style="cursor:pointer"></new-button>-->
<!--    <el-row>-->
<!--      <el-col style="width: 67%">-->
<!--        <el-card class="main">-->
<!--          &lt;!&ndash;菜单栏&ndash;&gt;-->
<!--          <articlemenu></articlemenu>-->
<!--          &lt;!&ndash;文章区&ndash;&gt;-->
<!--          <div style="background-color: #f1f1f1" v-for="(v,i) in this.arrayList"-->
<!--               :key="i">-->
<!--            <el-container class="danyuan"  @click.native="testClick(v.id)">-->
<!--              <el-aside class="photo" width="150px">-->
<!--                <el-image :src="pictureURL+v.picture"-->
<!--                          fit="fit" font-sizer="20px"></el-image>-->
<!--              </el-aside>-->
<!--              <el-main class="array">-->
<!--                <p class="title">{{v.title}}</p>-->
<!--                <p class="detail">{{v.asdetail}}</p>-->
<!--                <p class="author">{{v.author}}</p>-->
<!--                <p class="author">阅读量：{{v.asread}}</p>-->
<!--                <p class="articleData">{{v.updatetime}}</p>-->
<!--              </el-main>-->
<!--            </el-container>-->
<!--            <div style="background-color: #fafafa;height: 2vh"></div>-->
<!--          </div>-->
<!--          &lt;!&ndash; 分页 &ndash;&gt;-->
<!--          <div class="container">-->
<!--            <el-pagination-->
<!--                    @size-change="handleSizeChange"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    :current-page="pageparm.pageNum"-->
<!--                    :page-sizes="[5, 10, 15]"-->
<!--                    :page-size="pageparm.pageSize"-->
<!--                    layout="total, sizes, prev, pager, next, jumper"-->
<!--                    :total="total"-->
<!--            >-->
<!--            </el-pagination>-->
<!--          </div>-->
<!--        </el-card>-->
<!--        <el-header height="60px">-->

<!--        </el-header>-->
<!--&lt;!&ndash;        <div class="left">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-select v-model="orderBy" placeholder="最热" @change="getData">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-option&ndash;&gt;-->
<!--&lt;!&ndash;                v-for="(category,index) in categories"&ndash;&gt;-->
<!--&lt;!&ndash;                :key="index"&ndash;&gt;-->
<!--&lt;!&ndash;                :label="category.label"&ndash;&gt;-->
<!--&lt;!&ndash;                :value="category.name"&ndash;&gt;-->
<!--&lt;!&ndash;            ></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->

<!--        &lt;!&ndash;文章展示主界面&ndash;&gt;-->
<!--        <el-aside width="80%" style="background-color: #fafafa">-->
<!--          &lt;!&ndash;文章单元&ndash;&gt;-->


<!--          &lt;!&ndash;分页&ndash;&gt;-->

<!--        </el-aside>-->
<!--      </el-col>-->
<!--      &lt;!&ndash;推荐内容&ndash;&gt;-->
<!--      <el-card class="recommend">-->
<!--        <el-col style="height: 90vh;width: 80%">-->
<!--          &lt;!&ndash;        搜索&ndash;&gt;-->

<!--          <el-select v-model="searchDefault">-->
<!--            <el-option-->
<!--                    v-for="(sear,index) in searchs"-->
<!--                    :key="index"-->
<!--                    :label="sear.label"-->
<!--                    :value="sear.name"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--          <div style="height: 10px"></div>-->


<!--          <el-form :inline="true" :model="formInline">-->
<!--            <el-form-item label="">-->
<!--              <el-input v-model="formInline.titleLike"-->
<!--                        placeholder="请输入内容"></el-input>-->
<!--              &lt;!&ndash;                <el-input v-model.trim="formInline.titleLike"&ndash;&gt;-->
<!--              &lt;!&ndash;                          clearable&ndash;&gt;-->
<!--              &lt;!&ndash;                          placeholder="输入搜索内容"></el-input>&ndash;&gt;-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--              <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>-->
<!--              <el-button size="small" type="primary" icon="el-icon-search" @click="getData">取消搜索</el-button>-->
<!--            </el-form-item>-->
<!--          </el-form>-->


<!--          <div class="box-card">-->
<!--            <div style="text-align: left">-->
<!--              &lt;!&ndash;推荐测试图片&ndash;&gt;-->
<!--              <img src="../img/1.jpg" style="width: 100%;height: 80px;border-radius: 5px">-->
<!--              <img src="../img/2.jpg" style="width: 100%;height: 80px;border-radius: 5px">-->
<!--              <div style="height: 50px"></div>-->
<!--              &lt;!&ndash;推荐文章&ndash;&gt;-->
<!--              <div style="height: 50px" v-for="item in 5" :key="item">-->
<!--                <p><b>#{{articleTitle}}</b></p>-->
<!--                <p style="color: #999999">{{articleDetail}}</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-card>-->
<!--    </el-row>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import photo from '../img/4.jpg'-->
<!--import newButton from "@/views/PsychologicalArticle/hoverButton/newButton";-->
<!--import splitHorizontal from "@/views/PsychologicalArticle/hoverButton/splitHorizontal";-->
<!--import articlemenu from "@/views/PsychologicalArticle/article_menu";-->
<!--import axios from "axios";-->
<!--export default {-->
<!--  name: "psychological_article",-->
<!--  data() {-->
<!--    return {-->
<!--      articleTitle: '消费心理学',-->
<!--      articleDetail: '买买买的背后，心理学悄然控制了你的双手。',-->
<!--      activeIndex: '1',-->
<!--      activeIndex2: '1',-->
<!--      photo:photo,-->
<!--      code: "",-->
<!--      btnStyle: {-->
<!--        fontSize: "small",-->
<!--        top: "60vh",-->
<!--        left: "20vw",-->
<!--      },-->
<!--      //分页-->
<!--      pageparm: {-->
<!--        pageNum: 1,-->
<!--        pageSize: 10,-->
<!--        total: 10-->
<!--      },-->
<!--      total: 0,-->
<!--      //文章列表-->
<!--      arrayList: [],-->
<!--      pictureURL: '/api/files/download/',-->
<!--      categories: [-->
<!--        {-->
<!--          name: '1',-->
<!--          label: '最热'-->
<!--        },-->
<!--        {-->
<!--          name: '0',-->
<!--          label: '最新'-->
<!--        }-->
<!--      ],-->
<!--      orderBy:'1',-->
<!--      // 请求数据参数-->
<!--      formInline: {-->
<!--        titleLike: '',-->
<!--        detailLike: '',-->
<!--        authorLike: '',-->
<!--        typeLike: '心理科普',-->
<!--      },-->
<!--      //搜索参数-->
<!--      searchs:[-->
<!--        {-->
<!--          name: 'title',-->
<!--          label: '文章标题',-->
<!--        },-->
<!--        {-->
<!--          name: 'detail',-->
<!--          label: '文章摘要',-->
<!--        },-->
<!--        {-->
<!--          name: 'author',-->
<!--          label: '文章作者',-->
<!--        },-->
<!--      ],-->
<!--      searchDefault:'title',-->
<!--    };-->
<!--  },-->
<!--  components: {-->
<!--    splitHorizontal,-->
<!--    newButton,-->
<!--    articlemenu-->
<!--  },-->
<!--  watch: {-->
<!--  },-->
<!--  created() {-->
<!--    this.getData();-->
<!--    this.code = `-->
<!--<template>-->
<!--    <div>-->
<!--        <j-hover-btn bgColor = 'pink'-->
<!--            width = '80'-->
<!--            text = '上传文章'-->
<!--            :btn-style = "btnStyle"-->
<!--            @hoverBtnClick = "hoverBtnClick()">-->
<!--        </j-hover-btn>-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--    export default {-->
<!--        data(){-->
<!--            return {-->
<!--                btnStyle:{-->
<!--                "fontSize":'small',-->
<!--                "top":'600vh',-->
<!--                "left":'20vw'-->
<!--                },-->
<!--            }-->
<!--        },-->
<!--        methods:{-->
<!--            hoverBtnClick(){-->
<!--            alert('触发点击事件');-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--<\/script>-->
<!--`;-->
<!--  },-->
<!--  methods: {-->
<!--    getData(){-->
<!--      axios.post('/api/assay/getAssayPage',{-->
<!--        titleLike: this.formInline.titleLike,-->
<!--        detailLike: this.formInline.detailLike,-->
<!--        authorLike: this.formInline.authorLike,-->
<!--        typeLike: this.formInline.typeLike,-->
<!--        pageNum: this.pageparm.pageNum,-->
<!--        pageSize: this.pageparm.pageSize,-->
<!--        orderBy: this.orderBy-->
<!--      }).then(res=>{-->
<!--        console.log(res.data)-->
<!--        this.formInline.authorLike = ''-->
<!--        this.formInline.detailLike = ''-->
<!--        this.formInline.titleLike = ''-->
<!--        if (res.data.code === '200'){-->
<!--          this.arrayList = res.data.data.records-->
<!--          this.total = res.data.data.total-->
<!--          console.log(this.arrayList)-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    //搜索-->
<!--    search(){-->
<!--      console.log('search:',this.searchDefault)-->
<!--      console.log('form:',this.formInline)-->
<!--      if (this.searchDefault==='title'){-->
<!--        this.formInline.authorLike = ''-->
<!--        this.formInline.detailLike = ''-->
<!--      }else if (this.searchDefault === 'author'){-->
<!--        this.formInline.authorLike = this.formInline.titleLike-->
<!--        this.formInline.titleLike = ''-->
<!--        this.formInline.detailLike = ''-->
<!--      }else if (this.searchDefault === 'detail'){-->
<!--        this.formInline.detailLike = this.formInline.titleLike-->
<!--        this.formInline.titleLike = ''-->
<!--        this.formInline.authorLike = ''-->
<!--      }-->

<!--      this.getData()-->
<!--    },-->
<!--    testClick(id){-->
<!--      sessionStorage.setItem('assayID',id)-->
<!--      // this.$store.state.openAssarId = id-->
<!--      // console.log(this.$store.state)-->
<!--      this.$router.push("/dashboard/article")-->
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

<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->

<!--.danyuan {-->
<!--  height: 150px;-->
<!--}-->
<!--.left {-->
<!--  left: 10px;-->
<!--}-->
<!--.photo {-->
<!--  width: 150px;-->
<!--  height: 148px;-->
<!--}-->
<!--.main {-->
<!--  margin-left: 5vw;-->
<!--  margin-top: 4vh;-->
<!--  width: 60vw;-->
<!--}-->
<!--.recommend {-->
<!--  margin-top: 4vh;-->
<!--  width: 25vw;-->
<!--  margin-right: 5vw;-->
<!--}-->
<!--.box-card {-->
<!--  width: 20vw;-->
<!--  height: 50vh;-->
<!--}-->
<!--.photo {-->
<!--  height: 150px;-->
<!--  width: 150px;-->
<!--  /*background-image: url("../img/6.jpg");*/-->
<!--}-->
<!--.title {-->
<!--  font-size: 20px;-->
<!--  font-weight: bold;-->
<!--  text-align: left;-->
<!--}-->
<!--.author {-->
<!--  top: 20px;-->
<!--  font-size: 10px;-->
<!--  text-align: left;-->
<!--}-->
<!--.detail {-->
<!--  font-size: 10px;-->
<!--  text-align: left;-->
<!--}-->
<!--.array {-->
<!--  position: relative;-->
<!--}-->
<!--.articleData {-->
<!--  color: #4E655D;-->
<!--  margin-left: 1px;-->
<!--  position: absolute;-->
<!--  /*margin: 0px;*/-->
<!--  padding: 5px;-->
<!--  bottom: 5px;-->
<!--}-->
<!--</style>-->
<!--最新热文-->
<template>
  <div>
    <new-button style="cursor:pointer"></new-button>
    <el-row>
      <el-col style="width: 67%">

        <!--            <div style="position: marker">-->
        <!--              <el-select v-model="orderBy" placeholder="最热" @change="getData">-->
        <!--                <el-option-->
        <!--                    v-for="(category,index) in categories"-->
        <!--                    :key="index"-->
        <!--                    :label="category.label"-->
        <!--                    :value="category.name"-->
        <!--                ></el-option>-->
        <!--              </el-select>-->
        <!--            </div>-->
        <el-card class="main">
          <!--菜单-->
          <articlemenu></articlemenu>

          <div style="position: marker">
            <el-select v-model="orderBy" placeholder="最热" @change="getData">
              <el-option
                  v-for="(category,index) in categories"
                  :key="index"
                  :label="category.label"
                  :value="category.name"
              ></el-option>
            </el-select>
          </div>
          <!--文章-->
          <div style="background-color: #f1f1f1" v-for="(v,i) in this.assayList"
               :key="i" >
            <el-container class="unit" @click.native="testClick(v.id)">
              <el-aside class="photo">
                <img :src="pictureURL+v.picture" alt="图片加载中" style="max-width: 200px;max-height: 150px">
              </el-aside>
              <el-main>
                <!--                <el-form>-->
                <!--                  <el-form-item><p class="title">{{v.title}}</p></el-form-item>-->
                <!--                  <el-form-item><p class="detail">{{v.asdetail}}</p></el-form-item>-->
                <!--                  <el-form-item><p class="author">{{v.author}}</p></el-form-item>-->
                <!--                  <el-form-item><p class="author">阅读量：{{v.asread}}</p></el-form-item>-->
                <!--                  <el-form-item><p class="updateTime" >{{v.updatetime}}</p></el-form-item>-->
                <!--                </el-form>-->
                <p class="title">{{v.title}}</p>
                <p class="detail">{{v.asdetail}}</p>
                <p class="author">{{v.author}}</p>
                <p class="author">阅读量：{{v.asread}}</p>
                <p class="updateTime" >{{v.updatetime}}</p>
              </el-main>
            </el-container>
            <div style="background-color: #FAFAFA;height: 2vh"></div>
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
        </el-card>

        <el-header height="60px">

        </el-header>

        <el-aside width="95%" style="background-color: #fafafa">

        </el-aside>

      </el-col>

      <!--推荐内容-->
      <el-card class="recommend">
        <el-col style="height: 90vh;width: 80%">
          <!--        搜索-->
          <el-select v-model="searchDefault">
            <el-option
                v-for="(sear,index) in searchs"
                :key="index"
                :label="sear.label"
                :value="sear.name"
            ></el-option>
          </el-select>
          <div style="height: 10px"></div>
          <el-form :inline="true" :model="formInline">
            <el-form-item label="">
              <el-input v-model="formInline.titleLike"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
              <el-button size="small" type="primary" icon="el-icon-search" @click="getData">取消搜索</el-button>
            </el-form-item>
          </el-form>


          <div class="box-card">
            <right-ranking :article-class="formInline.typeLike"></right-ranking>
<!--            <div style="text-align: left">-->
<!--              &lt;!&ndash;推荐测试图片&ndash;&gt;-->
<!--              <img src="../img/1.jpg" style="width: 100%;height: 80px;border-radius: 5px">-->
<!--              <img src="../img/2.jpg" style="width: 100%;height: 80px;border-radius: 5px">-->
<!--              <div style="height: 50px"></div>-->
<!--              &lt;!&ndash;推荐文章&ndash;&gt;-->
<!--              <div style="height: 50px" v-for="item in 5" :key="item">-->
<!--                <p><b>#{{articleTitle}}</b></p>-->
<!--                <p style="color: #999999">{{articleDetail}}</p>-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </el-col>
      </el-card>
    </el-row>
    <el-row>
      <footerall></footerall>
    </el-row>
  </div>
</template>

<script>
import photo from '../img/4.jpg'
import newButton from "@/views/PsychologicalArticle/hoverButton/newButton";
import splitHorizontal from "@/views/PsychologicalArticle/hoverButton/splitHorizontal";
import articlemenu from "@/views/PsychologicalArticle/components/articleMenu";
import Footerall from '@/components/footerAll';
import axios from "axios";
import rightRanking from "@/views/PsychologicalArticle/components/rightRanking";
import servicesApi from "@/utils/servicesApi";
export default {
  name: "psychological_article",
  data() {
    return {
      articleTitle: '消费心理学',
      articleDetail: '买买买的背后，心理学悄然控制了你的双手。',
      activeIndex: '1',
      activeIndex2: '1',
      photo:photo,
      code: "",
      btnStyle: {
        fontSize: "small",
        top: "60vh",
        left: "20vw",
      },
      //分页
      pageparm: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      total: 0,
      //文章列表
      assayList: [],
      pictureURL: '/api/files/download/',
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
      orderBy: 1,
      // 请求数据参数
      formInline: {
        titleLike: '',
        detailLike: '',
        authorLike: '',
        typeLike: '心理科普',
      },
      //搜索参数
      searchs:[
        {
          name: 'title',
          label: '文章标题',
        },
        {
          name: 'detail',
          label: '文章摘要',
        },
        {
          name: 'author',
          label: '文章作者',
        },
      ],
      searchDefault:'title',
    };
  },
  components: {
    splitHorizontal,
    newButton,
    articlemenu,
    Footerall,
    rightRanking
  },
  watch: {
  },
  created() {
    this.getData();
    this.code = `
<template>
    <div>
        <j-hover-btn bgColor = 'pink'
            width = '80'
            text = '上传文章'
            :btn-style = "btnStyle"
            @hoverBtnClick = "hoverBtnClick()">
        </j-hover-btn>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                btnStyle:{
                "fontSize":'small',
                "top":'600vh',
                "left":'20vw'
                },
            }
        },
        methods:{
            hoverBtnClick(){
            alert('触发点击事件');
            }
        }
    }
<\/script>
`;
  },
  methods: {
    getData(){
      let postData = {
        titleLike: this.formInline.titleLike,
        detailLike: this.formInline.detailLike,
        authorLike: this.formInline.authorLike,
        typeLike: this.formInline.typeLike,
        pageNum: this.pageparm.pageNum,
        pageSize: this.pageparm.pageSize,
        orderBy: this.orderBy
      }
      servicesApi.getAssayListData(postData).then(res => {
        console.log(res.data)
        this.formInline.authorLike = ''
        this.formInline.detailLike = ''
        this.formInline.titleLike = ''
        if (res.data.code === '200'){
          this.assayList = res.data.data.records
          this.total = res.data.data.total
        }
      })
    },
    //搜索
    search(){
      console.log('search:',this.searchDefault)
      console.log('form:',this.formInline)
      if (this.searchDefault === 'title'){
        this.formInline.authorLike = ''
        this.formInline.detailLike = ''
      } else if (this.searchDefault === 'author'){
        this.formInline.authorLike = this.formInline.titleLike
        this.formInline.titleLike = ''
        this.formInline.detailLike = ''
      } else if (this.searchDefault === 'detail'){
        this.formInline.detailLike = this.formInline.titleLike
        this.formInline.titleLike = ''
        this.formInline.authorLike = ''
      }
      this.getData()
    },
    //点击跳转
    testClick(id){
      //路由传参
      this.$router.push({
        path: '/dashboard/article',
        query: {
          assayId: id
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

  },
};
</script>

<style scoped>

.unit {
  height: 23vh;
  cursor : pointer;
}
.left {
  left: 10px;
}
/*.photo {*/
/*  width: 150px;*/
/*  height: 148px;*/
/*}*/
.main {
  margin-left: 5vw;
  margin-top: 4vh;
  width: 60vw;
}
.recommend {
  margin-top: 4vh;
  width: 25vw;
  margin-right: 5vw;
}
.box-card {
  width: 20vw;
  height: 50vh;
}
.photo {
  max-height: 30vh;
  max-width: 30vh;
  /*height: 150px;*/
  /*width: 150px;*/
  /*background-image: url("../img/6.jpg");*/
}
.title {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}
.author {
  /*top: 10px;*/
  font-size: 10px;
  text-align: left;
}
.detail {
  font-size: 10px;
  text-align: left;
}
.updateTime {
  font-size: 10px;
  text-align: left;
}

.array {
  position: relative;
}
/*.articleData {*/
/*  !*color: #4E655D;*!*/
/*  margin-left: 1px;*/
/*  position: absolute;*/
/*  !*margin: 0px;*!*/
/*  padding: 5px;*/
/*  bottom: 5px;*/
/*}*/
</style>
