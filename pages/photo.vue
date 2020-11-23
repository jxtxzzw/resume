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
// TODO: 图片大小的自动计算有问题
// TODO: 图片位置的自动计算有问题
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
      // 64 head + (24 padding) * 2 + (24 padding) * 2
      return this.screenHeight - 64 - 24 * 4
    },
  },
  watch: {
    '$store.state.size.height'() {
      this.screenHeight = this.$store.getters['size/getHeight']
    },
  },
  mounted() {
    this.$i18n.locale = this.$store.getters['language/getLanguage']
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
