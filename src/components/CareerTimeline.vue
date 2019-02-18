<template lang="pug">
  Alert(type="warning", show-icon)
    | 还没有工作经历
    template(slot="desc")
      | 目前在华东师范大学就读，没有工作（和实习）经历
</template>

<script>
export default {
  name: 'CareerTimeline'
}
</script>
