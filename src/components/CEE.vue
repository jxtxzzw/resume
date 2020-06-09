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
          {{dict(item.name, $i18n)}}
        </p>
      </div>
      <span>
        {{$t('message.exam.total')}}
        <i>
          {{item.total}}
        </i>
      </span>
    </i-circle>
  </div>

</template>

<script>
import { dict } from '../assets/dict';

export default {
  name: 'CEE',
  data() {
    return {
      dict,
      scores: [
        {
          name: '语文',
          score: 104,
          total: 150,
        },
        {
          name: '数学',
          score: 124,
          total: 150,
        },
        {
          name: '英语',
          score: 128,
          total: 150,
        },
        {
          name: '化学',
          score: 136,
          total: 150,
        },
        {
          name: '总分',
          score: 492,
          total: 600,
        },
      ],
    };
  },
};
</script>

<style scoped>
  @import "../assets/exam.css";
</style>
