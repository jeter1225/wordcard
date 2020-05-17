<template>
  <div>
    <div class="homepage_font_style">HOMEPAGE</div>
    <div class="homepage_line_color"></div>
    <el-row>
      <el-col :span="15">
        <div class="everyone_like_to_use">
          <div class="everyone_like_to_use_title">大家都愛用</div>
          <div class="homepage_line_color2"></div>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="homepage_bgcolor_white"></div>
      </el-col>
      <el-col :span="8">
        <div class="homepage_bgcolor_white">
          <div class="latest_news">最新公告</div>
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
}
.homepage_line_color {
  background-color: black
  height:3px
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
  color : black
  font-size : 40px
  margin-top : 3%
}
.title1 {
  color : white
  font-size : 50px
  padding-top : 3%
  padding-left : 3%
}
.title2 {
  color : black
  font-size : 40px
  margin_left : 50%
  margin-top : 3%
}
</style>