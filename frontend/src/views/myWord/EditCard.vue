<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div>
          <h1 style="font-size: 40px; font-family:Microsoft JhengHei; padding-left: 50px;">Edit card</h1>
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
        v-for="(id, index) in cardList"
        :key="index"
        style="width: 70%; margin:0px auto; margin-top: 30px"
      >
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
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="homepage_line_color" style="margin:0px auto; width: 70%"></div>

    <div style="margin-top: 50px;">
      <el-button
        type="info"
        style="position:absolute; right:17%; font-size: 20px; font-family:Microsoft JhengHei; font-weight: bold"
        round
        @click="editWordCard()"
      >儲存</el-button>
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
      cardList: [],
      inputErrorExist: false,
    };
  },
  methods: {
    editWordCard() {
      this.$emit('update:edit', false);
    },
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
  watch:{
    cardname(newVal){
      console.log(newVal)
    }
  },
  async mounted() {
    var temp = { user: 'jeter1225', wordcardName: 'My word 1' };
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
              this.cardList.push({ word: originData.data[i].word, definition: originData.data[i].definition });
            }
            console.log(this.cardList);
          }
        } else alert('Fail.');
      })
      .catch(err => console.error(err));
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