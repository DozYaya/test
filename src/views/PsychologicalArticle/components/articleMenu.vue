<template>
    <div>
        <el-menu :default-active="$route.path"
                 router
                 background-color="#fafafa"
                 active-text-color="#6639e4"
                 mode="horizontal">
            <el-menu-item index="/dashboard/psychologicalArticle">最新热文</el-menu-item>
            <el-menu-item index="/dashboard/psychologyScience">心理科普</el-menu-item>
            <el-menu-item index="/dashboard/humanRelations">人际社交</el-menu-item>
            <el-menu-item index="/dashboard/marriage">婚恋关系</el-menu-item>
            <el-menu-item index="/dashboard/growthLearning">成长学习</el-menu-item>
            <el-menu-item index="/dashboard/selfHealth">自我健康</el-menu-item>
            <el-menu-item index="/dashboard/careerSkills">职场技能</el-menu-item>
            <el-menu-item index="/dashboard/sexPsychology">性心理</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "article_menu"
    }
</script>

<style scoped>

</style>
