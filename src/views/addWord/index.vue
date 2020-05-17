<template>
  <div>
    <el-row>
      <el-col :span="12">
	    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">addWord</h1></div>
	  </el-col>
	  <el-col :span="12">
	    <div style="display: flex; justify-content: center; align-items: center"> <el-button type="info" style="display: inline-block; margin-top: 50px; width: 60px; height: 60px; font-size: 35px;" icon="el-icon-plus" circle></el-button></div>
	  </el-col>
  
    </el-row>
    
    <el-row style="margin-top: 50px;">
      <el-col :span="8" v-for="o in 1" :key="o" :offset="2">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="background-color:#F2E9E4; border-color:#272727;">
          <div style="padding: 14px;">
            <span style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 20px;">GRE</span>
		    <p style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;">100 words</p>
          </div>
        </el-card>
      </el-col>
	  
      <el-col :span="8" v-for="o in 1" :key="o" :offset="2">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="background-color:#F2E9E4; border-color:#272727;">
          <div style="padding: 14px;">
            <span style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 20px;">TOEFL</span>
		    <p style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;">200 words</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top: 100px;">
      <el-col :span="8" v-for="o in 1" :key="o" :offset="2">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="background-color:#F2E9E4; border-color:#272727;">
          <div style="padding: 14px;">
            <span style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 20px;">My words 1</span>
		    <p style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;">50 words</p>
          </div>
        </el-card>
      </el-col>
	  
      <el-col :span="8" v-for="o in 1" :key="o" :offset="2">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="background-color:#F2E9E4; border-color:#272727;">
          <div style="padding: 14px;">
            <span style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 20px;">My words 2</span>
		    <p style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;">100 words</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  name: 'addWord',
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