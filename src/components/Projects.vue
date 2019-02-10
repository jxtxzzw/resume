<template lang="pug">
  Carousel(autoplay, v-model="value2", loop)
    CarouselItem
      div
      | 1
    CarouselItem
      div
      | 2
    CarouselItem
      div
      | 3
</template>
<script>
export default {
  name: 'Projects',
  data () {
    return {
      value2: 0
    }
  }
}
</script>
