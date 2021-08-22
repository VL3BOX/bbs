<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="茶馆"
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
        <Main :withoutRight="false">
            <single />
            <RightSidebar>
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/single_nav.vue";
import Side from "@/components/single_side.vue";
import single from "@/components/single.vue";
import publishGate from "@/components/publish_gate.vue";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    methods: {},
    components: {
        Nav,
        Side,
        single,
        "publish-gate": publishGate,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
