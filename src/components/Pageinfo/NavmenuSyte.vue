<template>
  <div>
    <NewAddMenupage
      :Menuinfo="NewMenuInfo"
      v-on:NewAddSuccess="NewAddSuccess"
      ref="AddorEdit"
    />

    <div class="RigEdit">
      <el-button type="success" @click="GetMenuitem" plain>查询</el-button>
      <el-button type="primary" @click="NewAddorEditClick(0, 0)" plain
        >新建</el-button
      >
    </div>

    <el-row>
      <el-col :span="6">
        <div>
          <h2>菜单名称</h2>
          <el-input
            v-model="MenuMode.QName"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <h2>菜单编号</h2>
          <el-input v-model="MenuMode.QId" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <h2>父级菜单</h2>
          <el-select
            clearable
            v-model="MenuMode.QParentId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in this.$store.state.NavMenuModel"
              :key="item.Id"
              :label="item.Id + '(' + item.Name + ')'"
              :value="item.Id"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <h2>菜单类型</h2>
          <el-select
            v-model="MenuMode.QMenuType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <div>
      <el-table :data="ResultMenulist" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="Name"
          label="菜单名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="Code" label="菜单编号" align="center">
        </el-table-column>
        <el-table-column prop="ParentId" label="父级编号" align="center">
        </el-table-column>
        <el-table-column
          prop="IndexCode"
          label="组内排序"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="Icon" label="菜单图标" align="center">
          <template slot-scope="scope">
            <i style="font-size: 25px;" :class="scope.row.Icon.toString()"></i>
          </template>
        </el-table-column>
        <el-table-column prop="MenuType" label="菜单类型">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              :type="scope.row.MenuType === 1 ? 'primary' : 'success'"
              >{{ scope.row.MenuType == 1 ? "操作菜单" : "导航菜单" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="Url" label="菜单路劲"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="NewAddorEditClick(scope.row.Id, 1)"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="NewAddorEditClick(scope.row.Id, 2)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="DelMenuInfo(scope.row.Id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import NewAddMenupage from "@/components/NavMenu/NewAddMenu.vue";
export default {
  components: {
    NewAddMenupage
  },
  data() {
    return {
      dialogFormVisible: false,
      MenuMode: {
        QName: "",
        QId: "",
        QParentId: "",
        QMenuType: ""
      },
      options: [
        {
          value: "0",
          label: "导航菜单"
        },
        {
          value: "1",
          label: "操作菜单"
        }
      ],
      ResultMenulist: [],
      NewMenuInfo: null
    };
  },
  mounted() {
    this.GetMenuitem();
  },
  methods: {
    GetMenuitem() {
      let post = {
        QName: this.MenuMode.QName,
        QId: this.MenuMode.QId,
        QParentId: this.MenuMode.QParentId,
        QMenuType: this.MenuMode.QMenuType == "" ? -1 : this.MenuMode.QMenuType
      };
      console.log(post);
      this.$http
        .post(this.$api.About.Getmenuitem, post)
        .then(result => {
          console.log(result);
          this.ResultMenulist = result.Menus;
        })
        .catch(error => {});
    },
    SelectNowMenuInfoClick(id) {
      this.$http
        .post(this.$api.About.Details, id)
        .then(result => {
          console.log(result);
        })
        .catch(error => {});
    },
    NewAddSuccess(data) {
      if (data.Success == true) {
        this.dialogFormVisible = false;
        this.GetMenuitem();
        this.$Plugin();
      }
    },
    NewAddorEditClick(obj, type) {
      this.$refs.AddorEdit.AddorEditMethod(obj, type);
    },
    DelMenuInfo(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(this.$api.About.Delete + "?id=" + id)
            .then(result => {
              if (result.Success == false) {
                this.$message({
                  type: "success",
                  message: result.Message
                });
                return;
              }
              this.$message({
                type: "success",
                message: result.Message
              });
              this.GetMenuitem();
               this.$Plugin();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.RigEdit {
  text-align: right;
  margin: 0em, 0em;
  margin-right: 1em;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.el-input {
  width: 80%;
}
</style>