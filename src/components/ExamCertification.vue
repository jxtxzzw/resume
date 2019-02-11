<template lang="pug">
  div
    CET6
    CET4
    CEE
</template>

<script>
import CET4 from '../data/CET4'
import CEE from '../data/CEE'
import CET6 from '../data/CET6'
export default {
  name: 'ExamCertification',
  components: {CET6, CEE, CET4}
}
</script>

<style scoped>

</style>
