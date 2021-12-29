import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/" },
    { name: "view", path: "/view/:id?" },
];

const router = new VueRouter({
    routes,
});

export default router;
