<template>
    <div class="v-joke">
        <el-alert title="即将登陆，敬请期待" type="warning" show-icon>
        </el-alert>
    </div>
</template>

<script>
import { __imgPath } from '@jx3box/jx3box-common/data/jx3box.json'
import emotion from '@/assets/data/emotion.json'
export default {
    name: "Joke",
    props: [],
    data: function() {
        return {
            sortedEmotions: []
        };
    },
    computed: {},
    methods: {
        // 表情排序
        sortEmotion() {
            const keys = Object.keys(emotion)
            keys.sort((item1, item2) => {
                return item1.localeCompare(item2)
            })
            keys.forEach(key => {
                const obj = {
                    key,
                    value: emotion[key]
                }
                this.sortedEmotions.push(obj)
            })
        }
    },
    filters: {},
    created: function() {
        this.sortEmotion()
    },
    components: {},
};
</script>

<style lang="less">
// @import '../assets/css/fn.less';
</style>
