<style scoped lang="less">
  .demo-Circle-custom{
    & h1{
      color: #5cb85c;
      font-size: 40px;
      font-weight: normal;
    }
  }
</style>
<template lang="pug">
  div
    Row
      Col(span="4", v-for="item in ECNUGPA", :key="item.id")
        Card
          p(slot="title") {{item.course}}
          i-circle(:percent="item.grade/4*100", stroke-color="#5cb85c")
            div(class="demo-Circle-custom")
              h1 {{item.rank}}
    Row
      Col(span="12")
        Card
          p(slot="title") TOEFL My Highest Score
          TOEFL(:reading="28", :listening="27", :speaking="23", writing="28")
      Col(span="12")
        Card
          p(slot="title") TOEFL MyBest Scores
          TOEFL(:reading="28", :listening="28", :speaking="23", writing="28")
    Row
      Col(span="12")
        Card
          p(slot="title") GRE My Highest Score
          GRE(:verbal="154", :quantitive="170", :writing="3")
      Col(span="12")
        Card
          p(slot="title") GRE MyBest Scores
          GRE(:verbal="154", :quantitive="170", :writing="4")
    Row
      Col(span="12")
        Card
          p(slot="title") CET6
          CET(:listening="184", :reading="215", :writingAndTranslation="170")
      Col(span="12")
        Card
          p(slot="title") CET4
          CET(:listening="225", :reading="206", :writingAndTranslation="183")
    Row
      Col(span="24")
        Card
          p(slot="title") 高考
          CEE
    Row
      Col(span="24")
        Card
          p(slot="title") 中考
          HEE
</template>

<script>
import CET from '../data/CET'
import CEE from '../data/CEE'
import HEE from '../data/HEE'
import TOEFL from '../data/TOEFL'
import GRE from '../data/GRE'
import axios from 'axios'
export default {
  name: 'ExamCertification',
  components: {CET, CEE, HEE, TOEFL, GRE},
  data () {
    return {
      ECNUGPA: []
    }
  },
  async mounted () {
    this.$Message.info('包括中考、高考成绩，大学本科及以后的专业课成绩，和各种资质考试成绩')
    await axios.get('https://www.jxtxzzw.com/resume/data/static/GPA.json')
      .then(res => {
        this.ECNUGPA = res.data
      })
  }
}
</script>
