<template>
    <el-row justify="center" align="middle" class="login-container" style="height: 95vh;">
        <el-col :xs="{ span: 8 }" :sm="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 5 }">
            <el-container>
                <el-header>
                    <el-text style="text-align: center;" size="large">
                        <h1>学生成绩管理系统</h1>
                    </el-text>
                </el-header>

                <el-main>
                    <el-form :model="ruleForm" ref="ruleFormRef" :rules="rules">
                        <el-form-item prop="userName">
                            <el-input v-model="ruleForm.userName" :placeholder="ruleForm.resource === '教师'
                                ? '用户名'
                                : '学号'
                                " size="large" />
                        </el-form-item>

                        <el-form-item prop="passWord">
                            <el-input v-model="ruleForm.passWord" placeholder="密码" size="large" type="password"
                                show-password />
                        </el-form-item>

                        <el-row class="row-bg" justify="end">
                            <el-form-item>
                                <el-radio-group v-model="ruleForm.resource">
                                    <el-radio label="教师" />
                                    <el-radio label="学生" />
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <el-row class="row-bg" justify="end">
                            <el-form-item>
                                <el-button type="primary" @click="login">
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </el-main>
            </el-container>

        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { userLogin, studentLogin } from '@/api/api';
import { ElMessage, FormRules, FormInstance } from 'element-plus';
import router from '@/router';

interface RuleForm {
    userName: string;
    passWord: string;
    resource: string;
}

const ruleFormRef = ref<FormInstance>();

// 定义响应式的表单对象
const ruleForm = reactive<RuleForm>({
    userName: '',
    passWord: '',
    resource: '教师',
});

const rules = reactive<FormRules<RuleForm>>({
    userName: [
        { required: true, message: '用户名/学号不能为空', trigger: 'blur' },
        {
            min: 6,
            max: 20,
            message: '用户名长度在6到20个字符之间',
            trigger: 'blur',
        },
    ],

    passWord: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        {
            min: 6,
            max: 20,
            message: '密码长度在6到20个字符之间',
            trigger: 'blur',
        },
    ],
});

// 定义一个函数用于验证表单数据
const validateForm = async () => {
    try {
        if (ruleFormRef.value) {
            // 添加空值检查
            await ruleFormRef.value.validate();
        }
        return true;
    } catch (error) {
        return false;
    }
};

// 定义登录函数
const login = async () => {
    // 验证表单数据
    if (!validateForm()) {
        return;
    }

    // 提取表单数据
    const { userName, passWord } = ruleForm;

    try {
        // 根据选择的资源调用登录 API
        let response;
        if (ruleForm.resource === '教师') {
            response = await userLogin({ userName, passWord });
        } else {
            response = await studentLogin({ userName, passWord });
        }

        // 从响应数据中提取 code 和 message 属性
        const { code, message, data } = response;
        console.log('response:', response);
        console.log('response.data:', response.data);
        console.log(data[0]);

        if (code === '200') {
            // 登录成功
            ElMessage.success('登录成功');
            if (ruleForm.resource === '教师') {
                // 跳转到用户主页
                router.push("/index")
            } else {
                // 其他角色的登录成功逻辑
                router.push('/hello');
            }
        } else {
            // 登录失败
            ElMessage.error(message);
        }
    } catch (error) {
        // 处理网络错误
        ElMessage.error('网络错误，请稍后重试');
    }
};
</script>

<style scoped></style>
