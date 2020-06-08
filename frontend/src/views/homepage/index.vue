<template>
  <div>
    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">首頁</h1></div>
    <div class="homepage_line_color"></div>
    <el-row>
      <el-col :span="15">
        <div class="everyone_like_to_use">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">官方推薦使用</h1></div>
          <div class="homepage_line_color2"></div>
          <el-row>
            <el-col v-for="(card, index) in cardList" :key="index" :span="8" :offset="2" style="margin-top: 100px;">
            <router-link v-bind:to="{name:'myWord', params:{cardName: card.name, isOfficial: true}}" style="text-decoration:none;">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" style="background-color:#F2E9E4; border-color:#272727;">
                <div style="padding: 14px;">
                  <span style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 20px;">{{ card.name }}</span>
              <p style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;">{{ card.numberOfWords }} words</p>
                </div>
              </el-card>
            </router-link>
            </el-col>
          </el-row>
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
  data() {
    return {
	  cardList: []
	}
  },
  mounted: async function(){
    var temp = {user:'official'}
    await fetch("http://localhost:3002/api/getWordcard", {
          method: 'POST',
          body: JSON.stringify(temp),
          headers: {
          'Content-Type': 'application/json'
    }})
    .then(res => { return res.json() })
    .then(originData => {
      if(originData.success) {
        console.log(originData)
        if(originData.data) {
          for (var i = 0; i < originData.data.length; i++){
            this.cardList.push({name: originData.data[i].name, numberOfWords: originData.data[i].numberOfWords});
          }
        }
      }
      else
        alert('Fail.');
    })
    .catch((err) => console.error(err));
    }
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