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
            <!--<div>-->
            <!--    <span>原创</span>-->
            <!--    <el-switch v-model.number="data.original" :active-value="1" :inactive-value="0"></el-switch>-->
            <!--</div>-->
            <!-- 按钮 -->
            <div class="m-publish-buttons">
                <el-button
                    type="primary"
                    @click="post"
                    :disabled="loading"
                    icon="el-icon-s-promotion"
                >提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { uploadEmotion, postEmotion } from "@/service/emotion";
export default {
    name: "emotion_post",
    props: ["type"],
    data() {
        return {
            data: {
                url: "",
                desc: "",
                original: 0,
                author: "",
            },
            loading: false,
        };
    },
    computed: {
        fileInput: function () {
            return this.$refs.uploadInput;
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
            this.loading = true;
            postEmotion({
                ...this.data,
                type: this.type === "all" ? "" : this.type,
            })
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
        },
    },
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