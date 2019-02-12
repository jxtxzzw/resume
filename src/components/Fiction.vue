<template lang="pug">
  Collapse(accordion)
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
      valueDisabled: 5,
    }
  }
}
</script>
