<template>
<div id="UserImg">
    
  <el-row >
    <el-col :span="10">
      <el-dropdown trigger="click">
        <span>
          <el-avatar :size="35" style="cursor:default"  :src="UserImg"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账号信息</el-dropdown-item>
          <el-dropdown-item>打卡</el-dropdown-item>
          <el-dropdown-item>
            <div @click="OutPage">
              登出
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col class="el_test" :span="4">
      <el-tag size="mini">{{ UserName }}</el-tag>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  props: {
    UserImg: {
      type: String,
      default:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    },
    UserName: {
      type: String,
      default: "角色"
    }
  },
  data() {
    return {};
  },
  methods: {
    OutPage() {
       localStorage.clear();
     this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.el-avatar {
  margin-top: 1em;
  padding: 0;
}
.el_test {
  margin-top: 0;
}


</style>