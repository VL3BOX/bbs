import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/" },
    { name: "view", path: "/:id?" },
];

const router = new VueRouter({
    routes,
    base: '/collection',
    mode: 'history'
});

// router.beforeEach((to, from, next) => {
//     if (to.fullPath.includes('/#')) {
//         next(to.fullPath.replace('/#', ''));
//     }
//     next()
// });

export default router;
