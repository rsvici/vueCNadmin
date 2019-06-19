<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">

    <div class="login-con">
      <div class="login-con-title">
        媒资发布管理系统
      </div>
      <Card
        icon="log-in"
        title="登录"
        :bordered="false"
      >
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip" v-if="pointWord">输入用户名和密码</p>
          <p class="login-tip login-tip-color" v-else>密码错误</p>
        </div>
      </Card>
    </div>
    <div class="login-copyright">
      <img
        src="../../assets/images/copyright.png"
        alt=""
        width="100%"
      >
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { login } from '@/api/user'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      pointWord: true
    }
  },
  methods: {
    // ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmit ({ username, password }) {
      // var info={
      //   username,password
      // }
      // login(info).then(res => {
      //   console.log(res);
      //   return;

      // });
      if (username == 'admin' && password == '123456') {
        this.$router.push({
          name: 'home'
        })
      } else {
        this.pointWord = false
      }

      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //     this.$router.push({
      //       name: this.$config.homeName
      //     });
      //   });
      // });
    }
  }
}
</script>

<style>
.login-con .login-tip.login-tip-color{
  color: red;
}
</style>
