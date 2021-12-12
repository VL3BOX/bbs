import { $cms } from "@jx3box/jx3box-common/js/https";

// 发布
function postEmotion(data) {
    return $cms().post(`/api/cms/post/emotion`, data);
}

// 获取 emotion 列表
const getEmotions = (params) => {
    return $cms().get("/api/cms/post/emotions", {
        params: params,
    });
};

// 获取指定骚话
function getEmotion(id) {
    return $cms().get(`/api/cms/post/emotion/${id}`);
}

// 标星
const starEmotion = (id) => {
    return $cms().put(`/api/cms/post/emotion/${id}/star`);
};
// 取消标星
function unstarEmotion(id){
    return $cms().put(`/api/cms/post/emotion/${id}/unstar`);
}

// 删除
const removeEmotion = (id) => {
    return $cms().delete(`/api/cms/post/emotion/${id}`);
};

// 通用 - 上传文件
function uploadEmotion(formdata) {
    return $cms().post(`/api/cms/upload`, formdata);
}

export { getEmotions, getEmotion, starEmotion, removeEmotion, postEmotion ,unstarEmotion, uploadEmotion};
