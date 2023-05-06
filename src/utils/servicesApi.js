import axios from "axios";

const servicesApi = {
    /**
     * 登录模块
     */
    //判断用户是否存在
    userIsHave(data){
        return axios.post('/api/users/account-have',data)
    },
    //登录
    login(data){
        return axios.post('/api/users/login',data)
    },
    //注册
    register(data){
        return axios.post('/api/users/register',data)
    },
    //忘记密码
    updatePassword(data){
        return axios.post('/api/users/updater-password',data)
    },
    /**
     * 文章模块
     */
    //分页获取文章数据
    getAssayListData(data) {
        return axios.post('/api/assay/getAssayPage',data)
    },
    //获取文章内容
    getAssayData(id) {
        return axios.post('/api/assay/getAssay/' + id)
    },
    //获取文章分类
    getAssayClassify() {
        return axios.post('/api/assay/getClassify')
    },
    //上传文章
    uploadAssay(data){
        return axios({
            url: '/api/assay/put',
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: data
        })
    },
    //判断上传文件在数据库中是否存在
    uploadBefore(data){
        return axios.post('/api/files/uploadBefore',data)
    },
    //上传图片
    uploadImg(data){
        return axios({
            url: '/api/files/uploadImage',
            method: 'post',
            data: data,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
    /**
     * 测试模块
     */
    //分页获取测试数据
    getTestListData(testData){
        return axios.post('/api/quiz/getQuizExam',testData)
    },
    //获取测试题目
    getTestQuestions(quizData){
        return axios.post('/api/quiz/getQuizQuestion',quizData)
    },
    //获取测试结果
    getTestResult(resultData){
        return axios.post('/api/quiz/getQuizResult',resultData)
    },
    /**
     * 视频模块
     */
    //分页获取视频数据
    getVideoListData(searchClass,data){
        return axios.post('/api/video/' + searchClass,data)
    },
    //获取视频
    getVideoData(videoId){
        return axios.post('/api/video/getVideo',videoId)
    },
    //最新最热获取视频
    getVideoListDataByHotOrNew(data){
        return axios.post('/api/video/getVideoByClassName',data)
    },
    //获取视频分类
    getVideoClassify(){
        return axios.post('/api/video/getVideoClass')
    },
    //上传视频
    uploadVideo(video){
        return axios.post('/api/files/uploadVideo',video)
    },
    //视频信息提交
    uploadVideoData(videoData){
        return axios({
            url: '/api/video/uploadVideo',
            method: 'post',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            data: videoData
        })
    },
    /**
     * 用户模块
     */
    //修改用户信息
    updateUserData(data){
        return axios.post('/api/users/updateUserMessage',data)
    },

    //文章删除
    deleteAssay(id){
        return axios.post('/api/assay/deleteAssay/' + id)
    },
    //添加文章分类
    addAssayClassify(data){
        return axios.post('/api/assay/addClassify/' + data)
    },
    //修改文章分类
    updateAssayClassify(data){
        return axios.post('/api/assay/updateClassify',data)
    },
    //删除文章分类
    deleteAssayClassify(id){
        return axios.post('/api/assay/deleteClassify',id)
    },

    //新增测试
    addTest(data){
        return axios.post('/api/quiz/addQuizExam',data)
    },
    //删除测试
    deleteTest(data){
        return axios.post('/api/quiz/deleteQuizExam',data)
    },
    //修改测试
    updateTest(data){
        return axios.post('/api/quiz/updateQuizExam',data)
    },
    //获取测试题目数据
    getTestQuizListData(data){
        return axios.post('/api/quiz/getQuizQuestion',data)
    },
    //新增测试题目
    addTestQuestion(data){
        return axios.post('/api/quiz/addQuizQuestion',data)
    },
    //删除测试题目
    deleteTestQuestion(data){
        return axios.post('/api/quiz/deleteQuizQuestion',data)
    },
    //修改测试题目
    updateTestQuestion(data){
        return axios.post('/api/quiz/updateQuizQuestion',data)
    },
    //获取测试结果数据
    getTestResultData(data){
        return axios.post('/api/quiz/getQuizResult',data)
    },
    //增加测试结果
    addTestResult(data){
        return axios.post('/api/quiz/addQuizResult',data)
    },
    //删除测试结果
    deleteTestResult(data){
        return axios.post('/api/quiz/deleteQuizResult',data)
    },
    //修改测试结果
    updateTestResult(data){
        return axios.post('/api/quiz/updateQuizResult',data)
    },
    //获取测试分类
    getTestClassifyData(){
        return axios.post('/api/quiz/getQuizClass')
    },
    //新增测试分类
    addTestClassifyData(data){
        return axios.post('/api/quiz/addQuizClass',data)
    },
    //删除测试分类
    deleteTestClassifyData(data){
        return axios.post('/api/quiz/deleteQuizClass',data)
    },
    //修改测试分类
    updateTestClassifyData(data){
        return axios.post('/api/quiz/updateQuizClass',data)
    },


    //获取视频数据
    // getVideoListData(formData){
    //     return axios.post('/api/video/getHotVideo',formData)
    // },
    //新增视频信息
    addVideoData(data){
        return axios.post('/api/video/uploadVideo',data)
    },
    //删除视频信息
    deleteVideoData(data){
        return axios.post('/api/video/deleteVideo',data)
    },
    //修改视频信息
    updateVideoData(data){
        return axios.post('/api/video/updateVideo',data)
    },
    //获取视频分类数据（前面已有）
    //新增视频分类数据
    addVideoClassifyData(data){
        return axios.post('/api/video/addVideoClass',data)
    },
    //删除视频分类数据
    deleteVideoClassifyData(data){
        return axios.post('/api/video/deleteVideoClass',data)
    },
    //修改视频分类数据
    updateVideoClassifyData(data){
        return axios.post('/api/video/alterVideoClass',data)
    },

    //获取今日使用人次
    getPassPeople(){
        return axios.get('/api/users/getPassPeople')
    },
    // 获取用户列表
    getUserList(data){
        return axios.post('/api/users/selectByUsernameAndPhoneLike',data)
    },
    //获取所有角色
    getAllRoles(data){
        return axios.post('/api/role/getViaPage',data)
    },
    //改变角色
    changeRole(data){
        return axios.post('/api/users/changeRole',data)
    },
    //删除用户
    deleteUser(data){
        return axios.post('/api/users/deleteById',data)
    },

    //修改角色
    updateRole(data){
        return axios.post('/api/role/updateRole',data)
    },
    //新增角色
    addRole(data){
        return axios.post('/api/role/addRole',data)
    },
    //删除角色
    deleteRole(data){
        return axios.post('/api/role/deleteByRoleName',data)
    },
    //删除绑定权限
    deleteRolePermission(data){
        return axios.post("/api/role/bondDeleteRolePermission",data)
    },
    //删除用户绑定
    deleteRoleUser(data){
        return axios.post("/api/role/bondDeleteUserRole",data)
    },
    //获取后台已有权限数据
    getAllPermission(){
        return axios.get('/api/permission/getAllPermission')
    },
    //修改权限
    changePermission(data){
        return axios.post('/api/role/changePermission',data)
    },
    //新增按钮权限
    addButton(data){
        return axios.post('/api/permission/addButton',data)
    },
    //新增页面权限
    addPermission(data){
        return axios.post('/api/permission/addPermission',data)
    },
    //修改权限
    updatePermission(data){
        return axios.post('/api/permission/alterPermission',data)
    },
    //删除权限
    deletePermission(data){
        return axios.post('/api/permission/deleteByPermissionName', data)
    },
    //获取登录日志
    getLoginLogList(data){
        return axios.post('/api/loginLog/selectByUsernameAndPhoneLike',data)
    },
    //删除登录日志
    deleteLoginLog(data){
        return axios.post('/api/loginLog/deleteById/' + data)
    },
    //获取操作日志
    getOperateLogList(data){
        return axios.post('/api/operateLog/selectByManyLike',data)
    },
    //删除操作日志
    deleteOperateLog(data){
        return axios.post('/api/operateLog/deleteById/' + data)
    },
};
export default servicesApi

