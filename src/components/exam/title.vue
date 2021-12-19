<template>
    <div class="v-exam-title" :class="type" v-if="detail">
        <div class="u-title">{{ item.title }}</div>
        <div class="u-info">
            <div class="u-tags">
                <span>试卷标签：</span
                ><el-tag class="u-tag" v-for="tag in item.tags" :key="tag" size="small">
                    {{ tag }}
                </el-tag>
            </div>
            <div class="u-star">
                <span>题目难度：</span>
                <el-rate v-model="item.hardStar" disabled text-color="#ff9900"></el-rate>
            </div>

            <div>
                <span>提交：</span><a href="http://">{{ item.createUser }}</a>
            </div>
        </div>
        <div class="u-desc"><span>总共题数：</span><b>共10题，每题10分，满分100分。</b></div>
        <div class="u-desc">
            <span>PS：</span><b>{{ item.desc }}</b>
        </div>
    </div>
</template>
<script>
export default {
    name: "Title",
    props: ["detail", "type"],
    data: function() {
        return {};
    },
    computed: {
        paper: function() {
            if (this.type == "paper") return true;
            return false;
        },
        item: function() {
            let data = this.detail;
            if (this.type == "paper") {
                data.title = "《" + data.title + "》";
            }
            data.tags = eval(data.tags);
            return data;
        },
    },
    methods: {},
};
</script>

<style lang="less">
@import "../../assets/css/exam.less";
</style>
