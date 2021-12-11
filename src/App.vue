<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="剑三茶馆"
            slug="bbs"
            root="/bbs"
            :publishEnable="false"
            :adminEnable="true"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <img slot="logo" svg-inline :src="getAppIcon('bbs')" />
            <Info />
            <publish-gate slot="op-append" />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
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
import Nav from "@/components/list_nav.vue";
import publishGate from "@/components/publish_gate.vue";
import {getAppIcon} from '@jx3box/jx3box-common/js/utils'
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {getAppIcon},
    components: {
        Nav,
        "publish-gate": publishGate,
        Info
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
@media screen and (max-width: @phone) {
    .c-crumb{
        .none;
    }
    .c-breadcrumb{
        .u-op{
            .none;
        }
    }
}
</style>
