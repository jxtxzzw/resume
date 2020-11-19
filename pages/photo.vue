<template>
  <div>
    <client-only>
      <div style="height: 100px; width: 100%">
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
      photo,
    }
  },
}
</script>
