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
        const did = parseInt(pair.dream_id)
        if (!this.dreamsIDWithParent.includes(did)) {
          this.dreamsIDWithParent.push(did)
        }
      }
      for (const dream of this.dreamEntry) {
        const did = parseInt(dream.id)
        if (!this.dreamsIDWithParent.includes(did)) {
          this.dreamsShouldShow.push(dream)
        }
      }
    },
  },
}
</script>
