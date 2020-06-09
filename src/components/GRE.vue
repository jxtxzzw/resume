<template>
  <div>
    <i-circle :percent="(verbal-130)/40*100" dashboard>
      <div class="demo-Circle-custom">
        <h1> {{verbal}} </h1>
        <p> {{$t('message.exam.verbal')}} </p>
      </div>
      <span>
        <i> (130-170) </i>
      </span>
    </i-circle>
    <i-circle :percent="(quantitative-130)/40*100" dashboard>
      <div class="demo-Circle-custom">
        <h1> {{quantitative}} </h1>
        <p> {{$t('message.exam.quantitative')}} </p>
      </div>
      <span>
        <i> (130-170) </i>
     </span>
    </i-circle>
    <i-circle :percent="(total-260)/80*100" dashboard
              stroke-color="#5cb85c">
      <div class="demo-Circle-custom">
        <h1> {{total}} </h1>
        <p> {{$t('message.exam.sum')}} </p>
      </div>
      <span>
        <i> (260-340) </i>
     </span>
    </i-circle>
    <i-circle :percent="writing/6*100" dashboard>
      <div class="demo-Circle-custom">
        <h1> {{writing}} </h1>
        <p> {{$t('message.exam.analytical_writing')}} </p>
      </div>
      <span>
        <i> (0-6) </i>
      </span>
    </i-circle>
  </div>
</template>

<script>
export default {
  name: 'CET',
  props: ['verbal', 'quantitative', 'writing'],
  computed: {
    total() {
      return parseInt(this.verbal, 10) + parseInt(this.quantitative, 10);
    },
  },
};
</script>

<style scoped>
  @import "../assets/exam.css";
</style>
