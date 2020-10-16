<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-row>
          <el-col :span="24" class="blockss">
            <h1>demo</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="Navclss">
            <MainMenu :NavMenuList="this.$store.state.NavMenuModel" />
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header class="ChildHeaderView">
          <Header />
        </el-header>
        <div :style="defaultHeight">
          <div class="Tilete"></div>
          <router-view></router-view>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainMenu from "@/components/NavMenu/MainMenu.vue";

import Header from "@/components/Header/Header.vue";
export default {
  components: {
    MainMenu,
    Header
  },
  data() {
    return {
      NavMenuList: [],
      fullscreenLoading: false,
      defaultHeight: {
        height: ""
      }
    };
  },
  mounted() {
    this.openFullScreen2();
    this.created();
    this.loadleftNavMenuitem();
  },
  methods: {
    loadleftNavMenuitem() {
      this.$http
        .get("/Userinfos/GetNavMenuItem")
        .then(result => {
          this.ResultList = result;
          if (this.ResultList.error == true) {
            this.$message.error(this.ResultList.message);
          } else {
            this.$store.state.NavMenuModel = result.data;
          
          }
            this.fullscreenLoading = true;
        })
        .catch(error => {
          console.log(error.headers.tokenexpired);
          if (error.headers.tokenexpired == "true") {
            localStorage.clear();
            this.$router.push("/");
            
          }
          localStorage.clear();
           this.$router.push("/");
          this.fullscreenLoading = true;
        });
    },
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        if (this.fullscreenLoading == true) {
          loading.close();
        }
      }, 1000);
    },
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 90 + "px";
    },
    created() {
      //页面创建时执行一次getHeight进行赋值，顺道绑定resize事件
      window.addEventListener("resize", this.getHeight);
      this.getHeight();
    }
  }
};
</script>

<style lang="scss" scoped >
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.blockss {
  background-color: rgb(36, 1, 92);
  height: 3.75em;
  width: 100%;
}
.blockss h1 {
  color: white;
  text-align: center;
  line-height: 2em;
}
.RigHerad {
  background-color: rgb(36, 1, 92);
  height: 4.95em;
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.ChildHeaderView {
  background-color: #333;
  height: 50%;
  padding: 0;
  margin: 0;
}
.Tilete {
  margin: 1em 1em;
  text-align: right;
}
</style>
