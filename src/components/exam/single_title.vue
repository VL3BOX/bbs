<template>
  <div class="v-single-title" v-if="item">
    <div class="m-title">
      <div class="u-title">{{ title }}</div>
      <div class="u-info">
        <div class="u-tags">
          <span>试卷标签：</span>
          <el-tag class="u-tag" v-for="tag in item.tags" :key="tag" size="small">
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
      <div class="u-desc">
        <span>总共题数：</span><b>共10题，每题10分，满分100分。</b>
      </div>
      <div class="u-desc">
        <span>PS：</span><b>{{ desc }}</b>
      </div>
    </div>
    <div class="m-setBar">
      <div class="u-col u-view">
        <i class="el-icon-view"></i><span>查看人数</span>
      </div>
      <div class="u-col" :class="collected ? 'u-active' : ''" @click="isCollected">
        <i class="el-icon-star-off"></i><span>{{ collected ? "已收藏" : "未收藏" }}</span>
      </div>
      <div class="u-col">
        <QRcode />
      </div>
      <div class="u-col">
        <Sharing :title="sharingTitle" img="./assets/img/100.svg" v-if="score >= 0" key="beforeTest" />
        <Sharing :title="sharingTitle" img="./assets/img/100.svg" v-else key="afterTest" />
      </div>
      <div class="u-col"><i class="el-icon-edit"></i><span>编辑</span></div>
      <div class="u-col"><i class="el-icon-delete"></i><span>删除</span></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Title",
  props: ["item"],
  components: {},
  data: function () {
    return {
      collected: false,
      score: -1,
    };
  },
  computed: {
    title: function () {
      if (this.item && this.item.questionDetailList)
        return "《" + this.item.title + "》";
      return this.item.title;
    },
    desc: function () {
      return this.item.desc || "作者很懒，没有备注";
    },
    sharingTitle: function () {
      if (this.type == "paper") return "试卷";
      return "问题";
    },
  },
  watch: {},
  methods: {
    isCollected () {
      this.collected = !this.collected;
    },
  },

  created: function () { },
  mounted: function () { },
  filters: {},
  watch: {},
};
</script>
