<template>
  <div class="v-examlist">
    <!-- 试卷 -->
    <div class="m-exam-list" v-if="type == 'paper'">
      <a class="m-paper-item" v-for="item in list" :key="item.id" @click="takePaper(item.id)">
        <div class="u-title" :class="item.style">{{ item.title }}</div>
        <div class="u-tags">
          <el-tag
            class="u-tag"
            v-for="tag in JSON.parse(item.tags).slice(0, 3)"
            :key="tag"
            size="small"
          >
            {{ tag }}
          </el-tag>
        </div>
        <div class="u-desc" :class="item.style">
          <img class="u-icon" svg-inline src="../../assets/img/logo.svg" />
          <div class="u-text">{{ item.desc }}</div>
        </div>
        <div class="u-info">
          <div>出卷人： {{ item.createUser }}</div>
          <div class="u-star">
            难度：
            <el-rate
              v-model="item.hardStar"
              disabled
              text-color="#ff9900"
            ></el-rate>
          </div>
        </div>
      </a>
    </div>

    <!-- 问题 -->
    <div class="m-exam-list" v-else>
      <el-table
        class="m-question-list"
        :data="list"
        style="width: 100%"
        @sort-change="handleSort"
        @row-click="takeQuestion"
      >
        <el-table-column prop="id" label="编号" width="60"></el-table-column>
        <el-table-column prop="title" label="标题">
          <template slot-scope="scope">
            <span class="c-question-list-title">{{
              filteredTitle(scope.row.title)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="180">
          <template slot-scope="scope">
            <el-tag
              class="tag"
              v-for="tag of JSON.parse(scope.row.tags).slice(0, 3)"
              :key="tag"
              size="small"
              >{{ tag }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="hardStar" label="难度" width="120">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.hardStar"
              disabled
              text-color="#ff9900"
            ></el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="出题人" width="180">
          <template slot-scope="scope">
            {{ scope.row.createUser }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              type="primary"
              >去答题</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExamList",
  props: ["list", "type"],
  components: {},
  data: function () {
    return {};
  },
  computed: {
    filteredTitle() {
      return (title) => {
        let reg = /<[^<>]+>/g;
        title = title.replace(reg, ""); //替换HTML标签
        title = title.replace(/&nbsp;/gi, ""); //替换HTML空格
        return title;
      };
    },
  },
  watch: {},
  methods: {
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
    takePaper(id) {
      this.$router.push({
        name: "paper",
        params: { id: id },
      });
    },
    takeQuestion(row, column, event) {
      // console.log(row.id);
      let id = row.id;
      this.$router.push({
        name: "question",
        params: { id: id },
      });
    },
    handleEdit() {},
  },
  filters: {},
  created: function () {},
  mounted: function () {},
};
</script>

<style lang="less">
@import "../../assets/css/exam.less";
</style>