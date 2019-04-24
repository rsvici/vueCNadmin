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
        title="欢迎登录"
        :bordered="false"
      >
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入用户名和密码</p>
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
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    // ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmit ({ userName, password }) {
      this.$router.push({
        name: 'home'
      })
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
</style>
