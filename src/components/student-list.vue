<template>
    <div>
        <el-button type="primary" @click="dialogAddVisible = true">
            新增学生信息
        </el-button>

        <el-table :data="studentTableData" style="width: 100%" max-height="680">
            <el-table-column label="学号" prop="studentNo" />
            <el-table-column label="姓名" prop="studentName" />
            <el-table-column label="性别" prop="studentSex" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="large" placeholder="Type to search" @keyup.enter="fetchData" />
                </template>
                <template #default="scope">
                    <el-button type="primary" @click="handleSelect(scope.row)">
                        查看
                    </el-button>
                    <el-button type="success" @click="handleEdit(scope.row)">
                        修改
                    </el-button>
                    <el-button type="danger" @click="handleDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination background layout="prev,sizes, pager, next" :total="total" :page-size="pageSize"
                :page-sizes="[10, 20, 30]" @update:current-page="handlePageChange" @update:page-size="handleSizeChange" />
        </div>
        <!-- 新增学生信息对话框 -->
        <el-dialog v-model="dialogAddVisible" title="新增学生信息" width="500px" center>
            <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
                <el-form-item label="学号:" prop="studentNo">
                    <el-input v-model="ruleForm.studentNo"></el-input>
                </el-form-item>
                <el-form-item label="姓名:" prop="studentName">
                    <el-input v-model="ruleForm.studentName"></el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="studentSex">
                    <el-radio-group v-model="ruleForm.studentSex">
                        <el-radio label="男" />
                        <el-radio label="女" />
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogAddVisible = false">
                        取消
                    </el-button>
                    <el-button type="primary" @click="handleAdd">
                        新增
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 编辑学生信息对话框 -->
        <el-dialog v-model="dialogEditVisible" title="编辑学生信息" width="500px" center>
            <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
                <el-form-item label="学号:" prop="studentNo">
                    <el-input v-model="ruleForm.studentNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名:" prop="studentName">
                    <el-input v-model="ruleForm.studentName"></el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="studentSex">
                    <el-radio-group v-model="ruleForm.studentSex">
                        <el-radio label="男" />
                        <el-radio label="女" />
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogEditVisible = false">
                        取消
                    </el-button>
                    <el-button type="primary" @click="handleUpdate">
                        保存
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import {
    getStudentList,
    addStudent,
    updateStudent,
    deleteStudent,
} from '@/api/api';
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus';

const search = ref('');
const studentTableData = ref<Student[]>([]);
const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);
const dialogAddVisible = ref(false);
const dialogEditVisible = ref(false);

interface Student {
    studentNo: string;
    studentName: string;
    studentSex: string;
}
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive(<Student>{
    studentNo: '',
    studentName: '',
    studentSex: '',
});
const rules = reactive<FormRules<Student>>({
    studentNo: [{ required: true, message: '请输入学号', trigger: 'blur' }],
    studentName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    studentSex: [{ required: true, message: '请输入性别', trigger: 'change' }],
});

// 获取学生数据
const fetchData = async () => {
    const response = await getStudentList({
        studentName: search.value,
        limit: pageSize.value,
        page: currentPage.value,
    });
    const data = response;
    studentTableData.value = data.data;
    total.value = data.count;
};

// 更新当前页数数据
const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchData();
};

// 更新每页显示多少条数据
const handleSizeChange = (size: number) => {
    pageSize.value = size;
    fetchData();
};
// 查看学生信息
const handleSelect = (row: Student) => {
    ElMessageBox.alert(
        `学号：${row.studentNo}，姓名：${row.studentName}，性别：${row.studentSex}`,
        '学生信息',
        {
            confirmButtonText: '确定',
            type: 'info',
            showClose: false,
        }
    );
};
// 新增学生信息
const handleAdd = async () => {
    try {
        const isValid = await (ruleFormRef.value as any).validate();
        if (isValid) {
            await addStudent(ruleForm);
            ElMessage.success('新增成功');
            fetchData();
            dialogAddVisible.value = false;
        }
    } catch (error) {
        ElMessage.error('新增失败');
    }
};
// 打开编辑学生信息对话框
const handleEdit = (row: Student) => {
    ruleForm.studentNo = row.studentNo;
    ruleForm.studentName = row.studentName;
    ruleForm.studentSex = row.studentSex;
    dialogEditVisible.value = true;
    console.log(row);
};
// 编辑学生信息
const handleUpdate = async () => {
    try {
        const isValid = await (ruleFormRef.value as any).validate();
        if (isValid) {
            await updateStudent(ruleForm);
            ElMessage.success('修改成功');
            fetchData();
            dialogEditVisible.value = false;
        }
    } catch (error) {
        ElMessage.error('修改失败');
    }
};

// 删除学生信息
const handleDelete = (row: Student) => {
    ElMessageBox.confirm('确定要删除该学生信息吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            await deleteStudent({ studentNo: row.studentNo });
            ElMessage({
                type: 'success',
                message: '删除成功',
            });
            fetchData();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除取消',
            });
        });
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped>
.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
</style>
