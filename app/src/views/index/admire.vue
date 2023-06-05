<template>
  <div class="shadow-box-mini background-opacity wow admire-box"
       v-if="!$common.isEmpty(admires)">
    <div style="font-weight: bold;margin-bottom: 20px">🧨赞赏名单</div>
    <div>
      <vue-seamless-scroll style="height: 200px;overflow: hidden">
        <div v-for="(item, i) in admires"
             style="display: flex;justify-content: space-between"
             :key="i">
          <div style="display: flex">
            <el-avatar style="margin-bottom: 10px" :size="36" :src="(item.avatar) ? item.avatar : web.webInfo.avatar"></el-avatar>
            <div style="margin-left: 10px;height: 36px;line-height: 36px;overflow: hidden;max-width: 80px">
              {{ item.nickname }}
            </div>
          </div>
          <div style="height: 36px;line-height: 36px">
            {{ item.admire }}元
          </div>
        </div>
      </vue-seamless-scroll>
    </div>
    <div class="admire-btn" @click="showAdmire()">
      赞赏
    </div>
    <!-- 微信 -->
    <el-dialog title="赞赏"
               :visible.sync="showAdmireDialog"
               width="25%"
               :append-to-body="true"
               destroy-on-close
               center>
      <div>
        <div class="admire-image"></div>
        <div>
          <div class="admire-content">1. 感谢老铁送来的666</div>
          <div class="admire-content">2. 申请通过后会加博客交流群，不需要加群或者退群后会定期清理好友（强迫症福利）</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  name: 'Admire',
  components: {
    vueSeamlessScroll
  },
  computed: {
    ...mapGetters(["web"]),
  },
  data() {
    return {
      admires: [],
      showAdmireDialog: false
    }
  },
  methods: {
    showAdmire() {
      if (this.$common.isEmpty(this.web.currentUser)) {
        this.$message.error("请先登录!");
        return;
      }

      this.showAdmireDialog = true;
    },
    getAdmire() {
      this.$http.get("/api/web-members/admires")
        .then((res) => {
          if (!this.$common.isEmpty(res.data)) {
            this.admires = res.data;
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
    this.getAdmire();
  }
}
</script>
<style scoped>
.admire-box {
  background: var(--springBg) center center / cover no-repeat;
  padding: 25px;
  border-radius: 10px;
  animation: hideToShow 1s ease-in-out;
  margin-top: 40px;
}

.admire-btn {
  padding: 13px 15px;
  background: var(--maxLightRed);
  border-radius: 3rem;
  color: var(--white);
  width: 100px;
  user-select: none;
  cursor: pointer;
  text-align: center;
  margin: 20px auto 0;
  transition: all 1s;
}

.admire-btn:hover {
  transform: scale(1.2);
}

.admire-image {
  margin: 0 auto 10px;
  border-radius: 10px;
  height: 150px;
  width: 150px;
  background: var(--admireImage) center center / cover no-repeat;
}

.admire-content {
  font-size: 12px;
  color: var(--maxGreyFont);
  line-height: 1.5;
  margin: 5px;
}
</style>
