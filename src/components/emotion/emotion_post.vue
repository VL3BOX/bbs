<template>
    <div class="m-emotion-publish">
        <div class="u-title">
            <i class="el-icon-upload"></i>快速发布
        </div>
        <div class="m-emotion-upload">
            <div v-if="data && data.url" class="u-emotion">
                <img :src="data.url" />
                <i class="u-emotion-mask"></i>
                <i class="u-emotion-delete el-icon-delete" title="移除" @click="handleRemove"></i>
            </div>
            <div v-else class="u-upload el-upload el-upload--picture-card" @click="select">
                <i class="el-icon-plus"></i>
            </div>
            <input class="u-upload-input" type="file" @change="upload" ref="uploadInput" />
        </div>
        <div class="u-emotion-form">
            <el-input
                v-model="data.desc"
                type="textarea"
                :rows="4"
                :maxlength="120"
                show-word-limit
                placeholder="快速发布一张表情，再配句骚话？"
            ></el-input>
            <!-- 按钮 -->
            <div class="u-extend">
                <div class="u-extend-form">    
                    <el-switch
                        class="u-original"
                        v-model.number="data.original"
                        inactive-text="原创"
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                    <el-input
                        class="u-author"
                        v-model="data.author"
                        placeholder="（非必填）"
                        v-if="!data.original"
                        size="mini"
                    >
                        <span slot="prepend">原作者</span>
                    </el-input>
                    <el-select v-model="data.type" size="mini" style="margin-left: 10px;" placeholder="选择门派（非必选）">
                        <el-option v-for="(school,i) in schoolmap" :key="i" :value="i" :label="school">
                            <div style="display: flex;align-items: center;">
                                <img class="u-icon" style="margin-right: 20px" width="24" height="24" :src="i | showSchoolIcon" :alt="school" />
                                {{school}}
                            </div>
                        </el-option>
                    </el-select>
                </div>
                <el-button
                class="u-action-btn"
                    type="primary"
                    @click="post"
                    :disabled="loading"
                    icon="el-icon-s-promotion"
                    size="mini"
                    >提交</el-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import { uploadEmotion, postEmotion } from "@/service/emotion";
import schoolmap from "@jx3box/jx3box-data/data/xf/schoolid.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "emotion_post",
    data() {
        return {
            data: {
                url: "",
                desc: "",
                original: 0,
                author: "",
                type: ''
            },
            loading: false,
            schoolmap,
        };
    },
    computed: {
        fileInput: function () {
            return this.$refs.uploadInput;
        },
         isLogin: function () {
            return User.isLogin();
        },
    },
    methods: {
        select: function () {
            this.fileInput.dispatchEvent(new MouseEvent("click"));
        },
        upload: function () {
            let formdata = new FormData();
            formdata.append("file", this.fileInput.files[0]);
            console.log(this.fileInput.files[0]);
            uploadEmotion(formdata).then((res) => {
                this.data.url = res.data.data[0];
                this.data.desc = this.fileInput.files[0]?.name || "无描述";
                this.$message({
                    message: "上传成功",
                    type: "success",
                });
            });
        },
        handleRemove() {
            this.data.url = "";
            this.data.desc = "";
        },
        post: function () {
            if (!this.isLogin) {
                User.toLogin();
            } else {
                this.loading = true;
                postEmotion(this.data)
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "表情发布成功",
                        });
                        this.fileInput.value = "";
    
                        this.data = this.$options.data().data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
    },
    filters: {
        showSchoolIcon: function (val) {
            return __imgPath + "image/school/" + val + ".png";
        },
    }
};
</script>

<style lang="less" scoped>
.m-emotion-publish {
    display: flex;

    .u-emotion-form {
        margin-left: 20px;
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .m-publish-buttons {
            margin-top: 10px;
        }

        .u-emotion-desc {
            margin-bottom: 10px;
        }
    }
}
.m-emotion-upload {
    .u-emotion {
        .pr;
        .size(148px);

        img {
            .size(100%);
            .y(bottom);
        }

        .u-emotion-mask {
            .none;
            .pa;
            .lt(0);
            .size(100%);
            background-color: rgba(0, 0, 0, 0.6);
        }

        .u-emotion-delete {
            .pa;
            .lt(50%);
            .size(24px);
            .fz(24px);
            padding: 40px;
            transform: translate(-50%, -50%);
            color: #fff;
            .pointer;
            .none;
        }

        &:hover {
            .u-emotion-mask,
            .u-emotion-delete {
                .db;
            }
        }
    }

    .u-upload-input {
        .none;
    }
}
</style>