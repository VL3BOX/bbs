<template>
    <div>
        <list_nav v-if="mode == 'list'" class="m-nav" />
        <single_nav v-if="mode == 'single'" />
    </div>
</template>

<script>
import list_nav from "@/components/nav/list_nav.vue";
import single_nav from "@/components/nav/single_nav.vue";
import { single_types } from "../../../setting.json";
import { getAppID, getAppType } from "@/utils/common.js";
export default {
    name: "Nav",
    props: [],
    components: {
        list_nav,
        single_nav,
    },
    data: function () {
        return {
            mode: "",
        };
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {
        let id = getAppID();
        let type = getAppType();
        if (single_types.includes(type) && id) {
            this.mode = "single";
        } else {
            this.mode = "list";
        }
    },
    mounted: function () {},
};
</script>