<template>
  <div v-if="!$common.isEmpty(recommendArticles)"
       style="padding: 25px;border-radius: 10px;margin-top: 40px;animation: hideToShow 1s ease-in-out"
       class="shadow-box background-opacity wow">
    <div class="card-content2-title">
      <i class="el-icon-reading card-content2-icon"></i>
      <span>推荐文章</span>
    </div>
    <div v-for="(article, index) in recommendArticles"
         :key="index"
         @click="$router.push({path: '/article', query: {id: article.id}})">
      <div class="aside-post-detail">
        <div class="aside-post-image">
          <el-image lazy class="my-el-image" :src="article.articleCover" fit="cover">
            <div slot="error" class="image-slot">
              <div class="error-aside-image">
                {{article.username}}
              </div>
            </div>
          </el-image>
        </div>
        <div class="aside-post-title">
          {{ article.articleTitle }}
        </div>
      </div>
      <div class="aside-post-date">
        <i class="el-icon-date" style="color: var(--greyFont)"></i>{{ article.createTime }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecommendArticles',
  data() {
    return {
      recommendArticles: []
    }
  },
  methods: {
    getRecommendArticles() {
      this.$http.post("/api/articles", this.pagination)
        .then((res) => {
          if (!this.$common.isEmpty(res.data)) {
            this.recommendArticles = res.data.records;
          }
        })
        .catch((error) => {
          this.$message({
            message: error.message,
            type: "error"
          });
        });
    },
  },
  created() {
    this.getRecommendArticles();
  }
}
</script>
<style scoped>
.aside-post-detail {
  display: flex;
  cursor: pointer;
}

.aside-post-image {
  width: 40%;
  border-radius: 0.2rem;
  margin-right: 8px;
  overflow: hidden;
}

.error-aside-image {
  background: var(--themeBackground);
  color: var(--white);
  padding: 10px;
  text-align: center;
  width: 100%;
  height: 100%;
}

.aside-post-title {
  width: 60%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.aside-post-date {
  margin-top: 8px;
  margin-bottom: 20px;
  color: var(--greyFont);
  font-size: 12px;
}
</style>
