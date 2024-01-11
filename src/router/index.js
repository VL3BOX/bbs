/*
 * @Author: iRuxu
 * @Date: 2022-07-17 01:25:16
 * @LastEditTime: 2022-07-17 20:06:34
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
const Single = () => import("../views/Single.vue");
const Collection = () => import("../views/Collection.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", redirect: { name: 'bbs' }, component: Forum },
    { name: "bbs", path: "/bbs", component: Forum },
    { name: "single", path: "/bbs/:id", component: Single },
    { name: "namespace", path: "/namespace", component: Namespace },
    { name: "joke", path: "/joke/:id?", component: Joke },
    { name: "emotion", path: "/emotion/:id?", component: Emotion },
    { name: "collection", path: "/collection", component: Collection },
    { name: "collection-single", path: "/collection/:id", component: () => import('@/components/collection/collection_single.vue') },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
