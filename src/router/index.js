/*
 * @Author: iRuxu
 * @Date: 2022-07-17 01:25:16
 * @LastEditTime: 2022-07-17 19:58:24
 * @Description:
 */
import Vue from "vue";
import VueRouter from "vue-router";

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

// const Index = () => import("../views/Index.vue");
const Namespace = () => import("../views/Namespace.vue");
const Joke = () => import("../views/Joke.vue");
const Emotion = () => import("../views/Emotion.vue");
const Forum = () => import("../views/Forum.vue");

Vue.use(VueRouter);

const routes = [
    {
        name: "root",
        path: "/",
        redirect: (to) => {
            return { path: "/bbs" };
        },
    },
    // { name: "index", path: "/index", component: Forum },
    { name: "bbs", path: "/bbs/:subtype?", component: Forum },
    { name: "namespace", path: "/namespace", component: Namespace },
    { name: "joke", path: "/joke/:id?", component: Joke },
    { name: "emotion", path: "/emotion/:id?", component: Emotion },
    // { name: "feedback", path: "/feedback/:id?", component: Feedback },
    // { name: "collection", path: "/collection/:id?", component: Collection },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
