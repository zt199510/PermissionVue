<template>
  <div class="Headerss">
    <el-row :gutter="20">
      <el-col :span="22">
          <i class="el-icon-setting"></i>
      </el-col>
      <el-col :span="2">
        <Userimg />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Userimg from "@/components/admin/Userinfo.vue";
export default {
  components: {
    Userimg
  },
  methods: {}
};
</script>

<style scoped>

</style>