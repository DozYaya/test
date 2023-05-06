<!--操作指南-->
<template>
    <div>
        <el-row style="margin-top: 5vh">
            <el-col :span="8" class="img">
                <div style="color: #f1f1f1;font-size: 3vw;width: 16vw;height: 10vh;margin-top: 8vh;margin-left: 11vw">
                    心理指南<el-icon class="el-icon-discover"></el-icon>
                </div>
            </el-col>
            <el-col :span="1" style="height: 90vh">

            </el-col>
            <el-col :span="14" style="height: 90vh;">
<!--                <el-card class="content" shadow="never">-->
                <p style="color: #409eff;font-size: 25px;margin-top: 7vh;text-align: left;">操作指南</p>
                <br>
                <br>
                <p class="question">1.该系统有哪些功能模块？</p>
                <br>
                <p class="answer">功能模块分别为心理内容、心理测试、视频讲座和用户体系。</p>
                <br>
                <div class="box"></div>
                <p class="question">2.该系统为那些人群服务？</p>
                <br>
                <p class="answer">该系统主要为大学生人群服务，但也添加了为以后步入社会添加了职场方面的功能</p>
                <br>
                <div class="box"></div>
                <p class="question">3.存在收费情况吗？</p>
                <br>
                <p class="answer">不存在收费情况，任何有收费的情况都是骗子</p>
                <br>
                <div class="box"></div>
                <p class="question">4.如何找到你想找到的心理文章？</p>
                <br>
                <p class="answer">如果你是查找类别心理文章，你可以在导航栏点击心理文章选项，在二级菜单再次点击你想查找的心理文章类别，可以看到你需要的心理文章</p>
                <br>
                <div class="box"></div>
                <p class="question">5.如何找到你想找到的视频讲座？</p>
                <br>
                <p class="answer">如果你是查找类别视频讲座，你可以在导航栏点击视频讲座选项，在二级菜单再次点击你想查找视频讲座类别，可以看到你需要的视频讲座</p>
                <br>
                <div class="box"></div>
                <p class="question">6.如何找到你想找到的心理测试？</p>
                <br>
                <p class="answer">如果你是查找类别心理测试，你可以在导航栏点击心理测试选项，在二级菜单再次点击你想查找心理测试类别，可以看到你需要的心理测试</p>
                <br>
                <div class="box"></div>
            </el-col>


            <el-col :span="1" style="height: 90vh">

            </el-col>

        </el-row>


    </div>
</template>

<script>
    export default {
        name: "operation"
    }
</script>

<style scoped>
    .content {
        line-height: 2em;
        /*width: 70vw;*/
        /*height: 80vh;*/
        margin-top: 5vh;
    }
    .img {
        height: 90vh;
        /*background-image: url("../img/11.jpg");*/
      background-image: url("../views/img/11.jpg");
    }
    .answer {
        color: #999999;
        font-size: 13px;
        text-align: left;
    }
    .question {
        text-align: left;font-size: 15px
    }
    .box {
        width: 100%;
        height: 15px;
    }
</style>
