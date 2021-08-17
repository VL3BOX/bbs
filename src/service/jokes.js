import { $cms } from "@jx3box/jx3box-common/js/https";

// 获取 joke 列表
const getJokes = (params) => {
    let _params = Object.assign(params, { type: "joke" });

    return $cms().get("/api/cms/posts", {
        params: _params,
    });
};

// 获取指定joke
function getJoke(id) {
    return $cms().get(`/api/cms/post/${id}`);
};

const setJokeMark = ({ id, data}) => {
    return $cms().put(`/api/cms/post/${id}/setting`, data)
};

const removeJoke = (id) => {
    return $cms().put(`/api/cms/post/${id}/setting`,{
        post_status: "dustbin"
    })
}

// 获取作者用户信息
const getAuthorInfo = (id) => {
    return $cms().get(`/api/cms/user/${id}/info`)
}

export { getJokes, getJoke, setJokeMark, removeJoke, getAuthorInfo };
