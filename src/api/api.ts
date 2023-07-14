import { axios } from './axios';

const makeRequest = (url: string, method: string) => (data: any) => {
    return axios({
        url,
        data,
        method,
        timeout: 10000,
    });
};

// 用户登录
export const userLogin = makeRequest('/user/login', 'post');
// 学生登录
export const studentLogin = makeRequest('/user/studentLogin', 'post');
// 获取所有学生
export const getStudentList = makeRequest('/student/getAllStudent', 'get');
// 添加学生信息
export const addStudent = makeRequest('/student/addStudent', 'post');
// 修改学生信息
export const updateStudent = makeRequest('/student/updateStudent', 'put');
// export const postData = makeRequest('/data', 'post');
// export const putData = makeRequest('/data', 'put');
export const deleteStudent = makeRequest('/student/deleteStudent', 'delete');
