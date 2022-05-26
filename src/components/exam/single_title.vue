<template>
    <div class="v-single-title" v-if="item">
        <div class="m-title">
            <div class="u-title" v-if="isPaper">{{ title }}</div>
            <div class="u-info">
                <div class="u-info-subblock u-tags">
                    <span>标签：</span>
                    <el-tag class="u-tag" v-for="tag in item.tags" :key="tag" size="small">
                        {{ tag }}
                    </el-tag>
                </div>
                <div class="u-info-subblock u-star">
                    <span>难度：</span>
                    <el-rate v-model="item.hardStar" disabled text-color="#ff9900"></el-rate>
                </div>

                <div class="u-info-subblock u-author">
                    <span>出卷人：</span><a :href="item.createUserId | authorLink" target="_blank">{{ item.createUser }}</a>
                </div>

                <div class="u-info-subblock u-views">
                    考生数：<span>{{ views }}</span>
                </div>

                <div class="u-info-subblock u-time">
                    贡献时间：<span>{{showTime(item.createTime)}}</span>
                </div>
            </div>
            <div class="u-desc" v-if="item.questionList">
                <span>计分：</span><b>共{{ item.questionDetailList.length }}题，每题{{ number }}分，满分100分。</b>
            </div>
            <div class="u-desc" v-if="item.desc">简介：{{ desc || '-' }}</div>
        </div>
        <div class="m-setBar" v-if="canManage">
            <a class="u-edit" :href="editLink(type, item.id)"><i class="el-icon-edit"></i><span>编辑</span></a>
        </div>
        <div class="m-score" v-if="score && score !== -1">
            <div class="u-label">试卷成绩</div>
            <div class="u-score">{{ score }}</div>
        </div>
    </div>
</template>
<script>
import { publishLink, authorLink, editLink } from "@jx3box/jx3box-common/js/utils";
import { getStat, checkPaper } from "@/service/exam.js";
import User from "@jx3box/jx3box-common/js/user";
import {showTime} from '@jx3box/jx3box-common/js/moment'
export default {
    name: "Title",
    props: ["item", "score", "type"],
    components: {},
    data: function() {
        return {
            collected: false,
            views: -1,
        };
    },
    computed: {
        isPaper : function (){
            return this.type == 'paper'
        },
        id: function() {
            return this.$route.params.id;
        },
        title: function() {
            if (this.type == "paper") return "《" + this.item.title + "》";
            return this.item.title;
        },
        desc: function() {
            return this.item.desc || "作者很懒，没有备注";
        },

        sharingTitle: function() {
            if (this.type == "paper") return "试卷";
            return "问题";
        },
        number: function() {
            return Math.floor(100 / this.item.questionIdList.length);
        },
        canManage: function() {
            return User.isEditor() || User.getInfo().uid == this.item.createUserId;
        },
    },
    watch: {},
    methods: {
        check: function(action) {
            if (action == "delete") {
                this.$alert("确定删除吗？", "消息", {
                    confirmButtonText: "确定",
                    callback: (pop) => {
                        if (pop == "confirm") {
                            checkPaper(this.id, action).then((res) => {
                                this.$message({
                                    message: res.data.msg || "操作成功",
                                    type: "success",
                                });
                                location.reload();
                            });
                        }
                    },
                });
            } else {
                checkPaper(this.id, action).then((res) => {
                    this.$message({
                        message: res.data.msg || "操作成功",
                        type: "success",
                    });
                    location.reload();
                });
            }
        },
        editLink,
        showTime : function (val){
            return showTime(new Date(val*1000))
        }
    },
    filters: {
        authorLink,
        publishLink,
    },
    created: function() {
		getStat(this.type, this.id).then((res) => {
            this.views = res.data?.views;
        });
	},
    mounted: function() {

    },
};
</script>

<style lang="less">
@import "~@/assets/css/exam/single_title.less";
</style>
