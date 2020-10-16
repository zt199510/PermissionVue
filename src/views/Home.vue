<template>
  <div>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: "加载中....",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    setTimeout(() => {
      loading.close();
      this.$router.push("/log");
    }, 2000);
  },
  methods: {}
};
</script>
<style scoped>
.el-main {
  margin-top: 5%;
}
</style>
