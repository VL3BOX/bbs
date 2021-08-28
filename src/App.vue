<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="茶馆交流"
            slug="bbs"
            root="/bbs"
            :publishEnable="false"
            :adminEnable="true"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/post.svg" />
            <publish-gate slot="op-append" />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                <router-view />
            </div>
            <RightSidebar>
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/list_nav.vue";
import Side from "@/components/list_side.vue";
import publishGate from "@/components/publish_gate.vue";

export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {},
    components: {
        Nav,
        Side,
        "publish-gate": publishGate,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
