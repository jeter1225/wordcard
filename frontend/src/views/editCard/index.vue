<template>
  <div>
    <el-row>
      <el-col :span="12">
	    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">Edit Card</h1></div>
		<div class="homepage_line_color"></div>
	  </el-col>
    </el-row>
	
	<div style="margin-bottom: 50px;">
	  <el-row style="width: 70%; margin:0px auto; margin-top: 30px">
		<el-col :span="10">
			<div><h1 style="font-size: 20px; font-family:Microsoft JhengHei;">單字</h1></div>
		</el-col>
		<el-col :span="10">
			<div><h1 style="font-size: 20px; font-family:Microsoft JhengHei;">中文</h1></div>
		</el-col>
	  </el-row>
	  <el-row v-for="(id, index) in addWordList" :key="index" style="width: 70%; margin:0px auto; margin-top: 30px">
        <el-col :span="10">
		  <div>
		    <el-input placeholder="请输入内容" v-model="id.word" clearable :disabled="true"></el-input>
		  </div>
        </el-col>
        <el-col :span="10">
          <div>
		    <el-input placeholder="请输入内容" v-model="id.definition" clearable :disabled="true"></el-input>
		  </div>
        </el-col>
		<el-col :span="4">
          <div style="margin-left: 20px; margin-top: 3px">
			  <i class="el-icon-delete-solid" style="font-size:30px"></i>
		  </div>
        </el-col>
	  
      </el-row>
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
	  ],
	  cardNameList: [],
	  inputErrorExist: false
	}
  },
  methods: {
    addRow() {
	  this.addWordList.push({word: "", definition: ""})
	},
	async addWordCard() {
		this.checkEmpty();
		if (this.inputErrorExist == true){ return; }
		
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
						this.cardNameList.push(originData.data[i].name);
					}
				}
			}
			else
				alert('Fail.');
		})
		.catch((err) => console.error(err));
		for (var i = 0; i < this.cardNameList.length; i++){
		  if (this.cardname == this.cardNameList[i]){
		    alert("這個小卡名稱已經存在!");
			this.inputErrorExist = true;
			break;
		  }
		}
		if (this.inputErrorExist == true){ return; }
		
		var tempWordcard = {user:"jeter1225", name:this.cardname, numberOfWords:this.addWordList.length};
		var tempWordlist = [];
		for (var i = 0; i < this.addWordList.length; i++){
		  tempWordlist.push({user:"jeter1225", wordcardName:this.cardname, word:this.addWordList[i].word, definition:this.addWordList[i].definition});
		}
		await fetch("http://localhost:3002/api/addWordcard", {
			method: 'POST',
			body: JSON.stringify(tempWordcard),
			headers: {
				'Content-Type': 'application/json'
		}})
		.then(res => { return res.json() })
		.then(originData => {
			if(originData.success) {
				console.log("successfully. ");
			}
			else
				alert('Fail.');
		})
		.catch((err) => console.error(err));	
		await fetch("http://localhost:3002/api/addWord", {
			method: 'POST',
			body: JSON.stringify(tempWordlist),
			headers: {
				'Content-Type': 'application/json'
		}})
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
	},
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