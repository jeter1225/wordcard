<template>
  <div>
    <h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">{{ this.cardName }} 測驗</h1>
	<div class="homepage_line_color"></div>
	
	<br>
	<br>
	
	<el-row>
	  <el-col :span="4">
	    <br>
	  </el-col>
      <el-col :span="8">
	    <el-card shadow="hover" style="background-color:#F2E9E4; text-align:center; line-height:200px; border-color:#272727;">
          <div>
		    <span style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold;">{{ questionList[questionNo].word }}</span>
	      </div>
	    </el-card>
	  </el-col>
	  <el-col :span="8">
	    <el-card shadow="hover" style="background-color:#F2E9E4; text-align:center; line-height:200px; border-color:#272727;">
          <div>
		    <el-input placeholder="请输入内容" v-model="answer" style="font-size: 30px;" @keyup.enter.native="checkAnswer" clearable></el-input>
	      </div>
	    </el-card>
	  </el-col>
	</el-row>
	
	
	<br>
	<br>
	<br>
	
	<div>
	  <el-button type="info" style="position:absolute; margin-right: 180px; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold" icon="el-icon-d-arrow-right" @click="checkAnswer" round>跳過問題</el-button>
	  <el-button type="danger" style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold" icon="el-icon-finished" round>結束考試</el-button>
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
	  questionNo: 0,
	  answer: "",
	  answerList: []
	}
  },
  methods: {
    randomProduceQuestion() {
	  var tempList = this.wordList;
	  tempList.sort(() => Math.random() - 0.5);
	  this.questionList = tempList;
	},
	checkAnswer() {
	  if (this.answer == this.questionList[this.questionNo].definition){
	    alert("correct");
		this.questionNo++;
		this.answer="";
	  }
	  else {
	    alert("incorrect");
		this.questionNo++;
		this.answer="";
	  }
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
<style lang="stylus" scoped>
.headerDivider { 
    border-left:1px solid #38546d; 
    border-right:1px solid #16222c; 
    height:98%; 
    position:absolute; 
    top:2%; 
}

.el-card {
	height: 250px;;
	max-width: 100%;
	background-color: #F2E9E4;
}

.span {
	font-size: 50px;
}
</style>