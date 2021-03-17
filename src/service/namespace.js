import axios from "axios";
import qs from "qs";
import { __helperUrl } from "@jx3box/jx3box-common/data/jx3box.json";
// import namespacelist from '../mock/namespace_list.json'
import Vue from "vue";
import { Message, Notification } from "element-ui";
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
const broadcast = new Vue();

//构建本地请求实例
const $helper = axios.create({
    baseURL: __helperUrl,
});
const $_helper = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __helperUrl : "/",
});

// 设置拦截器
function installInterceptors(target) {
    target["interceptors"]["response"].use(
        function(response) {
            if (response.data.code == 200) {
                return response;
            } else {
                broadcast.$message.error(`[${err.code}]${err.message}`);
            }
        },
        function(err) {
            broadcast.$message.error("网络请求异常");
            console.log(err);
            return Promise.reject(err);
        }
    );
}

// 安装拦截器
installInterceptors($helper);
installInterceptors($_helper);

// 获取公开命名空间列表
function getNamespaceList(params) {
    // return new Promise((resolve, reject) => {
    //   resolve(namespacelist)
    //   // reject(new Error('404--'))
    // })
    return $helper.get("/api/namespaces", {
        params,
        // paramsSerialize: function(params) {
        //     return qs.stringify(params, {
        //         arrayFormat: "indices",
        //     });
        // },
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

export { getNamespaceList };
