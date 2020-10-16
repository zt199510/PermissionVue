<template>
  <div id="login">
    <el-card class="box-card">
      <h1>登录您的帐户</h1>
      <el-form
        :model="user"
        status-icon
        :rules="rules"
        ref="user"
        label-position="top"
      >
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
        <el-form-item label="验证码" prop="VerificavtionCode">
          <el-row>
            <el-col :span="14">
              <el-input
                v-model="user.VerificavtionCode"
                autocomplete="off"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <div @click="refreshCode()">
                <VerificavtionVue :identifyCode="VerificavtionCode" />
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">记住我的偏好</el-checkbox>
          <el-link href="##" target="_blank" :underline="false"
            >忘记密码？</el-link
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('user')"
            :loading="this.Isload"
            >提交</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link @click="Register_on" target="_blank" :underline="false"
            >还没有帐号？注册</el-link
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
import VerificavtionVue from "@/components/Login/VerificationCode.vue";
export default {
  components: { VerificavtionVue },
  //单页面中不支持前面的data:{}方式
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.user.password !== "") {
          this.$refs.user.validateField("checkPass");
        }
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
      console.log(value);
      if (value === "") {
        callback(new Error("验证码错误"));
      } else if (value != this.VerificavtionCode) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    return {
      Verificavtioninfo: "1234567abcdefgABCDEFG",
      VerificavtionCode: undefined,
      checked: true,
      user: {
        userName: "string",
        password: "string",
        VerificavtionCode: undefined
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
        VerificavtionCode: [{ validator: validatePass3, trigger: "blur" }]
      },
      Isload: false
    };
  },
  mounted() {
    this.refreshCode();
    this.GetCookie();
  },
  methods: {
    GetCookie() {
      let Authorization = localStorage.getItem("Authorization");
      let RefreshToken = localStorage.getItem("RefreshToken");
      let IsAutologin = localStorage.getItem("IsAutoLogin");
      if (Authorization && RefreshToken) {
        if (IsAutologin) {
          this.TokenLogin();
        }
      }
    },
    TokenLogin() {
        this.$router.push("/about");
    },
    doLogin() {
      this.Isload = true;
      let postinfo = {
        userName: this.user.userName,
        password: this.user.password
      };
      this.$http
        .post(this.$api.login.index, postinfo)
        .then(result => {
          this.ResultList = result;
          if (this.ResultList.error == true)
            this.$message.error(this.ResultList.message);
          else {
            result;
            localStorage.setItem("Authorization", result.access_token);
            localStorage.setItem("RefreshToken", result.RefreshToken);
            if (this.checked) {
              localStorage.setItem("IsAutoLogin", this.checked);
               localStorage.setItem("UserInfo", postinfo.userName);
            }
            this.$router.push("/about");
          }
          this.Isload = false;
        })
        .catch(error => {
         
          this.refreshCode();
          this.Isload = false;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.doLogin();
        } else {
          
          return false;
        }
      });
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.VerificavtionCode = "";
      this.makeCode(this.VerificavtionCode, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.VerificavtionCode += this.Verificavtioninfo[
          this.randomNum(0, this.Verificavtioninfo.length)
        ];
      }
    },
    Register_on() {
      this.$router.push("/Regter");
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
#login {
  width: 400px;
  margin: 0px auto;
  text-align: left;
}
.el-button {
  width: 100%;
}
.el-checkbox {
  float: left;
}
.el-link {
  float: right;
}
h1 {
  text-align: center;
}
</style>
