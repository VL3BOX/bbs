<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="剑三茶馆"
            slug="bbs"
            root="/bbs"
            :publishEnable="false"
            :adminEnable="false"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <img slot="logo" svg-inline :src="getAppIcon('bbs')" />
            <Info />
            <publish-gate slot="op-append" />
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
import publishGate from "@/components/publish_gate.vue";
import {
    getAppIcon,
    getAppType,
    getAppID,
} from "@jx3box/jx3box-common/js/utils";
import { single_types } from "../setting.json";
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
        "publish-gate": publishGate,
        Info,
    },
    created: function () {
        // 小册等类型兼容
        // let type = getAppType();
        // let id = getAppID();
        // if (type && single_types.includes(type)) {
        //     let route = { name: type, params: {} };
        //     if (id) route.params.id = id;
        //     this.$router.push(route);
        // }
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
@media screen and (max-width: @phone) {
    .c-crumb {
        .none;
    }
    .c-breadcrumb {
        .u-op {
            .none;
        }
    }
}
</style>
