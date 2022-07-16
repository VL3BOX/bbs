import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: () => import('@/components/collection/collection_list.vue') },
    { name: "view", path: "/:id?", component: () => import('@/components/collection/collection_single.vue') },
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
