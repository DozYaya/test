<!--次级菜单栏-->
<template>
    <div>
    <!--走马灯-->
    <el-row>
        <el-carousel indicator-position="outside" :interval="5000" arrow="always" type="card" :height="bannerHeight+50+'px'">
            <el-carousel-item v-for="(v,i) in this.hotVideoList" :key="i"
                              style="background-color: #FAFAFA"
            :name="v.videoName">
              <div @click="onClick(v.videoFileId,v.videoId)">
                <el-image class="image" alt="图片加载中" :src="imageApi+v.imageFileId" style="height: 40vh"></el-image>
                <p style="font-weight: bold;color: #000000">{{v.videoName}}</p>
              </div>
            </el-carousel-item>
        </el-carousel>
    </el-row>
    <!--菜单栏-->
    <el-row>
        <el-col style="width: 65%;">
            <div style="height: 2vh;width: 80vw;margin-left: 5vw ">
                <el-menu :default-active="$route.path"
                         class="el-menu-demo"
                         mode="horizontal"
                         @select="handleSelect"
                         background-color="#fafafa"
                         active-text-color="#6639e4"
                         router>
                    <el-menu-item index="/dashboard/videoLecture">首页</el-menu-item>
                    <el-menu-item index="/dashboard/science">心理科普</el-menu-item>
                    <el-menu-item index="/dashboard/interpersonal">人际交往</el-menu-item>
                    <el-menu-item index="/dashboard/relation">婚恋关系</el-menu-item>
                    <el-menu-item index="/dashboard/growth">成长学习</el-menu-item>
                    <el-menu-item index="/dashboard/health">自我健康</el-menu-item>
                    <el-menu-item index="/dashboard/career">职场技能</el-menu-item>
                    <el-menu-item index="/dashboard/sex">性心理</el-menu-item>
                </el-menu>
            </div>
        </el-col>
<!--        <el-col style="width: 30%">-->
<!--          <el-col style="width: 25%">-->
<!--            <el-select v-model="searchDefault" style="margin-top: 1vh;">-->
<!--              <el-option-->
<!--                  v-for="(sear,index) in searchs"-->
<!--                  :key="index"-->
<!--                  :label="sear.label"-->
<!--                  :value="sear.name"-->
<!--              ></el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->
<!--          <el-col style="width: 50%">-->
<!--            <div style="margin-left: 5%">-->
<!--              <el-input  style="margin-top: 1vh;" placeholder="请输入内容" >-->
<!--                <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>-->
<!--              </el-input>-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col style="width: 25%">-->
<!--            <div style="margin-left: 10%;margin-top: 1vh;">-->
<!--              <el-button type="primary" icon="el-icon-plus" @click="">添加</el-button>-->
<!--            </div>-->
<!--          </el-col>-->

<!--        </el-col>-->

    </el-row>
    </div>
</template>

<script>

    import axios from "axios";

    export default {
        name: "video_main",
      components: {
      },
        data() {
            return {
              searchDefault: 'title',
              searchs: [
                {
                  name: 'title',
                  label: '标题',
                },
                {
                  name: 'author',
                  label: '上传者',
                },
              ],
              formInline: {
                titleLike: '',
                detailLike: '',
                authorLike: '',
                typeLike: '',
              },
              searchApi: '',
              //分页参数
              pageparm: {
                pageNum: 1,
                pageSize: 4,
                total: 10
              },
              hotVideoList: [],
              imageApi: '/api/files/download/',
              screenWidth: 0,
              bannerHeight: 0,
            }
        },
      created() {
          this.getData()
      },
      mounted() {
        // 首次加载时,初始化高度
        this.screenWidth = window.innerWidth
        this.bannerHeight = 300 / 1550 * this.screenWidth
        // 窗口大小发生改变
        window.onresize = () => {
          this.screenWidth = window.innerWidth
          this.bannerHeight = 300 / 1550 * this.screenWidth
        }
      },

      methods: {
          getData(){
            let formData = new FormData()
            formData.append('pageNum',this.pageparm.pageNum)
            formData.append('pageSize',this.pageparm.pageSize)
            // formData.append('search',this.searchOf)
            // formData.append('classname',this.classname)
            axios.post('/api/video/getHotVideo',formData).then(res=>{
              console.log(res.data)
              if (res.data.code === '200'){
                this.hotVideoList = res.data.data.records
                this.total = res.data.data.total
                this.searchOf = ''
                console.log('123123',this.hotVideoList)
              }
            })
          },
        onClick(id,vid){
          sessionStorage.setItem('videoId',id)
          sessionStorage.setItem('aitId',vid)
          this.$router.push("/dashboard/videoPlay")
        },

        handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
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
    .el-menu--horizontal > .el-menu-item {
        border-bottom: none;
        text-decoration: none;
    }
    image {
      width: 100%;
      height: inherit;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
