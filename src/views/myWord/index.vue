<template>
  <div>
    <h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">My Word 1</h1>
	<div class="homepage_line_color"></div>
	
	<br>
	<br>
	
	<el-carousel indicator-position="outside" arrow="always" :autoplay="false" style="width: 70%; margin:0px auto;">
      <el-carousel-item v-for="item in 4" :key="item" style="background-color: #F2E9E4;">
        <h3 style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold;">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
	
	<div>
	  <el-button type="info" style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold" round>我要考試</el-button>
	</div>
    
    <el-row style="width: 70%; margin:0px auto; margin-top: 50px;">
      <el-col :span="5">
          <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei; padding-left: 50px;">新增詞彙</h1></div>
      </el-col>
      <el-col :span="15">
        <div><div><h1 style="font-size: 20px; font-family:Microsoft JhengHei; padding-left: 50px;"></h1></div></div>
      </el-col>
    </el-row>
	<el-row style="width: 70%; margin:0px auto;">
      <el-col :span="5">
          <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei; padding-left: 50px;">Word</h1></div>
      </el-col>
      <el-col :span="10">
        <div>
		  <el-input
		    placeholder="请输入内容"
		    v-model="word"
		    clearable>
		  </el-input>
		</div>
      </el-col>
    </el-row>
	<el-row style="width: 70%; margin:0px auto;">
      <el-col :span="5">
          <div><h1 style="font-size: 20px; font-family:Microsoft JhengHei; padding-left: 50px;">Definition</h1></div>
      </el-col>
      <el-col :span="10">
        <div>
		  <el-input
		    placeholder="请输入内容"
		    v-model="definition"
		    clearable>
		  </el-input>
		</div>
      </el-col>
	  <el-col :span="5">
        <div>
		  <div style="display: flex; justify-content: center; align-items: center">
		  <router-link to="/">
		    <el-button type="info" onclick="" style="display: inline-block; margin-top: 50px; width: 40px; height: 40px; font-size: 15px" icon="el-icon-plus" circle></el-button>
		  </router-link>
		  </div>
		</div>
      </el-col>
    </el-row>
	
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
	  word: "",
	  definition: ""
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