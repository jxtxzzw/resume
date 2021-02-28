<template>
  <div :style="{ display: 'grid', gridTemplateColumns: grids }">
    <div v-for="lv in levels" :key="lv" style="min-width: 300px">
      <Card :title="`Level ${lv}`" icon="md-hammer" :padding="0" shadow>
        <CellGroup>
          <Cell
            v-for="item in levelDict[lv]"
            :key="item.tech"
            :title="item.tech"
            :label="item.desc"
          >
            <Tag
              slot="extra"
              type="border"
              :color="randomLabelColor(item.category)"
            >
              {{ item.category }}
            </Tag>
          </Cell>
        </CellGroup>
      </Card>
    </div>
  </div>
</template>

<script>
import { tech } from '../assets/reader'
import { randomLabelColor } from '../assets/util'

export default {
  name: 'Tech',
  data() {
    return {
      tech,
      randomLabelColor,
      grids: '1fr',
      levels: [0, 1, 2, 3, 4, 5, 6],
      levelDict: {},
    }
  },
  mounted() {
    for (const lv of this.levels) {
      this.levelDict[lv] = []
    }
    for (const x of this.tech) {
      if (!this.levels.includes(x.level)) {
        this.levels.push(x.level)
        this.levelDict[x.level] = []
      }
      this.levelDict[x.level].push(x)
    }
    this.levels = this.levels.sort()
    for (let i = 1; i < this.levels.length; i++) {
      this.grids += ' 1fr'
    }
  },
}
</script>
