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
            :crumbEnable="true"
        >
            <img slot="logo" svg-inline :src="getAppIcon('bbs')" />
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
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    methods: {getAppIcon},
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
@media screen and (max-width: @phone) {
    .c-crumb {
        .none;
    }
}
</style>
