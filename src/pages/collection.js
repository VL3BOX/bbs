import Vue from "vue";

import ElementUI from "element-ui";
Vue.use(ElementUI);

// 通用UI模块
import JX3BOX_UI from "@jx3box/jx3box-common-ui";
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";
Vue.use(JX3BOX_UI);

Vue.config.productionTip = false;
// 第三方UI组件
// 数据与路由
import router from "@/router/collection.js";
import store from "@/store/index";

import App from "./Collection.vue";

const regex = /\/bbs\/?#\/?(\w+?)\/(\d+)/
location.pathname.match(regex) && (location.href = location.pathname.replace(regex, '/$1/$2'))

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");

