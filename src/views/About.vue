<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header">
      <div class="layui-logo">Demo</div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
      <ul class="layui-nav layui-layout-left">
        <li class="layui-nav-item">控制台</li>
      </ul>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item">
          <a href="javascript:;">
            <img src="http://t.cn/RCzsdCq" class="layui-nav-img" />
            贤心
          </a>
          <dl class="layui-nav-child">
            <dd><a href="">基本资料</a></dd>
            <dd><a href="">安全设置</a></dd>
          </dl>
        </li>
        <li class="layui-nav-item"><a href="">退了</a></li>
      </ul>
    </div>

    <div class="layui-side layui-bg-black">
      <div class="layui-side-scroll">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul class="layui-nav layui-nav-tree" lay-filter="test">
          <li class="layui-nav-item layui-nav-itemed">
            <a class="" href="javascript:;">所有商品</a>
            <dl class="layui-nav-child">
              <dd><a href="javascript:;">列表一</a></dd>
              <dd><a href="javascript:;">列表二</a></dd>
              <dd><a href="javascript:;">列表三</a></dd>
              <dd><a href="">超链接</a></dd>
            </dl>
          </li>
          <li class="layui-nav-item">
            <a href="javascript:;">解决方案</a>
            <dl class="layui-nav-child">
              <dd><a href="javascript:;">列表一</a></dd>
              <dd><a href="javascript:;">列表二</a></dd>
            </dl>
          </li>
        
        </ul>
        <!-- <MainMenu :NavMenuList="this.$store.state.NavMenuModel" /> -->
      </div>
    </div>

    <div class="layui-body">
      <!-- 内容主体区域 -->
      <div style="padding: 15px;">
        <router-view></router-view>
      </div>
    </div>

    <div class="layui-footer">
      <!-- 底部固定区域 -->
      © layui.com - 底部固定区域
    </div>
  </div>

  <!-- <el-container>
      <el-aside width="200px">
        <el-row>
          <el-col :span="24" class="blockss">
            <h1>Demo</h1>
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
          
        </div>
      </el-container>
    </el-container> -->
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

      defaultHeight: {
        height: ""
      }
    };
  },
  mounted() {
    layui.use("element", function() {
      var element = layui.element;
    });
    this.$store.state.fullscreenLoading = false;
    this.openFullScreen2();

    this.loadleftNavMenuitem();
  },
  methods: {
    loadleftNavMenuitem() {
      this.$Plugin();
    },
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        if (this.$store.state.fullscreenLoading == true) {
          loading.close();
        }
      }, 1000);
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
  padding: 0;
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
  width: 100%;
}
.Tilete {
  margin: 1em 1em;
  text-align: right;
}
</style>
