<template lang="pug">
div
  Alert(type="error", show-icon)
    | 这个页面还在施工中
    template(slot="desc")
      | 这个页面还在施工中，过段时间再来访问吧
</template>

<script>
export default {
  name: 'Reserved'
}
</script>

<style scoped>

</style>
