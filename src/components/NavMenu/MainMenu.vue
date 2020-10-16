<template>
  <div id="NavMenucss">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="(item, i) in NavMenuList">
        <el-submenu
          :index="i.toString()"
          v-if="item.MenuType == 0"
          :key="item.Id"
        >
          <template slot="title">
            <i :class="item.Icon.toString()"></i>
            <span>{{ item.Name }}</span>
          </template>
          <el-menu-item
            v-for="(itemchild, j) in item.SubNavMenus"
            :index="i + '-' + j"
            :key="itemchild.Id"
            @click="NavPage(itemchild.Url)"
          >
            {{ itemchild.Name }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="i.toString()"
          :key="item.Id"
          @click="NavPage(item.Url)"
        >
          <i :class="item.Icon.toString()"></i>
          <span slot="title">{{ item.Name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    NavMenuList: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    NavPage(url) {
    
      this.$router.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
}
</style>>


