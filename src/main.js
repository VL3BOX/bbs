try {
    let [subtype,id] = location.hash.slice(2)?.split("/");
    const oldSubtypes = ["collection", "emotion", "joke"];
    if (oldSubtypes.includes(subtype)) {
        location.href = location.origin + "/" + subtype + '/' + id;
    }
} catch (e) {
    console.log('旧地址匹配异常',e);
}

Vue.config.productionTip = false;

// 第三方UI组件
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);

import VueI18n from "vue-i18n";
Vue.use(VueI18n);
import i18n from "@jx3box/jx3box-common/i18n";

import hevueImgPreview from "hevue-img-preview";
Vue.use(hevueImgPreview);

import reporter from "@jx3box/jx3box-common/js/reporter";
reporter.install(Vue);

// import waterfall from "vue-waterfall2";
// Vue.use(waterfall)

// 通用UI模块
import JX3BOX_UI from "@jx3box/jx3box-common-ui";
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";
Vue.use(JX3BOX_UI);

// 数据与路由
import router from "./router";
import store from "./store";

import App from "./App.vue";

new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
