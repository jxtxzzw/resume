<template>
  <div>
    <Card v-for="d in data" :key="d.name" style="margin-bottom: 40px">
      <p slot="title">
        {{ d.name }}
      </p>
      <a-steps :current="d.current" direction="vertical">
        <a-step
          v-for="r in d.recursions"
          :key="d.name + r.recursion"
          :status="r.status"
        >
          <span slot="title"> {{ slotTitle(r.category) }} </span>
          <span slot="subTitle"> {{ r.date }} </span>
          <span slot="description"> {{ r.note }} </span>
        </a-step>
      </a-steps>
    </Card>
  </div>
</template>

<script>
import { dream } from 'assets/reader'
export default {
  name: 'Dream',
  data() {
    return {
      dream,
      map: new Map(),
      data: [],
    }
  },
  mounted() {
    this.prepareData()
  },
  methods: {
    slotTitle(catrgory) {
      if (catrgory === 'born') {
        return this.$t('dream.born')
      } else if (catrgory === 'preparing') {
        return this.$t('dream.prepare')
      } else if (catrgory === 'enjoying') {
        return this.$t('dream.enjoy')
      } else {
        return this.$t('dream.done')
      }
    },
    prepareData() {
      this.dream.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
          return 1
        } else {
          return a.recursion - b.recursion
        }
      })
      for (const x of this.dream) {
        let e
        if (this.map.has(x.name)) {
          e = this.map.get(x.name)
        } else {
          e = {}
          e.name = x.name
          e.comment = x.comment
          e.current = 0
          e.status = x.status
          e.recursions = []
        }
        e.recursions.push({
          recursion: parseInt(x.recursion),
          category: x.category,
          note: x.note,
          date: x.date,
          status: x.status,
        })
        e.current = Math.max(e.current, parseInt(x.recursion) - 1)
        this.map.set(x.name, e)
      }
      this.data = []
      this.map.forEach((v) => {
        this.data.push(v)
      })
    },
  },
}
</script>
