<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div>
          <h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">編輯 {{cardName}}</h1>
        </div>
        <div class="homepage_line_color"></div>
      </el-col>
    </el-row>
	
    <div style="margin-bottom: 50px;">
      <el-row style="width: 70%; margin:0px auto; margin-top: 30px">
        <el-col :span="10">
          <div>
            <h1 style="font-size: 20px; font-family:Microsoft JhengHei;">單字</h1>
          </div>
        </el-col>
        <el-col :span="10">
          <div>
            <h1 style="font-size: 20px; font-family:Microsoft JhengHei;">中文</h1>
          </div>
        </el-col>
      </el-row>
      <el-row
        v-for="(card, index) in newWordList"
        :key="index"
        style="width: 70%; margin:0px auto; margin-top: 30pxl; display: flex; align-items: center"
      >
        <el-col :span="10">
          <div>
            <el-input placeholder="请输入内容" v-model="card.word" clearable></el-input>
          </div>
        </el-col>
		<el-col :span="1"><div><br></div></el-col>
        <el-col :span="10">
          <div>
            <el-input placeholder="请输入内容" v-model="card.definition" clearable></el-input>
          </div>
        </el-col>
		<el-col :span="1"><div><br></div></el-col>
        <el-col :span="2" >
          <div style="margin-top: 3px">
             <el-button icon="el-icon-delete-solid" style="font-size:20px" @click="deleteWord(index)" circle></el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <br />
	
	<div style="margin-bottom: 100px;">
	  <el-button type="info" style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold;" @click="addWord" icon="el-icon-plus" circle></el-button>
	</div>
    <div class="homepage_line_color" style="margin:0px auto; width: 70%"></div>

    <div style="margin-top: 50px;">
      <el-button type="info" style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; margin-right: 100px;" round @click="cancelChange">返回</el-button>
	  
	  <el-button type="info" style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold" round @click="confirmChange">確認</el-button>
      
	  <br>
	  <br>
	  <br>
	  <br>
	  <br>
    </div>
  </div>
</template>
<script>
export default {
  name: 'editCard',
  data() {
    return {
	  cardName: "",
      wordList: [],
	  newWordList: [],
	  inputErrorExist: false
    };
  },
  methods: {
	deleteWord(index) {
	  this.newWordList.splice(index, 1);
	},
	addWord() {
	  this.newWordList.push({word: "", definition: ""});
	},
	checkEmpty() {
	  var i;
	  this.inputErrorExist = false;
	  for (i = 0; i < this.newWordList.length; i++){
	    if (this.newWordList[i].word == "" & this.newWordList[i].definition == ""){
		  this.newWordList.splice(i, 1);
		  i--;
		  continue;
		}
		if (this.newWordList[i].word == "" & this.newWordList[i].definition != ""){
		  alert(this.newWordList[i].definition + "的單字還未填寫!");
		  this.inputErrorExist = true;
		  break;
		}
		if (this.newWordList[i].definition == "" & this.newWordList[i].word != ""){
		  alert(this.newWordList[i].word + "的定義還未填寫!");
		  this.inputErrorExist = true;
		  break;
		}
	  }
	  if (this.newWordList.length < 1){
	    alert("至少要有一個單字!");
		this.inputErrorExist = true;
		this.newWordList.push({word: "", definition: ""});
	  }
	},
	async confirmChange() {
	  this.checkEmpty();
	  if (this.inputErrorExist == true){ return; }
	  
	  if (confirm('確認要改動嗎?')) {
	    // 先刪掉
        await fetch('http://localhost:3002/api/deleteWordcard/jeter1225/' + this.cardName, {
          method: 'DELETE',
        })
        .then(res => {
          return res.json();
        })
        .then(originData => {
          if (originData.success) {
            console.log('successfully. ');
          } else alert('Fail.');
        })
        .catch(err => console.error(err));
		
		for (var i = 0; i < this.wordList.length; i++){
		  var wordName = this.wordList[i].word;
		  await fetch('http://localhost:3002/api/deleteWord/jeter1225/' + this.cardName + '/' + wordName, {
			method: 'DELETE',
			},
		  )
		  .then(res => {
			return res.json();
		  })
		  .then(originData => {
			if (originData.success) {
			  console.log('successfully. ');
			} else alert('Fail.');
		  })
		  .catch(err => console.error(err));
		}
		
		// 再新增
		var tempWordcard = {user:"jeter1225", name:this.cardName, numberOfWords:this.newWordList.length};
		var tempWordlist = [];
		for (var i = 0; i < this.newWordList.length; i++){
		  tempWordlist.push({user:"jeter1225", wordcardName:this.cardName, word:this.newWordList[i].word, definition:this.newWordList[i].definition});
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
		
		this.$router.push({name:'myWord', params:{cardName: this.cardName}});
      }
	},
	cancelChange() {
	  if (confirm('確認要取消改動嗎?(系統不會記錄你的改動)')){
	    this.$router.push({name:'myWord', params:{cardName: this.cardName}});
	  }
	}
  },
  async mounted() {
    this.cardName = this.$route.params.cardName;
    var temp = { user: 'jeter1225', wordcardName: this.cardName };
    await fetch('http://localhost:3002/api/getWord', {
      method: 'POST',
      body: JSON.stringify(temp),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(originData => {
        if (originData.success) {
          if (originData.data) {
            for (var i = 0; i < originData.data.length; i++) {
              this.wordList.push({ word: originData.data[i].word, definition: originData.data[i].definition });
            }
          }
        } else alert('Fail.');
      })
      .catch(err => console.error(err));
	
	for (var i = 0; i < this.wordList.length; i++){
	  this.newWordList.push({ word:  this.wordList[i].word, definition: this.wordList[i].definition});
	}
  },
};
</script>
<style lang="stylus">
.el-card
  max-width 350px
  height 150px
  background-color #F2E9E4

.span
  font-size 50px
</style>