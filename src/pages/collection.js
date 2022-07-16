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

import App from "./Collection.vue";
new Vue({
    router,
    render: h => h(App),
}).$mount("#app");

