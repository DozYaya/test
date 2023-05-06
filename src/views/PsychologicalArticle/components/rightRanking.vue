<template>
  <div>
    <p style="font-size: 15px">热度排行榜</p>
    <p style="margin-top: 5%;text-align: left;cursor: pointer;background-color: #FAFAFA"
       v-for="(v,i) in assayList" :key="i" @click="readAssay(v.id)">{{ i + 1}}.{{v.title}}</p>
  </div>
</template>

<script>
import axios from "axios";
import servicesApi from "@/utils/servicesApi";

export default {
  name: "rightRanking",
  data: function () {
    return {
      pageparm: {
        pageNum: 1,
        pageSize: 10,
        total: 10
      },
      orderBy: 1,
      assayList: [],
      // 请求数据参数
      formInline: {
        titleLike: '',
        detailLike: '',
        authorLike: '',
        typeLike: '',
      },
    }
  },
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    articleClass: '',
  },
  created() {
    this.getData()
  },
  methods: {
    getData(){
      // axios.post('/api/assay/getAssayPage',{
      //   titleLike: this.formInline.titleLike,
      //   detailLike: this.formInline.detailLike,
      //   authorLike: this.formInline.authorLike,
      //   typeLike: this.articleClass,
      //   pageNum: this.pageparm.pageNum,
      //   pageSize: this.pageparm.pageSize,
      //   orderBy: this.orderBy
      // }).then(res=>{
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
        // axios.post('/api/assay/getAssayPage',formData).then(res=>{
        console.log('rightRanking',res.data)
        if (res.data.code === '200'){
          this.assayList = res.data.data.records
          console.log(this.assayList)
        }
      })
    },
    readAssay(id){
      //路由传参
      this.$router.push({
        path: '/dashboard/article',
        query: {
          assayId: id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
