<template>
  <div>
    <el-row>
      <el-col
        :offset="8"
        :span="8"
        style="display:flex; justify-content:center; align-items: center;"
      >
        <div
          style="font-size: 20px; background-color: #4A4E69; width: 100%; border-radius: 40px; display:flex; justify-content:center;align-items: center; height: 50px"
        >
          <div style="color: white">SDM專用單字小卡系統</div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top:40px">
      <el-col
        :offset="8"
        :span="8"
        style="display:flex; justify-content:center; align-items: center;"
      >
        <div>登入以創建自己的單字小卡</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="8" :span="8" style="margin-top:10px">
        <el-input v-model="uuid" placeholder="請輸入使用者名稱"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="8" :span="8" style="margin-top:10px">
        <el-input v-model="password" placeholder="請輸入密碼" show-password></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :offset="11" :span="2">
        <el-button type="primary" plain @click="login">登入</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :offset="8"
        :span="8"
        style="display: flex; justify-content:center;align-items: center"
      >
        <div>
          還沒有帳號嗎？ 趕緊點及右側按鈕
          <el-button @click="registerVisible = true">創建帳號</el-button>
        </div>
      </el-col>
    </el-row>
    <register :visible.sync="registerVisible"></register>
  </div>
</template>
<script>
import Register from './Register.vue';
import api from '../../../api/ajax_page.js';
export default {
  name: 'Login',
  components: {
    Register,
  },
  data() {
    return {
      uuid: '',
      password: '',
      registerVisible: false,
    };
  },
  watch: {
    // email(newVal) {
    //   console.log(newVal);
    // }
    registerVisible(newVal) {
      console.log(newVal);
      if (!newVal) window.location.reload();
    },
  },
  methods: {
    login() {
      //   console.log("this is login");
      return api
        .login({ uuid: this.uuid, password: this.password })
        .then(res => {
          // console.log(res.err);
          if (res.err) {
            // console.log("dejie");
            this.$message.error({
              type: 'error',
              message: `something's wrong with login maybe check again your password`,
              showClose: true,
            });
            window.localStorage.removeItem('username');
            return;
          } else {
            localStorage.setItem('jwt', res.token);
            localStorage.setItem('username', this.uuid);
            this.$router.push('/homepage').catch(() => {});
          }
        })
        .catch(err => {
          console.log(err.response.status);
        });
    },
  },
};
</script>
<style lang="stylus"></style>