<template>
  <div>
    <el-row>
	  <el-col :span="16">
        <h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">{{ this.cardName }}</h1>
	  </el-col>
	  <el-col :span="4">
	    <el-button style="position:absolute; top: 30%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold" icon="el-icon-edit" round @click="editWordcard()">編輯小卡</el-button>
	  </el-col>
     <el-col :span="4">
	    <el-button type="danger" style="position:absolute; right: 5%; top: 30%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold" icon="el-icon-delete" round @click="deleteWordCard()">刪除小卡</el-button>
	  </el-col>
	</el-row>
	<div class="homepage_line_color"></div>
	
	<br>
	<br>
	
	<el-carousel indicator-position="outside" arrow="always" :autoplay="false" style="width: 70%; margin:0px auto;" >
      <el-carousel-item v-for="id in wordList" :key="id">
	  
        <el-row style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold; text-align:center; line-height:200px;">
          <el-col :span="12">
            <div><h3>{{ id.word }}</h3></div>
		  </el-col>
		  <el-col :span="1">
            <div class="headerDivider"></div> 
          </el-col>
          <el-col :span="12">
            <div><h3>{{ id.definition }}</h3></div>
          </el-col>
        </el-row>
		
      </el-carousel-item>
    </el-carousel>
	
	<div>
	  <router-link v-bind:to="{name:'test', params:{cardName: cardName}}" style="text-decoration:none;">
	    <el-button type="info" style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold" round>我要考試</el-button>
	  </router-link>
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
  name: 'myWord',
  data(){
	return {
	  word: "",
	  definition: "",
	  cardName: "",
	  wordList: []
	}
  },
  methods: {
    async deleteWordCard() {
	  if (confirm("確認要刪除小卡嗎?(刪除後不可復原)")){
	    await fetch("http://localhost:3002/api/deleteWordcard/jeter1225/" + this.cardName , {
          method: 'DELETE',
        })
	    .then(res => { return res.json() })
	    .then(originData => {
		  if(originData.success) {
			console.log("successfully. ");
		  }
		  else
			alert('Fail.');
	    })
	    .catch((err) => console.error(err));
		this.$router.push("/word");
	  }
  },
  editWordcard() {
    console.log("hi");
    this.$router.push("/edit");
  }
  },
  mounted: async function(){
    this.cardName = this.$route.params.cardName;
    var temp = {user:"jeter1225", wordcardName: this.cardName}
	await fetch("http://localhost:3002/api/getWord", {
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
					this.wordList.push({word: originData.data[i].word, definition: originData.data[i].definition});
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
.headerDivider { 
    border-left:1px solid #38546d; 
    border-right:1px solid #16222c; 
    height:98%; 
    position:absolute; 
    top:2%; 
} 

.el-carousel__item {
	background-color: #F2E9E4;
}

.el-card {
	max-width: 350px;
	height: 150px;
	background-color: #F2E9E4;
}

.span {
	font-size: 50px;
}
</style>