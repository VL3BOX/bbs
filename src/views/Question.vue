<template>
    <div class="v-question">
        <Title :detail="detail" type="question" />
        <Setbar />
        <Card :list="list" type="question" />
        <div class="u-submit"><button class="u-btn">提交</button></div>
    </div>
</template>
<script>
import Title from "@/components/exam/title.vue";
import Setbar from "@/components/exam/setbar.vue";
import Card from "@/components/exam/card.vue";
import { getQuestion, submitAnswer } from "@/service/exam.js";
export default {
    name: "Question",
    props: [],
    data: function() {
        return {
            id: 0,
            detail: {},
            list: {},
        };
    },
    computed: {},
    methods: {
        getData() {
            getQuestion(this.id)
                .then((res) => {
                    this.detail = res.data;
                    this.list = [
                        {
                            options: eval(res.data.options),
                            tags: eval(res.data.tags),
                            type: res.data.type,
                        },
                    ];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    mounted: function() {
        this.id = +this.$route.params.id;
        if (this.id !== 0) {
            this.getData();
        }
    },
    created: function() {},
    components: { Title, Setbar, Card },
};
</script>

<style lang="less">
@import "../assets/css/question.less";
</style>
