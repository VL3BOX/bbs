<template>
    <div class="v-paper">
        <Title :detail="detail" type="paper" />
        <Setbar class="u-setbar" />
        <Card :list="list" type="paper" />
        <div class="u-submit">
            <button class="u-btn" @click="submit">提交</button>
        </div>
        <template v-if="mode == 'list'"><paper-list /></template>
        <template v-else><paper-single /></template>
    </div>
</template>

<script>
import Title from "@/components/exam/title.vue";
import Setbar from "@/components/exam/setbar.vue";
import Card from "@/components/exam/card.vue";
import { getPaper, submitAnswer } from "@/service/exam.js";
export default {
    name: "Paper",
    props: [],
    data: function() {
        return {
            id: 0,
            detail: '',
            list: [],
            answers: {},
            isFinished: false,
        };
    },
    computed: {
        mode : function (){
            return this.$route.params.id ? 'single' : 'list'
        }
    },
    methods: {
        getData() {
            getPaper(this.id)
                .then((res) => {
                    let _list = res?.data?.questionDetailList;
                    _list.forEach((item, i) => {
                        item.tags = JSON.parse(item.tags);
                        item.options = JSON.parse(item.options);
                    });
                    this.list = _list
                    this.detail = res?.data
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        submit(force = false) {
            let data = this.answers;
            let arr = Object.keys(data);
            console.log(data, typeof data, arr.length);
            if (arr.length < 1) {
                this.$alert("不能交白卷哦~", "提交失败", {
                    type: "error",
                });
            } else {
                submitAnswer(this.examid, data, force).then((res) => {
                    console.log(res.data, "submitAnswer");
                });
            }
        },
    },

    created: function() {},
    mounted: function() {
        this.id = +this.$route.params.id;
        if (this.id !== 0) {
            this.getData();
        }
    },
    components: { Title, Setbar, Card },
};
</script>

<style lang="less"></style>
