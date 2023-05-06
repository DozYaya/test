<!--走马灯-->
<template>
    <div class="zoumadeng">
        <el-carousel trigger="click" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in imgData" :key="index">
                <img ref="imgHeight" :src="item.src" :title="item.title" width="100%" height="100%" object-fit="cover">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "top",
        data() {
            return {
                imgData: [
                    {
                        src: require('../../img/1.jpg'),
                        title: "点击进入测试"
                    }, {
                        src: require('../../img/2.jpg'),
                        title: "点击进入测试"
                    }, {
                        src: require('../../img/3.jpg'),
                        title: "点击进入测试"
                    }, {
                        src: require('../../img/4.jpg'),
                        title: "点击进入测试"
                    }, {
                        src: require('../../img/5.jpg'),
                        title: "点击进入测试"
                    }
                ],
            }
        }
    }
</script>

<style scoped>
    .zoumadeng {
        background-color: #fafafa;
        border-radius: 2px;
    }
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
</style>
