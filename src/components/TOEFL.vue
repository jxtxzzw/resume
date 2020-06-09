<template>
  <div>
    <i-circle :percent="reading/30*100" dashboard>
      <div class="demo-Circle-custom">
        <h1> {{reading}} </h1>
        <p> Reading </p>
      </div>
      <span>
        <i> (0-30) </i>
      </span>
    </i-circle>
    <i-circle :percent="listening/30*100" dashboard>
      <div class="demo-Circle-custom">
        <h1> {{listening}} </h1>
        <p> Listening </p>
      </div>
      <span>
        <i> (0-30) </i>
     </span>
    </i-circle>
    <i-circle :percent="speaking/30*100" dashboard>
      <div class="demo-Circle-custom">
        <h1> {{speaking}} </h1>
        <p> Speaking </p>
      </div>
      <span>
        <i> (0-30) </i>
     </span>
    </i-circle>
    <i-circle :percent="writing/30*100" dashboard>
      <div class="demo-Circle-custom">
        <h1> {{writing}} </h1>
        <p> Writing </p>
      </div>
      <span>
        <i> (0-30) </i>
     </span>
    </i-circle>
    <i-circle
      :percent="(total/120*100)"
      dashboard
      stroke-color="#5cb85c">
      <div class="demo-Circle-custom">
        <h1> {{ total }} </h1>
        <p> Total </p>
      </div>
      <span>
        <i> (0-120) </i>
     </span>
    </i-circle>
  </div>
</template>

<script>
export default {
  name: 'TOEFL',
  props: ['reading', 'listening', 'speaking', 'writing'],
  computed: {
    total() {
      return parseInt(this.reading, 10)
        + parseInt(this.listening, 10)
        + parseInt(this.speaking, 10)
        + parseInt(this.writing, 10);
    },
  },
};
</script>

<style scoped>
  @import "../assets/exam.css";
</style>
