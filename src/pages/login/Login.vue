<template>
  <div class="bg flex a-center">
    <div class="form flex jc-center a-center">
      <el-card shadow="always">
        <div slot="header" class="t-center head-font">
          <span>欢迎来到芋胖后台管理系统</span>
        </div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="110px"
          class="el-form--label-left"
        >
          <el-form-item label="请输入用户名" prop="username">
            <el-input v-model="form.username" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码" prop="password">
            <el-input v-model="form.password" type="password" style="width: 400px;"></el-input>
          </el-form-item>
          <div class="ps">特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。</div>
          <el-form-item class="login__form__item">
            <div class="btn t-center">
              <el-button type="primary" @click="onLogin('form')">立即登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
// 传模块的名字
const loginModule = createNamespacedHelpers("login");
const {
  mapState: loginState,
  mapMutations: loginMutations,
  mapActions: loginActions
} = loginModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码最少为6位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...loginActions(["login"]),
    onLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //  this.message.success("填完了")
          this.login({
            username: this.form.username,
            password: this.form.password
          }).then(res => {
            if(res.meta.msg === "用户名不存在"){
              this.form.username=""
              this.form.password=""
              this.$message.error(res.meta.msg)
            }else if(res.meta.msg === "密码错误"){
              this.form.password=""
              this.$message.error(res.meta.msg)
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          return false;
        }
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bg {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/loginBg.jpg") no-repeat;
  background-size: cover;
}
.form {
  width: 100%;
  .head-font {
    font-size: 2em;
    font-weight: 600;
  }
  .btn {
    margin-top: 20px;
  }
}
</style>