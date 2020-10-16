<template>
  <div>
    <div class="RigEdit">
      <el-button type="success" plain>查询</el-button>
      <el-button type="primary" plain>新建</el-button>
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
          <el-select v-model="MenuMode.QParentId" placeholder="请选择">
            <el-option
              v-for="item in this.$store.state.NavMenuModel"
              :key="item.Id"
              :label="item.Id + '(' + item.Name + ')'"
              :value="item.Name"
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
      <el-table :data="ResultMenulist" style="width: 100%" >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="Name" label="菜单名称" width="180" align="center">
        </el-table-column>
        <el-table-column prop="Id" label="菜单编号" align="center" >
        </el-table-column>
        <el-table-column prop="ParentId" label="父级编号" align="center"  >
        </el-table-column>
        <el-table-column prop="IndexCode" label="组内排序" width="80" align="center"  >
        </el-table-column>
          <el-table-column prop="Icon" label="菜单图标" align="center"  >
            <template slot-scope="scope">
               <i style="font-size: 25px;" :class="scope.row.Icon.toString()"></i>
            </template>
        </el-table-column>
        <el-table-column prop="MenuType" label="菜单类型">
          <template slot-scope="scope">
             <el-tag size="medium"
             :type="scope.row.MenuType === 1 ? 'primary' : 'success'"
             >{{ scope.row.MenuType==1?"操作菜单":"导航菜单" }}</el-tag>
          </template>
           </el-table-column>
         <el-table-column prop="Url" label="菜单路劲"> </el-table-column>
          <el-table-column  label="操作"> 


          </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ResultMenulist: []
    };
  },
  mounted() {
    this.GetMenuitem();
  },
  methods: {
    GetMenuitem() {
      let post={
        QName: this.MenuMode.QName,
        QId: this.MenuMode.QId,
        QParentId: this.MenuMode.QParentId,
        QMenuType: this.MenuMode.QMenuType==""?-1:this.MenuMode.QMenuType
      }
      this.$http
        .post(this.$api.About.Getmenuitem, post)
        .then(result => {
          console.log(result);
          this.ResultMenulist = result.Menus;
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped>
.RigEdit {
  text-align: right;
  margin: 1em, 1em;
  margin-right: 1em;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.el-input {
  width: 80%;
}

</style>