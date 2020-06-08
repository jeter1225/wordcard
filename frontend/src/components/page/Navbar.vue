<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      @select="onMenuSelected"
      active-text-color="white"
      mode="horizontal"
      background-color="#4A4E69"
      text-color="white"
      style="font-family:Microsoft JhengHei; font-weight: bold"
    >
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2">Card</el-menu-item>
      <el-menu-item index="3">Record</el-menu-item>
    </el-menu>
    <div
      style="position: relative; top: -42px; left: 20px; color: white; font-size: 20px; font-family:Microsoft JhengHei; width: 500px; font-weight: bold"
    >WORDCARD</div>
    <el-button
      style="position: relative; top: -75px; left: 880px;"
      @click="logoutVisible = true"
    >Hi, {{username}}</el-button>

    <el-dialog
      :visible.sync="logoutVisible"
      center
      height="300px"
      top="109px"
      width="600px"
      title="Sure you want to logout?"
    >
      <span slot="footer">
        <el-button @click="logoutVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmLogout">Sure</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      windowWidth: window.innerWidth,
      defaultActive: '1',
      username: '',
      logoutVisible: false,
    };
  },
  created() {
    window.addEventListener('resize', this.resizeHandler);
    this.username = localStorage.getItem('username').toUpperCase();
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  watch: {
    $route: {
      immediate: true,
      handler(newVal) {
        switch (newVal.path) {
          case '/word':
            this.defaultActive = '2';
            break;
          case '/addWord':
            this.defaultActive = '2';
            break;
          case '/myWord':
            this.defaultActive = '2';
            break;
		  case '/test':
            this.defaultActive = '2';
            break;
		  case '/addWord':
            this.defaultActive = '2';
            break;
		  case '/editCard':
            this.defaultActive = '2';
            break;
          case '/record':
            this.defaultActive = '3';
            break;
          case '/homepage':
          default:
            this.defaultActive = '1';
            break;
        }
      },
    },
    windowWidth(newVal) {
      this.isCollapse = newVal < 1100;
    },
  },
  methods: {
    onMenuSelected(index) {
      switch (index) {
        case '1':
          this.$router.push('/homepage');
          break;
        case '2':
          this.$router.push('/word');
          break;
        case '3':
          this.$router.push('/record');
          break;
        default:
          this.$router.push('/');
          break;
      }
    },
    resizeHandler() {
      this.windowWidth = window.innerWidth;
    },
    confirmLogout() {
      this.logoutVisible = false;
      this.$router.push('/');
      localStorage.clear();
    },
  },
};
</script>

<style scoped lang="stylus">
.el-menu
  display flex
  justify-content flex-end
</style>
