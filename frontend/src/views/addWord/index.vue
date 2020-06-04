<template>
  <div>
    <el-row>
      <el-col :span="12">
	    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">Word</h1></div>
		<div class="homepage_line_color"></div>
	  </el-col>
    </el-row>
    
    <el-row style="width: 70%; margin:0px auto; margin-top: 50px;">
      <el-col :span="10">
          <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei;">小卡名稱</h1></div>
		  <div>
		  <el-input
		    placeholder="请输入内容" v-model="cardname" clearable>
		  </el-input>
		</div>
      </el-col>
      <el-col :span="10">
        <div><div><h1 style="font-size: 20px; font-family:Microsoft JhengHei; padding-left: 50px;"></h1></div></div>
      </el-col>
    </el-row>
	
	<div style="margin-bottom: 50px;">
	  <el-row v-for="(id, index) in addWordList" :key="index" style="width: 70%; margin:0px auto; margin-top: 30px">
        <el-col :span="10">
          <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei;">單字</h1></div>
		  <div>
		    <el-input placeholder="请输入内容" v-model="id.word" clearable></el-input>
		  </div>
        </el-col>
	    <el-col :span="4"><div><br></div></el-col>
        <el-col :span="10">
	      <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei;">中文</h1></div>
          <div>
		    <el-input placeholder="请输入内容" v-model="id.definition" clearable></el-input>
		  </div>
        </el-col>
	  
      </el-row>
	</div>
	
	<div style="margin-top: 50px; margin-bottom: 150px;">
	  <el-button type="info" style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold;" @click="addRow()" icon="el-icon-plus" circle></el-button>
	</div>
	
	<div class="homepage_line_color" style="margin:0px auto; width: 70%"></div>
	
	<div style="margin-top: 50px;">
	  
	  <router-link to="/Word" style="text-decoration:none;">
	  <el-button type="info" style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold" round>新增小卡</el-button>
	  </router-link>
	</div>
	
	<br>
	<br>
	<br>
	<br>
	<br>

  </div>
</template>
<script>
export default {
  name: 'addWord',
  data(){
	return {
	  cardname: "",
	  addWordList: [
	    {word: "", definition: ""},
		{word: "", definition: ""}
	  ]
	}
  },
  methods: {
    addRow() {
	  this.addWordList.push({word: "", definition: ""})
	}
  }
};
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