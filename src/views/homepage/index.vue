<template>
  <div>
    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">HOMEPAGE</h1></div>
    <div class="homepage_line_color"></div>
    <el-row>
      <el-col :span="15">
        <div class="everyone_like_to_use">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">大家都愛用</h1></div>
          <div class="homepage_line_color2"></div>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="homepage_bgcolor_white"></div>
      </el-col>
      <el-col :span="8">
        <div class="homepage_bgcolor_white">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">最新公告</h1></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Homepage',
};
</script>
<style lang="stylus">
.homepage_bgcolor_white {
  background-color: white
  height:500px
  margin-top:40px
  overflow : auto
}
.homepage_line_color {
  background-color: black
  height:3px
  margin-top : -2%
}
.homepage_line_color2 {
  background-color: gray
  height:3px
}
.everyone_like_to_use {
  background-color: #F2E9E4
  height:500px
  margin-top:40px
  overflow : auto
}
.everyone_like_to_use_title {
  color : black
  font-size : 40px
  text-align : center
  padding-top : 5px
}
.latest_news {
  color : black
  font-size : 40px
  text-align : center
  padding-top : 5px
  overflow : auto
}
.homepage_font_style {
  font-family : Microsoft JhengHei
  color : black
  font-size : 40px
  margin-top : 3%
}

</style>