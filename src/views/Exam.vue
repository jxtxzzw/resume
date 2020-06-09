<template>
  <div>
    <Row>
      <i-col span="4" v-for="item in GPA.ECNU" :key="item.id">
        <Card>
          <p slot="title">
            {{item.course}}
          </p>
          <i-circle :percent="item.grade/4*100" stroke-color="#5cb85c">
            <div class="demo-Circle-custom">
              <h1>
                {{item.rank}}
              </h1>
            </div>
          </i-circle>
        </Card>
      </i-col>
    </Row>
    <Row>
      <i-col span="12">
        <Card>
          <p slot="title">
            TOEFL My Highest Score
          </p>
          <TOEFL :reading="28" :listening="27" :speaking="23" :writing="28"/>
        </Card>
      </i-col>
      <i-col span="12">
        <Card>
          <p slot="title">
            TOEFL My MyBest Score
          </p>
          <TOEFL :reading="28" :listening="28" :speaking="23" :writing="28"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <i-col span="12">
        <Card>
          <p slot="title">
            GRE My Highest Score
          </p>
          <GRE :verbal="154" :quantitive="170" :writing="3"/>
        </Card>
      </i-col>
      <i-col span="12">
        <Card>
          <p slot="title">
            GRE My MyBest Score
          </p>
          <GRE :verbal="154" :quantitive="170" :writing="4"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <i-col span="12">
        <Card>
          <p slot="title">
            CET6
          </p>
          <CET :listening="184" :reading="215" :writingAndTranslation="170"/>
        </Card>
      </i-col>
      <i-col span="12">
        <Card>
          <p slot="title">
            CET4
          </p>
          <CET :listening="225" :reading="206" :writingAndTranslation="183"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <i-col span="24">
        <Card>
          <p slot="title">
            高考
          </p>
          <CEE />
        </Card>
      </i-col>
    </Row>
    <Row>
      <i-col span="24">
        <Card>
          <p slot="title">
            中考
          </p>
          <HEE />
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import CET from '../components/CET.vue';
import CEE from '../components/CEE.vue';
import HEE from '../components/HEE.vue';
import TOEFL from '../components/TOEFL.vue';
import GRE from '../components/GRE.vue';

export default {
  name: 'ExamCertification',
  components: {
    CET, CEE, HEE, TOEFL, GRE,
  },
  data() {
    return {
      GPA: {
        ECNU: [
          {
            course: '数据库系统原理',
            grade: '4',
            rank: 'A',
          },
          {
            course: '面向对象程序设计(基于Java)',
            grade: '4',
            rank: 'A',
          },
          {
            course: '操作系统',
            grade: '4',
            rank: 'A',
          },
          {
            course: '并行计算',
            grade: '4',
            rank: 'A',
          },
          {
            course: '计算机组成与结构',
            grade: '4',
            rank: 'A',
          },
          {
            course: '数据结构',
            grade: '4',
            rank: 'A',
          },
          {
            course: '计算机网络',
            grade: '4',
            rank: 'A',
          },
          {
            course: '数字逻辑及实验',
            grade: '3.2',
            rank: 'B',
          },
          {
            course: '信号与系统',
            grade: '3.9',
            rank: 'A-',
          },
          {
            course: '数字图像处理',
            grade: '4',
            rank: 'A',
          },
          {
            course: '算法分析与设计',
            grade: '4',
            rank: 'A',
          },
          {
            course: '问题求解与程序设计',
            grade: '4',
            rank: 'A',
          },
          {
            course: '程序设计能力实训',
            grade: '4',
            rank: 'A',
          },
          {
            course: '电子技术及实验',
            grade: '4',
            rank: 'A',
          },
          {
            course: '知识分析与应用基础',
            grade: '4',
            rank: 'A',
          },
          {
            course: '人工智能',
            grade: '4',
            rank: 'A',
          },
          {
            course: '服务器维护与网站建设',
            grade: '4',
            rank: 'A',
          },
          {
            course: '数据挖掘',
            grade: '3.8',
            rank: 'A',
          },
          {
            course: '数据分析实践',
            grade: '4',
            rank: 'A',
          },
          {
            course: '编译原理',
            grade: '3.8',
            rank: 'A',
          },
          {
            course: '数据库系统原理实践',
            grade: '4',
            rank: 'A',
          },
        ],
      },
      CMU: [
        {
          course: '18613',
          grade: '',
          rank: '',
        },
      ],
    };
  },
};
</script>

<style scoped>
@import "../assets/exam.css";
</style>
