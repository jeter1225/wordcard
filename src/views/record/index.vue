<template>
  <div>
    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">RECORD</h1></div>
    <div class="homepage_line_color"></div>
    <el-row>
      <el-col :span="12">
        <div class="record_left">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">歷史考試紀錄</h1></div>
          <div class="homepage_line_color2"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="record_right"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Record',
};
</script>
<style lang="stylus">
.homepage_font_style {
  color : black
  font-size : 40px
  margin-top : 3%
}
.homepage_line_color {
  background-color: black
  height:3px
  margin-top : -2%
}
.record_left {
  background-color: #F2E9E4
  height:500px
  margin-top:40px
  overflow : auto
}
.record_right {
  background-color: white
  height:500px
  margin-top:40px
  overflow : auto
}
.homepage_line_color2 {
  background-color: gray
  height:3px
}
</style>