<template>
  <div>
    <DreamItem :dreams="dreamsShouldShow" />
  </div>
</template>

<script>
import { dreamEntry, dreamCascade } from 'assets/reader'
import DreamItem from '../components/DreamItem'
export default {
  name: 'Dream',
  components: { DreamItem },
  data() {
    return {
      dreamEntry,
      dreamCascade,
      dreamsIDWithParent: [],
      dreamsShouldShow: [],
    }
  },
  mounted() {
    this.prepareData()
  },
  methods: {
    prepareData() {
      for (const pair of this.dreamCascade) {
        if (!this.dreamsIDWithParent.includes(pair.dream_id)) {
          this.dreamsIDWithParent.push(pair.dream_id)
        }
      }
      for (const dream of this.dreamEntry) {
        if (!this.dreamsIDWithParent.includes(dream.id)) {
          this.dreamsShouldShow.push(dream)
        }
      }
    },
  },
}
</script>
