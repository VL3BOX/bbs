<template>
    <div class="v-paper">
        <template v-if="mode == 'list'">
            <PaperList :data="data" />
        </template>
        <template v-else>
            <PaperSingle />
        </template>
    </div>
</template>
<script>
import PaperList from "@/components/exam/paper_list.vue";
import PaperSingle from "@/components/exam/paper_single.vue";
import { getExamPaperList } from "@/service/exam.js";
export default {
    name: "Paper",
    props: [],
    components: { PaperList, PaperSingle },
    data: function() {
        return {
            data: [],
            params: { pageIndex: 1 },
        };
    },
    computed: {
        mode: function() {
            return this.$route.params.id ? "single" : "list";
        },
    },
    methods: {
        getListData() {
            getExamPaperList(this.params).then((res) => {
                this.data = res.data.data || {};
            });
        },
    },
    created: function() {
        if (this.mode == "list") this.getListData();
    },
    mounted: function() {},
    filters: {},
    watch: {},
};
</script>

<style lang="less">
@import "../assets/css/exam/paper.less";
</style>
