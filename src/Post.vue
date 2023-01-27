<template>
    <div id="app" class="p-bbs p-bbs-single">
        <Header></Header>
        <Breadcrumb name="茶馆交流" slug="bbs" :publishEnable="false" :adminEnable="true" :feedbackEnable="true" :crumbEnable="true">
            <publish-gate slot="op-append" />
        </Breadcrumb>
        <LeftSidebar :uid="user_id">
            <Nav :id="id" />
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
    computed: {
        user_id: function () {
            return this.$store.state.user_id;
        },
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
