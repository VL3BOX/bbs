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
      <div class="u-desc" v-if="item.questionList">
        <span>总共题数：</span><b>共{{item.questionList.length}}题，每题{{number}}分，满分100分。</b>
      </div>
      <div class="u-desc">
        <span>PS：</span><b>{{ desc }}</b>
      </div>
    </div>
    <div class="m-setBar">
      <div class="u-col u-view">
        <i class="el-icon-view"></i><span>{{views}}</span>
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
      <div class="u-col" @click="toEdit"><i class="el-icon-edit"></i><span>编辑</span></div>
      <div class="u-col" @click="check('delete')"><i class="el-icon-delete"></i><span>删除</span></div>
    </div>
    <div class="m-score" v-if="score && score !== -1">
      <div class="u-label">试卷成绩</div>
      <div class="u-score">{{score}}</div>
    </div>
  </div>
</template>
<script>
import { publishLink } from "@jx3box/jx3box-common/js/utils";
import { getStat, checkPaper } from "@/service/exam.js";
// import { postStat } from "@jx3box/jx3box-common/js/stat";
export default {
  name: "Title",
  props: ["item", 'score', 'type'],
  components: {},
  data: function () {
    return {
      collected: false,
      views: -1
    };
  },
  computed: {
    id: function () {
      return this.$route.params.id
    },
    title: function () {
      if (this.type == 'paper')
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
    number: function () {
      return Math.floor(100 / this.item.questionIdList.length)
    }
  },
  watch: {
  },
  methods: {
    isCollected () {
      this.collected = !this.collected;
      // TODO:点击提交和取消收藏
    },
    toEdit () { },
    edit: function () {
      location.href = publishLink(this.type) + "/" + this.id;
    },
    check: function (action) {
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

  },

  created: function () {
    getStat(this.type, this.id).then((res) => {
      this.views = res.data.views
      console.log(this.views, res.data.views, this.type, this.id, '???!!!!')
    })
  },
};
</script>
