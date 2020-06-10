<template>
  <div>
    <h1
      style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;"
    >{{ this.cardName }} 測驗</h1>
    <div class="homepage_line_color"></div>

    <br />
    <br />

    <el-row v-if="showResult != 1">
      <el-col :span="4">
        <br />
      </el-col>
      <el-col :span="8">
        <el-card
          shadow="hover"
          style="background-color:#F2E9E4; text-align:center; line-height:200px; border-color:#272727;"
        >
          <div>
            <span
              v-if="showResult == -1"
              style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold;"
            >{{ questionList[questionNo].word }}</span>
            <span
              v-if="showResult == 0"
              style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold;"
            >測驗結束</span>
          </div>
        </el-card>
        <p
          v-if="correctFlag == 1"
          style="color: green; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;"
        >回答正確! 正確答案： {{ correctAnswer.word }} {{ correctAnswer.definition }}</p>
        <p
          v-if="correctFlag == 0"
          style="color: red; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;"
        >回答錯誤! 正確答案： {{ correctAnswer.word }} {{ correctAnswer.definition }}</p>
      </el-col>
      <el-col :span="8">
        <el-card
          shadow="hover"
          style="background-color:#F2E9E4; text-align:center; line-height:200px; border-color:#272727;"
        >
          <div>
            <el-input
              v-if="showResult == -1"
              placeholder="請輸入答案"
              v-model="answer"
              style="font-size: 30px;"
              @keyup.enter.native="checkAnswer"
              clearable
            ></el-input>
            <el-button
              v-if="showResult == 0"
              style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold; background-color: #F2E9E4; border:0px; margin-top:67px;"
              @click="showGrade"
            >按此查看測驗成績</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <p
      v-if="showResult == 1"
      style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px; float:left;"
    >你總共回答了</p>
    <p
      v-if="showResult == 1"
      style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left; color: blue"
    >{{ result.answerNum }}</p>
    <p
      v-if="showResult == 1"
      style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left;"
    >題，答對</p>
    <p
      v-if="showResult == 1"
      style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left; color: blue"
    >{{ result.correctNum }}</p>
    <p
      v-if="showResult == 1"
      style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left;"
    >題，正確率</p>
    <p
      v-if="showResult == 1 & result.correctPercent >= 60"
      style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left; color: #00DB00"
    >{{ result.correctPercent }}</p>
    <p
      v-if="showResult == 1 & result.correctPercent < 60"
      style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left; color: red"
    >{{ result.correctPercent }}</p>
    <p
      v-if="showResult == 1"
      style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left;"
    >%</p>

    <el-table
      stripe
      v-if="showResult == 1"
      :data="questionList"
      style="width: 100%; font-size:16px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;"
      :row-style="{height:'50px'}"
    >
      <el-table-column prop="word" label="單字" width="180"></el-table-column>
      <el-table-column prop="definition" label="中文" width="180"></el-table-column>
      <el-table-column prop="answer" label="你的答案" width="180"></el-table-column>
      <el-table-column
        prop="correct"
        label="正確與否"
        width="180"
        :filters="[{ text: '回答正確', value: '回答正確' }, { text: '回答錯誤', value: '回答錯誤' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.correct === '回答正確' ? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.correct}}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <br />

    <div v-if="showResult == -1">
      <el-button
        type="danger"
        style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold"
        icon="el-icon-finished"
        @click="finishAdvance"
        round
      >結束考試</el-button>
    </div>
    <div v-if="showResult == 1">
      <el-button
        type="info"
        style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold"
        icon="el-icon-refresh-right"
        @click="goBack"
        round
      >回到單字本</el-button>
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
  name: 'test',
  data() {
    return {
      cardName: '',
      wordList: [],
      questionList: [],
      questionNo: 0,
      answer: '',
      correctFlag: -1,
      correctAnswer: { word: '', definition: '' },
      showResult: -1,
      result: { answerNum: 0, correctNum: 0, correctPercent: 0 },
      answerList: [],
      accuracyList: [],
    };
  },
  methods: {
    randomProduceQuestion() {
      var tempList = this.wordList;
      tempList.sort(() => Math.random() - 0.5);
      this.questionList = tempList;
    },
    checkAnswer() {
      this.correctAnswer.word = this.questionList[this.questionNo].word;
      this.correctAnswer.definition = this.questionList[this.questionNo].definition;
      this.questionList[this.questionNo].answer = this.answer;
      this.result.answerNum++;
      if (this.answer == this.questionList[this.questionNo].definition) {
        this.answer = '';
        this.correctFlag = 1;
        this.questionList[this.questionNo].correct = '回答正確';
        this.result.correctNum++;
      } else {
        this.answer = '';
        this.correctFlag = 0;
        this.questionList[this.questionNo].correct = '回答錯誤';
      }
      if (this.questionNo == this.questionList.length - 1) {
        this.showResult = 0;

        this.addTest();
        this.modifyWordAccuracy();
      } else {
        this.questionNo++;
      }
    },
    async showGrade() {
      this.result.correctPercent = Math.round((100 * this.result.correctNum) / this.result.answerNum);
      this.showResult = 1;
    },
    filterTag(value, row) {
      return row.correct === value;
    },
    finishAdvance() {
      if (confirm('確認要提前結束測驗嗎?')) {
        this.result.correctPercent = Math.round((100 * this.result.correctNum) / this.result.answerNum);
        var tempLength = this.questionList.length;
        for (var i = this.result.answerNum; i < tempLength; i++) {
          this.questionList.splice(this.result.answerNum, 1);
        }
        this.showResult = 1;
        this.addTest();
        this.modifyWordAccuracy();
      }
    },
    async addTest() {
      var tempTest = {
        user: localStorage.getItem('username'),
        wordcardName: this.cardName,
        questionList: this.questionList,
      };
      await fetch('http://localhost:3002/api/addTest', {
        method: 'POST',
        body: JSON.stringify(tempTest),
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
    },
    async modifyWordAccuracy() {
      // 讀
      var temp = { user: localStorage.getItem('username'), wordcardName: this.cardName };
      var tempWordlist = [];
      await fetch('http://localhost:3002/api/getWordAccuracy', {
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
                tempWordlist.push(originData.data[i]);
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

      for (var i = 0; i < tempWordlist[0].accuracyList.length; i++) {
        this.accuracyList.push(tempWordlist[0].accuracyList[i]);
        this.accuracyList[i].correctPercent = Math.round(
          (100 * this.accuracyList[i].correctNum) / this.accuracyList[i].answerNum
        );
      }

      // 刪
      await fetch(
        'http://localhost:3002/api/deleteWordAccuracy/' + localStorage.getItem('username') + '/' + this.cardName,
        {
          method: 'DELETE',
        }
      )
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

      // 改
      for (var i = 0; i < this.questionList.length; i++) {
        if (this.questionList[i].correct == '回答正確') {
          for (var j = 0; j < this.accuracyList.length; j++) {
            if (this.accuracyList[j].word == this.questionList[i].word) {
              this.accuracyList[j].answerNum++;
              this.accuracyList[j].correctNum++;
              break;
            }
          }
        } else {
          if (this.questionList[i].correct == '回答錯誤') {
            for (var j = 0; j < this.accuracyList.length; j++) {
              if (this.accuracyList[j].word == this.questionList[i].word) {
                this.accuracyList[j].answerNum++;
                break;
              }
            }
          }
        }
      }

      // 寫
      tempWordlist = [];
      for (var i = 0; i < this.accuracyList.length; i++) {
        tempWordlist.push({
          word: this.accuracyList[i].word,
          definition: this.accuracyList[i].definition,
          answerNum: this.accuracyList[i].answerNum,
          correctNum: this.accuracyList[i].correctNum,
        });
      }
      var tempWordAccuracy = {
        user: localStorage.getItem('username'),
        wordcardName: this.cardName,
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
    },
    goBack() {
      this.$router.push({ name: 'myWord', params: { cardName: this.cardName } });
    },
  },
  mounted: async function() {
    this.cardName = this.$route.params.cardName;
    var temp = { user: localStorage.getItem('username'), wordcardName: this.cardName };
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
        } else {
          this.$message({
            type: 'error',
            message: 'FAIL.',
          });
        }
      })
      .catch(err => console.error(err));

    this.randomProduceQuestion();
  },
};
</script>
<style lang="stylus" scoped>
.headerDivider
  border-left 1px solid #38546d
  border-right 1px solid #16222c
  height 98%
  position absolute
  top 2%

.el-card
  height 250px
  max-width 100%
  background-color #F2E9E4

.el-table__column
  color red

.span
  font-size 50px
</style>