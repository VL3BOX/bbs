<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="剑三考试" slug="exam" :publishEnable="true" :adminEnable="false" :feedbackEnable="true" :crumbEnable="false">
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                <keep-alive include="Exam">
                    <router-view />
                </keep-alive>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/nav/Nav.vue";
// import publishGate from "@/components/publish_gate.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {
        getAppIcon,
    },
    components: {
        Nav,
        // "publish-gate": publishGate,
        Info,
    },
    created: function () {},
};
</script>

<style lang="less">
    @import "~@/assets/css/app.less";
</style>
