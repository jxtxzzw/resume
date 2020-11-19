<template>
  <div>
    <client-only>
      <div :style="{ height: contentHeight + 'px' }">
        <vue-waterfall-easy :imgs-arr="photo" src-key="src" href-key="src">
          <div slot-scope="props">
            <p class="some-info">{{ descriptionDate(props.value.date) }}</p>
            <p class="some-info">{{ descriptionInfo(props.value.info) }}</p>
          </div>
        </vue-waterfall-easy>
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
  methods: {
    descriptionDate(date) {
      return this.$t('photo.date', { date })
    },
    descriptionInfo(info) {
      return this.$t('photo.info', { info })
    },
  },
}
</script>

<style scoped>
.some-info {
  line-height: 1.6;
  text-align: center;
  padding: 5px;
}
</style>
