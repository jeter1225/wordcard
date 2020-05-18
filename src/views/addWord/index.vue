<template>
  <div>
    <div style="margin-bottom: 50px;">
    <el-row>
      <el-col :span="12">
	    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">addWord</h1></div>
		<div class="homepage_line_color"></div>
	  </el-col>
    </el-row>
    
    <el-row style="width: 70%; margin:0px auto; margin-top: 50px;">
      <el-col :span="10">
          <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei;">小卡名稱</h1></div>
		  <div>
		  <el-input
		    placeholder="请输入内容"
		    v-model="word1"
		    clearable>
		  </el-input>
		</div>
      </el-col>
      <el-col :span="10">
        <div><div><h1 style="font-size: 20px; font-family:Microsoft JhengHei; padding-left: 50px;"></h1></div></div>
      </el-col>
    </el-row>
	<el-row style="width: 70%; margin:0px auto; margin-top: 30px">
      <el-col :span="10">
          <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei;">單字</h1></div>
		  <div>
		  <el-input
		    placeholder="请输入内容"
		    v-model="word1"
		    clearable>
		  </el-input>
		</div>
      </el-col>
	  <el-col :span="4"><div><br></div></el-col>
      <el-col :span="10">
	    <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei;">中文</h1></div>
        <div>
		  <el-input
		    placeholder="请输入内容"
		    v-model="word1"
		    clearable>
		  </el-input>
		</div>
      </el-col>
    </el-row>
	<el-row style="width: 70%; margin:0px auto; margin-top: 30px">
      <el-col :span="10">
          <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei;">單字</h1></div>
		  <div>
		  <el-input
		    placeholder="请输入内容"
		    v-model="word1"
		    clearable>
		  </el-input>
		</div>
      </el-col>
	  <el-col :span="4"><div><br></div></el-col>
      <el-col :span="10">
	    <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei;">中文</h1></div>
        <div>
		  <el-input
		    placeholder="请输入内容"
		    v-model="definition1"
		    clearable>
		  </el-input>
		</div>
      </el-col>
	  
    </el-row>
	</div>
	
	<div class="homepage_line_color" style="margin:0px auto; width: 70%"></div>
	
	<div style="margin-top: 50px;">
	  <el-button type="info" style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold" icon="el-icon-plus" circle></el-button>
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
	  word1: "",
	  word2: "",
	  definition1: "",
	  definition2: ""
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