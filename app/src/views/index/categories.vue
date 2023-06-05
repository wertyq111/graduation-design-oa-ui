<template>
  <div class="shadow-box background-opacity wow"
       style="margin-top: 40px;padding: 25px 25px 5px;border-radius: 10px;animation: hideToShow 1s ease-in-out">
    <div class="card-content2-title">
      <i class="el-icon-folder-opened card-content2-icon"></i>
      <span>分类</span>
    </div>
    <div v-for="(category, index) in categories"
         :key="index"
         class="post-category"
         @click="$router.push({path: '/category', query: {categoryId: category.id}})">
      <div>
        <span v-for="(s, i) in category.categoryName.split('')" :key="i">{{ s }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Categories',
  computed: {
    categories() {
      return this.$store.state.web.categories;
    }
  }
}
</script>
<style scoped>
.card-content2-title {
  font-size: 18px;
  margin-bottom: 20px;
}

.card-content2-icon {
  color: var(--red);
  margin-right: 5px;
  animation: scale 1s ease-in-out infinite;
}

.post-category {
  border-radius: 1rem;
  margin-bottom: 15px;
  line-height: 30px;
  transition: all 0.3s;
}

.post-category:hover {
  background: var(--themeBackground);
  padding: 2px 15px;
  cursor: pointer;
  color: var(--white);
}
</style>
