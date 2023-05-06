<!--菜单-->
<template>
    <div class="menu">
        <el-menu
                router
                active-text-color="#409EFF"
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
            <el-menu-item index="/dashboard/psychologicalAssessment">
                <i class="el-icon-star-on"></i>
                <span slot="title">精选</span>
            </el-menu-item>
            <el-menu-item index="/dashboard/emotion" >
                <i class="el-icon-potato-strips"></i>
                <span slot="title">情感</span>
            </el-menu-item>
            <el-menu-item index="/dashboard/character" >
                <i class="el-icon-orange"></i>
                <span slot="title">性格</span>
            </el-menu-item>
            <el-menu-item index="/dashboard/testHealth">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">健康</span>
            </el-menu-item>
            <el-menu-item index="/dashboard/testCareer">
                <i class="el-icon-guide"></i>
                <span slot="title">职场</span>
            </el-menu-item>
            <el-menu-item index="/dashboard/testInterpersonal">
                <i class="el-icon-user"></i>
                <span slot="title">人际</span>
            </el-menu-item>
            <el-menu-item index="/dashboard/testAbility">
                <i class="el-icon-medal"></i>
                <span slot="title">能力</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
      // eslint-disable-next-line vue/multi-word-component-names
        name: "testmenu",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
        }
    }
</script>

<style scoped>
    .menu {
        position: absolute;
        display: inline-block;
    }
</style>
