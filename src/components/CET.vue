<template>
  <div>
    <i-circle :percent="listening/248.5*100" dashboard>
      <div class="demo-Circle-custom">
        <h1> {{listening}} </h1>
        <p> {{$t('message.exam.listening')}} </p>
      </div>
      <span>
        {{$t('message.exam.total')}}
        <i> 248.5 </i>
  </span>
    </i-circle>
    <i-circle :percent="reading/248.5*100" dashboard>
      <div class="demo-Circle-custom">
        <h1> {{reading}} </h1>
        <p> {{$t('message.exam.reading')}} </p>
      </div>
      <span>
        {{$t('message.exam.total')}}
        <i> 248.5 </i>
      </span>
    </i-circle>
    <i-circle :percent="writingAndTranslation/213*100" dashboard>
      <div class="demo-Circle-custom">
        <h1> {{writingAndTranslation}} </h1>
        <p> {{$t('message.exam.writing_and_translation')}} </p>
      </div>
      <span>
        {{$t('message.exam.total')}}
        <i> 213 </i>
      </span>
    </i-circle>
    <i-circle
      :percent="(total/710*100)"
      dashboard stroke-color="#5cb85c">
      <div class="demo-Circle-custom">
        <h1> {{total}} </h1>
        <p> {{$t('message.exam.sum')}} </p>
      </div>
      <span>
        {{$t('message.exam.total')}}
        <i> 710 </i>
      </span>
    </i-circle>
  </div>
</template>
<script>
export default {
  name: 'CET',
  props: ['listening', 'reading', 'writingAndTranslation'],
  computed: {
    total() {
      return parseInt(this.listening, 10)
        + parseInt(this.reading, 10)
        + parseInt(this.writingAndTranslation, 10);
    },
  },
};
</script>

<style scoped>
  @import "../assets/exam.css";
</style>
