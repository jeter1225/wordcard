<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div>
          <h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">Word</h1>
        </div>
        <div class="homepage_line_color"></div>
      </el-col>
    </el-row>

    <el-row style="width: 70%; margin:0px auto; margin-top: 50px;">
      <el-col :span="10">
        <div>
          <h1 style="font-size: 20px; font-family:Microsoft JhengHei;">小卡名稱</h1>
        </div>
        <div>
          <el-input placeholder="請輸入小卡名稱" v-model="cardname" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="10">
        <div>
          <div>
            <h1 style="font-size: 20px; font-family:Microsoft JhengHei; padding-left: 50px;"></h1>
          </div>
        </div>
      </el-col>
    </el-row>

    <div style="margin-bottom: 50px;">
      <el-row
        v-for="(id, index) in addWordList"
        :key="index"
        style="width: 70%; margin:0px auto; margin-top: 30px"
      >
        <el-col :span="10">
          <div>
            <h1 style="font-size: 20px; font-family:Microsoft JhengHei;">單字</h1>
          </div>
          <div>
            <el-input placeholder="請輸入單字" v-model="id.word" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <br />
          </div>
        </el-col>
        <el-col :span="10">
          <div>
            <h1 style="font-size: 20px; font-family:Microsoft JhengHei;">中文</h1>
          </div>
          <div>
            <el-input placeholder="請輸入翻譯" v-model="id.definition" clearable></el-input>
          </div>
        </el-col>
      </el-row>
    </div>

    <div style="margin-top: 50px; margin-bottom: 150px;">
      <el-button
        type="info"
        style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold;"
        @click="addRow()"
        icon="el-icon-plus"
        circle
      ></el-button>
    </div>

    <div class="homepage_line_color" style="margin:0px auto; width: 70%"></div>

    <div style="margin-top: 50px;">
      <el-button
        type="info"
        style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold"
        round
        @click="addWordCard()"
      >新增小卡</el-button>
      <!--
	  <router-link to="/Word" style="text-decoration:none;">
      </router-link>-->
    </div>

    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
export default {
  name: 'addWord',
  data() {
    return {
      cardname: '',
      addWordList: [
        { word: '', definition: '' },
        { word: '', definition: '' },
      ],
      cardNameList: [],
      inputErrorExist: false,
    };
  },
  methods: {
    addRow() {
      this.addWordList.push({ word: '', definition: '' });
    },
    checkEmpty() {
      var i;
      this.inputErrorExist = false;
      if (this.cardname == '') {
        this.$notify({
          title: '輸入不完全',
          message: '小卡名稱還未填寫!',
          type: 'warning',
        });
        this.inputErrorExist = true;
        return;
      }
      for (i = 0; i < this.addWordList.length; i++) {
        if ((this.addWordList[i].word == '') & (this.addWordList[i].definition == '')) {
          this.addWordList.splice(i, 1);
          i--;
          continue;
        }
        if ((this.addWordList[i].word == '') & (this.addWordList[i].definition != '')) {
          this.$notify({
            title: '輸入不完全',
            message: `${this.addWordList[i].definition}的單字還未填寫!`,
            type: 'warning',
          });

          this.inputErrorExist = true;
          break;
        }
        if ((this.addWordList[i].definition == '') & (this.addWordList[i].word != '')) {
          this.$notify({
            title: '輸入不完全',
            message: `${this.addWordList[i].word}的定義還未填寫!`,
            type: 'warning',
          });

          this.inputErrorExist = true;
          break;
        }
      }
      if (this.addWordList.length < 1) {
        this.$notify({
          title: '輸入不完全',
          message: '至少要有一個單字!',
          type: 'warning',
        });

        this.inputErrorExist = true;
        this.addWordList.push({ word: '', definition: '' });
      }
    },
    async addWordCard() {
      this.checkEmpty();
      if (this.inputErrorExist == true) {
        return;
      }

      var temp = { user: localStorage.getItem('username') };
      await fetch('http://localhost:3002/api/getWordcard', {
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
            // console.log(originData);
            if (originData.data) {
              for (var i = 0; i < originData.data.length; i++) {
                this.cardNameList.push(originData.data[i].name);
              }
            }
          } else {
            this.$message({
              type: 'error',
              message: 'FAIL.',
            });
          }
        })
        .catch(err => console.error(err));
      for (var i = 0; i < this.cardNameList.length; i++) {
        if (this.cardname == this.cardNameList[i]) {
          this.$notify({
            title: '名稱重複',
            message: '這個小卡名稱已經存在!',
            type: 'warning',
          });

          this.inputErrorExist = true;
          break;
        }
      }
      if (this.inputErrorExist == true) {
        return;
      }

      var tempWordcard = {
        user: localStorage.getItem('username'),
        name: this.cardname,
        numberOfWords: this.addWordList.length,
      };
      var tempWordlist = [];
      for (var i = 0; i < this.addWordList.length; i++) {
        tempWordlist.push({
          user: localStorage.getItem('username'),
          wordcardName: this.cardname,
          word: this.addWordList[i].word,
          definition: this.addWordList[i].definition,
        });
      }
      await fetch('http://localhost:3002/api/addWordcard', {
        method: 'POST',
        body: JSON.stringify(tempWordcard),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          return res.json();
        })
        .then(originData => {
          if (originData.success) {
            console.log('successfully. ');
          } else {
            this.$message({
              type: 'error',
              message: 'FAIL.',
            });
          }
        })
        .catch(err => console.error(err));
      await fetch('http://localhost:3002/api/addWord', {
        method: 'POST',
        body: JSON.stringify(tempWordlist),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          return res.json();
        })
        .then(originData => {
          if (originData.success) {
            console.log('successfully. ');
          } else {
            this.$message({
              type: 'error',
              message: 'FAIL.',
            });
          }
        })
        .catch(err => console.error(err));

      tempWordlist = [];
      for (var i = 0; i < this.addWordList.length; i++) {
        tempWordlist.push({
          word: this.addWordList[i].word,
          definition: this.addWordList[i].definition,
          answerNum: 0,
          correctNum: 0,
        });
      }
      var tempWordAccuracy = {
        user: localStorage.getItem('username'),
        wordcardName: this.cardname,
        accuracyList: tempWordlist,
      };
      await fetch('http://localhost:3002/api/addWordAccuracy', {
        method: 'POST',
        body: JSON.stringify(tempWordAccuracy),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          return res.json();
        })
        .then(originData => {
          if (originData.success) {
            console.log('successfully. ');
          } else {
            this.$message({
              type: 'error',
              message: 'FAIL.',
            });
          }
        })
        .catch(err => console.error(err));

      this.$router.push('/word');
    },
  },
};
</script>
<style lang="stylus">
.span
  font-size 50px
</style>