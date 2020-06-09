<template>
  <div>
    <i-circle
      v-for="item in scores"
      :percent="item.score/item.total*100"
      :key="item.name"
      dashboard
      :stroke-color="item.name === '总分' ? '#5cb85c' : '#2D8CF0'"
    >
      <div class="demo-Circle-custom">
        <h1>
          {{item.score}}
        </h1>
        <p>
          {{item.name}}
        </p>
      </div>
      <span>
        满分
        <i>
          {{item.total}}
        </i>
      </span>
    </i-circle>
  </div>
</template>

<script>
export default {
  name: 'CEE',
  data() {
    return {
      scores: [
        {
          name: '语文',
          score: 135,
          total: 150,
        },
        {
          name: '数学',
          score: 145,
          total: 150,
        },
        {
          name: '英语',
          score: 143.5,
          total: 150,
        },
        {
          name: '物理',
          score: 85,
          total: 90,
        },
        {
          name: '化学',
          score: 56,
          total: 60,
        },
        {
          name: '体育',
          score: 28,
          total: 30,
        },
        {
          name: '总分',
          score: 592.5,
          total: 630,
        },
      ],
    };
  },
};
</script>

<style scoped>
  @import "../assets/exam.css";
</style>
