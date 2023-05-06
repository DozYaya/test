import axios from "axios";

const assayAPI = {
    //分页获取文章数据、
    getData(data) {
        return axios.post('/api/assay/getAssayPage',data)
    }
};
export default assayAPI
