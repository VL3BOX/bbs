Vue.config.productionTip = false;

// 第三方UI组件
import Vue from "vue";
// 数据与路由
import router from "@/router/collection.js";

import App from "./Collection.vue";
new Vue({
    router,
    render: h => h(App),
}).$mount("#app");

