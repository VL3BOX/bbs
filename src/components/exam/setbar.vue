<template>
  <div class="v-setbar">
    <div class="u-col u-view">
      <i class="el-icon-view"></i><span>查看人数</span>
    </div>
    <div class="u-col" :class="coll ? 'u-active' : ''" @click="isColl">
      <i class="el-icon-star-off"></i
      ><span>{{ coll ? "已收藏" : "未收藏" }}</span>
    </div>
    <div class="u-col"><QRcode /></div>
    <div class="u-col">
      <Sharing
        :title="sharingTitle"
        img="./assets/img/100.svg"
        v-if="score >= 0"
        key="beforeTest"
      />
      <Sharing
        :title="sharingTitle"
        img="./assets/img/100.svg"
        v-else
        key="afterTest"
      />
    </div>
    <div class="u-col"><i class="el-icon-edit"></i><span>编辑</span></div>
    <div class="u-col"><i class="el-icon-delete"></i><span>删除</span></div>
  </div>
</template>
<script>
export default {
  name: "Setbar",
  props: ["score"],
  data: function () {
    return {
      coll: true,
    };
  },
  computed: {
    sharingTitle: function () {
      if (this.type == "paper") return "试卷";
      return "问题";
    },
  },
  methods: {
    isColl() {
      this.coll = !this.coll;
    },
  },
};
</script>

<style lang="less">
@import "../../assets/css/exam.less";
</style>
