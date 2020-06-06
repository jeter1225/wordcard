<template>
  <div>
    <h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">{{ this.cardName }} 測驗</h1>
	<div class="homepage_line_color"></div>
	
	<br>
	<br>
	
	<el-carousel indicator-position="outside" arrow="always" :autoplay="false" style="width: 70%; margin:0px auto;" >
      <el-carousel-item v-for="id in questionList" :key="id">
	  
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
	  <el-button type="info" style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold" round>我要考試</el-button>
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
  name: 'test',
  data(){
	return {
	  cardName: "",
	  wordList: [],
	  questionList: [],
	  answerList: []
	}
  },
  methods: {
    randomProduceQuestion() {
	  var tempList = this.wordList;
	  tempList.sort(() => Math.random() - 0.5);
	  this.questionList = tempList;
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
	
	this.randomProduceQuestion();
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