import { $cms,$next } from "@jx3box/jx3box-common/js/https";

// 获取 joke 列表
const getJokes = (params) => {
    let _params = Object.assign(params, { type: "joke" });

    return $cms().get("/api/cms/posts", {
        params: _params,
    });
};

// 获取推荐骚话
function getRecommendedJokes() {
    return $next({ mute: true }).get(`/api/joke/recommended`);
}

// 获取指定骚话
function getJoke(id) {
    return $cms().get(`/api/cms/post/${id}`);
}

// 标星
const setJokeMark = ({ id, data }) => {
    return $cms().put(`/api/cms/post/${id}/setting`, data);
};

// 删除
const removeJoke = (id) => {
    return $cms().put(`/api/cms/post/${id}/setting`, {
        post_status: "dustbin",
    });
};

export { getJokes, getJoke, setJokeMark, removeJoke, getRecommendedJokes };
