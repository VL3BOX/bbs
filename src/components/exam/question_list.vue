<template>
    <div class="v-question-list">
        <!-- 表格 -->
        <el-table class="m-list" :data="data" style="width: 100%" @sort-change="handleSort" @row-click="takeQuestion">
            <el-table-column prop="id" label="编号" width="60"></el-table-column>
            <el-table-column prop="title" label="标题">
                <!-- <template slot-scope="scope">
          <span class="c-question-list-title">{{
            filteredTitle(scope.row.title)
          }}</span>
        </template> -->
            </el-table-column>
            <el-table-column prop="tags" label="标签" width="180">
                <template slot-scope="scope">
                    <el-tag class="tag" v-for="tag of JSON.parse(scope.row.tags).slice(0, 3)" :key="tag" size="small">{{ tag }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="hardStar" label="难度" width="120">
                <template slot-scope="scope">
                    <el-rate v-model="scope.row.hardStar" disabled text-color="#ff9900"></el-rate>
                </template>
            </el-table-column>
            <el-table-column prop="author" label="出题人" width="180">
                <template slot-scope="scope">
                    {{ scope.row.createUser }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary">去答题</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 翻页 -->
    </div>
</template>
<script>
export default {
    name: "QuestionList",
    props: ["data"],
    components: {},
    data: function() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {
        handleEdit() {},
        takeQuestion(row, column, event) {
            console.log(row.id);
            let id = row.id;
            this.$router.push({
                name: "question",
                params: { id: id },
            });
        },
        handleSort({ prop, order }) {
            // 后端排序
            if (order) {
                this.orderBy = prop.replace("attributes.", "");
                this.order = order === "ascending" ? 1 : 0;
            } else {
                this.orderBy = undefined;
                this.order = undefined;
            }
        },
    },
    filters: {
        // filteredTitle() {
        //   return (title) => {
        //     let reg = /<[^<>]+>/g;
        //     title = title.replace(reg, ""); //替换HTML标签
        //     title = title.replace(/&nbsp;/gi, ""); //替换HTML空格
        //     return title;
        //   };
        // },
    },
    created: function() {},
    mounted: function() {},
};
</script>

<style lang="less">
@import "../../assets/css/question.less";
</style>
