import { $cms } from "@jx3box/jx3box-common/js/https";

// 获取表情列表
const getEmotions = (params) => {
    return $cms().get(`/api/cms/post/emotions`, {
        params
    })
}

export {
    getEmotions
}
