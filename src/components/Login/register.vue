<template>
  <div id="Register">
    <el-card class="box-card">
      <h1>注册您的帐户</h1>
      <el-form :model="user" status-icon :rules="rules" ref="user">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="user.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="user.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="Cpassword">
          <el-input
            type="password"
            v-model="user.Cpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="eamil">
          <el-input v-model="user.eamil" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="ResultLog">返回登入页面</el-button>
          <el-button type="primary" @click="submitForm('user')"
            >提交注册</el-button
          >
        </el-form-item>
        <el-form-item> </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  //单页面中不支持前面的data:{}方式
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      checked: true,
      user: {
        userName: "",
        password: "",
        Cpassword: "",
        email: ""
        //为了登录方便，可以直接在这里写好用户名和密码的值
      },
      ResultList: {
        access_token: undefined,
        error: false,
        message: undefined,
        refreshToken: undefined,
        token_type: undefined
      },
      rules: {
        userName: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
        Cpassword: [{ validator: validatePass3, trigger: "blur" }],
        eamil: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    doLogin() {
      this.$http
        .post(this.$api.login.index, this.user)
        .then(result => {
          this.ResultList = result;
          if (this.ResultList.error == true)
            this.$message.error(this.ResultList.message);
          else {
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success"
            });
            this.$router.push("/about");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(valid);
          this.doLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ResultLog() {
      this.$router.push("/log");
    },
    MessageLog(message) {
      this.$alert(message, "消息", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#Register {
  width: 400px;
  margin: 0px auto;
  text-align: center;
}
.el-button {
  float: right;
  margin-right: 10px;
}

</style>
