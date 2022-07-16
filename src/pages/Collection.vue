<!--
 * @Author: iRuxu
 * @Date: 2022-05-05 01:50:16
 * @LastEditTime: 2022-07-16 23:49:24
 * @Description:
-->
<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="剑三小册" slug="exam" :publishEnable="true" :adminEnable="false" :feedbackEnable="true" :crumbEnable="false">
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                <router-view />
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/nav/Nav.vue";
export default {
    name: "Collection",
    props: [],
    components: {
        Nav,
        Info
    },
    data: function() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function() {
        const regex = /\/bbs\/?#\/?(\w+?)\/(\d+)/
        location.pathname.match(regex) && (location.href = location.pathname.replace(regex, '/$1/$2'))
    },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
@import '~@/assets/css/collection/collection.less';
</style>
