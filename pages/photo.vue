<template>
  <div>
    <client-only>
      <div :style="{ height: contentHeight + 'px' }">
        <vue-waterfall-easy :imgs-arr="photo"> </vue-waterfall-easy>
      </div>
    </client-only>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import { photo } from 'assets/reader'
export default {
  name: 'Photo',
  components: { vueWaterfallEasy },
  data() {
    return {
      screenHeight: 0,
      photo,
    }
  },
  computed: {
    contentHeight() {
      // 64 head + (24 padding) * 2
      return this.screenHeight - 64 - 24 * 2
    },
  },
  mounted() {
    this.screenHeight = this.$store.getters['size/getHeight']
  },
}
</script>
