<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-text size="large">
                    <h1>学生成绩管理系统</h1>
                </el-text>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                        <el-menu-item index="1">
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>学生管理</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <el-icon><icon-menu /></el-icon>
                            <span>成绩管理</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <el-icon><icon-menu /></el-icon>
                            <span>学生总成绩</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <el-icon><icon-menu /></el-icon>
                            <span>退出登录</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <studentList />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { Menu as IconMenu } from '@element-plus/icons-vue';
import studentList from '@/components/student-list.vue'


const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};

</script>

<style scoped>
.common-layout {
    width: 100%;
    height: 100%;
}

.el-main {
    height: 90vh;
}

.el-menu {
    height: 100%;
}
</style>
