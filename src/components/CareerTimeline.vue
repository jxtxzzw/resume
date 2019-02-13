<style scoped>
  .keyPoint{
    color: #5cb85c;
    font-size: 16px;
    font-weight: bold;
  }
  .title{
    font-weight: bold;
  }
  .content{
    padding-left: 7px;
  }
</style>

<template lang="pug">
  Alert(show-icon)
    | 还没有工作经历
    template(slot="desc")
      | 目前在华东师范大学就读，没有工作（和实习）经历
</template>

<script>
export default {
  name: 'CareerTimeline'
}
</script>
