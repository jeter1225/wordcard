<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div>
          <h1
            style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;"
          >Edit {{cardname}}</h1>
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
        v-for="(card, index) in wordList"
        :key="card.word + index"
        style="width: 70%; margin:0px auto; margin-top: 30pxl; display: flex; align-items: center"
      >
        <el-col :span="9">
          <div>
            <el-input placeholder="请输入内容" v-model="card.word" clearable></el-input>
          </div>
        </el-col>
		<el-col :span="1"><div><br></div></el-col>
        <el-col :span="9">
          <div>
            <el-input placeholder="请输入内容" v-model="card.definition" clearable></el-input>
          </div>
        </el-col>
		<el-col :span="1"><div><br></div></el-col>
        <el-col :span="2">
          <div style="margin-left: 20px; margin-top: 3px">
            <el-button icon="el-icon-edit" style="font-size:20px" @click="editWord(card.word)" circle></el-button>
          </div>
        </el-col>
        <el-col :span="2" >
          <div style="margin-top: 3px">
             <el-button icon="el-icon-delete-solid" style="font-size:20px" @click="deleteWord(index)" circle></el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="homepage_line_color" style="margin:0px auto; width: 70%"></div>

    <div style="margin-top: 50px;">
      <el-button
        type="info"
        style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; margin-right: 100px;"
        round
        @click="goBack()"
      >返回</el-button>
	  
	  <el-button
        type="info"
        style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold"
        round
        @click="confirmChange()"
      >666</el-button>
      <!--
	  <router-link to="/Word" style="text-decoration:none;">
      </router-link>-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'editWord',
  data() {
    return {
      wordList: [],
	  newWordList: [],
      inputErrorExist: false,
    };
  },
  methods: {
    goBack() {
      this.$emit('update:edit', false);
    },
    /*async deleteWord(a) {
      await fetch('http://localhost:3002/api/deleteWord/jeter1225/' + this.cardname + '/' + a, {
        method: 'DELETE',
        },
      )
      .then(res => {
        return res.json();
      })
      .then(originData => {
        if (originData.success) {
          alert("successfully deleted");
        } else alert('Fail.');
      })
      .catch(err => console.error(err));
      this.wordList = [];
      var temp = { user: 'jeter1225', wordcardName: this.cardname };
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
    },*/
    /*async editWord(a) {
      console.log(a);
      // var temp = {user:"jeter1225", wordcardName:this.cardname, word:a }
      // await fetch('http://localhost:3002/api/editWord', {
      //     method: 'POST',
      //     body: JSON.stringify(temp),
      //     headers: {
      //     'Content-Type': 'application/json'
      //     }
      //   },
      // )
      // .then(res => {
      //   return res.json();
      // })
      // .then(originData => {
      //   if (originData.success) {
      //     alert("successfully deleted");
      //   } else alert('Fail.');
      // })
      // .catch(err => console.error(err));
      // var temp = { user: 'jeter1225', wordcardName: this.cardname };
    },*/
	deleteWord(index) {
	  this.newWordList.splice(index, 1);
	},
	async confirmChange() {
	  if (confirm('確認要改動嗎?')) {alert(this.newWordList);
	    // 先刪掉
        await fetch('http://localhost:3002/api/deleteWordcard/jeter1225/' + this.cardname, {
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
		  await fetch('http://localhost:3002/api/deleteWord/jeter1225/' + this.cardname + '/' + wordName, {
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
		
		var tempWordcard = {user:"jeter1225", name:this.cardname, numberOfWords:this.newWordList.length};
		var tempWordlist = [];
		for (var i = 0; i < this.newWordList.length; i++){
		  tempWordlist.push({user:"jeter1225", wordcardName:this.cardname, word:this.newWordList[i].word, definition:this.newWordList[i].definition});
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
		
		this.$emit('update:edit', false);
      }
	}
  },
  props: {
    cardname: {
      type: String,
      default: '',
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    var temp = { user: 'jeter1225', wordcardName: this.cardname };
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
	
	this.newWordList = this.wordList;
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