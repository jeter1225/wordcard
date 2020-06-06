<template>
  <div>
    <el-row>
      <el-col
        :offset="8"
        :span="8"
        style="display:flex; justify-content:center; align-items: center;"
      >
        <div>Login to Create your own WordCard</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="8" :span="8" style="margin-top:10px">
        <el-input v-model="uuid" placeholder="please enter your username"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="8" :span="8" style="margin-top:10px">
        <el-input v-model="password" placeholder="please enter your password" show-password></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :offset="11" :span="2">
        <el-button type="primary" plain @click="login">Login</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :offset="8"
        :span="8"
        style="display: flex; justify-content:center;align-items: center"
      >
        <div>
          Dont have an account??
          <el-button @click="registerVisible = true">Click Here</el-button>
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
            this.$message.error(
              `something's wrong with login
            maybe check again your password`
            );
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