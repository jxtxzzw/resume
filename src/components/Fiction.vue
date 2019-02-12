<template lang="pug">
  Collapse(v-model="value2", accordion)
    Panel(name="1")
      Rate(disabled, v-model="valueDisabled")
      | 神渊古纪：烽烟绘卷
      p(slot="content") 111222
</template>
<script>
export default {
  name: 'Fiction',
  data () {
    return {
      value2: '1',
      valueDisabled: 5,
      valueDisabled1: 1
    }
  }
}
</script>
