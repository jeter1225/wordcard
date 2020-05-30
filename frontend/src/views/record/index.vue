<template>
  <div>
    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">RECORD</h1></div>
    <div class="homepage_line_color"></div>
    <el-row>
      <el-col :span="12">
        <div class="record_left">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">歷史考試紀錄</h1></div>
          <div class="homepage_line_color2"></div>
          <div style="background-color : #4A4E69;">
            <h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 20px; color: white">．考試一</h3>
          </div>
          <div><h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 20px;">．考試二</h3></div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="record_mid"></div>
      </el-col>
      <el-col :span="10">
        <div class="record_right1">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">該次考試單字</h1></div>
          <h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 10px;"><i class="el-icon-close"></i>apple</h3>
          <h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 10px;"><i class="el-icon-check"></i>banana</h3>
        </div>
        <div class="record_right2">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">歷史考試紀錄</h1></div>
          <h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 10px;">．apple : 100%</h3>
          <h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 10px;">．banana : 50%</h3>
        </div>
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
  height:600px
  margin-top:40px
  overflow : auto
}
.record_mid {
  background-color: white
  height:600px
  margin-top:40px
  overflow : auto
}
.record_right1 {
  background-color: white
  height:300px
  margin-top:40px
  overflow : auto
}
.record_right2 {
  background-color: #F2E9E4
  height:300px
  overflow : auto
}
.homepage_line_color2 {
  background-color: gray
  height:3px
}
</style>