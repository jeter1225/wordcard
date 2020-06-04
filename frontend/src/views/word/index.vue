<template>
  <div>
    <el-row>
      <el-col :span="12">
	    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">WORD</h1></div>
		<div class="homepage_line_color"></div>
	  </el-col>
	  <el-col :span="12">
	    <div style="display: flex; justify-content: center; align-items: center">
		  <router-link to="/addWord">
		    <el-button type="info" onclick="" style="display: inline-block; margin-top: 50px; width: 60px; height: 60px; font-size: 35px;" icon="el-icon-plus" circle></el-button>
		  </router-link>
		</div>
	  </el-col>
  
    </el-row>
	
	<el-row>
      <el-col v-for="(card, index) in cardList" :key="index" :span="8" :offset="2" style="margin-top: 100px;">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="background-color:#F2E9E4; border-color:#272727;">
          <div style="padding: 14px;">
            <span style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 20px;">{{ card.name }}</span>
		    <p style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;">{{ card.numberOfWords }} words</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  name: 'Word',
  data() {
    return {
	  cardList: []
	}
  },
  methods: {
  },
  mounted: async function(){
    var temp = {user:"jeter1225"}
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
}
</script>
<style lang="stylus">

.el-card {
	max-width: 350px;
	height: 150px;
	background-color: #F2E9E4;
}

.span {
	font-size: 50px;
}
</style>