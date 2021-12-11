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
import { getAppIcon, getAppType } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {
        getAppIcon,
        getAppId: function () {
            let arr = location.href.replace('#','/').split("/");
            let id = 0;
            for (let i = arr.length - 1; i > -1; i--) {
                if(arr[i]){
                    id = arr[i]
                    break;
                }
            }
            return id
        },
    },
    components: {
        Nav,
        "publish-gate": publishGate,
        Info,
    },
    created: function () {
        let type = getAppType();
        let id = this.getAppId()
        if (type && type != "bbs") {
            this.$router.push({
                name: type,
                params: {
                    id: id,
                },
            });
        }
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
