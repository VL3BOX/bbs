import { $cms,$next } from "@jx3box/jx3box-common/js/https";
import axios from 'axios'

function getMyPost(params) {
    return $cms().get("/api/cms/posts/my", {
        params: params,
    });
}

function getPosts(params) {
    let query = {
        type: "bbs",
    };
    if (params) {
        query = Object.assign(query, params);
    }
    return $cms().get("/api/cms/posts", {
        params: query,
    });
}
function getPost(id) {
    return $cms().get(`/api/cms/post/${id}`);
}

function getMyPostCount() {
    return $cms().get("/api/cms/posts/user/my/count");
}
function getLikes(params){
    return $next().get(`/api/summary-any/batch`, {
        params
    })
}

function removeFeedback(id) {
    return $cms().put(`/api/cms/post/${id}/setting`,{
        post_status: "dustbin"
    })
}

export { getPosts, getPost, getMyPostCount, getMyPost, getLikes, removeFeedback };
