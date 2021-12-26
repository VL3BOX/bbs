<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="茶馆交流" slug="bbs" root="/bbs" :publishEnable="false" :adminEnable="true" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline :src="getAppIcon('bbs')" />
            <publish-gate slot="op-append" />
        </Breadcrumb>
        <LeftSidebar>
            <Nav :id="id" class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <single :id="id" />
            <RightSidebar>
                <Side :id="id" class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/nav/single_nav.vue";
import Side from "@/components/bbs/single_side.vue";
import single from "@/components/bbs/single.vue";
import publishGate from "@/components/publish_gate.vue";
import { getAppIcon,getAppID } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function() {
        return {
            id : getAppID()
        };
    },
    methods: { getAppIcon },
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
