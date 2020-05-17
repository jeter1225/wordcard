<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      @select="onMenuSelected"
      active-text-color="black"
      mode="horizontal"
      text-color="black"
    >
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2">Word</el-menu-item>
      <el-menu-item index="3">Phrase</el-menu-item>
    </el-menu>
    <div
      style="position: relative; top: -45px; left: 20px; color: #494949; font-size: 25px;width: 500px"
    >Wordcard</div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      windowWidth: window.innerWidth,
      defaultActive: '1',
    };
  },
  created() {
    window.addEventListener('resize', this.resizeHandler);
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
          case '/phrase':
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
          this.$router.push('/phrase');
          break;
        default:
          this.$router.push('/');
          break;
      }
    },
    resizeHandler() {
      this.windowWidth = window.innerWidth;
    },
    logout() {
      this.$store.dispatch('auth/Logout', this.$router);
    },
  },
};
</script>

<style scoped lang="stylus">
.el-menu
  display flex
  justify-content flex-end
</style>
