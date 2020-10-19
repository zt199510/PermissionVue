<template>
  <div>
    <el-dialog title="新建菜单" :visible.sync="dialogFormVisible" width="480px">
      <el-form
        :model="NewMenuinfo"
        :rules="rules"
        class="demo-form-inline"
        ref="NewMenuinfo"
        label-position="left"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单编号:" prop="id">
              <el-input
                :disabled="Isdisabled"
                v-model="NewMenuinfo.id"
                placeholder="菜单编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称:" prop="name">
              <el-input
                :disabled="Isdisabled"
                v-model="NewMenuinfo.name"
                placeholder="菜单名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="父级菜单:">
              <el-select
                :disabled="Isdisabled"
                clearable
                v-model="NewMenuinfo.parentId"
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
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组内排序:" prop="indexCode">
              <el-input
                :disabled="Isdisabled"
                type="age"
                autocomplete="off"
                v-model.number="NewMenuinfo.indexCode"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单类型:" prop="menuType">
              <el-select
                :disabled="Isdisabled"
                v-model="NewMenuinfo.menuType"
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
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单图标:">
              <el-input
                :disabled="Isdisabled"
                v-model="NewMenuinfo.icon"
                placeholder="菜单图标"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单路劲:">
              <el-input
                :disabled="Isdisabled"
                v-model="NewMenuinfo.url"
                placeholder="菜单路劲"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:">
              <el-input
                :disabled="Isdisabled"
                v-model="NewMenuinfo.remarks"
                placeholder="备注"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item :inline="false" align="right">
          <el-button
            v-if="resultType == 0"
            type="primary"
            @click="onSubmit('NewMenuinfo')"
            >添加</el-button
          >
          <el-button
            v-if="resultType == 2"
            type="primary"
          
            >编辑</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Message} from 'element-ui';
export default {
  props: {
    Menuinfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      Isdisabled: false,
      resultType: 0,
      dialogFormVisible: false,
      NewMenuinfo: {
        id: "",
        name: "",
        parentId: "",
        indexCode: 0,
        url: "",
        menuType: "",
        icon: "",
        remarks: ""
      },
      rules: {
        id: { required: true, message: "菜单编号不能为空", trigger: "blur" },
        name: { required: true, message: "菜单名称不能为空", trigger: "blur" },

        indexCode: [
          {
            required: true,
            message: "组内排序不能为空不能为空",
            trigger: "blur"
          },
          { type: "number", message: "必须为数字值" }
        ],
        menuType: {
          required: true,
          message: "请选择活动区域",
          trigger: "change"
        },
        icon: {
          required: true,
          message: "菜单图标不能为空不能为空",
          trigger: "blur"
        }
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
      ]
    };
  },
  mounted() {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.NewAddinfo();
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
    NewAddinfo() {
      this.$http
        .post(this.$api.About.CreateMenu, this.NewMenuinfo)
        .then(result => {
        if(result.Success==true) {
            this.dialogFormVisible = false;
            this.$emit("NewAddSuccess",result)
            return;}
         Message.error(result.Message);
                 
                 return;
        })
        .catch(error => {
          console.log(error);
        });
    },
    GetMenuDetailsInfo(id) {
      this.$http
        .post(this.$api.About.Details + "?id=" + id)
        .then(result => {
          console.log(result.Success);
          if (result.Success === false){
              Message.error(result.Message);
                 this.dialogFormVisible = false;
                 return;
          }
           this.dialogFormVisible = true;
            this.NewMenuinfo = {
              id: result.data.Id,
              name: result.data.Name,
              parentId: result.data.ParentId,
              indexCode: result.data.IndexCode,
              url: result.data.Url,
              menuType: result.data.MenuType,
              icon: result.data.Icon,
              remarks: result.data.Remarks
            };
         
        })
        .catch(error => {
          console.log(error);
        });
    },
    AddorEditMethod(data, type) {
     
      this.resultType = type;
      this.Isdisabled = false;
      switch (type) {
        case 0:
            this.dialogFormVisible = true;
          this.NewMenuinfo = {
            id: "",
            name: "",
            parentId: "",
            indexCode: 0,
            url: "",
            menuType: "",
            icon: "",
            remarks: ""
          };
          break;
        case 1:
          this.Isdisabled = true;
        case 2:
          this.GetMenuDetailsInfo(data);
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style>
</style>