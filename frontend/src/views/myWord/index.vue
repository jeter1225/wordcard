<template>
  <div>
    <el-row>
      <el-col :span="16">
        <h1
          style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;"
        >{{ this.cardName }}</h1>
      </el-col>
      <el-col :span="4">
        <router-link
          v-bind:to="{name:'editCard', params:{cardName: cardName}}"
          style="text-decoration:none;"
        >
          <el-button
            style="position:absolute; top: 30%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold"
            icon="el-icon-edit"
            round
          >編輯小卡</el-button>
        </router-link>
      </el-col>
      <el-col :span="4">
        <el-button
          type="danger"
          style="position:absolute; right: 5%; top: 30%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold"
          icon="el-icon-delete"
          round
          @click="deleteWordCard()"
        >刪除小卡</el-button>
      </el-col>
    </el-row>
    <div class="homepage_line_color"></div>

    <br />
    <br />

    <el-carousel
      indicator-position="outside"
      arrow="always"
      :autoplay="false"
      style="width: 70%; margin:0px auto;"
    >
      <el-carousel-item v-for="(word, index) in wordList" :key="word.word+index">
        <el-row
          style="font-size: 40px; font-family:Microsoft JhengHei; font-weight: bold; text-align:center; line-height:200px;"
        >
          <el-col :span="12">
            <div>
              <h3>{{ word.word }}</h3>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="headerDivider"></div>
          </el-col>
          <el-col :span="12">
            <div>
              <h3>{{ word.definition }}</h3>
            </div>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>

    <div>
      <router-link
        v-bind:to="{name:'test', params:{cardName: cardName}}"
        style="text-decoration:none;"
      >
        <el-button
          type="info"
          style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold"
          round
        >我要考試</el-button>
      </router-link>
    </div>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <p
      style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; float:left; margin-left: 15%;"
    >單字測驗正確率統計:</p>

    <el-table
      stripe
      :data="accuracyList"
      style="width: 100%; font-size:16px; font-family:Microsoft JhengHei; font-weight: bold; margin-left: 15%;"
      :row-style="{height:'50px'}"
      height="350"
    >
      <el-table-column prop="word" label="單字" width="180"></el-table-column>
      <el-table-column prop="definition" label="中文" width="180"></el-table-column>
      <el-table-column prop="correctPercent" label="正確率(%)" width="180"></el-table-column>
    </el-table>

    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
export default {
  name: 'myWord',
  data() {
    return {
      cardName: '',
      wordList: [],
      accuracyList: [],
    };
  },
  methods: {
    async deleteWordCard() {
      if (confirm('確認要刪除小卡嗎?(刪除後不可復原)')) {
        await fetch(
          'http://localhost:3002/api/deleteWordcard/' + localStorage.getItem('username') + '/' + this.cardName,
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

        for (var i = 0; i < this.wordList.length; i++) {
          var wordName = this.wordList[i].word;
          await fetch(
            'http://localhost:3002/api/deleteWord/' +
              localStorage.getItem('username') +
              '/' +
              this.cardName +
              '/' +
              wordName,
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
        }

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
        this.$router.push('/word');
      }
    },
    async addWord() {
      var tempWordlist = [
        {
          user: localStorage.getItem('username'),
          wordcardName: this.cardName,
          word: this.word,
          definition: this.definition,
        },
      ];
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

      this.$router.push({ name: 'myWord', params: { cardName: this.cardName } });
    },
  },
  async mounted() {
    this.cardName = this.$route.params.cardName;
    var temp;
    if (this.$route.params.isOfficial === true) {
      temp = { user: 'official', wordcardName: this.cardName };
    } else {
      temp = { user: localStorage.getItem('username'), wordcardName: this.cardName };
    }
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
          console.log(originData);
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

    this.accuracyList = this.accuracyList.sort(function(a, b) {
      return a.correctPercent > b.correctPercent ? 1 : -1;
    });
  },
};
</script>
<style lang="stylus">
.headerDivider
  border-left 1px solid #38546d
  border-right 1px solid #16222c
  height 98%
  position absolute
  top 2%

.el-carousel__item
  background-color #F2E9E4

.el-card
  max-width 350px
  height 150px
  background-color #F2E9E4

.span
  font-size 50px
</style>