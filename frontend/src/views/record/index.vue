<template>
  <div>
    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">RECORD</h1></div>
    <div class="homepage_line_color"></div>
    <el-row>
      <el-col :span="8">
        <div class="record_left">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">歷史考試紀錄</h1></div>
          <div class="homepage_line_color2" style="margin-bottom: 20px"></div>
          <!-- 
          <el-row v-for="(id, index) in testList" :key="index">
            <div @click="deliverQuestionList(id.questionList)">
              <h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 20px;">．{{id.wordcardName}}</h3>
            </div>
          </el-row>
		  -->
		  <el-row v-for="(id, index) in testList" :key="index">
            <div @click="deliverQuestionList(id.questionList)">
			  <el-button @click="deliverQuestionList(id.questionList)" style="width:75%; font-size: 25px; font-family:Microsoft JhengHei; margin-left:50px; text-align:left;" icon="el-icon-price-tag" type="warning" plain>{{id.wordcardName}}</el-button>
            </div>
          </el-row>
		  
        </div>
      </el-col>
      <el-col :span="2">
        <div class="record_mid"></div>
      </el-col>
      <el-col :span="14">
        <div class="record_right1">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">該次考試單字</h1></div>
		  
		  <p v-if="showResult == 1" style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px; float:left;">答題數:</p>
		  <p v-if="showResult == 1" style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left; color: blue"> {{ result.answerNum }} </p>
		  <p v-if="showResult == 1" style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left;">題，答對題數:</p>
		  <p v-if="showResult == 1" style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left; color: blue"> {{ result.correctNum }} </p>
		  <p v-if="showResult == 1" style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left;">題，正確率:</p>
		  <p v-if="showResult == 1 & result.correctPercent >= 60" style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left; color: #00DB00"> {{ result.correctPercent }} </p>
		  <p v-if="showResult == 1 & result.correctPercent < 60" style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left; color: red"> {{ result.correctPercent }} </p>
		  <p v-if="showResult == 1" style="font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 5px; float:left;">%</p>
		  
          <el-table stripe ref="filterTable" :data="showQuestionList" style="width: 100%; font-size:16px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;" :row-style="{height:'50px'}" height="350">
          <el-table-column prop="word" label="單字" width="180"></el-table-column>
          <el-table-column prop="definition" label="中文" width="180"></el-table-column>
          <el-table-column prop="answer" label="你的答案" width="180"></el-table-column>
          <el-table-column prop="correct" label="正確與否" width="180"
          :filters="[{ text: '回答正確', value: '回答正確' }, { text: '回答錯誤', value: '回答錯誤' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.correct === '回答正確' ? 'success' : 'danger'"
              disable-transitions>{{scope.row.correct}}</el-tag>
          </template>
        </el-table-column>
        </el-table>
        </div>
        <!-- <div class="record_right2">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">歷史考試紀錄</h1></div>
          <h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 10px;">．apple : 100%</h3>
          <h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 10px;">．banana : 50%</h3>
        </div> -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'record',
  data() {
    return{
      testList: [],
      showQuestionList: [],
	  result: {answerNum: 0, correctNum: 0, correctPercent: 0},
	  showResult: 0
    }
  },
  methods: {
    deliverQuestionList(a) {
	  this.result = {answerNum: 0, correctNum: 0, correctPercent: 0};
	  this.showResult = 1;
	  this.$refs.filterTable.clearFilter();
      console.log(a[0]);
      this.showQuestionList = [];
      for (var i = 0; i < a.length; i++){
        this.showQuestionList.push(a[i]);
		this.result.answerNum++;
		if (a[i].correct == "回答正確"){
		  this.result.correctNum++;
		}
      }
	  this.result.correctPercent = Math.round(100 * this.result.correctNum / this.result.answerNum);
    },
	filterTag(value, row) {
      return row.correct === value;
    },
  },
  mounted: async function(){
    var temp = {user:"jeter1225"};
    await fetch("http://localhost:3002/api/getTest", {
      method: 'POST',
      body: JSON.stringify(temp),
      headers: {
        'Content-Type': 'application/json'
    }})
    .then(res => { return res.json() })
    .then(originData => {
      if(originData.success) {
        if(originData.data) {
          for (var i = 0; i < originData.data.length; i++){
            this.testList.push(originData.data[originData.data.length - i - 1]);
          }
        }
      }
      else
        alert('Fail.');
    })
    .catch((err) => console.error(err));
  },
};
</script>
<style lang="stylus">
.homepage_font_style {
  color : black
  font-size : 40px
  margin-top : 3%
}
.homepage_line_color {
  background-color: black
  height:3px
  margin-top : -2%
}
.record_left {
  background-color: #F2E9E4
  height:600px
  margin-top:40px
  overflow : auto
}
.record_mid {
  background-color: white
  height:600px
  margin-top:40px
  overflow : auto
}
.record_right1 {
  background-color: white
  height:300px
  margin-top:40px
}
.record_right2 {
  background-color: #F2E9E4
  height:300px
  overflow : auto
}
.homepage_line_color2 {
  background-color: gray
  height:3px
}
</style>