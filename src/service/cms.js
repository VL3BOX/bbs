import { $cms } from "@jx3box/jx3box-common/js/https";

function getMenu(key) {
    return $cms().get(`/api/cms/config/menu/${key}`);
}

function getAuthorInfo() {

}

// 获取自定义主题
function getTopicBucket(params) {
    return $cms().get(`/api/cms/topic/bucket`, { params });
}

const getConfigBanner = (params) => {
    return $cms().get(`api/cms/config/banner`, {
        params,
    });
}

export { getMenu, getAuthorInfo, getTopicBucket, getConfigBanner };
