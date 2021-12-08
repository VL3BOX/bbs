import Vue from "vue";
import VueRouter from "vue-router";

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const Index = () => import("../views/Index.vue");
const Namespace = () => import("../views/Namespace.vue");
const Joke = () => import("../views/Joke.vue");
const Emotion = () => import("../views/Emotion.vue");
const Forum = () => import("../views/Forum.vue");
const Notice = () => import("../views/Notice.vue");
const Feedback = () => import("../views/Feedback.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "forum", path: "/forum/:subtype?", component: Forum },
    { name: "feedback", path: "/feedback/:id?", component: Feedback },
    { name: "namespace", path: "/namespace", component: Namespace },
    { name: "joke", path: "/joke/:id?", component: Joke },
    { name: "emotion", path: "/emotion/:id?", component: Emotion },
    { name: "notice", path: "/notice", component: Notice },
];

const router = new VueRouter({
    routes,
});

export default router;
