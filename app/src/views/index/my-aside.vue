<template>
  <div>
    <!-- 网站信息 -->
    <div class="card-content1 shadow-box background-opacity">
      <el-avatar style="margin-top: 20px" class="user-avatar" :size="120" :src="webInfo.avatar"></el-avatar>
      <div class="web-name">{{webInfo.webName}}</div>
      <div class="web-info">
        <div class="blog-info-box">
          <span>文章</span>
          <span class="blog-info-num">{{ $store.getters.articleTotal }}</span>
        </div>
        <div class="blog-info-box">
          <span>分类</span>
          <span class="blog-info-num">{{ categories.length }}</span>
        </div>
      </div>
      <a class="collection-btn" @click="showTip()">
        <i class="el-icon-star-off" style="margin-right: 2px"></i>朋友圈
      </a>
    </div>

    <!-- 赞赏 -->
    <Admire></Admire>

    <!-- 速览 -->
    <div v-for="(category, index) in categories"
         @click="selectCategories(category)"
         :key="index"
         :style="{background: $constant.categoryColor[index % $constant.categoryColor.length]}"
         class="shadow-box-mini background-opacity wow"
         style="position: relative;padding: 20px 25px 40px;border-radius: 10px;animation: hideToShow 1s ease-in-out;margin-top: 40px;cursor: pointer;color: var(--white)">
      <div>速览</div>
      <div class="category-name">
        {{category.categoryName}}
      </div>
      <div style="font-weight: bold;margin-top: 15px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">
        {{category.categoryDescription}}
      </div>
    </div>

    <!-- 分类 -->
    <Categories></Categories>


    <!-- 推荐文章 -->
    <RecommendArticles></RecommendArticles>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Admire from "./admire";
  import RecommendArticles from "./recommend-articles";
  import Categories from "./categories";

  export default {
    name: 'MyAside',
    components: {
      Categories,
      RecommendArticles,
      Admire
    },
    data() {
      return {
        pagination: {
          current: 1,
          size: 5,
          recommendStatus: true
        },
      }
    },
    computed: {
      ...mapGetters(['web']),
      webInfo() {
        return this.$store.state.web.webInfo;
      },
      categories() {
        return this.$store.state.web.categories;
      }
    },
    methods: {
      selectCategories(category) {
        this.$emit("selectCategories", category);
      },
      showTip() {
        this.$router.push({path: '/weiYan'});
      }
    }
  }
</script>

<style scoped>
  .card-content1 {
    background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
    background-size: 400% 400%;
    animation: gradientBG 10s ease infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    position: relative;
    /*color: var(--white);*/
    overflow: hidden;
  }

  .card-content1 :not(:first-child) {
    z-index: 10;
  }

  .web-name {
    font-size: 30px;
    font-weight: bold;
    margin: 20px 0;
  }

  .web-info {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .blog-info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .blog-info-num {
    margin-top: 12px;
  }

  .collection-btn {
    position: relative;
    margin-top: 12px;
    background: var(--lightGreen);
    cursor: pointer;
    width: 65%;
    height: 35px;
    border-radius: 1rem;
    text-align: center;
    line-height: 35px;
    color: var(--white);
    overflow: hidden;
    z-index: 1;
    margin-bottom: 25px;
  }

  .collection-btn::before {
    background: var(--gradualRed);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: "";
    transform: scaleX(0);
    transform-origin: 0;
    transition: transform 0.5s ease-out;
    transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
    border-radius: 1rem;
    z-index: -1;
  }

  .collection-btn:hover::before {
    transform: scaleX(1);
  }

  .category-name {
    font-weight: bold;
    font-size: 25px;
    margin-top: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .category-name:after {
    top: 98px;
    width: 22px;
    left: 26px;
    height: 2px;
    background: var(--white);
    content: "";
    border-radius: 1px;
    position: absolute;
  }
</style>
