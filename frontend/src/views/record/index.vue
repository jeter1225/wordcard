<template>
  <div>
    <div><h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">RECORD</h1></div>
    <div class="homepage_line_color"></div>
    <el-row>
      <el-col :span="8">
        <div class="record_left">
          <div><h1 style="font-size: 35px; font-family:Microsoft JhengHei; text-align: center; margin: 20px;">歷史考試紀錄</h1></div>
          <div class="homepage_line_color2"></div>
          <!-- <div style="background-color : #4A4E69;">
            <h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 20px; color: white">．考試一</h3>
          </div>
          <div><h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 20px;">．考試二</h3></div> -->
          <el-row v-for="(id, index) in testList" :key="index">
            <div @click="deliverQuestionList(id.questionList)">
              <h3 style="font-size: 25px; font-family:Microsoft JhengHei; text-align: left; margin: 20px;">．{{id.wordcardName}}</h3>
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
          <el-table :data="showQuestionList" style="width: 100%; font-size:16px; font-family:Microsoft JhengHei; font-weight: bold; padding-left: 50px;" :row-style="{height:'50px'}">
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
  name: 'Record',
  data() {
    return{
      testList: [],
      showQuestionList: [],
    }
  },
  methods: {
    deliverQuestionList(a) {
      console.log(a[0]);
      this.showQuestionList = [];
      for (var i = 0; i < a.length; i++){
            this.showQuestionList.push(a[i]);
          }
    },
  },
  mounted: async function(){
    this.cardName = this.$route.params.cardName;
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
            this.testList.push(originData.data[i]);
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
  overflow : auto
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