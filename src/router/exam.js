import Vue from "vue";
import VueRouter from "vue-router";

const Exam = () => import("@/views/Exam.vue");
const Paper = () => import("@/views/Paper.vue");
const Question = () => import("@/views/Question.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Exam },
    { name: "paper", path: "/paper/:id?", component: Paper },
    { name: "question", path: "/question/:id?", component: Question },
];
const router = new VueRouter({
    mode: "history",
    base: "/exam",
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.fullPath.includes("/#")) {
        next(to.fullPath.replace("/#", ""));
    }
    next();
});
export default router;
