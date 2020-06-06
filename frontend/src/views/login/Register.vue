<template>
  <el-dialog :visible.sync="dialogVisible" center height="300px" top="109px" width="600px">
    <div class="dialog-title">Register Account</div>
    <el-row>
      <el-col :offset="5" :span="14" style="margin-top:10px">
        <el-input v-model="uuid" placeholder="please enter your name"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="5" :span="14" style="margin-top:10px">
        <el-input v-model="password" placeholder="please enter your password" show-password></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :offset="11" :span="2">
        <el-button type="primary" plain @click="registerAccount">Register</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import api from '../../../api/ajax_page.js';
export default {
  name: 'Register',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: this.visible,
      uuid: '',
      password: '',
    };
  },
  watch: {
    dialogVisible(newVal) {
      this.$emit('update:visible', newVal);
    },
    visible() {
      this.dialogVisible = this.visible;
    },
    // editUserName(newVal) {
    //   console.log(newVal);
    // },
  },
  methods: {
    registerAccount() {
      return api
        .register({
          uuid: this.uuid,
          password: this.password,
        })
        .then(res => {
          console.log(res.token);
          localStorage.setItem('jwt', res.token);
        })
        .catch(err => {
          err.response.status === 409 ? console.log('Error') : console.log(err);
        })
        .finally(() => {
          this.dialogVisible = false;
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
.dialog-title
  text-align center
  font-size 16px
</style>